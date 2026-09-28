# GEONOS — True Zero Global Prize 2026 Application

**Submission draft · 28 September 2026**

> The deadline is today, but the public page does not state a cutoff time or timezone. Complete the remaining bracketed fields, check the public prototype and submit as soon as possible. Save a copy of the final answers and the confirmation page.

## Current position

- **Company:** GEONOS
- **Product:** A planning tool for cold-storage peak-load shifting
- **Stage:** Interactive rule-based prototype. No customer deployment, equipment control, market participation, revenue or field-verified impact yet.

---

## 1. What is the name of your company?

GEONOS

---

## 2. Describe your startup Twitter style.

GEONOS helps cold stores test whether refrigeration load can move away from peak hours. It compares candidate kW, rebound and an illustrative temperature range before any control change.

---

## 3. What is unique about your company? What does it do or will do to change its industry or how people do things?

Cold-storage load shifting is not new. The hard part is deciding what a particular room can do on a particular day. Product type, temperature limit, outdoor heat, door activity, throughput and equipment condition all affect the answer. A generic request to reduce power from 5 to 7 p.m. does not tell an operator how much load can move, how long the reduction can be held or how large the rebound will be.

GEONOS is building a planning tool for that decision. The current prototype lets a user set the typical peak refrigeration load, outdoor temperature, product profile, event window and requested reduction. It creates a 24-hour baseline, adds a pre-cooling period, models the event and recovery, and rejects a plan when its illustrative storage-temperature proxy leaves the selected range. It reports candidate peak reduction, peak-period energy reduction, rebound energy, duration and temperature margin separately.

We are not replacing refrigeration controls or demand-response aggregators. Controls run the equipment; aggregators manage market participation. GEONOS is intended to sit between them, helping an operator assess what a site might offer before a live event and documenting what should be checked afterward. A field version would use the facility's interval power, room and product temperatures, operating records, weather and control limits. Any live dispatch would remain operator-approved, and some sites would need additional metering.

The current model is rule-based and transparent. The website shows public Antalya climate context alongside clearly labeled facility assumptions; the simulator does not treat that regional data as site data. It does not control equipment, participate in an electricity market or claim field savings. Shifted electricity is not automatically saved electricity or an emissions reduction. A field report would keep peak kW, peak-period and rebound kWh, and temperature performance separate, and would calculate emissions only with an appropriate time-varying grid signal.

We would begin with a paid site assessment, followed by recurring event planning and reporting. Target customers are cold-storage operators; refrigeration firms, energy-service companies and aggregators are potential channel partners. For a new market, we would update its weather, tariff, program and temperature rules.

---

## 4. Please provide your website or access to your prototype.

**Prototype:** https://geonos-ai.github.io/geonos-thermal-reserve/

No username or password is required.

The prototype opens an Antalya peak-load planning lab. Reviewers can change outdoor temperature, typical peak refrigeration load, event hours, product type and requested load reduction. It shows a modeled baseline, pre-cooling period, peak event and recovery. If the illustrative temperature proxy leaves the selected range, the plan is rejected.

This is a rule-based demonstration shown alongside public climate context and labeled facility assumptions. It is not connected to a facility and does not show field results.

---

## 5. It's important for your team to provide a video introducing yourselves and your product/idea. It has to be less than 3 minutes. If a password is needed, please provide it. You can upload it here or send us the YouTube or another URL of the video.

**Video URL:** [PASTE AN UNLISTED YOUTUBE OR VIMEO URL]

**Access:** No password required.

**Target runtime:** 2 minutes 30 seconds. Record the prototype rather than presenting a slide deck.

### Suggested recording script

**0:00–0:20 — Jangho on camera**

“Cold stores often use the most electricity during the same hot hours when the grid is under pressure. Some refrigeration load may be movable, but operators need to know the temperature risk and the rebound before changing anything.”

**0:20–0:45 — Open the prototype**

“I’m Jangho Lee, founder of GEONOS. We are building a planning tool for cold-storage peak-load shifting. It helps a site test a proposed event before any live control change.”

**0:45–1:20 — Run a feasible scenario**

“In this prototype I can choose the product, outdoor temperature, typical peak load, event window and requested reduction. The model estimates a baseline, pre-cooling, the peak event and the recovery afterward. It reports candidate kilowatts, peak-period energy reduction, rebound energy and an illustrative temperature range separately.”

**1:20–1:45 — Increase the request until it is rejected**

“If I ask for too much reduction on a hotter day, the model rejects the plan when its illustrative temperature proxy crosses the selected limit. This proxy is not a field prediction. At a real site, qualified refrigeration staff would calibrate the model and the operator would keep manual control.”

**1:45–2:10 — Explain the evidence boundary**

“This is a rule-based demonstration shown alongside public climate context and facility assumptions. It is not customer data, live control or a verified savings claim. The next step is to replace these assumptions with site data and test the workflow in an observation-only phase.”

**2:10–2:30 — Return to camera**

“The prize would fund a Türkiye pilot: site data connection, refrigeration and food-safety review, metering, one supervised test if the site passes its safety gates, and independent measurement and verification. Our goal is a useful result, including a clear no-go if a site is not suitable.”

### Video checks

- Keep the video below 3 minutes.
- Use an unlisted link if the F6S upload limit makes the interface hard to read.
- Add English captions.
- Confirm the link works in a signed-out/private window.

---

## 6. Please provide your full name, email, phone number, role and relevant URLs (Linkedin, Twitter, Facebook, Personal Blog, etc.). Thank you.

Jangho Lee, Ph.D.<br>
Founder, Climate Science & Product · GEONOS<br>
Email: jangho.lee@nyu.edu<br>
Phone: +1 979 676 4875<br>
Location: New York, NY, United States<br>
Website: https://jangholee.com<br>
LinkedIn: https://www.linkedin.com/in/jholee92/<br>
GitHub: https://github.com/jangholee92<br>
ORCID: https://orcid.org/0000-0002-8942-1092

Jangho is an atmospheric scientist and GeoAI researcher with a Ph.D. in Atmospheric Science from Texas A&M University. His work covers urban climate, remote sensing, climate informatics and the use of physical data in operational decisions.

---

## 7. What does each member of the team do?

**Jangho Lee, Ph.D. — Founder, Climate Science & Product**

Jangho leads the product, climate and thermal-risk methodology, prototype development, data work and pilot design. He is the current technical builder.

**Pilot specialists — to be contracted**

A qualified refrigeration or controls engineer, a food-safety reviewer and an independent measurement-and-verification reviewer would have defined approval roles in a field pilot. They are not current employees. GEONOS is currently founder-led.

---

## 8. Where is your team located?

GEONOS is based in New York, United States. We propose to run the first field pilot in Türkiye with local refrigeration, food-safety and measurement specialists. The planning workflow can be adapted to other countries by changing local weather, tariff, program and temperature rules.

---

## 9. Besides the founders, how many employees do you have? How many engineers?

GEONOS has 0 employees besides the founder and 0 additional engineers. Jangho Lee is the current technical builder. The proposed pilot would use contracted refrigeration, food-safety and independent measurement-and-verification specialists.

---

## 10. Who are your competitiors? What differentiates you? Please include URLs.

**GridBeyond** — https://gridbeyond.com/your-industry-2/food/

GridBeyond provides demand response, optimization and market access for industrial energy users, including cold storage. GEONOS is narrower: it is designed to help a facility prepare and review a candidate event before participation. An aggregator could use that site-reviewed plan rather than be replaced by it.

**Danfoss Alsense Food Retail** — https://www.danfoss.com/en/products/dcs/monitoring-and-services/alsense-food-retail/alsense-food-retail-iot-cloud-application-for-supermarkets/

Alsense provides refrigeration monitoring, alarms, efficiency tools and food-safety support. GEONOS does not replace refrigeration monitoring or control. It focuses on planning and documenting a temporary peak-load shift using data from systems such as these.

**Viking Cold Solutions** — https://www.vikingcold.com/

Viking Cold adds thermal-energy-storage hardware and controls to cold facilities. GEONOS first tests the flexibility available from the existing room, product and equipment. Added storage could increase the feasible range later.

**Engineering audits and in-house energy teams**

An engineer can study a site in depth, but a one-time study is hard to repeat for changing weather and operating conditions. GEONOS aims to make the same planning checks repeatable while leaving technical approval with the site team.

Our difference is the narrow workflow between refrigeration operations and a peak-load event: estimate a baseline, model pre-cooling and recovery, test a temperature limit, report the rebound, and keep the result separate from an emissions claim. We do not claim that load shifting itself is new, and we expect to work with controls providers, refrigeration firms and aggregators.

---

## 11. If you have a company deck, please upload it here. (Max file size 30MB.)

Suggested filename: `GEONOS_True_Zero_Global_Prize_2026.pdf`

If a deck is uploaded, keep it below the smaller limit shown in the live F6S interface and use the same facts as this application. A concise version should cover:

1. the cold-storage peak-load problem,
2. the current prototype,
3. a feasible and a rejected scenario,
4. intended users and business model,
5. competitors and differentiation,
6. the Türkiye pilot,
7. team and current limitations, and
8. use of the $50,000 prize.

Do not upload an older deck built around a different product story.

---

## 12. If you have already raised any financing, please state it here along with the amount. If you have self-funded it, how much capital has your team invested in the company?

GEONOS has not raised external equity, debt or grant financing as a company and has no revenue to date. Prototype development has been self-funded through founder time and existing computing resources.

**Cash invested by the team:** [ENTER THE EXACT USD CASH AMOUNT, EVEN IF $0]

Do not include academic research funding or prior awards unless funds were legally awarded to and spent by GEONOS.

---

## 13. Why should we choose your company?

GEONOS is early, and I want to be clear about what exists today: a working public prototype, a transparent rule-based model and a specific pilot plan. We do not yet have a customer deployment or field-verified impact.

The problem is practical. Cold stores face high refrigeration demand during hot peak hours, while electricity systems need flexible demand. Operators cannot risk stored food to test a grid idea. A useful tool has to show the proposed load reduction, the rebound and the temperature margin together, and it has to allow a plan to fail.

My background is in atmospheric science, GeoAI and physical climate risk. That experience is useful for building a climate-aware model, but the pilot will also require refrigeration, food-safety and measurement-and-verification specialists. GEONOS will not ask software to replace their judgment.

The $50,000 prize would be used to close the gap between a browser demonstration and evidence from one real facility: $12,000 for site data connection, $11,000 for refrigeration and safety engineering, $10,000 for metering and a supervised test, $10,000 for independent measurement and verification, $5,000 for Türkiye market and legal work, and $2,000 contingency.

The first 90-day pilot would begin with observation only and no equipment control. We would check data quality, calibrate the model, agree on hard temperature and operating limits, and let the site team decide whether a supervised event is safe. The result could be positive, negative or inconclusive. All three would be useful because they show what must be true before cold-storage flexibility can be offered responsibly.

The idea connects two priorities in COP31 Türkiye's clean-energy agenda—sustainable cooling and grid flexibility—while keeping the first test small enough to examine closely.

True Zero can help GEONOS produce one result that a cold-store operator, a refrigeration engineer and an energy buyer can all examine. That is the evidence needed before making a larger climate claim.

---

## 14. Recommendations

F6S asks for recommendation contacts separately. Request recommendations only from people who can describe direct work with Jangho or the team. Do not ask anyone to imply field performance they have not seen.

Suggested order:

1. A senior climate, GeoAI or physical-systems collaborator who has reviewed Jangho's modeling work.
2. Someone who worked directly with Jangho on climate investment or commercialization.
3. If available, a refrigeration, cold-chain, utility or measurement-and-verification practitioner who reviewed the proposed pilot logic. Do not describe the person or organization as a partner unless that relationship exists.

### Recommendation request

Subject: True Zero Global Prize recommendation for GEONOS

Hello [Name],

I am applying to the True Zero Global Prize with GEONOS. We are building a planning tool that compares how much refrigeration load a cold-storage facility may be able to move away from a peak period, the expected rebound and the modeled temperature range.

Would you be comfortable providing a short F6S recommendation based only on the work you have directly seen from me/us, particularly [specific project or capability]? The current product is an interactive rule-based prototype, not a field deployment, and I do not want the recommendation to imply customer traction or verified impact that does not yet exist.

The deadline is 28 September. I can send the prototype and a short summary immediately. Thank you for considering it.

Best,<br>
Jangho

---

## Final submission checklist

- [ ] Open https://geonos-ai.github.io/geonos-thermal-reserve/ in a signed-out/private window and test every control.
- [ ] Record and upload the under-3-minute video; replace the bracketed video URL.
- [ ] Enter the exact self-funded cash amount.
- [ ] Confirm the primary contact email and use it consistently.
- [ ] If uploading a deck, use only the current GEONOS story and check the live file-size limit.
- [ ] Save a copy of every answer before submitting.
- [ ] Submit immediately and capture the confirmation page or email.

## Claims to avoid

- Customer, partner, pilot, revenue or field-impact claims that do not yet exist.
- “AI autonomously controls the facility.”
- “Verified savings,” “verified flexibility” or “avoided emissions.”
- Treating demonstration assumptions or public climate data as customer data.
- Converting shifted kWh into avoided CO₂ using only an annual average grid factor.
- Suggesting that the tool replaces refrigeration, food-safety, controls or measurement-and-verification professionals.
