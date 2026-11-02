# Mindanao Grid Mimic Board

An interactive browser study: trip a breaker on a control-room mimic board and watch a small power-flow model reroute the load.

It is a study, not a production system. There is no live data, no SCADA connection, no backend and no build step. The network is a simplified seven-bus ring named after places on the Northern Mindanao coast. Plant and town names are real; loads, line ratings, reactances and the layout are invented for illustration and are not NGCP data.

## What you can do

- Click any breaker on the single-line diagram (or its row in the table) to open or close it.
- Use the three preset scenarios, change system demand from 60% to 115%, or turn overload protection off.
- Read the "If it opened alone" column to see what each single outage would add to the current state: a new or worse overload, or more lost load.

Everything recomputes in the browser on each change: flows, overloads, unserved load and the event log.

## The model

`model.js` is a plain function, `GridModel.solve(state)`, with no dependencies and no DOM access.

1. Closed breakers split the network into islands (flood fill). An island with no generating plant goes dead.
2. In each island the plants share the island's load in proportion to capacity. If capacity is short, the island sheds load pro rata.
3. A DC load flow (lossless lines, a fixed reactance per line, one reference bus per island) is solved by Gaussian elimination, and each line's MW is compared with its rating.
4. With overload protection on, the most overloaded line opens after a short delay and the model is solved again, so cascades play out step by step.

Left out: voltage, reactive power, frequency, transients, relay timing and synchronism checks when closing a breaker. The two transformer symbols are drawn but not modelled.

## Files

| File | Purpose |
|:--|:--|
| `index.html` | Page structure and copy |
| `styles.css` | Layout, tokens, mimic-plate drawing styles |
| `model.js` | Islanding, dispatch, DC power flow, contingency screen |
| `app.js` | SVG diagram, table, controls, event log |

## Running it

Open `index.html` in a browser, or serve the folder with any static server (for example `python3 -m http.server`). It deploys as-is on GitHub Pages. Fonts (Barlow, Barlow Condensed) load from Google Fonts; the page falls back to system fonts offline.

The model also runs under Node: `require('./model.js').solve({ open: { 'CB-103': true }, scale: 1 })`.
