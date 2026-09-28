# GEONOS — Thermal Reserve

True Zero Global Prize 2026 prototype and application package.

**Core proposition:** A cold room is already a thermal battery. GEONOS proves how much refrigeration load can move, for how long, without crossing the temperature line.

## What is included

- `site/` — dependency-free, responsive public prototype
- `site/data/antalya_nasa_power_annual.csv` — annual Antalya climate-screen derivative used in the evidence section
- `application/TRUE_ZERO_GLOBAL_PRIZE_2026_APPLICATION.md` — full F6S application, video script, recommendation request and submission checklist
- `METHODOLOGY.md` — model boundaries, intended field M&amp;V and stop conditions
- `DEPLOY.md` — GitHub Pages deployment guide in Korean
- `.github/workflows/pages.yml` — automatic GitHub Pages deployment

## Preview locally

```bash
cd /Users/jangholee/Desktop/GitHub/geonos-thermal-reserve
python3 -m http.server 4173 --directory site
```

Open `http://localhost:4173`.

## Current evidence state

The site is an interactive deterministic demonstration built from public climate context and clearly labeled facility assumptions. It does not control equipment, use customer data, participate in an electricity market, or claim field-verified flexibility, savings or emissions reductions.

## Data note

The Antalya values are derived from NASA POWER daily MERRA-2 data for the grid cell near 36.89°N, 30.70°E. They are a public reanalysis screen, not a weather-station record or facility measurement. The annual CSV is included for traceability; the interface simulation uses transparent deterministic assumptions rather than customer data.

## Product naming

`Thermal Reserve` is a working product name. The company name in every submission field is `GEONOS`. Complete a formal trademark search before commercial use.
