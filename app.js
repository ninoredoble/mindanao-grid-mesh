// Mindanao Grid Mesh — Mimic Board & Switchgear Controller

const SUBSTATIONS = {
  "cdo-lugait": {
    kicker: "138kV / 69kV BULK SUBSTATION • HEAVY INDUSTRIAL",
    title: "Lugait Substation (138kV / 69kV)",
    coords: "Misamis Oriental Border • Intertied to Agus-Pulangi Grid • 8°20'N 124°15'E",
    volt: "137.8 kV",
    power: "84.2 MW",
    pf: "0.96 LAG",
    temp: "58.4 °C",
    feeders: [
      { name: "Holcim Cement Heavy Industrial Trunk", cls: "69kV Dedicated", mw: "42.5 MW" },
      { name: "Manticao Rural Co-op (MORESCO-I)", cls: "69kV Sub-Tx", mw: "24.1 MW" },
      { name: "Lugait Municipal Light & Power", cls: "13.8kV Feeder", mw: "17.6 MW" }
    ]
  },
  "cdo-carmen": {
    kicker: "69kV / 13.8kV PRIMARY URBAN STEP-DOWN • CDO WEST",
    title: "Carmen 69kV Substation (CDO Urban Hub)",
    coords: "Barangay Carmen • Cagayan de Oro Riverbank • 8°29'N 124°38'E",
    volt: "69.1 kV",
    power: "62.8 MW",
    pf: "0.97 LAG",
    temp: "54.7 °C",
    feeders: [
      { name: "Carmen Commercial & City Hall Grid", cls: "13.8kV Feeder", mw: "26.4 MW" },
      { name: "Macasandig & Riverfront District", cls: "13.8kV Feeder", mw: "21.5 MW" },
      { name: "Kauswagan Medical & Civic Corridor", cls: "13.8kV Critical", mw: "14.9 MW" }
    ]
  },
  "cdo-cugman": {
    kicker: "69kV / 13.8kV DISTRIBUTION HUB • CDO EAST",
    title: "Cugman 69kV Substation (CDO East Intertie)",
    coords: "Cagayan de Oro East • Industrial & Commercial Feeders • 8°28'N 124°41'E",
    volt: "68.9 kV",
    power: "46.4 MW",
    pf: "0.98 LAG",
    temp: "51.2 °C",
    feeders: [
      { name: "Limketkai Commercial Mall Ring", cls: "13.8kV Loop", mw: "18.2 MW" },
      { name: "Cugman Industrial Food Processing", cls: "13.8kV Dedicated", mw: "16.4 MW" },
      { name: "Tablon Residential Feeder", cls: "13.8kV Distribution", mw: "11.8 MW" }
    ]
  },
  "agus-4": {
    kicker: "RUN-OF-RIVER HYDROPOWER GENERATING STATION",
    title: "Agus IV Hydroelectric Power Plant",
    coords: "Balo-i, Lanao del Norte • Agus Cascade • 8°09'N 124°12'E",
    volt: "138.4 kV",
    power: "158.0 MW",
    pf: "0.99 LEAD",
    temp: "44.1 °C",
    feeders: [
      { name: "Unit 1: Francis Turbine Runner 52.6 MW", cls: "13.8kV Bus", mw: "52.6 MW" },
      { name: "Unit 2: Francis Turbine Runner 52.6 MW", cls: "13.8kV Bus", mw: "52.6 MW" },
      { name: "Unit 3: Francis Turbine Runner 52.8 MW", cls: "13.8kV Bus", mw: "52.8 MW" }
    ]
  },
  "pulangi-4": {
    kicker: "RESERVOIR HYDRO GENERATING FACILITY",
    title: "Pulangi IV Hydroelectric Power Station",
    coords: "Maramag, Bukidnon • Pulangi River Basin • 7°48'N 125°02'E",
    volt: "138.6 kV",
    power: "255.0 MW",
    pf: "0.99 LEAD",
    temp: "42.8 °C",
    feeders: [
      { name: "Unit 1: Vertical Francis Hydropower Turbine", cls: "13.8kV Bus", mw: "85.0 MW" },
      { name: "Unit 2: Vertical Francis Hydropower Turbine", cls: "13.8kV Bus", mw: "85.0 MW" },
      { name: "Unit 3: Vertical Francis Hydropower Turbine", cls: "13.8kV Bus", mw: "85.0 MW" }
    ]
  },
  "tagoloan": {
    kicker: "138kV EXTRA HIGH DENSITY HEAVY INDUSTRIAL STEP-DOWN",
    title: "PHIVIDEC Tagoloan 138kV Substation",
    coords: "PHIVIDEC Industrial Authority • Tagoloan • 8°32'N 124°45'E",
    volt: "137.9 kV",
    power: "112.4 MW",
    pf: "0.94 LAG",
    temp: "62.1 °C",
    feeders: [
      { name: "Mindanao International Container Terminal", cls: "69kV Dedicated", mw: "38.2 MW" },
      { name: "FDC Misamis Baseload Intertie", cls: "138kV Trunk", mw: "44.0 MW" },
      { name: "Heavy Steel Rolling & Smelter Mill", cls: "69kV Dedicated", mw: "30.2 MW" }
    ]
  },
  "opol": {
    kicker: "69kV SUB-TRANSMISSION & MUNICIPAL FEEDER",
    title: "Opol 69kV Substation (MORESCO-I)",
    coords: "Opol Coastal Sub-transmission • 8°31'N 124°34'E",
    volt: "68.8 kV",
    power: "28.5 MW",
    pf: "0.96 LAG",
    temp: "48.9 °C",
    feeders: [
      { name: "Opol Poblacion Commercial Feeder", cls: "13.8kV Feeder", mw: "12.4 MW" },
      { name: "Barra & Bulua Boundary Tie", cls: "13.8kV Tie", mw: "9.8 MW" },
      { name: "Coastal Agro-Cold Storage", cls: "13.8kV Feeder", mw: "6.3 MW" }
    ]
  }
};

let currentSubKey = "cdo-lugait";
let isTripped = false;
let nominalFreq = 60.00;

document.addEventListener("DOMContentLoaded", () => {
  renderSubstation(currentSubKey);
  initSynchronoscope();
});

// Analog Meter Sweep Simulation (60Hz nominal = 0deg vertical)
function initSynchronoscope() {
  const needle = document.getElementById("analogNeedle");
  const ledFreq = document.getElementById("ledFreq");

  setInterval(() => {
    if (!isTripped) {
      const delta = (Math.random() * 0.06 - 0.03);
      const freq = (nominalFreq + delta).toFixed(2);
      ledFreq.innerText = `${freq} Hz`;

      // Calculate angle: 60Hz = 0 deg, 58Hz = -60 deg, 62Hz = +60 deg
      const angle = (parseFloat(freq) - 60.0) * 30;
      needle.style.transform = `rotate(${angle}deg)`;
    }
  }, 2000);
}

// Select Substation on Mimic Board
function selectSubstation(key) {
  currentSubKey = key;

  document.querySelectorAll(".mimic-node").forEach(n => n.classList.remove("active-node"));
  const node = document.getElementById(`node-${key}`);
  if (node) node.classList.add("active-node");

  renderSubstation(key);
}

function renderSubstation(key) {
  const data = SUBSTATIONS[key];
  if (!data) return;

  document.getElementById("bayKicker").innerText = data.kicker;
  document.getElementById("bayTitle").innerText = data.title;
  document.getElementById("bayCoords").innerText = data.coords;
  document.getElementById("valVolt").innerText = data.volt;
  document.getElementById("valPower").innerText = data.power;
  document.getElementById("valPF").innerText = data.pf;
  document.getElementById("valTemp").innerText = data.temp;

  const tbody = document.getElementById("bayFeedersBody");
  tbody.innerHTML = data.feeders.map(f => `
    <tr>
      <td>${f.name}</td>
      <td style="color: #64748b;">${f.cls}</td>
      <td class="feeder-mw-col">${f.mw}</td>
    </tr>
  `).join("");
}

// Toggle an Individual Breaker by Clicking the Joint
function toggleSingleBreaker(id) {
  const brk = document.getElementById(id);
  const now = new Date().toTimeString().split(" ")[0];
  const tape = document.getElementById("printerTape");

  if (brk.classList.contains("brk-closed")) {
    brk.classList.remove("brk-closed");
    brk.classList.add("brk-open");
    tape.innerHTML = `<div class="tape-alert">[${now}] &bull; OPERATOR TRIP: Breaker ${id.toUpperCase()} opened manually.</div>` + tape.innerHTML;
  } else {
    brk.classList.remove("brk-open");
    brk.classList.add("brk-closed");
    tape.innerHTML = `<div class="tape-ok">[${now}] &bull; OPERATOR RECLOSE: Breaker ${id.toUpperCase()} reclosed and locked.</div>` + tape.innerHTML;
  }
}

// Trip Main 138kV Trunk
function tripMainTieLine() {
  isTripped = true;
  const needle = document.getElementById("analogNeedle");
  const ledFreq = document.getElementById("ledFreq");
  const boardStatus = document.getElementById("boardStatusTxt");
  const annSync = document.getElementById("annSync");
  const annTrip = document.getElementById("annTrip");
  const annUfls = document.getElementById("annUfls");
  const tape = document.getElementById("printerTape");

  // Trip all transmission breakers
  document.querySelectorAll(".breaker-square").forEach(b => {
    b.classList.remove("brk-closed");
    b.classList.add("brk-open");
  });

  // Annunciator alarm lamps
  annSync.classList.remove("lamp-active-green");
  annTrip.classList.add("lamp-active-red");
  annUfls.classList.add("lamp-active-red");

  // Deflect meter needle hard left to 59.4 Hz
  needle.style.transform = `rotate(-20deg)`;
  ledFreq.innerText = "59.42 Hz";
  ledFreq.classList.add("alert-freq");

  boardStatus.innerText = "ISLANDED (N-1 FAULT)";
  boardStatus.style.color = "#ef4444";

  const now = new Date().toTimeString().split(" ")[0];
  tape.innerHTML = `
    <div class="tape-alert">[${now}] &bull; [TRIP RELAY 50/51] 138kV Agus Trunk Overcurrent Lockout!</div>
    <div class="tape-alert">[${now}] &bull; [UFLS ACTIVATED] Under-frequency Stage 1 shed 42 MW.</div>
    <div style="color: #38bdf8;">[${now}] &bull; [HYDRO DISPATCH] Pulangi IV governor ramping spinning reserve +78 MW.</div>
  ` + tape.innerHTML;
}

// Reclose & Synchronize
function recloseTieLine() {
  isTripped = false;
  const needle = document.getElementById("analogNeedle");
  const ledFreq = document.getElementById("ledFreq");
  const boardStatus = document.getElementById("boardStatusTxt");
  const annSync = document.getElementById("annSync");
  const annTrip = document.getElementById("annTrip");
  const annUfls = document.getElementById("annUfls");
  const tape = document.getElementById("printerTape");

  // Reclose all breakers
  document.querySelectorAll(".breaker-square").forEach(b => {
    b.classList.remove("brk-open");
    b.classList.add("brk-closed");
  });

  // Restore Annunciator
  annSync.classList.add("lamp-active-green");
  annTrip.classList.remove("lamp-active-red");
  annUfls.classList.remove("lamp-active-red");

  // Center needle back to 60.0 Hz
  needle.style.transform = `rotate(0deg)`;
  ledFreq.innerText = "60.01 Hz";
  ledFreq.classList.remove("alert-freq");

  boardStatus.innerText = "CLOSED LOOP (NORMAL)";
  boardStatus.style.color = "#22c55e";

  const now = new Date().toTimeString().split(" ")[0];
  tape.innerHTML = `
    <div class="tape-ok">[${now}] &bull; [SYNCHRONOSCOPE LOCKED] Breakers CB-101 through CB-203 in-phase. Intertie reclosed.</div>
  ` + tape.innerHTML;
}
