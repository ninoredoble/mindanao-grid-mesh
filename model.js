/*
 * Static DC power-flow model for the mimic board.
 * One reference bus per island, lossless lines, a single per-unit-style
 * reactance per line. No voltage, frequency or protection dynamics.
 * All figures are illustrative, not NGCP data.
 */
(function (root) {
  'use strict';

  var BUSES = [
    { id: 'AGUS', name: 'Agus IV',    kind: 'gen',  cap: 158 },
    { id: 'PUL',  name: 'Pulangi IV', kind: 'gen',  cap: 255 },
    { id: 'LUG',  name: 'Lugait',     kind: 'load', load: 60 },
    { id: 'TAG',  name: 'Tagoloan',   kind: 'load', load: 90 },
    { id: 'OPO',  name: 'Opol',       kind: 'load', load: 30 },
    { id: 'CAR',  name: 'Carmen',     kind: 'load', load: 65 },
    { id: 'CUG',  name: 'Cugman',     kind: 'load', load: 50 }
  ];

  var LINES = [
    { id: 'CB-101', from: 'AGUS', to: 'LUG', kv: 138, x: 0.02, rating: 200 },
    { id: 'CB-102', from: 'PUL',  to: 'TAG', kv: 138, x: 0.02, rating: 300 },
    { id: 'CB-103', from: 'LUG',  to: 'TAG', kv: 138, x: 0.03, rating: 200 },
    { id: 'CB-201', from: 'LUG',  to: 'OPO', kv: 69,  x: 0.05, rating: 110 },
    { id: 'CB-202', from: 'OPO',  to: 'CAR', kv: 69,  x: 0.04, rating: 110 },
    { id: 'CB-203', from: 'CAR',  to: 'CUG', kv: 69,  x: 0.04, rating: 110 },
    { id: 'CB-204', from: 'CUG',  to: 'TAG', kv: 69,  x: 0.05, rating: 110 }
  ];

  var BUS = {};
  BUSES.forEach(function (b) { BUS[b.id] = b; });

  /* Solve A x = b in place (Gaussian elimination, partial pivoting). */
  function gauss(A, b) {
    var n = b.length, i, j, k, p, t, f;
    for (i = 0; i < n; i++) {
      p = i;
      for (j = i + 1; j < n; j++) if (Math.abs(A[j][i]) > Math.abs(A[p][i])) p = j;
      t = A[i]; A[i] = A[p]; A[p] = t;
      t = b[i]; b[i] = b[p]; b[p] = t;
      for (j = i + 1; j < n; j++) {
        f = A[j][i] / A[i][i];
        for (k = i; k < n; k++) A[j][k] -= f * A[i][k];
        b[j] -= f * b[i];
      }
    }
    var x = new Array(n);
    for (i = n - 1; i >= 0; i--) {
      t = b[i];
      for (j = i + 1; j < n; j++) t -= A[i][j] * x[j];
      x[i] = t / A[i][i];
    }
    return x;
  }

  /*
   * state: { open: { 'CB-103': true, ... }, scale: 1.0 }
   * Returns per-bus, per-line and system results.
   */
  function solve(state) {
    var open = state.open || {}, scale = state.scale == null ? 1 : state.scale;
    var closed = LINES.filter(function (l) { return !open[l.id]; });

    /* islands by flood fill over closed lines */
    var comp = {}, islands = [];
    BUSES.forEach(function (b) {
      if (comp[b.id] != null) return;
      var idx = islands.length, stack = [b.id], members = [];
      comp[b.id] = idx;
      while (stack.length) {
        var cur = stack.pop();
        members.push(cur);
        closed.forEach(function (l) {
          var other = l.from === cur ? l.to : l.to === cur ? l.from : null;
          if (other && comp[other] == null) { comp[other] = idx; stack.push(other); }
        });
      }
      islands.push({ buses: members });
    });

    var buses = {}, lines = {};
    var demand = 0, served = 0;

    islands.forEach(function (isl) {
      var gens = isl.buses.filter(function (id) { return BUS[id].kind === 'gen'; });
      var cap = 0, load = 0;
      gens.forEach(function (id) { cap += BUS[id].cap; });
      isl.buses.forEach(function (id) { load += (BUS[id].load || 0) * scale; });
      var live = gens.length > 0;
      var frac = !live ? 0 : load === 0 ? 1 : Math.min(1, cap / load);
      isl.live = live;
      isl.load = load;
      isl.served = load * frac;
      isl.gen = isl.served;
      isl.capacity = cap;

      var inj = {};
      isl.buses.forEach(function (id) {
        var b = BUS[id], want = (b.load || 0) * scale, got = want * frac;
        var g = b.kind === 'gen' && cap > 0 ? isl.served * b.cap / cap : 0;
        inj[id] = g - got;
        buses[id] = {
          id: id, live: live, island: comp[id],
          load: want, served: got, unserved: want - got, gen: g
        };
      });

      /* reduced susceptance matrix, first bus of the island is the reference */
      var theta = {};
      var ids = isl.buses, ref = ids[0];
      theta[ref] = 0;
      var free = ids.slice(1);
      if (free.length && live) {
        var pos = {}, n = free.length;
        free.forEach(function (id, i) { pos[id] = i; });
        var A = [], b = [], i, j;
        for (i = 0; i < n; i++) { A.push(new Array(n).fill(0)); b.push(inj[free[i]]); }
        closed.forEach(function (l) {
          if (comp[l.from] !== comp[ref]) return;
          var y = 1 / l.x, a = pos[l.from], c = pos[l.to];
          if (a != null) A[a][a] += y;
          if (c != null) A[c][c] += y;
          if (a != null && c != null) { A[a][c] -= y; A[c][a] -= y; }
        });
        var sol = gauss(A, b);
        free.forEach(function (id, k) { theta[id] = sol[k]; });
      } else {
        ids.forEach(function (id) { theta[id] = 0; });
      }
      isl.theta = theta;
      demand += load;
      served += isl.served;
    });

    LINES.forEach(function (l) {
      var isClosed = !open[l.id];
      var flow = 0;
      if (isClosed && islands[comp[l.from]].live) {
        flow = (islands[comp[l.from]].theta[l.from] - islands[comp[l.from]].theta[l.to]) / l.x;
      }
      var loading = Math.abs(flow) / l.rating;
      lines[l.id] = {
        id: l.id, closed: isClosed,
        live: isClosed && islands[comp[l.from]].live,
        flow: flow, loading: loading, over: loading > 1.0005
      };
    });

    return {
      buses: buses, lines: lines, islands: islands,
      demand: demand, served: served, unserved: demand - served
    };
  }

  /* The closed line to trip next under overload protection, or null. */
  function nextOverload(result) {
    var worst = null;
    LINES.forEach(function (l) {
      var r = result.lines[l.id];
      if (r.closed && r.over && (!worst || r.loading > result.lines[worst].loading)) worst = l.id;
    });
    return worst;
  }

  /* What each single closed line would do if it alone were opened now (no cascade). */
  function contingencies(state) {
    var out = {};
    LINES.forEach(function (l) {
      if (state.open[l.id]) return;
      var open = Object.assign({}, state.open);
      open[l.id] = true;
      var r = solve({ open: open, scale: state.scale });
      var worst = null;
      LINES.forEach(function (m) {
        var q = r.lines[m.id];
        if (q.closed && (!worst || q.loading > r.lines[worst].loading)) worst = m.id;
      });
      out[l.id] = {
        unserved: r.unserved,
        worstId: worst,
        worst: worst ? r.lines[worst].loading : 0,
        verdict: r.unserved > 0.05 ? 'loss' : (worst && r.lines[worst].over) ? 'overload' : 'ok'
      };
    });
    return out;
  }

  var api = { BUSES: BUSES, LINES: LINES, BUS: BUS, solve: solve, nextOverload: nextOverload, contingencies: contingencies };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GridModel = api;
})(typeof window !== 'undefined' ? window : this);
