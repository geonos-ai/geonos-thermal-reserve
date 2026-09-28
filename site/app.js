const svgNS = "http://www.w3.org/2000/svg";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const productProfiles = {
  frozen: { lower: -24, upper: -18, start: -21.2, inertia: 1.0 },
  chilled: { lower: 1, upper: 5, start: 2.8, inertia: 0.78 },
};

const elements = {
  form: document.querySelector("#dispatchForm"),
  product: document.querySelector("#productType"),
  heat: document.querySelector("#heatStress"),
  load: document.querySelector("#connectedLoad"),
  event: document.querySelector("#eventWindow"),
  curtailment: document.querySelector("#curtailment"),
  heatOutput: document.querySelector("#heatOutput"),
  loadOutput: document.querySelector("#loadOutput"),
  curtailmentOutput: document.querySelector("#curtailmentOutput"),
  chartGrid: document.querySelector("#chartGrid"),
  chartLabels: document.querySelector("#chartLabels"),
  baselinePath: document.querySelector("#baselinePath"),
  shiftedPath: document.querySelector("#shiftedPath"),
  baselineArea: document.querySelector("#baselineArea"),
  shiftedArea: document.querySelector("#shiftedArea"),
  eventBand: document.querySelector("#eventBand"),
  eventLabel: document.querySelector("#eventLabel"),
  safetyStrip: document.querySelector("#safetyStrip"),
  safetyLabel: document.querySelector("#safetyLabel"),
  safetyDetail: document.querySelector("#safetyDetail"),
  metricContext: document.querySelector("#metricContext"),
  metricCapacity: document.querySelector("#metricCapacity"),
  metricShifted: document.querySelector("#metricShifted"),
  metricDuration: document.querySelector("#metricDuration"),
  metricRebound: document.querySelector("#metricRebound"),
};

const plot = { left: 48, right: 798, top: 26, bottom: 278 };

function makeSvg(tag, attributes = {}) {
  const node = document.createElementNS(svgNS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function initializeChart() {
  [0, 0.25, 0.5, 0.75, 1].forEach((ratio) => {
    const y = plot.top + (plot.bottom - plot.top) * ratio;
    elements.chartGrid.append(makeSvg("line", {
      x1: plot.left,
      x2: plot.right,
      y1: y,
      y2: y,
      class: "chart-grid-line",
    }));
  });

  [0, 4, 8, 12, 16, 20, 24].forEach((hour) => {
    const x = plot.left + ((plot.right - plot.left) * hour) / 24;
    elements.chartGrid.append(makeSvg("line", {
      x1: x,
      x2: x,
      y1: plot.top,
      y2: plot.bottom,
      class: "chart-grid-line",
    }));
    const label = makeSvg("text", {
      x,
      y: 304,
      "text-anchor": hour === 0 ? "start" : hour === 24 ? "end" : "middle",
      class: "chart-axis-label",
    });
    label.textContent = `${String(hour).padStart(2, "0")}:00`;
    elements.chartLabels.append(label);
  });
}

function pointPath(values, maxValue) {
  return values.map((value, index) => {
    const x = plot.left + ((plot.right - plot.left) * index) / (values.length - 1);
    const y = plot.bottom - ((plot.bottom - plot.top) * value) / maxValue;
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function areaPath(values, maxValue) {
  return `${pointPath(values, maxValue)} L${plot.right},${plot.bottom} L${plot.left},${plot.bottom} Z`;
}

function simulate() {
  const heat = Number(elements.heat.value);
  const connectedLoad = Number(elements.load.value);
  const requested = Number(elements.curtailment.value) / 100;
  const [eventStart, eventEnd] = elements.event.value.split("-").map(Number);
  const duration = eventEnd - eventStart;
  const profile = productProfiles[elements.product.value];

  elements.heatOutput.value = `${heat}°C`;
  elements.loadOutput.value = connectedLoad >= 1000 ? `${(connectedLoad / 1000).toFixed(2)} MW` : `${connectedLoad} kW`;
  elements.curtailmentOutput.value = `${Math.round(requested * 100)}%`;

  const heatFactor = 1 + Math.max(0, heat - 30) * 0.018;
  const baseShape = [
    0.58, 0.56, 0.54, 0.53, 0.54, 0.58, 0.64, 0.7,
    0.75, 0.78, 0.8, 0.82, 0.84, 0.87, 0.9, 0.94,
    0.98, 1, 0.97, 0.92, 0.84, 0.76, 0.68, 0.62, 0.59,
  ];
  const baseline = baseShape.map((shape) => connectedLoad * shape * heatFactor * 0.78);
  const plannedFraction = requested;
  const planned = [...baseline];

  for (let hour = Math.max(0, eventStart - 3); hour < eventStart; hour += 1) {
    const ramp = (hour - (eventStart - 3) + 1) / 3;
    planned[hour] *= 1 + plannedFraction * (0.25 + 0.35 * ramp);
  }
  for (let hour = eventStart; hour < eventEnd; hour += 1) planned[hour] *= 1 - plannedFraction;

  const recoveryFactor = 1.04 + Math.max(0, heat - 32) * 0.005;
  for (let hour = eventEnd; hour < Math.min(24, eventEnd + 2); hour += 1) {
    planned[hour] *= 1 + plannedFraction * 0.42 * recoveryFactor;
  }

  const eventBaselinePeak = Math.max(...baseline.slice(eventStart, eventEnd));
  const eventPlannedPeak = Math.max(...planned.slice(eventStart, eventEnd));
  const peakReduction = Math.max(0, eventBaselinePeak - eventPlannedPeak);
  const movedEnergy = baseline
    .slice(eventStart, eventEnd)
    .reduce((total, value, index) => total + Math.max(0, value - planned[eventStart + index]), 0);
  const reboundEnergy = baseline
    .slice(eventEnd, Math.min(24, eventEnd + 2))
    .reduce((total, value, index) => total + Math.max(0, planned[eventEnd + index] - value), 0);

  const responsePerHour = 3 / profile.inertia;
  const ambientResponse = 1 + Math.max(0, heat - 30) * 0.015;
  let storageTemperature = profile.start;
  let lowestTemperature = profile.start;
  let highestTemperature = profile.start;

  for (let hour = 0; hour < 24; hour += 1) {
    const relativeLoadChange = (baseline[hour] - planned[hour]) / baseline[hour];
    const coolingEffectiveness = relativeLoadChange >= 0 ? 1 : 0.65;
    const loadEffect = relativeLoadChange * responsePerHour * ambientResponse * coolingEffectiveness;
    const returnTowardStart = (profile.start - storageTemperature) * 0.06;
    storageTemperature += loadEffect + returnTowardStart;

    if (hour >= Math.max(0, eventStart - 3) && hour < Math.min(24, eventEnd + 2)) {
      lowestTemperature = Math.min(lowestTemperature, storageTemperature);
      highestTemperature = Math.max(highestTemperature, storageTemperature);
    }
  }

  const lowerMargin = lowestTemperature - profile.lower;
  const upperMargin = profile.upper - highestTemperature;
  const closestTemperatureMargin = Math.min(lowerMargin, upperMargin);
  const lowerLimitExceeded = lowerMargin < -0.0001;
  const upperLimitExceeded = upperMargin < -0.0001;
  const safe = !lowerLimitExceeded && !upperLimitExceeded;

  const maxValue = Math.max(...baseline, ...planned) * 1.12;
  elements.baselinePath.setAttribute("d", pointPath(baseline, maxValue));
  elements.shiftedPath.setAttribute("d", pointPath(planned, maxValue));
  elements.baselineArea.setAttribute("d", areaPath(baseline, maxValue));
  elements.shiftedArea.setAttribute("d", areaPath(planned, maxValue));

  const eventX = plot.left + ((plot.right - plot.left) * eventStart) / 24;
  elements.eventBand.setAttribute("x", eventX);
  elements.eventBand.setAttribute("width", ((plot.right - plot.left) * duration) / 24);
  elements.eventLabel.textContent = `PEAK WINDOW · ${String(eventStart).padStart(2, "0")}:00–${String(eventEnd).padStart(2, "0")}:00`;

  elements.metricCapacity.textContent = Math.round(peakReduction).toLocaleString();
  elements.metricShifted.textContent = Math.round(movedEnergy).toLocaleString();
  elements.metricDuration.textContent = duration.toFixed(1);
  elements.metricRebound.textContent = Math.round(reboundEnergy).toLocaleString();

  const formatTemperature = (value) => `${value < 0 ? "−" : ""}${Math.abs(value).toFixed(1)}°C`;
  const formatMargin = (value) => `${Math.abs(value) < 0.1 ? Math.abs(value).toFixed(2) : Math.abs(value).toFixed(1)}°C`;
  elements.safetyStrip.classList.toggle("rejected", !safe);
  elements.safetyStrip.querySelector(".safety-icon").textContent = safe ? "✓" : "×";
  elements.metricContext.textContent = safe ? "MODELED SCENARIO" : "REJECTED REQUEST · VALUES SHOWN FOR DIAGNOSIS";
  elements.metricContext.classList.toggle("rejected", !safe);
  if (safe) {
    elements.safetyLabel.textContent = "Plan stays within the modeled limit";
    elements.safetyDetail.textContent = `Illustrative range ${formatTemperature(lowestTemperature)} to ${formatTemperature(highestTemperature)} · ${formatMargin(closestTemperatureMargin)} from nearest limit`;
  } else if (upperLimitExceeded && lowerLimitExceeded) {
    elements.safetyLabel.textContent = "Plan rejected: modeled temperature range exceeded";
    elements.safetyDetail.textContent = `Illustrative range ${formatTemperature(lowestTemperature)} to ${formatTemperature(highestTemperature)} crosses both selected limits`;
  } else if (upperLimitExceeded) {
    elements.safetyLabel.textContent = "Plan rejected: upper temperature limit exceeded";
    elements.safetyDetail.textContent = `Illustrative peak ${formatTemperature(highestTemperature)} exceeds the ${formatTemperature(profile.upper)} limit by ${formatMargin(upperMargin)}`;
  } else {
    elements.safetyLabel.textContent = "Plan rejected: lower pre-cooling limit exceeded";
    elements.safetyDetail.textContent = `Illustrative low ${formatTemperature(lowestTemperature)} falls below the ${formatTemperature(profile.lower)} limit by ${formatMargin(lowerMargin)}`;
  }
}

function showView(route) {
  const target = document.querySelector(`[data-view="${route}"]`) || document.querySelector('[data-view="overview"]');
  document.querySelectorAll("[data-view]").forEach((view) => { view.hidden = view !== target; });
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === target.dataset.view);
  });
  document.querySelector("#mainNav").classList.remove("open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", "false");
  const titles = {
    overview: "GEONOS — Cold-storage peak management",
    simulator: "GEONOS — Planning simulator",
    method: "GEONOS — How it works",
    pilot: "GEONOS — 90-day pilot",
    company: "GEONOS — Company",
  };
  document.title = titles[target.dataset.view] || titles.overview;
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
}

function currentRoute() {
  return window.location.hash.replace("#", "") || "overview";
}

initializeChart();
simulate();
showView(currentRoute());

window.addEventListener("hashchange", () => showView(currentRoute()));

document.querySelector("#menuToggle").addEventListener("click", () => {
  const nav = document.querySelector("#mainNav");
  const open = nav.classList.toggle("open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", String(open));
});

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  simulate();
});

[elements.product, elements.heat, elements.load, elements.event, elements.curtailment]
  .forEach((element) => element.addEventListener("input", simulate));
