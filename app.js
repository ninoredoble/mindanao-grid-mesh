// Mindanao Grid Mesh - Industrial Mimic Board & High-Voltage Grid Physics Engine
// Character Encoding: 100% 7-Bit ASCII - Clean Typography & SCADA Accuracy

const SUBSTATIONS = {
  "cdo-lugait": {
    kicker: "138kV / 69kV BULK SUBSTATION // HEAVY INDUSTRIAL",
    title: "Lugait Substation (138kV / 69kV)",
    coords: "Misamis Oriental Border // Agus-Pulangi Intertie // 8 deg 20'N 124 deg 15'E",
    nominalVolt: 138.0,
    baseLoadMW: 84.2,
    basePF: 0.96,
    baseTemp: 58.4,
    breakerId: "brk-lugait",
    busLevel: 138,
    isGenerator: false,
    feeders: [
      { name: "Holcim Cement Heavy Industrial Trunk", cls: "69kV Dedicated", mw: 42.5, uflsStage: 1 },
      { name: "Manticao Rural Co-op (MORESCO-I)", cls: "69kV Sub-Tx", mw: 24.1, uflsStage: 2 },
      { name: "Lugait Municipal Light & Power", cls: "13.8kV Feeder", mw: 17.6, uflsStage: 0 }
    ]
  },
  "cdo-carmen": {
    kicker: "69kV / 13.8kV PRIMARY URBAN STEP-DOWN // CDO WEST",
    title: "Carmen 69kV Substation (CDO Urban Hub)",
    coords: "Barangay Carmen // Cagayan de Oro Riverbank // 8 deg 29'N 124 deg 38'E",
    nominalVolt: 69.0,
    baseLoadMW: 62.8,
    basePF: 0.97,
    baseTemp: 54.7,
    breakerId: "brk-carmen",
    busLevel: 69,
    isGenerator: false,
    feeders: [
      { name: "Carmen Commercial & City Hall Grid", cls: "13.8kV Feeder", mw: 26.4, uflsStage: 0 },
      { name: "Macasandig & Riverfront District", cls: "13.8kV Feeder", mw: 21.5, uflsStage: 0 },
      { name: "Kauswagan Medical & Civic Corridor", cls: "13.8kV Critical", mw: 14.9, uflsStage: 0 }
    ]
  },
  "cdo-cugman": {
    kicker: "69kV / 13.8kV DISTRIBUTION HUB // CDO EAST",
    title: "Cugman 69kV Substation (CDO East Intertie)",
    coords: "Cagayan de Oro East // Industrial & Commercial Feeders // 8 deg 28'N 124 deg 41'E",
    nominalVolt: 69.0,
    baseLoadMW: 46.4,
    basePF: 0.98,
    baseTemp: 51.2,
    breakerId: "brk-cugman",
    busLevel: 69,
    isGenerator: false,
    feeders: [
      { name: "Limketkai Commercial Mall Ring", cls: "13.8kV Loop", mw: 18.2, uflsStage: 0 },
      { name: "Cugman Industrial Food Processing", cls: "13.8kV Dedicated", mw: 16.4, uflsStage: 1 },
      { name: "Tablon Residential Feeder", cls: "13.8kV Distribution", mw: 11.8, uflsStage: 0 }
    ]
  },
  "agus-4": {
    kicker: "RUN-OF-RIVER HYDROPOWER GENERATING STATION",
    title: "Agus IV Hydroelectric Power Plant",
    coords: "Balo-i, Lanao del Norte // Agus River Cascade // 8 deg 09'N 124 deg 12'E",
    nominalVolt: 138.0,
    baseLoadMW: 158.0,
    basePF: 0.99,
    baseTemp: 44.1,
    breakerId: "brk-agus",
    busLevel: 138,
    isGenerator: true,
    feeders: [
      { name: "Unit 1: Francis Turbine Runner 52.6 MW", cls: "13.8kV Bus", mw: 52.6, uflsStage: 0 },
      { name: "Unit 2: Francis Turbine Runner 52.6 MW", cls: "13.8kV Bus", mw: 52.6, uflsStage: 0 },
      { name: "Unit 3: Francis Turbine Runner 52.8 MW", cls: "13.8kV Bus", mw: 52.8, uflsStage: 0 }
    ]
  },
  "pulangi-4": {
    kicker: "RESERVOIR HYDRO GENERATING FACILITY",
    title: "Pulangi IV Hydroelectric Power Station",
    coords: "Maramag, Bukidnon // Pulangi River Basin // 7 deg 48'N 125 deg 02'E",
    nominalVolt: 138.0,
    baseLoadMW: 255.0,
    basePF: 0.99,
    baseTemp: 42.8,
    breakerId: "brk-pulangi",
    busLevel: 138,
    isGenerator: true,
    feeders: [
      { name: "Unit 1: Vertical Francis Hydropower Turbine", cls: "13.8kV Bus", mw: 85.0, uflsStage: 0 },
      { name: "Unit 2: Vertical Francis Hydropower Turbine", cls: "13.8kV Bus", mw: 85.0, uflsStage: 0 },
      { name: "Unit 3: Vertical Francis Hydropower Turbine", cls: "13.8kV Bus", mw: 85.0, uflsStage: 0 }
    ]
  },
  "tagoloan": {
    kicker: "138kV EXTRA HIGH DENSITY HEAVY INDUSTRIAL STEP-DOWN",
    title: "PHIVIDEC Tagoloan 138kV Substation",
    coords: "PHIVIDEC Industrial Authority // Tagoloan // 8 deg 32'N 124 deg 45'E",
    nominalVolt: 138.0,
    baseLoadMW: 112.4,
    basePF: 0.94,
    baseTemp: 62.1,
    breakerId: "brk-tagoloan",
    busLevel: 138,
    isGenerator: false,
    feeders: [
      { name: "Mindanao International Container Terminal", cls: "69kV Dedicated", mw: 38.2, uflsStage: 0 },
      { name: "Heavy Steel Rolling & Smelter Mill", cls: "69kV Dedicated", mw: 30.2, uflsStage: 1 },
      { name: "PHIVIDEC Agro-Industrial Feeder", cls: "13.8kV Dedicated", mw: 44.0, uflsStage: 2 }
    ]
  },
  "opol": {
    kicker: "69kV SUB-TRANSMISSION & MUNICIPAL FEEDER",
    title: "Opol 69kV Substation (MORESCO-I)",
    coords: "Opol Coastal Sub-transmission // 8 deg 31'N 124 deg 34'E",
    nominalVolt: 69.0,
    baseLoadMW: 28.5,
    basePF: 0.96,
    baseTemp: 48.9,
    breakerId: "brk-opol",
    busLevel: 69,
    isGenerator: false,
    feeders: [
      { name: "Opol Poblacion Commercial Feeder", cls: "13.8kV Feeder", mw: 12.4, uflsStage: 0 },
      { name: "Barra & Bulua Boundary Tie", cls: "13.8kV Tie", mw: 9.8, uflsStage: 2 },
      { name: "Coastal Agro-Cold Storage", cls: "13.8kV Feeder", mw: 6.3, uflsStage: 0 }
    ]
  }
};

// State Variables
let currentSubKey = "cdo-lugait";
let breakers = {
  "brk-agus": true,
  "brk-lugait": true,
  "brk-tagoloan": true,
  "brk-pulangi": true,
  "brk-opol": true,
  "brk-carmen": true,
  "brk-cugman": true
};

let main138TrunkClosed = true;
let agusDispatchMW = 158.0;
let pulangiDispatchMW = 255.0;
let demandScale = 0.85; // Default: 85% normal day load
let systemFreq = 60.00;
let ufls1Active = false;
let ufls2Active = false;
let blackoutLockout = false;

// Physics Simulation Loop
document.addEventListener("DOMContentLoaded", () => {
  renderSubstation(currentSubKey);
  recalculateGridPhysics();
  setInterval(gridPhysicsTick, 1500);
});

// Periodic Physics Jitter & Auto-Governor Tracking
function gridPhysicsTick() {
  if (blackoutLockout) return;
  // Natural micro-jitter: +/- 0.02 Hz
  const jitter = (Math.random() * 0.04 - 0.02);
  recalculateGridPhysics(jitter);
}

// Recalculate Complete Grid Topology, Load Flow, and Frequency
function recalculateGridPhysics(microJitter = 0.0) {
  const tape = document.getElementById("printerTape");
  const now = new Date().toTimeString().split(" ")[0];

  // 1. Determine which generators are connected to 138kV bus
  const agusOnline = breakers["brk-agus"] && main138TrunkClosed;
  const pulangiOnline = breakers["brk-pulangi"] && main138TrunkClosed;

  const totalGenMW = (agusOnline ? agusDispatchMW : 0) + (pulangiOnline ? pulangiDispatchMW : 0);

  // 2. Determine which substations are energized
  // 138kV bus is energized if at least one generator is connected
  const bus138Energized = (agusOnline || pulangiOnline);

  // 69kV ring is energized if 138kV bus is energized and tie lines exist
  const bus69Energized = bus138Energized && main138TrunkClosed;

  // Substation energization map
  const energizedStatus = {};
  for (const [key, data] of Object.entries(SUBSTATIONS)) {
    if (data.isGenerator) {
      energizedStatus[key] = breakers[data.breakerId];
    } else if (data.busLevel === 138) {
      energizedStatus[key] = bus138Energized && breakers[data.breakerId];
    } else {
      energizedStatus[key] = bus69Energized && breakers[data.breakerId];
    }
  }

  // 3. Compute Connected Demand & Apply UFLS
  let baseDemandMW = 0;
  for (const [key, data] of Object.entries(SUBSTATIONS)) {
    if (!data.isGenerator && energizedStatus[key]) {
      let subLoad = 0;
      data.feeders.forEach(f => {
        let feederActive = true;
        if (ufls1Active && f.uflsStage === 1) feederActive = false;
        if (ufls2Active && f.uflsStage === 2) feederActive = false;
        if (feederActive) subLoad += f.mw * demandScale;
      });
      baseDemandMW += subLoad;
    }
  }

  // 4. Frequency Swing Equation:
  // Generation vs Demand imbalance
  const deltaP = totalGenMW - baseDemandMW;

  let targetFreq = 60.00;
  if (totalGenMW === 0 && baseDemandMW > 0) {
    targetFreq = 58.00; // Complete blackout
  } else if (totalGenMW > 0) {
    // 100 MW deficit drops freq by ~0.65 Hz
    const freqOffset = deltaP / 160.0;
    targetFreq = Math.max(58.2, Math.min(61.2, 60.00 + freqOffset));
  } else {
    targetFreq = 60.00;
  }

  systemFreq = parseFloat((targetFreq + microJitter).toFixed(2));

  // 5. Automatic Under-Frequency Load Shedding (UFLS) Logic
  if (systemFreq < 59.50 && !ufls1Active && !blackoutLockout && totalGenMW > 0) {
    ufls1Active = true;
    logSCADA(`[ANSI 81L UFLS STAGE 1 TRIPPED] System freq ${systemFreq} Hz < 59.50 Hz threshold. Shed 89.1 MW heavy industrial feeders!`, "tape-warn");
    recalculateGridPhysics(0);
    return;
  }

  if (systemFreq < 59.20 && !ufls2Active && !blackoutLockout && totalGenMW > 0) {
    ufls2Active = true;
    logSCADA(`[ANSI 81L UFLS STAGE 2 TRIPPED] System freq ${systemFreq} Hz < 59.20 Hz critical. Shed 77.9 MW secondary municipal feeders!`, "tape-alert");
    recalculateGridPhysics(0);
    return;
  }

  if (systemFreq <= 58.40 && !blackoutLockout && baseDemandMW > 0) {
    blackoutLockout = true;
    logSCADA(`[ANSI 81U CATASTROPHIC BLACKOUT] System frequency collapsed to ${systemFreq} Hz. Cascade anti-islanding lockout executed.`, "tape-alert");
    main138TrunkClosed = false;
    for (let b in breakers) breakers[b] = false;
    updateBreakerVisuals();
  }

  // 6. Update Analog Meter & Synchronoscope Needle
  const needle = document.getElementById("analogNeedle");
  const ledFreq = document.getElementById("ledFreq");
  const fasciaFreq = document.getElementById("fasciaFreq");

  if (needle && ledFreq) {
    const angle = (systemFreq - 60.00) * 30.0;
    needle.style.transform = `rotate(${Math.max(-55, Math.min(55, angle))}deg)`;
    ledFreq.innerText = `${systemFreq.toFixed(2)} Hz`;
    if (fasciaFreq) fasciaFreq.innerText = `SYSTEM FREQ: ${systemFreq.toFixed(2)} Hz`;

    ledFreq.classList.remove("alert-freq", "warn-freq");
    if (systemFreq < 59.50 || systemFreq > 60.50) {
      ledFreq.classList.add("alert-freq");
    } else if (systemFreq < 59.90 || systemFreq > 60.10) {
      ledFreq.classList.add("warn-freq");
    }
  }

  // 7. Update Annunciators
  updateAnnunciators(bus138Energized, bus69Energized, energizedStatus);

  // 8. Update Busbars on SVG
  updateSVGVisuals(bus138Energized, bus69Energized, energizedStatus);

  // 9. Update Active Substation Bay Info
  renderSubstation(currentSubKey);
}

// Update Annunciator Lamps
function updateAnnunciators(bus138Energized, bus69Energized, energizedStatus) {
  const annSync = document.getElementById("annSync");
  const annTrip = document.getElementById("annTrip");
  const annUfls1 = document.getElementById("annUfls1");
  const annUfls2 = document.getElementById("annUfls2");
  const annHydro = document.getElementById("annHydro");
  const annDeenergized = document.getElementById("annDeenergized");
  const boardStatus = document.getElementById("boardStatusTxt");

  const anyTripped = Object.values(breakers).some(b => !b) || !main138TrunkClosed;
  const anyDeenergized = Object.values(energizedStatus).some(e => !e);
  const hydroOnline = (breakers["brk-agus"] || breakers["brk-pulangi"]) && bus138Energized;

  // Grid Sync
  if (Math.abs(systemFreq - 60.00) <= 0.08 && !anyTripped && !blackoutLockout) {
    annSync.className = "annunciator-box lamp-active-green";
  } else {
    annSync.className = "annunciator-box";
  }

  // Trip Relay
  if (anyTripped || blackoutLockout) {
    annTrip.className = "annunciator-box lamp-active-red";
  } else {
    annTrip.className = "annunciator-box";
  }

  // UFLS 1 & 2
  annUfls1.className = ufls1Active ? "annunciator-box lamp-active-amber" : "annunciator-box";
  annUfls2.className = ufls2Active ? "annunciator-box lamp-active-red" : "annunciator-box";

  // Hydro Dispatch
  annHydro.className = hydroOnline ? "annunciator-box lamp-active-green" : "annunciator-box";

  // Bus De-energized
  annDeenergized.className = anyDeenergized ? "annunciator-box lamp-active-red" : "annunciator-box";

  // Islanding Status Text
  if (blackoutLockout) {
    boardStatus.innerText = "TOTAL BLACKOUT // LOCKOUT";
    boardStatus.style.color = "#ef4444";
  } else if (anyTripped) {
    boardStatus.innerText = "ISLANDED // CONTINGENCY ROUTE";
    boardStatus.style.color = "#f59e0b";
  } else {
    boardStatus.innerText = "CLOSED LOOP (NORMAL)";
    boardStatus.style.color = "#22c55e";
  }
}

// Update SVG Busbars & Node Styles
function updateSVGVisuals(bus138Energized, bus69Energized, energizedStatus) {
  const bus138 = document.getElementById("bus138");
  const bus69 = document.getElementById("bus69");

  if (bus138) {
    if (bus138Energized) {
      bus138.classList.add("bus-flow-active");
      bus138.classList.remove("bus-dead");
    } else {
      bus138.classList.remove("bus-flow-active");
      bus138.classList.add("bus-dead");
    }
  }

  if (bus69) {
    if (bus69Energized) {
      bus69.classList.add("bus-flow-active");
      bus69.classList.remove("bus-dead");
    } else {
      bus69.classList.remove("bus-flow-active");
      bus69.classList.add("bus-dead");
    }
  }

  // Update node boxes
  for (const [key, data] of Object.entries(SUBSTATIONS)) {
    const nodeEl = document.getElementById(`node-${key}`);
    const isEn = energizedStatus[key];
    if (nodeEl) {
      if (isEn) {
        nodeEl.classList.remove("node-deenergized");
      } else {
        nodeEl.classList.add("node-deenergized");
      }
    }

    // Dynamic subtitle on SVG
    const specEl = document.getElementById(`node-spec-${key.replace("cdo-", "")}`);
    if (specEl) {
      if (!isEn) {
        specEl.textContent = "0.0 MW // DE-ENERGIZED";
      } else if (data.isGenerator) {
        const mw = key === "agus-4" ? agusDispatchMW : pulangiDispatchMW;
        specEl.textContent = `${mw.toFixed(0)} MW // Dispatched`;
      } else {
        let curMW = 0;
        data.feeders.forEach(f => {
          let active = true;
          if (ufls1Active && f.uflsStage === 1) active = false;
          if (ufls2Active && f.uflsStage === 2) active = false;
          if (active) curMW += f.mw * demandScale;
        });
        specEl.textContent = `Load: ${curMW.toFixed(1)} MW // Active`;
      }
    }
  }
}

// Select Substation on Mimic Board
function selectSubstation(key) {
  currentSubKey = key;

  document.querySelectorAll(".mimic-node").forEach(n => n.classList.remove("active-node"));
  const node = document.getElementById(`node-${key}`);
  if (node) node.classList.add("active-node");

  renderSubstation(key);
}

// Render Substation Details in Bay
function renderSubstation(key) {
  const data = SUBSTATIONS[key];
  if (!data) return;

  const isEnergized = checkNodeEnergized(key);

  document.getElementById("bayKicker").innerText = data.kicker;
  document.getElementById("bayTitle").innerText = data.title;
  document.getElementById("bayCoords").innerText = data.coords;

  const valVoltEl = document.getElementById("valVolt");
  const valPowerEl = document.getElementById("valPower");
  const valPFEl = document.getElementById("valPF");
  const valTempEl = document.getElementById("valTemp");

  if (!isEnergized) {
    valVoltEl.innerText = "0.0 kV";
    valPowerEl.innerText = "0.0 MW";
    valPFEl.innerText = "0.00 ZERO";
    valTempEl.innerText = "31.2 deg C";
  } else if (data.isGenerator) {
    const mw = key === "agus-4" ? agusDispatchMW : pulangiDispatchMW;
    valVoltEl.innerText = `${data.nominalVolt.toFixed(1)} kV`;
    valPowerEl.innerText = `${mw.toFixed(1)} MW`;
    valPFEl.innerText = `${data.basePF.toFixed(2)} LEAD`;
    valTempEl.innerText = `${data.baseTemp.toFixed(1)} deg C`;
  } else {
    let subLoad = 0;
    data.feeders.forEach(f => {
      let active = true;
      if (ufls1Active && f.uflsStage === 1) active = false;
      if (ufls2Active && f.uflsStage === 2) active = false;
      if (active) subLoad += f.mw * demandScale;
    });

    const drop = (subLoad / data.baseLoadMW) * 0.4;
    const volt = (data.nominalVolt - drop).toFixed(1);
    valVoltEl.innerText = `${volt} kV`;
    valPowerEl.innerText = `${subLoad.toFixed(1)} MW`;
    valPFEl.innerText = `${data.basePF.toFixed(2)} LAG`;
    valTempEl.innerText = `${(data.baseTemp + drop * 2).toFixed(1)} deg C`;
  }

  // Downstream Feeders Table
  const tbody = document.getElementById("bayFeedersBody");
  tbody.innerHTML = data.feeders.map(f => {
    let shed = false;
    let mwDisplay = `${(f.mw * demandScale).toFixed(1)} MW`;

    if (!isEnergized) {
      shed = true;
      mwDisplay = "OFFLINE";
    } else if (ufls1Active && f.uflsStage === 1) {
      shed = true;
      mwDisplay = "UFLS-1 SHED";
    } else if (ufls2Active && f.uflsStage === 2) {
      shed = true;
      mwDisplay = "UFLS-2 SHED";
    }

    return `
      <tr>
        <td class="${shed ? 'feeder-shed' : ''}">${f.name}</td>
        <td style="color: #64748b;">${f.cls}</td>
        <td class="feeder-mw-col ${shed ? 'feeder-shed' : ''}">${mwDisplay}</td>
      </tr>
    `;
  }).join("");
}

function checkNodeEnergized(key) {
  const data = SUBSTATIONS[key];
  if (!data) return false;
  if (data.isGenerator) return breakers[data.breakerId];

  const agusOnline = breakers["brk-agus"] && main138TrunkClosed;
  const pulangiOnline = breakers["brk-pulangi"] && main138TrunkClosed;
  const bus138Energized = (agusOnline || pulangiOnline);
  const bus69Energized = bus138Energized && main138TrunkClosed;

  if (data.busLevel === 138) {
    return bus138Energized && breakers[data.breakerId];
  } else {
    return bus69Energized && breakers[data.breakerId];
  }
}

// Toggle an Individual Breaker
function toggleSingleBreaker(id) {
  if (blackoutLockout) {
    logSCADA(`[INTERLOCK FAULT] Cannot operate ${id.toUpperCase()}: System in blackout lockout! Run Reclose & Sync.`, "tape-alert");
    return;
  }

  breakers[id] = !breakers[id];
  updateBreakerVisuals();

  if (breakers[id]) {
    logSCADA(`[ANSI 25 SYNCH] Breaker ${id.toUpperCase()} closed and latched. Interconnection energized.`, "tape-ok");
  } else {
    logSCADA(`[ANSI 50/51 OVERCURRENT] Breaker ${id.toUpperCase()} manually opened. Islanding circuit branch.`, "tape-warn");
  }

  recalculateGridPhysics(0);
}

function updateBreakerVisuals() {
  for (let id in breakers) {
    const el = document.getElementById(id);
    if (el) {
      if (breakers[id]) {
        el.classList.remove("brk-open");
        el.classList.add("brk-closed");
      } else {
        el.classList.remove("brk-closed");
        el.classList.add("brk-open");
      }
    }
  }
}

// Trip Main 138kV Trunk (N-1 Contingency Test)
function tripMainTieLine() {
  main138TrunkClosed = false;

  // Trip bulk breakers
  breakers["brk-agus"] = false;
  breakers["brk-pulangi"] = false;
  breakers["brk-lugait"] = false;
  breakers["brk-tagoloan"] = false;

  updateBreakerVisuals();
  logSCADA(`[ANSI 50/51 TRIP RELAY] 138kV Bulk Transmission Trunk overcurrent lockout initiated!`, "tape-alert");
  logSCADA(`[N-1 CONTINGENCY] Generation disconnected from load center. Rapid frequency drop!`, "tape-alert");

  recalculateGridPhysics(0);
}

// Reclose & Synchronize
function recloseTieLine() {
  blackoutLockout = false;
  main138TrunkClosed = true;
  ufls1Active = false;
  ufls2Active = false;

  for (let b in breakers) breakers[b] = true;
  updateBreakerVisuals();

  logSCADA(`[ANSI 25 SYNCHROCHECK IN-PHASE] Phase angle 0.0 deg. All 138kV and 69kV breakers reclosed.`, "tape-ok");
  logSCADA(`[SCADA AGC RESTORED] Normal closed-loop 60.00 Hz dispatch resumed.`, "tape-ok");

  recalculateGridPhysics(0);
}

// Adjust Regional Demand Profile
function setDemandProfile(scale, label, btnEl) {
  demandScale = scale;
  document.querySelectorAll(".demand-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  document.getElementById("demandScaleLabel").innerText = label;

  logSCADA(`[SCADA AGC] Regional demand profile adjusted to ${label}.`, "tape-ok");
  recalculateGridPhysics(0);
}

// Adjust Generation Dispatch
function adjustAgusGeneration(val) {
  agusDispatchMW = parseFloat(val);
  document.getElementById("agusSliderVal").innerText = `${val} MW`;
  recalculateGridPhysics(0);
}

function adjustPulangiGeneration(val) {
  pulangiDispatchMW = parseFloat(val);
  document.getElementById("pulangiSliderVal").innerText = `${val} MW`;
  recalculateGridPhysics(0);
}

// Logger utility
function logSCADA(msg, cls = "tape-ok") {
  const tape = document.getElementById("printerTape");
  if (!tape) return;
  const now = new Date().toTimeString().split(" ")[0];
  const item = document.createElement("div");
  item.className = cls;
  item.innerHTML = `<strong>[${now}]</strong> // ${msg}`;
  tape.insertBefore(item, tape.firstChild);

  // Trim to 40 items max
  while (tape.children.length > 40) {
    tape.removeChild(tape.lastChild);
  }
}

// SCADA Telemetry Export
function exportGridTelemetry() {
  const exportPayload = {
    system: "Mindanao Grid Mesh - 138kV/69kV SCADA System",
    timestamp: new Date().toISOString(),
    frequencyHz: systemFreq,
    islandingStatus: document.getElementById("boardStatusTxt").innerText,
    demandScaleMultiplier: demandScale,
    generationDispatch: {
      agusIV_MW: agusDispatchMW,
      pulangiIV_MW: pulangiDispatchMW
    },
    breakerStatus: breakers,
    substations: SUBSTATIONS,
    ufls1_Active: ufls1Active,
    ufls2_Active: ufls2Active
  };

  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", jsonStr);
  downloadAnchor.setAttribute("download", `mindanao_grid_scada_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}