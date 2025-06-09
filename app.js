// Mindanao Grid Mesh — SCADA Telemetry & Contingency Engine

const SUBSTATIONS = {
  "cdo-lugait": {
    tag: "138kV / 69kV BULK SUBSTATION • REGIONAL INDUSTRIAL CORRIDOR",
    title: "Lugait Substation (138kV / 69kV)",
    geo: "Misamis Oriental Border • Intertied to Agus-Pulangi Grid • 8°20'N 124°15'E",
    voltage: "137.8 kV",
    power: "84.2 MW",
    pf: "0.96 Lag",
    temp: "58.4 °C",
    feeders: [
      { name: "Feeder 1: Holcim Cement Industrial Complex", kv: "69kV Dedicated", mw: "42.5 MW" },
      { name: "Feeder 2: Manticao Rural Electric Co-op (MORESCO-I)", kv: "69kV Distribution", mw: "24.1 MW" },
      { name: "Feeder 3: Lugait Municipal Light & Commercial", kv: "13.8kV Step-down", mw: "17.6 MW" }
    ]
  },
  "cdo-cugman": {
    tag: "69kV / 13.8kV DISTRIBUTION HUB • CDO CENTRAL METRO",
    title: "Cugman 69kV Substation (CEPALCO Intertie)",
    geo: "Cagayan de Oro East • Industrial & Commercial Feeders • 8°28'N 124°41'E",
    voltage: "68.9 kV",
    power: "46.4 MW",
    pf: "0.98 Lag",
    temp: "51.2 °C",
    feeders: [
      { name: "Feeder 1: Gaisano & Limketkai Commercial Ring", kv: "13.8kV Loop", mw: "18.2 MW" },
      { name: "Feeder 2: Cugman Industrial Canning & Processing", kv: "13.8kV Dedicated", mw: "16.4 MW" },
      { name: "Feeder 3: Tablon Residential & Light Commercial", kv: "13.8kV Distribution", mw: "11.8 MW" }
    ]
  },
  "cdo-carmen": {
    tag: "69kV / 13.8kV PRIMARY URBAN STEP-DOWN • CDO WEST",
    title: "Carmen 69kV Substation (CDO Urban Hub)",
    geo: "Barangay Carmen • Cagayan de Oro Riverbank Reach • 8°29'N 124°38'E",
    voltage: "69.1 kV",
    power: "62.8 MW",
    pf: "0.97 Lag",
    temp: "54.7 °C",
    feeders: [
      { name: "Feeder 1: Carmen Commercial & City Hall Grid", kv: "13.8kV Feeder", mw: "26.4 MW" },
      { name: "Feeder 2: Macasandig & Riverfront District", kv: "13.8kV Feeder", mw: "21.5 MW" },
      { name: "Feeder 3: Kauswagan Medical & Civic Corridor", kv: "13.8kV Critical", mw: "14.9 MW" }
    ]
  },
  "agus-4": {
    tag: "RUN-OF-RIVER HYDROPOWER GENERATING STATION • NPC / PSALM",
    title: "Agus IV Hydroelectric Power Plant",
    geo: "Balo-i, Lanao del Norte • Agus River Hydro Cascade • 8°09'N 124°12'E",
    voltage: "138.4 kV",
    power: "158.0 MW",
    pf: "0.99 Lead",
    temp: "44.1 °C",
    feeders: [
      { name: "Generator 1: Francis Turbine Runner 52.6 MW", kv: "13.8kV Gen Bus", mw: "52.6 MW" },
      { name: "Generator 2: Francis Turbine Runner 52.6 MW", kv: "13.8kV Gen Bus", mw: "52.6 MW" },
      { name: "Generator 3: Francis Turbine Runner 52.8 MW", kv: "13.8kV Gen Bus", mw: "52.8 MW" }
    ]
  },
  "pulangi-4": {
    tag: "RUN-OF-RIVER RESERVOIR HYDRO GENERATING FACILITY",
    title: "Pulangi IV Hydroelectric Power Station",
    geo: "Maramag, Bukidnon • Pulangi River Basin • 7°48'N 125°02'E",
    voltage: "138.6 kV",
    power: "255.0 MW",
    pf: "0.99 Lead",
    temp: "42.8 °C",
    feeders: [
      { name: "Unit 1: Vertical Francis Hydropower Turbine", kv: "13.8kV Gen Bus", mw: "85.0 MW" },
      { name: "Unit 2: Vertical Francis Hydropower Turbine", kv: "13.8kV Gen Bus", mw: "85.0 MW" },
      { name: "Unit 3: Vertical Francis Hydropower Turbine", kv: "13.8kV Gen Bus", mw: "85.0 MW" }
    ]
  },
  "tagoloan": {
    tag: "138kV EXTRA HIGH DENSITY HEAVY INDUSTRIAL STEP-DOWN",
    title: "PHIVIDEC Tagoloan 138kV Substation",
    geo: "PHIVIDEC Industrial Authority • Tagoloan, Misamis Oriental • 8°32'N 124°45'E",
    voltage: "137.9 kV",
    power: "112.4 MW",
    pf: "0.94 Lag",
    temp: "62.1 °C",
    feeders: [
      { name: "Feeder 1: Mindanao International Container Terminal", kv: "69kV Dedicated", mw: "38.2 MW" },
      { name: "Feeder 2: FDC Misamis Coal Baseload Intertie", kv: "138kV Trunk", mw: "44.0 MW" },
      { name: "Feeder 3: Heavy Steel Mill & Chemical Manufacturing", kv: "69kV Dedicated", mw: "30.2 MW" }
    ]
  },
  "opol": {
    tag: "69kV SUB-TRANSMISSION & MUNICIPAL FEEDER",
    title: "Opol 69kV Substation (MORESCO-I)",
    geo: "Opol Coastal Sub-transmission • Western Misamis Oriental • 8°31'N 124°34'E",
    voltage: "68.8 kV",
    power: "28.5 MW",
    pf: "0.96 Lag",
    temp: "48.9 °C",
    feeders: [
      { name: "Feeder 1: Opol Poblacion & Commercial Center", kv: "13.8kV Distribution", mw: "12.4 MW" },
      { name: "Feeder 2: Barra & Bulua Intertie Boundary", kv: "13.8kV Tie", mw: "9.8 MW" },
      { name: "Feeder 3: Coastal Agro-processing & Cold Storage", kv: "13.8kV Industrial", mw: "6.3 MW" }
    ]
  }
};

let currentSubstationKey = "cdo-lugait";
let isTripped = false;

document.addEventListener("DOMContentLoaded", () => {
  renderSubstation(currentSubstationKey);
  initFrequencyDrift();
});

// Frequency Jitter Simulation (Authentic SCADA behavior: 59.97 - 60.03 Hz)
function initFrequencyDrift() {
  const freqEl = document.getElementById("sysFreq");
  setInterval(() => {
    if (!isTripped) {
      const delta = (Math.random() * 0.06 - 0.03);
      const val = (60.00 + delta).toFixed(2);
      freqEl.innerText = `${val} Hz`;
    }
  }, 2200);
}

// Select Substation Node
function selectSubstation(key, btnEl) {
  currentSubstationKey = key;

  // Update carousel chip
  document.querySelectorAll(".node-chip").forEach(c => c.classList.remove("active"));
  if (btnEl) {
    btnEl.classList.add("active");
  } else {
    const matchingBtn = Array.from(document.querySelectorAll(".node-chip")).find(b => 
      b.getAttribute("onclick") && b.getAttribute("onclick").includes(key)
    );
    if (matchingBtn) matchingBtn.classList.add("active");
  }

  // Update SVG node highlight
  document.querySelectorAll(".substation-node").forEach(n => n.classList.remove("active"));
  const svgNode = document.getElementById(`sub-${key}`);
  if (svgNode) svgNode.classList.add("active");

  renderSubstation(key);
}

// Render Telemetry Details
function renderSubstation(key) {
  const data = SUBSTATIONS[key];
  if (!data) return;

  document.getElementById("substationTag").innerText = data.tag;
  document.getElementById("substationTitle").innerText = data.title;
  document.getElementById("substationGeo").innerText = data.geo;
  document.getElementById("gVoltage").innerText = data.voltage;
  document.getElementById("gPower").innerText = data.power;
  document.getElementById("gPF").innerText = data.pf;
  document.getElementById("gTemp").innerText = data.temp;

  const feedersEl = document.getElementById("feedersList");
  feedersEl.innerHTML = data.feeders.map(f => `
    <div class="feeder-item">
      <div class="feeder-info">
        <h5>${f.name}</h5>
        <span>${f.kv}</span>
      </div>
      <span class="feeder-mw">${f.mw}</span>
    </div>
  `).join("");
}

// Contingency Islanding Simulator (N-1 Event)
function toggleLineTrip() {
  isTripped = true;
  const statusPill = document.getElementById("gridStatusPill");
  const freqEl = document.getElementById("sysFreq");
  const logEl = document.getElementById("contingencyLog");
  const breakerPoints = document.querySelectorAll(".breaker-point");

  // Breaker status trip
  breakerPoints.forEach(b => {
    b.classList.remove("breaker-closed");
    b.classList.add("breaker-open");
  });

  statusPill.innerText = "ISLANDED (N-1 FAULT)";
  statusPill.classList.remove("status-normal");
  statusPill.classList.add("status-tripped");

  freqEl.innerText = "59.42 Hz (UF TRIP RISK)";
  freqEl.classList.remove("text-ok");
  freqEl.classList.add("text-trip");

  const now = new Date().toTimeString().split(" ")[0];
  logEl.innerHTML = `
    <div class="log-entry" style="color: #ef4444;"><strong>${now}</strong> &bull; [ALARM] 138kV Agus Trunk Overcurrent Trip (Relay 50/51).</div>
    <div class="log-entry" style="color: #f59e0b;"><strong>${now}</strong> &bull; Under-frequency load-shedding stage 1 activated (-42 MW).</div>
    <div class="log-entry" style="color: #38bdf8;"><strong>${now}</strong> &bull; Pulangi IV governor ramping spinning reserve to +78 MW.</div>
  ` + logEl.innerHTML;
}

function restoreGridState() {
  isTripped = false;
  const statusPill = document.getElementById("gridStatusPill");
  const freqEl = document.getElementById("sysFreq");
  const logEl = document.getElementById("contingencyLog");
  const breakerPoints = document.querySelectorAll(".breaker-point");

  breakerPoints.forEach(b => {
    b.classList.remove("breaker-open");
    b.classList.add("breaker-closed");
  });

  statusPill.innerText = "Grid Synchronized";
  statusPill.classList.remove("status-tripped");
  statusPill.classList.add("status-normal");

  freqEl.innerText = "59.98 Hz";
  freqEl.classList.remove("text-trip");
  freqEl.classList.add("text-ok");

  const now = new Date().toTimeString().split(" ")[0];
  logEl.innerHTML = `
    <div class="log-entry" style="color: #10b981;"><strong>${now}</strong> &bull; [RESTORED] Breakers reclosed; synchronoscope in phase.</div>
  ` + logEl.innerHTML;
}
