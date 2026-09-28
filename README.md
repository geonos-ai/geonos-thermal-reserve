# GEONOS

GEONOS is a prototype planning tool for cold-storage peak-load shifting.

The public demo lets a user choose a typical peak refrigeration load, product profile, outdoor temperature, event window and requested load reduction. It models a 24-hour baseline, pre-cooling, the peak event and the recovery afterward. A plan is rejected when an illustrative storage-temperature proxy leaves the selected range.

**Public demo:** https://geonos-ai.github.io/geonos-thermal-reserve/

## Repository contents

- `site/` — dependency-free public prototype
- `site/data/antalya_nasa_power_annual.csv` — Antalya climate-screen derivative used in the evidence section
- `application/TRUE_ZERO_GLOBAL_PRIZE_2026_APPLICATION.md` — F6S application draft, video script and submission checklist
- `METHODOLOGY.md` — model logic, evidence boundaries and proposed field method
- `DEPLOY.md` — GitHub Pages deployment guide in Korean
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Run locally

```bash
cd geonos-thermal-reserve
python3 -m http.server 4173 --directory site
```

Open `http://localhost:4173`.

## Current status

This is a rule-based browser demonstration shown alongside public Antalya climate context and labeled facility assumptions. The simulator itself does not read the climate CSV. It has not been calibrated to a real cold room, does not control equipment and does not show customer results, verified energy savings or avoided emissions.

The Antalya values come from NASA POWER daily MERRA-2 data for the grid cell near 36.89°N, 30.70°E. They are regional screening data, not a weather-station record or a facility measurement.

The company and public product name used in this application is `GEONOS`.
