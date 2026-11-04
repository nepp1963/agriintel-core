# AgriIntel Core (`agriintel-core`)

Open-source spatial-computational engine for agricultural hydraulics, hydrology, solar PV micro-grids, and FAO-56 evapotranspiration ($ET_o$). Decouples core mathematical models from regional data schemas.

## Core Modules
* **FAO-56 Evapotranspiration**: Daily Penman-Monteith $ET_o$ & crop water requirements ($ET_c$).
* **NRCS-CN Hydrology**: Runoff volume & peak discharge modeling.
* **Hydraulics & Solar PV**: Hazen-Williams pipe friction losses, total dynamic head (TDH), and solar pump array/battery sizing.
* **Geospatial Processing**: Leaflet map layers for GeoJSON boundaries, elevation, and weather grid feeds.

## Tech Stack
* **Framework**: React 18 / TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Geospatial/Math**: Leaflet, Turf.js, Math.js

## Quick Start
```bash
git clone [https://github.com/nepp1963/agriintel-core.git](https://github.com/nepp1963/agriintel-core.git)
cd agriintel-core
npm install
npm run dev
