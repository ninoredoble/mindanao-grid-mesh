# Mindanao Grid Mesh

> **138kV / 69kV High-Voltage Mimic Board & Substation Telemetry Console**  
> An industrial control room workstation modeling Northern Mindanao's high-voltage electrical grid -- simulating real-time generator swing physics, topological busbar energization, automatic Under-Frequency Load Shedding (UFLS), and mechanical switchgear breaker trip sequences.

---

## Overview

The Northern Mindanao power corridor integrates large run-of-river and reservoir hydroelectric generation (Agus IV and Pulangi IV) with bulk industrial transmission rings serving Cagayan de Oro, Tagoloan PHIVIDEC heavy industries, and rural electric cooperatives (MORESCO-I).

**Mindanao Grid Mesh** provides an authentic mimic board and supervisory control interface. Built without bloated web frameworks, it executes real power system physics: tracking generation-to-load equilibrium, topological graph connectivity across circuit breakers (CB-101 to CB-203), and automated protective relay trips.

---

## Engineering & Physical Systems

### 1. Topological Graph Connectivity & Bus Energization
- **138kV Bulk Transmission Trunk**: Transmits bulk hydropower from Agus IV (Balo-i) and Pulangi IV (Maramag) to regional stepdown substations (Lugait and Tagoloan).
- **69kV Sub-Transmission Ring**: Feeds urban Cagayan de Oro load centers (Carmen West, Cugman East, and Opol).
- **Active Busbar Routing**:
  - Operating any circuit breaker (`CB-101` through `CB-203`) immediately triggers a topological graph traversal.
  - If a substation loses connection to active generation, its bus voltage collapses from nominal (138kV or 69kV) down to `0.0 kV`, active power drops to `0.0 MW`, downstream feeders trip offline, and the mimic block illuminates `BUS COLLAPSE // DE-ENERGIZED`.

### 2. Generator Swing Equation & Frequency Physics
- **Dynamic Frequency Calculation**:
  Models instantaneous system frequency deviations according to the generator swing equation:
  `J * (df/dt) = P_gen - P_load - D * (f - f_0)`
- **Generation Assets**:
  - *Agus IV Hydroelectric Plant*: 158 MW nominal run-of-river capacity (Balo-i, Lanao del Norte).
  - *Pulangi IV Hydroelectric Station*: 255 MW reservoir dispatch with spinning reserve (Maramag, Bukidnon).
- **Regional Demand Profiles**:
  - `OFF-PEAK (60%)`: Late-night base load.
  - `DAY NORMAL (85%)`: Daytime baseline commercial/residential profile.
  - `EVENING PEAK (100%)`: Peak urban lighting and cooling demand.
  - `SURGE (115%)`: Heavy industrial simultaneous demand.

### 3. Automatic Under-Frequency Load Shedding (UFLS)
- **Stage 1 Trigger (f < 59.50 Hz)**:
  Automatically sheds heavy industrial inductive loads (Holcim Cement 42.5 MW, Heavy Steel Smelter 30.2 MW, Cugman Food Processing 16.4 MW) to arrest frequency plunge.
- **Stage 2 Trigger (f < 59.20 Hz)**:
  Sheds secondary municipal and agro-industrial feeders (Manticao Rural 24.1 MW, PHIVIDEC Agro 44.0 MW, Barra Tie 9.8 MW).
- **Catastrophic Blackout Lockout (f <= 58.40 Hz)**:
  Trips all transmission trunk breakers to prevent turbine blade damage and initiates anti-islanding lockout.

### 4. Control Room Instrumentation & SCADA Logging
- **Analog Synchronoscope**: Real-time rotating galvanometer needle deflecting across 58.0 Hz to 62.0 Hz with in-phase lock at 60.00 Hz nominal.
- **Annunciator Light Box**: 6 industrial annunciator tiles (`GRID SYNC`, `TRIP RELAY 50/51`, `UFLS STAGE 1`, `UFLS STAGE 2`, `HYDRO DISPATCH`, `BUS DE-ENERGIZED`).
- **Dot-Matrix Printer Tape**: Real-time chronological SCADA event log tracking ANSI protective relay codes (`[ANSI 50/51]`, `[ANSI 81L]`, `[ANSI 25]`, `[ANSI 27]`).
- **SCADA Telemetry Export**: One-click JSON download of complete grid status, voltages, power flows, and event logs.

---

## Substation Taxonomy

| Substation | Voltage Class | Nominal Load | Primary Feeder Roles |
|:---|:---:|:---:|:---|
| **Lugait Bulk** | 138kV / 69kV | 84.2 MW | Holcim Cement, Manticao Rural (MORESCO-I), Lugait Municipal |
| **Carmen (CDO West)** | 69kV / 13.8kV | 62.8 MW | City Hall, Carmen Commercial, Kauswagan Medical Corridor |
| **Cugman (CDO East)** | 69kV / 13.8kV | 46.4 MW | Limketkai Commercial Mall Ring, Industrial Food Processing |
| **PHIVIDEC Tagoloan** | 138kV Bulk | 112.4 MW | Container Terminal (MICT), Steel Rolling Mill, Agro-Industrial |
| **Opol Substation** | 69kV / 13.8kV | 28.5 MW | Opol Commercial, Barra Boundary Tie, Cold Storage Facilities |
| **Agus IV Plant** | 138kV Generation | 158.0 MW | 3x Francis Hydro Turbine Runners (Balo-i River Cascade) |
| **Pulangi IV Station** | 138kV Generation | 255.0 MW | 3x Vertical Francis Turbines (Maramag Basin Hydro Baseload) |

---

## Technical Specifications

- **Architecture**: Zero-dependency Vanilla HTML5, Vanilla ES6+ JavaScript, CSS3 industrial mimic design tokens.
- **Character Encoding**: 100% 7-bit ASCII (zero mojibake / raw multi-byte byte errors).
- **Typography**: Industrial monospace (`JetBrains Mono`) and stencil display (`Chakra Petch`).

---

## Running Locally

```bash
# Clone repository
git clone https://github.com/ninoredoble/mindanao-grid-mesh.git

# Navigate to directory
cd mindanao-grid-mesh

# Open index.html in any modern browser
# (Windows)
start index.html

# (macOS)
open index.html

# (Linux)
xdg-open index.html
```

---

## Standards & References

- **Philippine Grid Code (PGC)**: Frequency operational limits (59.70 Hz - 60.30 Hz nominal, UFLS thresholds).
- **National Grid Corporation of the Philippines (NGCP)**: Mindanao 138kV/69kV single-line transmission diagrams.
- **IEEE Std C37.2**: Standard Electrical Power System Device Function Numbers (ANSI 50/51, 81L, 25).