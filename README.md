# Mindanao Grid Mesh

> **Sub-Transmission Load Flow & Hydropower Telemetry Console**  
> An interactive industrial SCADA simulation console modeling Northern Mindanao's 138kV/69kV electrical transmission network, Agus-Pulangi hydropower generation cascades, and grid islanding resilience.

---

## ⚡ Overview

Northern Mindanao hosts the historical baseload clean energy anchor of the Mindanao power grid—the **Agus River Hydropower Cascade** and the **Pulangi IV Hydroelectric Reservoir**. 

**Mindanao Grid Mesh** provides power systems engineers and regional distribution utilities (such as CEPALCO and MORESCO) with an interactive single-line diagram (SLD) console to inspect bus voltages, active power flows, power factors, and automated under-frequency load shedding (UFLS) during simulated N-1 transmission line contingencies.

---

## 🛠️ Key Capabilities & Features

1. **Interactive Single-Line Transmission Diagram (SLD)**:
   - Vector-rendered 138kV regional transmission backbone and 69kV urban distribution rings.
   - Dynamic power flow indicators and circuit breaker status indicators.
   - Live telemetry inspect nodes across:
     - **Lugait 138kV Substation** (Heavy cement industrial load)
     - **Cugman 69kV Substation** (CEPALCO urban commercial ring)
     - **Carmen 69kV Substation** (Cagayan de Oro City Center)
     - **Agus IV Hydroelectric Station** (Balo-i, Lanao del Norte)
     - **Pulangi IV Hydroelectric Station** (Maramag, Bukidnon)
     - **PHIVIDEC Tagoloan 138kV Substation** (Industrial container port & steelworks)
     - **Opol 69kV Substation** (MORESCO-I municipal distribution)

2. **Real-Time System Frequency & Jitter Simulation**:
   - Authentically replicates real-time grid frequency oscillations around the 60.00 Hz nominal standard (59.97 – 60.03 Hz).

3. **N-1 Contingency & Islanding Simulator**:
   - Allows users to simulate tripping the primary 138kV transmission tie line.
   - Evaluates system frequency drop (59.42 Hz), circuit breaker state transitions, automatic spinning reserve ramp-up from Bukidnon hydro, and real-time SCADA event logging.

---

## 💻 Technical Architecture

- **Visual Theme**: Industrial blueprint navy (`#06090e`), high-voltage amber (`#f59e0b`), phosphor green (`#10b981`), and hydro cyan (`#38bdf8`).
- **Typography**: Engineering-focused monospace (`JetBrains Mono`) paired with technical display headers (`Space Grotesk`).
- **Frontend Stack**: Pure Vanilla ES6+ JavaScript, responsive SVG viewport matrices, and zero-dependency CSS Grid.

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/ninoredoble/mindanao-grid-mesh.git

# Navigate into directory
cd mindanao-grid-mesh

# Open index.html in any browser
open index.html
```
