// Mindanao Grid Mesh — Clean Industrial Telemetry Engine

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
      { name: "Holcim Cement Industrial Feeder", kv: "69kV Dedicated", mw: "42.5 MW" },
      { name: "Manticao Rural Co-op (MORESCO-I)", kv: "69kV Feeder", mw: "24.1 MW" },
      { name: "Lugait Municipal Light & Power", kv: "13.8kV Step-down", mw: "17.6 MW" }
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
      { name: "Carmen Commercial & City Hall Grid", kv: "13.8kV Feeder", mw: "26.4 MW" },
      { name: "Macasandig & Riverfront District", kv: "13.8kV Feeder", mw: "21.5 MW" },
      { name: "Kauswagan Medical & Civic Corridor", kv: "13.8kV Critical", mw: "14.9 MW" }
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
      { name: "Limketkai Commercial Ring", kv: "13.8kV Loop", mw: "18.2 MW" },
      { name: "Cugman Industrial Food Processing", kv: "13.8kV Dedicated", mw: "16.4 MW" },
      { name: "Tablon Residential Feeder", kv: "13.8kV Distribution", mw: "11.8 MW" }
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
      { name: "Generator 1: Francis Turbine Runner", kv: "13.8kV Bus", mw: "52.6 MW" },
      { name: "Generator 2: Francis Turbine Runner", kv: "13.8kV Bus", mw: "52.6 MW" },
      { name: "Generator 3: Francis Turbine Runner", kv: "13.8kV Bus", mw: "52.8 MW" }
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
      { name: "Unit 1: Vertical Francis Turbine", kv: "13.8kV Bus", mw: "85.0 MW" },
      { name: "Unit 2: Vertical Francis Turbine", kv: "13.8kV Bus", mw: "85.0 MW" },
      { name: "Unit 3: Vertical Francis Turbine", kv: "13.8kV Bus", mw: "85.0 MW" }
    ]
  },
  "tagoloan": {
    tag: "138kV INDUSTRIAL STEP-DOWN • PHIVIDEC ESTATE",
    title: "PHIVIDEC Tagoloan 138kV Substation",
    geo: "PHIVIDEC Industrial Authority • Tagoloan, Misamis Oriental • 8°32'N 124°45'E",
    voltage: "137.9 kV",
    power: "112.4 MW",
    pf: "0.94 Lag",
    temp: "62.1 °C",
    feeders: [
      { name: "Mindanao International Container Terminal", kv: "69kV Dedicated", mw: "38.2 MW" },
      { name: "FDC Misamis Baseload Intertie", kv: "138kV Trunk", mw: "44.0 MW" },
      { name: "Heavy Steel Mill & Chemical Plant", kv: "69kV Dedicated", mw: "30.2 MW" }
    ]
  },
  "opol": {
    tag: "69kV SUB-TRANSMISSION FEEDER • WEST MISAMIS ORIENTAL",
    title: "Opol 69kV Substation (MORESCO-I)",
    geo: "Opol Coastal Sub-transmission • 8°31'N 124°34'E",
    voltage: "68.8 kV",
    power: "28.5 MW",
    pf: "0.96 Lag",
    temp: "48.9 °C",
    feeders: [
      { name: "Opol Poblacion Commercial Feeder", kv: "13.8kV Distribution", mw: "12.4 MW" },
      { name: "Barra & Bulua Boundary Line", kv: "13.8kV Tie", mw: "9.8 MW" },
      { name: "Coastal Agro-Cold Storage", kv: "13.8kV Industrial", mw: "6.3 MW" }
    ]
  }
};

let currentSubstationKey = "cdo-lugait";
let isTripped = false;

document.addEventListener("DOMContentLoaded", () => {
  renderSubstation(currentSubstationKey);
  initFrequencyDrift();
});

// Clean frequency oscillation without blinking
function initFrequencyDrift() {
  const freqEl = document.getElementById("sysFreq");
  setInterval(() => {
    if (!isTripped) {
      const delta = (Math.random() * 0.04 - 0.02);
      freqEl.innerText = `${(60.00 + delta).toFixed(2)} Hz`;
    }
  }, 2400);
}

// Select Substation Node
function selectSubstation(key, btnEl) {
  currentSubstationKey = key;

  document.querySelectorAll(".tab-item").forEach(c => c.classList.remove("active"));
  if (btnEl) {
    btnEl.classList.add("active");
  } else {
    const matchingBtn = Array.from(document.querySelectorAll(".tab-item")).find(b => 
      b.getAttribute("onclick") && b.getAttribute("onclick").includes(key)
    );
    if (matchingBtn) matchingBtn.classList.add("active");
  }

  document.querySelectorAll(".substation-block").forEach(n => n.classList.remove("active"));
  const svgNode = document.getElementById(`sub-${key}`);
  if (svgNode) svgNode.classList.add("active");

  renderSubstation(key);
}

// Render Substation Details
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

  const tbody = document.getElementById("feedersTableBody");
  tbody.innerHTML = data.feeders.map(f => `
    <tr>
      <td>${f.name}</td>
      <td style="color: var(--text-muted);">${f.kv}</td>
      <td class="feeder-mw">${f.mw}</td>
    </tr>
  `).join("");
}

// Contingency Islanding Simulator (N-1 Event)
function toggleLineTrip() {
  isTripped = true;
  const badge = document.getElementById("gridStatusBadge");
  const freqEl = document.getElementById("sysFreq");
  const freqDot = document.getElementById("freqDot");
  const logEl = document.getElementById("eventLog");

  document.querySelectorAll(".breaker-symbol").forEach(b => {
    b.classList.remove("breaker-closed");
    b.classList.add("breaker-open");
  });

  badge.innerText = "N-1 FAULT";
  badge.classList.add("alert");

  freqDot.classList.add("tripped");
  freqEl.innerText = "59.42 Hz";

  const now = new Date().toTimeString().split(" ")[0];
  logEl.innerHTML = `
    <div><span>[${now}]</span> Overcurrent trip detected on 138kV Agus Trunk.</div>
    <div><span>[${now}]</span> Under-frequency load shedding initiated (-42 MW).</div>
    <div><span>[${now}]</span> Pulangi IV hydro spinning reserve ramping (+78 MW).</div>
  `;
}

function restoreGridState() {
  isTripped = false;
  const badge = document.getElementById("gridStatusBadge");
  const freqEl = document.getElementById("sysFreq");
  const freqDot = document.getElementById("freqDot");
  const logEl = document.getElementById("eventLog");

  document.querySelectorAll(".breaker-symbol").forEach(b => {
    b.classList.remove("breaker-open");
    b.classList.add("breaker-closed");
  });

  badge.innerText = "NORMAL";
  badge.classList.remove("alert");

  freqDot.classList.remove("tripped");
  freqEl.innerText = "59.98 Hz";

  const now = new Date().toTimeString().split(" ")[0];
  logEl.innerHTML = `
    <div><span>[${now}]</span> System synchronized; circuit breakers reclosed.</div>
  `;
}
