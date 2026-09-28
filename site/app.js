const svgNS = "http://www.w3.org/2000/svg";

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
  chart: document.querySelector("#loadChart"),
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
  tempFill: document.querySelector("#tempFill"),
  tempMarker: document.querySelector("#tempMarker"),
  metricCapacity: document.querySelector("#metricCapacity"),
  metricShifted: document.querySelector("#metricShifted"),
  metricDuration: document.querySelector("#metricDuration"),
  metricRebound: document.querySelector("#metricRebound"),
  heroReserve: document.querySelector("#heroReserve"),
};

const productProfiles = {
  frozen: { lower: -24, upper: -18, start: -21.2, inertia: 1.0 },
  chilled: { lower: 1, upper: 5, start: 2.8, inertia: 0.78 },
  pharma: { lower: 2, upper: 8, start: 4.7, inertia: 0.62 },
};

const antalyaClimate = [
  [1991, 1117.4], [1992, 1042.8], [1993, 1180.6], [1994, 1368.3], [1995, 1121.8],
  [1996, 1145.9], [1997, 1009.7], [1998, 1190.3], [1999, 1167.9], [2000, 1241.3],
  [2001, 1275.4], [2002, 983.1], [2003, 1091.4], [2004, 1065.5], [2005, 1059.1],
  [2006, 1230.5], [2007, 1323.9], [2008, 1334.3], [2009, 1176.2], [2010, 1178.6],
  [2011, 1127.8], [2012, 1270.9], [2013, 1134.4], [2014, 1151.2], [2015, 1099.7],
  [2016, 1287.3], [2017, 1256.8], [2018, 1336.5], [2019, 1264.8], [2020, 1415.1],
  [2021, 1260.6], [2022, 1243.5], [2023, 1285.1], [2024, 1586.8], [2025, 1437.9],
];

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

function initializeClimateChart() {
  const grid = document.querySelector("#climateGrid");
  const bars = document.querySelector("#climateBars");
  const labels = document.querySelector("#climateLabels");
  if (!grid || !bars || !labels) return;

  const frame = { left: 48, right: 732, top: 24, bottom: 315 };
  const yMin = 850;
  const yMax = 1650;
  const xStep = (frame.right - frame.left) / antalyaClimate.length;
  const yFor = (value) => frame.bottom - ((value - yMin) / (yMax - yMin)) * (frame.bottom - frame.top);

  [900, 1100, 1300, 1500].forEach((value) => {
    const y = yFor(value);
    grid.append(makeSvg("line", { x1: frame.left, x2: frame.right, y1: y, y2: y, class: "climate-grid-line" }));
    const label = makeSvg("text", { x: frame.left - 8, y: y + 4, "text-anchor": "end", class: "climate-label" });
    label.textContent = value.toLocaleString();
    labels.append(label);
  });

  antalyaClimate.forEach(([year, value], index) => {
    const x = frame.left + index * xStep + 2;
    const y = yFor(value);
    bars.append(makeSvg("rect", {
      x,
      y,
      width: Math.max(4, xStep - 4),
      height: frame.bottom - y,
      rx: 1,
      class: year >= 2020 ? "climate-bar recent" : "climate-bar",
    }));
  });

  [1991, 2000, 2010, 2020, 2025].forEach((year) => {
    const index = antalyaClimate.findIndex((item) => item[0] === year);
    const x = frame.left + index * xStep + xStep / 2;
    const label = makeSvg("text", { x, y: 340, "text-anchor": "middle", class: "climate-label" });
    label.textContent = year;
    labels.append(label);
  });

  const start = antalyaClimate[0][1];
  const end = antalyaClimate.at(-1)[1];
  const trend = makeSvg("path", {
    d: `M${frame.left + xStep / 2},${yFor(start)} L${frame.right - xStep / 2},${yFor(end)}`,
    class: "climate-trend-line",
  });
  bars.append(trend);
}

function pointPath(values, maxValue) {
  return values.map((value, index) => {
    const x = plot.left + ((plot.right - plot.left) * index) / (values.length - 1);
    const y = plot.bottom - ((plot.bottom - plot.top) * value) / maxValue;
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function areaPath(values, maxValue) {
  const line = pointPath(values, maxValue);
  return `${line} L${plot.right},${plot.bottom} L${plot.left},${plot.bottom} Z`;
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

  const allowable = Math.max(0.08, Math.min(0.43, profile.inertia * (0.46 - (heat - 30) * 0.012)));
  const qualifiedFraction = Math.min(requested, allowable);
  const accepted = requested <= allowable + 0.0001;
  const shifted = [...baseline];

  for (let hour = Math.max(0, eventStart - 3); hour < eventStart; hour += 1) {
    const ramp = (hour - (eventStart - 3) + 1) / 3;
    shifted[hour] *= 1 + qualifiedFraction * (0.25 + 0.35 * ramp);
  }

  for (let hour = eventStart; hour < eventEnd; hour += 1) {
    shifted[hour] *= 1 - qualifiedFraction;
  }

  const reboundRatio = 1.04 + Math.max(0, heat - 32) * 0.005;
  for (let hour = eventEnd; hour < Math.min(24, eventEnd + 2); hour += 1) {
    shifted[hour] *= 1 + qualifiedFraction * 0.42 * reboundRatio;
  }

  const eventBaselinePeak = Math.max(...baseline.slice(eventStart, eventEnd));
  const eventShiftedPeak = Math.max(...shifted.slice(eventStart, eventEnd));
  const qualifiedCapacity = Math.max(0, eventBaselinePeak - eventShiftedPeak);
  const shiftedEnergy = baseline
    .slice(eventStart, eventEnd)
    .reduce((total, value, index) => total + Math.max(0, value - shifted[eventStart + index]), 0);

  const overshoot = Math.max(0, requested - allowable);
  const thermalUse = Math.min(1.18, (requested / allowable) * 0.88);
  const peakTemp = profile.start + (profile.upper - profile.start) * thermalUse + overshoot * 9;
  const breaches = peakTemp > profile.upper ? Math.max(1, Math.ceil((peakTemp - profile.upper) * 4)) : 0;

  const maxValue = Math.max(...baseline, ...shifted) * 1.12;
  elements.baselinePath.setAttribute("d", pointPath(baseline, maxValue));
  elements.shiftedPath.setAttribute("d", pointPath(shifted, maxValue));
  elements.baselineArea.setAttribute("d", areaPath(baseline, maxValue));
  elements.shiftedArea.setAttribute("d", areaPath(shifted, maxValue));

  const eventX = plot.left + ((plot.right - plot.left) * eventStart) / 24;
  const eventWidth = ((plot.right - plot.left) * duration) / 24;
  elements.eventBand.setAttribute("x", eventX);
  elements.eventBand.setAttribute("width", eventWidth);
  elements.eventLabel.textContent = `GRID EVENT · ${String(eventStart).padStart(2, "0")}:00–${String(eventEnd).padStart(2, "0")}:00`;

  elements.metricCapacity.textContent = Math.round(qualifiedCapacity).toLocaleString();
  elements.metricShifted.textContent = Math.round(shiftedEnergy).toLocaleString();
  elements.metricDuration.textContent = duration.toFixed(1);
  elements.metricRebound.textContent = reboundRatio.toFixed(2);
  elements.heroReserve.textContent = Math.round(qualifiedCapacity).toLocaleString();

  const formatTemperature = (value) => `${value < 0 ? "−" : ""}${Math.abs(value).toFixed(1)}°C`;
  const tempPosition = Math.max(5, Math.min(96, ((peakTemp - profile.lower) / (profile.upper - profile.lower)) * 100));
  elements.tempFill.style.width = `${tempPosition}%`;
  elements.tempMarker.style.left = `${tempPosition}%`;

  elements.safetyStrip.classList.toggle("rejected", !accepted || breaches > 0);
  elements.safetyStrip.querySelector(".safety-icon").textContent = accepted && breaches === 0 ? "✓" : "×";
  elements.safetyLabel.textContent = accepted && breaches === 0 ? "PLAN WITHIN MODELED LIMIT" : "PLAN REJECTED — SAFETY GATE";
  elements.safetyDetail.textContent = accepted && breaches === 0
    ? `Peak product temperature ${formatTemperature(peakTemp)} · 0 breaches`
    : `Projected ${formatTemperature(peakTemp)} exceeds ${formatTemperature(profile.upper)} limit · ${breaches || 1} breach${breaches === 1 ? "" : "es"}`;
}

initializeChart();
initializeClimateChart();
simulate();

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  simulate();
});

[elements.product, elements.heat, elements.load, elements.event, elements.curtailment]
  .forEach((element) => element.addEventListener("input", simulate));

document.querySelectorAll("[data-run-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#lab").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => elements.form.querySelector("button").focus(), 550);
  });
});

const briefButton = document.querySelector("#downloadBrief");
if (briefButton) {
  briefButton.addEventListener("click", () => {
    const brief = [
      "GEONOS — THERMAL RESERVE (WORKING NAME)",
      "True Zero Global Prize 2026 prototype brief",
      "",
      "MISSION",
      "Turn existing cold-chain telemetry into a verified flexibility contract: how many kilowatts can move, for how long, without crossing the temperature line.",
      "",
      "CURRENT STATUS",
      "Interactive deterministic prototype. It does not control equipment, use customer data, participate in an electricity market, or claim field-verified flexibility, savings or emissions reductions.",
      "",
      "90-DAY PILOT",
      "1. Connect — data rights, equipment boundary, BMS/power connector and food-safety review.",
      "2. Observe — silent-mode model calibration and operator review.",
      "3. Dispatch — one supervised event with hard stops and manual override.",
      "4. Verify — independent energy and temperature review plus replication brief.",
      "",
      "CONTACT",
      "Jangho Lee, Ph.D. — jangho.lee@nyu.edu — https://jangholee.com",
    ].join("\n");

    const blob = new Blob([brief], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "GEONOS_Thermal_Reserve_Prototype_Brief.txt";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  });
}
