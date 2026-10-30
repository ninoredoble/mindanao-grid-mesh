(function () {
  'use strict';

  var M = window.GridModel;
  var NS = 'http://www.w3.org/2000/svg';
  var TRIP_DELAY = 1100;

  /* ---- diagram geometry: one layout for wide screens, one for phones ---- */

  var LAYOUTS = {
    wide: {
      vb: [1000, 500],
      nodes: {
        AGUS: { x: 90,  y: 140, side: 'down' },
        LUG:  { x: 330, y: 140, side: 'up' },
        TAG:  { x: 700, y: 140, side: 'up' },
        PUL:  { x: 910, y: 140, side: 'down' },
        OPO:  { x: 330, y: 400, side: 'down' },
        CAR:  { x: 515, y: 400, side: 'down' },
        CUG:  { x: 700, y: 400, side: 'down' }
      },
      lines: {
        'CB-101': { t: 0.5,  lab: 'above' },
        'CB-102': { t: 0.5,  lab: 'above' },
        'CB-103': { t: 0.5,  lab: 'above' },
        'CB-201': { t: 0.62, lab: 'right', xf: 0.24 },
        'CB-202': { t: 0.5,  lab: 'above' },
        'CB-203': { t: 0.5,  lab: 'above' },
        'CB-204': { t: 0.42, lab: 'right', xf: 0.78 }
      }
    },
    tall: {
      vb: [400, 610],
      nodes: {
        AGUS: { x: 145, y: 50,  side: 'left' },
        PUL:  { x: 255, y: 50,  side: 'right' },
        LUG:  { x: 145, y: 200, side: 'left' },
        TAG:  { x: 255, y: 200, side: 'right' },
        OPO:  { x: 145, y: 360, side: 'left' },
        CAR:  { x: 145, y: 520, side: 'left' },
        CUG:  { x: 255, y: 520, side: 'right' }
      },
      lines: {
        'CB-101': { t: 0.5,  lab: 'left' },
        'CB-102': { t: 0.5,  lab: 'right' },
        'CB-103': { t: 0.5,  lab: 'above' },
        'CB-201': { t: 0.62, lab: 'right', xf: 0.24 },
        'CB-202': { t: 0.5,  lab: 'right' },
        'CB-203': { t: 0.5,  lab: 'below' },
        'CB-204': { t: 0.42, lab: 'left', xf: 0.8 }
      }
    }
  };

  var BASE_MW = M.BUSES.reduce(function (s, b) { return s + (b.load || 0); }, 0);
  var LAB_W = 86, LAB_H = 38;

  /* ---- state ---- */

  var state = { open: {}, scale: 1, protect: true };
  var tripped = {};
  var t0 = Date.now();
  var timer = null;
  var lastUnserved = 0;
  var result = null;
  var refs = null;
  var layoutName = null;

  var $ = function (id) { return document.getElementById(id); };
  var mq = window.matchMedia('(max-width: 720px)');

  function el(name, attrs, parent, text) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  function fmt(v) { return Math.round(v); }
  function pct(v) { return Math.round(v * 100); }

  /* ---- build the SVG for a layout ---- */

  function build(name) {
    layoutName = name;
    var L = LAYOUTS[name];
    var host = $('diagram');
    var old = host.querySelector('svg');
    if (old) host.removeChild(old);

    var svg = el('svg', { viewBox: '0 0 ' + L.vb[0] + ' ' + L.vb[1], 'class': 'sld sld-' + name, focusable: 'false' }, host);
    refs = { lines: {}, buses: {} };

    var gLines = el('g', {}, svg), gBus = el('g', {}, svg), gBrk = el('g', {}, svg);

    M.LINES.forEach(function (ln) {
      var a = L.nodes[ln.from], b = L.nodes[ln.to], cfg = L.lines[ln.id];
      var r = { cfg: cfg };
      var g = el('g', { 'class': 'line kv' + ln.kv }, gLines);
      var d = 'M' + a.x + ',' + a.y + ' L' + b.x + ',' + b.y;
      r.base = el('path', { d: d, 'class': 'wire' }, g);
      r.flow = el('path', { d: d, 'class': 'flow' }, g);

      if (cfg.xf != null) {
        var fx = a.x + (b.x - a.x) * cfg.xf, fy = a.y + (b.y - a.y) * cfg.xf;
        var horiz = Math.abs(b.x - a.x) > Math.abs(b.y - a.y);
        var dx = horiz ? 9 : 0, dy = horiz ? 0 : 9;
        var xf = el('g', { 'class': 'xf' }, g);
        el('circle', { cx: fx - dx, cy: fy - dy, r: 13 }, xf);
        el('circle', { cx: fx + dx, cy: fy + dy, r: 13 }, xf);
      }

      /* breaker and label sit at the same point on the line */
      var px = a.x + (b.x - a.x) * cfg.t, py = a.y + (b.y - a.y) * cfg.t;
      var bg = el('g', {
        'class': 'breaker', role: 'button', tabindex: '0', 'data-id': ln.id,
        transform: 'translate(' + px + ',' + py + ')'
      }, gBrk);
      el('rect', { x: -24, y: -24, width: 48, height: 48, 'class': 'hit' }, bg);
      el('rect', { x: -11, y: -11, width: 22, height: 22, 'class': 'sym' }, bg);
      el('path', { d: 'M-7,7 L7,-7', 'class': 'slash' }, bg);
      r.brk = bg;

      var cx = 0, cy = 0;
      if (cfg.lab === 'above') cy = -(22 + LAB_H / 2);
      else if (cfg.lab === 'below') cy = 22 + LAB_H / 2;
      else if (cfg.lab === 'right') cx = 20 + LAB_W / 2;
      else cx = -(20 + LAB_W / 2);
      var lab = el('g', { 'class': 'tag', transform: 'translate(' + (px + cx) + ',' + (py + cy) + ')', 'aria-hidden': 'true' }, gBrk);
      r.labBox = el('rect', { x: -LAB_W / 2, y: -LAB_H / 2, width: LAB_W, height: LAB_H, 'class': 'tag-box' }, lab);
      el('text', { x: -30, y: -4, 'class': 'tag-id' }, lab, ln.id);
      r.labArrow = el('path', { d: 'M-5,-6 L6,0 L-5,6 Z', 'class': 'tag-arrow' }, lab);
      r.labVal = el('text', { x: -17, y: 13, 'class': 'tag-val' }, lab, '');
      r.lab = lab;

      r.angle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      refs.lines[ln.id] = r;
    });

    M.BUSES.forEach(function (bus) {
      var n = L.nodes[bus.id];
      var r = {};
      var g = el('g', { 'class': 'bus ' + bus.kind }, gBus);
      var tx = n.x, ty = n.y, anchor = 'middle';
      var off = bus.kind === 'gen' ? 40 : 40;

      if (bus.kind === 'gen') {
        el('circle', { cx: n.x, cy: n.y, r: 27, 'class': 'gen-disc' }, g);
        el('text', { x: n.x, y: n.y + 8, 'class': 'gen-g' }, g, 'G');
      } else {
        el('path', { d: 'M' + (n.x - 32) + ',' + n.y + ' H' + (n.x + 32), 'class': 'bar' }, g);
        /* load arrow pointing away from the bus */
        var dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[n.side];
        if (n.side === 'left' || n.side === 'right') dir = [0, 0];
        if (dir[1] !== 0) {
          var ay = n.y + dir[1] * 12, tip = n.y + dir[1] * 26;
          r.arrow = el('path', { d: 'M' + n.x + ',' + ay + ' V' + (tip - dir[1] * 6) + ' M' + (n.x - 6) + ',' + (tip - dir[1] * 8) + ' L' + n.x + ',' + tip + ' L' + (n.x + 6) + ',' + (tip - dir[1] * 8), 'class': 'load-arrow' }, g);
        }
      }

      var lx = n.x, ly1, ly2;
      if (n.side === 'up')   { ly1 = n.y - off - 18; ly2 = n.y - off + 2; }
      if (n.side === 'down') { ly1 = n.y + off + 14; ly2 = n.y + off + 34; }
      if (n.side === 'left' || n.side === 'right') {
        var w = bus.kind === 'gen' ? 38 : 42;
        lx = n.x + (n.side === 'left' ? -w : w);
        anchor = n.side === 'left' ? 'end' : 'start';
        ly1 = n.y - 2; ly2 = n.y + 17;
      }
      r.name = el('text', { x: lx, y: ly1, 'class': 'bus-name', 'text-anchor': anchor }, g, bus.name);
      r.val = el('text', { x: lx, y: ly2, 'class': 'bus-val', 'text-anchor': anchor }, g, '');
      r.g = g;
      refs.buses[bus.id] = r;
    });

    bindBreakers(svg);
  }

  function bindBreakers(svg) {
    svg.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('.breaker') : null;
      if (t) toggle(t.getAttribute('data-id'), true);
    });
    svg.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var t = e.target.closest ? e.target.closest('.breaker') : null;
      if (!t) return;
      e.preventDefault();
      toggle(t.getAttribute('data-id'), true);
    });
  }

  /* ---- table ---- */

  var BUS_NAME = {};
  M.BUSES.forEach(function (b) { BUS_NAME[b.id] = b.name; });
  var rowRefs = {};

  function buildTable() {
    var body = $('lineRows');
    M.LINES.forEach(function (ln) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<th scope="row" data-label="Breaker"><button type="button" class="brk-btn" data-id="' + ln.id + '">' +
          '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="12" height="12"/></svg>' +
          '<span class="brk-id">' + ln.id + '</span><span class="brk-state"></span></button></th>' +
        '<td data-label="Path">' + BUS_NAME[ln.from] + ' to ' + BUS_NAME[ln.to] + ' <span class="kv-tag">' + ln.kv + ' kV</span></td>' +
        '<td class="num" data-label="Flow"><span class="c-flow"></span></td>' +
        '<td data-label="Loading"><span class="load-meter"><i></i></span><span class="c-load"></span></td>' +
        '<td data-label="If it opened alone" class="c-cont"></td>';
      body.appendChild(tr);
      rowRefs[ln.id] = {
        tr: tr,
        btn: tr.querySelector('.brk-btn'),
        state: tr.querySelector('.brk-state'),
        flow: tr.querySelector('.c-flow'),
        meter: tr.querySelector('.load-meter i'),
        load: tr.querySelector('.c-load'),
        cont: tr.querySelector('.c-cont')
      };
    });
    body.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.brk-btn') : null;
      if (b) toggle(b.getAttribute('data-id'), true);
    });
  }

  /* ---- log ---- */

  function stamp() {
    var s = Math.floor((Date.now() - t0) / 1000);
    var m = Math.floor(s / 60);
    s = s % 60;
    return 'T+' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function log(text, kind) {
    var li = document.createElement('li');
    if (kind) li.className = kind;
    var t = document.createElement('time');
    t.textContent = stamp();
    li.appendChild(t);
    li.appendChild(document.createTextNode(' ' + text));
    var ol = $('log');
    ol.insertBefore(li, ol.firstChild);
    while (ol.children.length > 40) ol.removeChild(ol.lastChild);
  }

  /* ---- actions ---- */

  function toggle(id, byUser) {
    var wasOpen = !!state.open[id];
    delete tripped[id];
    if (wasOpen) delete state.open[id]; else state.open[id] = true;
    log(id + (wasOpen ? ' closed' : ' opened') + (byUser ? ' by operator' : ''), wasOpen ? 'info' : 'act');
    evaluate();
  }

  function applyScenario(name) {
    var sets = { tie: ['CB-103'], coast: ['CB-202'], pulangi: ['CB-102'] };
    var titles = { tie: 'the 138 kV tie', coast: 'the Opol to Carmen section', pulangi: 'the Pulangi IV connection' };
    state.open = {};
    tripped = {};
    sets[name].forEach(function (id) { state.open[id] = true; });
    log('Reset, then opened ' + sets[name].join(', ') + ' (' + titles[name] + ')', 'act');
    evaluate();
  }

  function reset() {
    state.open = {};
    tripped = {};
    log('All breakers closed', 'info');
    evaluate();
  }

  /* ---- evaluate and render ---- */

  function evaluate() {
    clearTimeout(timer);
    timer = null;
    result = M.solve(state);
    render();

    var unserved = result.unserved;
    if (Math.abs(unserved - lastUnserved) > 0.5) {
      log(unserved > 0.5
        ? 'Unserved load is now ' + fmt(unserved) + ' MW of ' + fmt(result.demand) + ' MW'
        : 'All load served again', unserved > 0.5 ? 'warn' : 'info');
      lastUnserved = unserved;
    }

    var next = M.nextOverload(result);
    if (next && state.protect) {
      timer = setTimeout(function () {
        var r = M.solve(state);
        var again = M.nextOverload(r);
        if (!again) { evaluate(); return; }
        log(again + ' carries ' + pct(r.lines[again].loading) + '% of its rating; overload protection opens it', 'warn');
        state.open[again] = true;
        tripped[again] = true;
        evaluate();
      }, TRIP_DELAY);
    }
  }

  function render() {
    var r = result;

    M.LINES.forEach(function (ln) {
      var q = r.lines[ln.id], ref = refs.lines[ln.id], row = rowRefs[ln.id];
      var cls = 'line kv' + ln.kv + (q.live ? ' live' : ' dead') + (q.over ? ' over' : '') + (q.closed ? '' : ' isopen');
      ref.base.parentNode.setAttribute('class', cls);
      var speed = q.live ? Math.max(0.5, 1.6 - q.loading) : 0;
      ref.flow.style.animationDuration = speed + 's';
      ref.flow.classList.toggle('rev', q.flow < 0);
      ref.brk.setAttribute('class', 'breaker ' + (q.closed ? 'closed' : 'open') + (q.over ? ' over' : ''));
      ref.brk.setAttribute('aria-label', ln.id + ', ' + BUS_NAME[ln.from] + ' to ' + BUS_NAME[ln.to] + ', ' +
        (q.closed ? 'closed, ' + fmt(Math.abs(q.flow)) + ' megawatts, ' + pct(q.loading) + ' percent of rating. Activate to open.' : 'open. Activate to close.'));
      ref.lab.setAttribute('class', 'tag' + (q.over ? ' over' : '') + (q.closed ? '' : ' isopen') + (q.closed && !q.live ? ' dead' : '') + (!q.closed && tripped[ln.id] ? ' tripped' : ''));

      var flowing = q.closed && q.live && Math.abs(q.flow) >= 0.5;
      ref.labArrow.style.display = flowing ? '' : 'none';
      ref.labArrow.setAttribute('transform', 'translate(-30,6) rotate(' + (q.flow >= 0 ? ref.angle : ref.angle + 180) + ')');
      ref.labVal.setAttribute('x', flowing ? -17 : -30);
      if (!q.closed) ref.labVal.textContent = tripped[ln.id] ? 'tripped' : 'open';
      else if (!q.live) ref.labVal.textContent = 'dead';
      else ref.labVal.textContent = fmt(Math.abs(q.flow)) + ' MW';

      var pr = ref.brk.parentNode;
      row.btn.setAttribute('aria-pressed', q.closed ? 'false' : 'true');
      row.btn.setAttribute('aria-label', ln.id + ' is ' + (q.closed ? 'closed. Open it.' : 'open. Close it.'));
      row.btn.className = 'brk-btn ' + (q.closed ? 'closed' : 'open');
      row.state.textContent = q.closed ? 'closed' : tripped[ln.id] ? 'tripped' : 'open';
      row.flow.textContent = !q.closed ? '—' : !q.live ? 'dead' : fmt(Math.abs(q.flow)) + ' MW';
      row.load.textContent = !q.live ? '' : pct(q.loading) + '% of ' + ln.rating;
      row.meter.style.width = Math.min(100, pct(q.loading)) + '%';
      row.meter.parentNode.className = 'load-meter' + (q.over ? ' over' : q.loading > 0.8 ? ' high' : '');
      row.tr.className = q.over ? 'over' : '';
    });

    M.BUSES.forEach(function (bus) {
      var b = r.buses[bus.id], ref = refs.buses[bus.id];
      ref.g.setAttribute('class', 'bus ' + bus.kind + (b.live ? '' : ' dead') + (b.unserved > 0.5 && b.live ? ' short' : ''));
      if (bus.kind === 'gen') {
        ref.val.textContent = r.islands[b.island].buses.length === 1
          ? 'offline' : fmt(b.gen) + ' / ' + bus.cap + ' MW';
      } else if (!b.live) {
        ref.val.textContent = fmt(b.load) + ' MW lost';
      } else if (b.unserved > 0.5) {
        ref.val.textContent = fmt(b.served) + ' of ' + fmt(b.load) + ' MW';
      } else {
        ref.val.textContent = fmt(b.load) + ' MW';
      }
    });

    /* contingency column */
    var cont = M.contingencies(state);
    M.LINES.forEach(function (ln) {
      var cell = rowRefs[ln.id].cont, c = cont[ln.id];
      if (!c) { cell.textContent = 'Already open'; cell.className = 'c-cont muted'; return; }
      if (c.verdict === 'ok') { cell.textContent = 'No overload, nothing lost'; cell.className = 'c-cont ok'; }
      else if (c.verdict === 'overload') { cell.textContent = 'Overloads ' + c.worstId + ' at ' + pct(c.worst) + '%'; cell.className = 'c-cont warn'; }
      else { cell.textContent = 'Loses ' + fmt(c.unserved) + ' MW of load'; cell.className = 'c-cont bad'; }
    });

    /* readouts */
    $('rDemand').textContent = fmt(r.demand) + ' MW';
    $('rServed').textContent = fmt(r.served) + ' MW';
    $('rUnserved').textContent = fmt(r.unserved) + ' MW';
    $('rUnserved').parentNode.className = 'r-un' + (r.unserved > 0.5 ? ' bad' : '');
    [['Agus', 'AGUS', 158], ['Pul', 'PUL', 255]].forEach(function (g) {
      var out = r.buses[g[1]].gen;
      $('val' + g[0]).textContent = fmt(out) + ' / ' + g[2] + ' MW';
      $('bar' + g[0]).style.width = Math.min(100, out / g[2] * 100) + '%';
    });

    renderStatus();
  }

  function renderStatus() {
    var r = result, box = $('status'), txt = $('statusText');
    var overIds = M.LINES.filter(function (l) { return r.lines[l.id].closed && r.lines[l.id].over; });
    var over = overIds.map(function (l) { return l.id + ' at ' + pct(r.lines[l.id].loading) + '%'; });
    var dead = M.BUSES.filter(function (b) { return b.kind === 'load' && !r.buses[b.id].live; })
      .map(function (b) { return b.name; });
    var shed = M.BUSES.some(function (b) { return r.buses[b.id].live && r.buses[b.id].unserved > 0.5; });
    var guard = state.protect ? ' Overload protection opens it in a moment.' : ' Protection is off, so it stays closed.';

    var state_, msg;
    if (r.unserved > 0.5) {
      state_ = 'bad';
      msg = fmt(r.unserved) + ' MW of ' + fmt(r.demand) + ' MW is not being served.';
      if (dead.length) msg += ' No source reaches ' + list(dead) + '.';
      if (shed) msg += ' A separated island is short of generation, so its load is shed pro rata.';
      if (over.length) msg += ' Over rating: ' + list(over) + '.';
    } else if (over.length) {
      state_ = 'warn';
      msg = (over.length === 1 ? overIds[0].id + ' is carrying ' + pct(r.lines[overIds[0].id].loading) + '% of its rating.'
                               : 'Over rating: ' + list(over) + '.') + guard;
    } else {
      state_ = 'ok';
      var openN = M.LINES.filter(function (l) { return state.open[l.id]; }).length;
      msg = 'All ' + fmt(r.demand) + ' MW served, every line within its rating.' + (openN ? ' ' + openN + (openN === 1 ? ' breaker is' : ' breakers are') + ' open.' : ' Every breaker is closed.');
    }
    box.setAttribute('data-state', state_);
    txt.textContent = msg;
  }

  function list(a) {
    if (a.length < 2) return a[0] || '';
    return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
  }

  /* ---- wiring ---- */

  function layoutFor() { return mq.matches ? 'tall' : 'wide'; }

  function relayout() {
    var name = layoutFor();
    if (name === layoutName) return;
    build(name);
    if (result) render();
  }

  function init() {
    buildTable();
    build(layoutFor());

    var demand = $('demand');
    demand.addEventListener('input', function () {
      state.scale = demand.value / 100;
      var total = BASE_MW * state.scale;
      $('demandOut').textContent = demand.value + '% · ' + fmt(total) + ' MW';
      evaluate();
    });
    demand.addEventListener('change', function () {
      log('Demand set to ' + demand.value + '% (' + fmt(BASE_MW * state.scale) + ' MW)', 'info');
    });
    $('protect').addEventListener('change', function (e) {
      state.protect = e.target.checked;
      log('Overload protection ' + (state.protect ? 'on' : 'off'), 'info');
      evaluate();
    });
    $('reset').addEventListener('click', reset);
    Array.prototype.forEach.call(document.querySelectorAll('[data-scenario]'), function (b) {
      b.addEventListener('click', function () { applyScenario(b.getAttribute('data-scenario')); });
    });

    if (mq.addEventListener) mq.addEventListener('change', relayout);
    else if (mq.addListener) mq.addListener(relayout);

    log('Board ready. All breakers closed, demand 295 MW', 'info');
    evaluate();
  }

  init();
})();
