---
name: godmode-floodair-dash
description: >-
  Wire FloodDash (RID water class) and AirDash (AQI banding) for a Thai city
  into the coupling layer. Use when adding flood, water, or air modules to a
  city dashboard.

license: MIT
---

# Godmode FloodDash + AirDash

The generalized connectors: `../../thailand-godmode/packages/connectors/flood-air/flood.ts` and
`.../air.ts`, ported from the Lopburi reference build's flood/air modules
with all station data moved into `../../thailand-godmode/configs/cities/<slug>.city.json`.

## Flood

- **Classification is RID's own published 5-band system**
  (`classifyWaterLevel` in `../../thailand-godmode/packages/core/src/cook.ts`) — never an invented
  percentage threshold.
- **No single stable no-auth JSON API covers every RID station** —
  `cookStationReading()` is deliberately a thin seam: wire in whatever the
  target province's real telemetry source is (RID's own feed, a provincial
  irrigation office's feed, or DDPM's flood-warning feed) and leave the
  classification/coupling logic untouched.
- A station with **no live feed still renders**, tagged `unavailable` —
  never omit it (an omitted station reads as "nothing to report" when the
  truth is "not wired up yet").
- `downstreamLegsFor()` is what makes the flood coupling's "hours until this
  district needs to act" possible — fill `hydrology.downstream[]` in the
  city config, per district, with real travel times, not estimates
  presented as measured.

## Air

- **Classification is Thai PCD's published PM2.5 breakpoints**
  (`classifyPm25`) — same rule, no invented scale.
- **Open-Meteo air-quality is the always-available floor** — no key, works
  for any lon/lat, so a brand-new city has a working AQI reading before a
  single Air4Thai station is wired. Add real Air4Thai station IDs
  (`airQuality.stations[]`) as a strict improvement on top of this floor,
  never as a hard requirement for the module to render at all.

## Feeding the coupling layer

Both modules exist to feed `../../thailand-godmode/packages/core/src/cook.ts`'s couplings, not to
stand alone as independent cards — see
[`godmode-cook-and-couple`](../godmode-cook-and-couple/SKILL.md). At
minimum, a new city should be able to build: `coupleFlood` (needs a
classified water reading + a rain forecast), `coupleWashout` (needs a rain
reading + a PM2.5 reading). If a city has no hydrology stations at all,
`coupleFlood` degrades to fully `unavailable` — that's correct behavior, not
a bug to route around with placeholder data.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Copying another province's bank-level reference for a new station | It's a real published value per station — get it from RID or the local authority, or leave the station unclassified |
| Requiring an Air4Thai key before AQI renders at all | Open-Meteo is the floor; Air4Thai is a strict improvement |
| Omitting a station with no live feed | Render it `unavailable` — an honest gap is better than a silent omission |
