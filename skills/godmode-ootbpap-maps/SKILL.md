---
name: godmode-ootbpap-maps
description: >-
  Wire maps, satellite imagery, and free basemap APIs for a Thai city out of
  the box. Use when adding map or satellite layers, or choosing a basemap
  fallback chain.
license: MIT
---

# Godmode OOTBPAP Maps

"Out of the box, plug and play": a new city gets a working map with sane
free-tier defaults and zero required API keys, by construction.

## What's already solved elsewhere — don't redo it

- The **full ~30-source satellite/EO/orbital registry** and the **basemap
  fallback-chain mechanism** are already built in
  `DrNon-Global-Satellite-Toolkit` (`src/registry/global-satellite-apis.ts`,
  `src/basemaps/basemap-catalog.ts`). This repo's
  `DrNon-Global-Satellite-Toolkit/src/basemaps/thailand-priority-chain.ts` vendors that mechanism,
  reordered so Longdo Map (Thai street names) sits ahead of ESRI World
  Imagery — a province dashboard's default view should read in Thai.
- **Precision/simplification/CRS discipline** for any GeoJSON layer this
  city adds (boundaries, waterways, corridors) is
  `dr-non-vibecoding-skills/skills/geospatial-core` — WGS84 lon/lat storage,
  project only to draw, topology-preserving simplification, a manifest next
  to every layer recording source/date/CRS/precision.

## What this repo adds

- `thailandRelevantEarthObservationIds` — the slice of the global satellite
  registry with real Thailand coverage and no-auth/free-key access (NASA
  GIBS, GISTDA disaster gateway, Copernicus CDSE STAC, NASA POWER). Start
  here rather than wiring the full global catalog into a province dashboard.
- The reordered basemap chain: Mapbox (if token present) → **Longdo Map**
  (if key present) → OSM → ESRI World Imagery → CartoDB → gradient. The map
  always renders — worst case is the gradient fallback, never a blank tile
  area.

## Procedure for a new city

1. `getBestBasemap(availableTokens)` picks the right default given whatever
   env vars are actually configured — don't hardcode a basemap choice per
   city.
2. Pull GISTDA disaster-platform layers (flood/fire/drought tiles) for the
   province's bounding box — same API key across all of Thailand, so this
   is genuinely zero marginal cost per new city.
3. Any corridor/zone GeoJSON follows `geospatial-core`'s manifest
   discipline — see that skill before shipping a boundary layer with no
   recorded source/date/CRS.
4. Overlay panel positioning follows `dashboard-discipline` and this
   toolkit's own house rule: compact corner overlays, never a full-width bar
   crossing the map.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Re-deriving the satellite/basemap registry per city | It's already global and free — vendor and filter, don't rebuild |
| Requiring a Mapbox token for the map to render at all | The fallback chain exists precisely so no key is ever required |
| Shipping the agency's raw, unsimplified GeoJSON boundary | `geospatial-core`'s simplification budget applies here unchanged |
