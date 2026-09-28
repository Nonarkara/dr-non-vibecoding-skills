# Thailand Godmode

The toolkit that turns *"I found a Thai city on a map"* into a live,
multi-layer, zero-baht operations dashboard for that city — a **God Mode**
view of tourism demand, flood/water, air quality, weather, traffic/CCTV, and
public data, all on one screen, for a governor or operator who has never
opened a terminal.

This folder is the Thailand-city-specific delta this practice's general
[`skills/`](../skills) library doesn't already cover. Check there first —
`skills/data-catalog`, `skills/free-api-keys`, `skills/geospatial-core`,
`skills/itic-cctv-integration`, `skills/dashboard-discipline`,
`skills/axiom-design-core`, and the backend skills
(`appsec-stack`/`auth-entitlement`/`db-migrations`/`caching-layers`/
`data-protection-pdpa`/`always-on-services`) — before writing anything new;
the seven `skills/godmode-*` entries exist only for the composition step
those don't do on their own. See [`docs/SIBLING-REPOS.md`](docs/SIBLING-REPOS.md).

## What "God Mode" actually means

Not a bigger dashboard. A **governor's-eye view**: every number is compared
to something (a threshold, a neighbour district, yesterday), every layer is
joined to the layers it actually interacts with (water level × rain
probability × downstream travel time, not three separate cards), and
nothing is invented — every value is labelled `live` / `scenario` /
`reference` and traceable to a named source. This is the standing critique
that produced the coupling engine in the Lopburi build; it is now a
reusable primitive. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Quick start — stand up a new city

```bash
node scripts/new-city.mjs "Nakhon Ratchasima"
```

Then work through [`docs/NEW-CITY-CHECKLIST.md`](docs/NEW-CITY-CHECKLIST.md).
The reference implementation this was extracted from is the Lopburi build
(`lopburi.nonarkara.org`, `Nonarkara/lopburi-dashboard`) — when in doubt
about how a piece is supposed to behave, that's the working example.

## Layout

```
configs/schema/city-config.schema.json   the contract a new city must satisfy
configs/cities/_template.city.json       copy this to start a new city
configs/cities/lopburi.city.json         filled reference example
packages/core/                           cache tiers, cook/coupling engine,
                                          scenario engine, module registry,
                                          city-config loader
packages/connectors/
  datagoth/                              data.go.th CKAN search-by-city
  cctv/                                  ITIC/Longdo honest 3-tier CCTV
  social-listening/                      RSS/GDELT keyword scrape
  flood-air/                             RID/TMD water+rain classing, AQI
packages/design/                         per-province palette over the
                                          Axiom Design Core token layer
scripts/new-city.mjs                     scaffold a city config
scripts/fetch-datagoth.mjs               CLI: dump a city's data.go.th catalog
scripts/test-cook.mjs                    generic cook/coupling engine tests
docs/                                    architecture, zero-baht stack, checklist
```

Map/satellite/basemap OOTBPAP wiring lives in the sibling
`DrNon-Global-Satellite-Toolkit` repo (`src/basemaps/thailand-priority-chain.ts`),
not duplicated here — see `docs/SIBLING-REPOS.md`.

## House rules (inherited from the Lopburi build)

- Zero border-radius, zero box-shadow, zero gradients, zero "Loading..." text.
- Every number carries a tier label and, where it has one, an age.
- Thai first, English second, on every reader-facing surface.
- Status colors (green/amber/orange/red) are load-bearing and never reused
  for province branding.
- A number without a comparison is not information.

Run `node --experimental-strip-types scripts/test-cook.mjs` to verify the
cook/coupling engine — no build step required (Node 22.6+ type-stripping).
