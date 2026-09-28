# GEONOS — Methodology and Limits

## What the prototype is for

The prototype demonstrates a planning workflow for a cold-storage peak-load event:

1. estimate a 24-hour refrigeration baseline,
2. pre-cool before the selected peak period,
3. reduce load during the event,
4. model the recovery and rebound,
5. reject the plan if the modeled temperature exceeds the selected limit, and
6. report modeled peak reduction, gross peak-period energy reduction, rebound energy, duration and temperature range separately.

It is a browser demonstration, not an engineering-grade thermal model or a dispatch controller.

## Data labels

| Label | Meaning in this repository |
|---|---|
| `PUBLIC CLIMATE` | NASA POWER MERRA-2 grid-cell values used for regional climate screening |
| `DEMO ASSET` | Fixed demonstration assumptions; no customer records |
| `MODELED OUTPUT` | Results produced by the browser simulation; no field verification |

Public reanalysis data cannot replace a facility weather sensor, power meter or temperature sensor.

## Current model

The browser model builds an hourly baseline from:

- the selected typical peak refrigeration load,
- a fixed normalized daily load shape,
- an outdoor-temperature adjustment.

It then applies:

- a three-hour pre-cooling ramp before the event,
- the requested load reduction during the event,
- a two-hour recovery period after the event, and
- a heat-adjusted recovery load after the event.

The temperature check is an illustrative hourly proxy, not a product-core or engineering temperature prediction. It starts from the selected profile's demonstration temperature. For each one-hour interval, load below the baseline raises the proxy and load above the baseline lowers it. The response changes with the selected product profile and outdoor heat. Extra cooling is assigned 65% of the temperature effect of an equivalent load reduction, and the proxy returns 6% toward its starting temperature each hour. These are visible demonstration coefficients, not calibrated site parameters.

The interface rejects a request when this proxy crosses either the lower pre-cooling limit or the upper storage-temperature limit. A longer event runs through more hourly steps, so its temperature range differs from a shorter event. The rejected request remains visible so the user can inspect it.

Peak-period reduction is the gross difference between baseline and planned load during the event. Rebound energy is the additional planned load above baseline during the two recovery hours. The model treats each load value as a one-hour interval average, so energy is the hourly power difference multiplied by one hour. Neither value is presented as net energy savings.

The fixed formulas are visible in `site/app.js`. They have not been calibrated to a real cold-storage facility.

## Antalya climate-data provenance

The regional context uses NASA POWER daily point data for 36.89°N, 30.70°E from 1 January 1991 through 31 December 2025. The source endpoint is `https://power.larc.nasa.gov/api/temporal/daily/point`, with the Sustainable Buildings community and the `T2M` and `T2M_MAX` parameters. The data were accessed for this prototype in September 2026.

- Annual mean temperature is the arithmetic mean of daily `T2M`.
- `CDD18` is the annual sum of `max(T2M − 18°C, 0)`.
- Hot days are the count of days where `T2M_MAX ≥ 35°C`.
- The checked-in file contains annual aggregates, not the original daily response.
- SHA-256 for `site/data/antalya_nasa_power_annual.csv`: `1c1583b9ed0ef708a0f554542b0a8db7dea2233a2731c2e1a47cdf1d2bd0ec83`.

## How a field pilot would differ

A field pilot would replace demonstration coefficients with site data and agreed operating rules. Before seeing an event result, the site team and reviewers would document and lock:

- the equipment, storage area and meters included,
- the appropriate room-air or product temperature limits,
- a healthy baseline period,
- weather and operating variables,
- missing-data and exclusion rules,
- the event window and manual-override process,
- safety stop conditions,
- model-quality thresholds and the allowed difference between planned and delivered reduction, and
- approval and independent measurement-and-verification roles.

The pilot would begin with an observation-only phase and no equipment control. If the data and safety reviews pass, qualified site staff could approve a supervised event. Delivered peak reduction would be calculated from the agreed estimate of what load would have been without the event and the observed event load. Event energy, rebound, uncertainty, exclusions and temperature performance would be reported separately.

A result would be marked inconclusive when data quality, operating comparability, baseline quality or safety evidence does not meet the agreed threshold. It would not be forced into a positive result.

## Energy and emissions claims

Moving electricity from one hour to another is not the same as saving electricity. It is also not automatically an emissions reduction.

An emissions result would require an approved time-varying grid-emissions signal and the documented before-and-after load profile. An annual average grid factor is not enough to claim that a specific event avoided emissions.

## Stop conditions for a field test

The workflow would stop or remain in the observation-only phase if:

- a temperature or food-safety rule is crossed,
- qualified site staff reject the plan,
- meter, sensor or control data are unreliable,
- the baseline does not meet the agreed quality threshold,
- manual override is unavailable,
- controls or cybersecurity review fails, or
- the relevant energy program cannot accept the included equipment and meters.

## What the prototype does not claim

- live or autonomous equipment control,
- customer or partner deployment,
- market qualification,
- energy savings,
- avoided emissions,
- food-safety certification, or
- field-verified flexibility.
