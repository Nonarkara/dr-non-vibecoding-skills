---
name: godmode-datagoth-harvest
description: >-
  Harvest data.go.th (Thailand's CKAN open-data portal) for every dataset
  naming a city or province. Use when building or refreshing a city's data.go.th
  data page.

license: MIT
---

# Godmode data.go.th Harvest

data.go.th runs on CKAN — the same platform behind data.humdata.org and
hundreds of other government open-data portals — so the CKAN Action API's
`package_search?q=` applies directly, with no key required. This is the
mechanism behind `../../thailand-godmode/packages/connectors/datagoth/search-by-city.ts`.

## The procedure

1. `node scripts/fetch-datagoth.mjs "<City Name>" "<ชื่อจังหวัด>" [aliases...]`
   — dumps every unique dataset any of those terms matches, to stdout as
   JSON, with a per-term dataset count on stderr so you can see which
   spelling actually found results.
2. **Review before baking in.** CKAN free-text search over-matches (a
   province name that's also a common word, an unrelated dataset that
   happens to mention the city in passing). Read the dumped titles/
   organizations before committing the query list to
   `../../thailand-godmode/configs/cities/<slug>.city.json`'s `dataGoThQueries`.
3. At build/runtime, `searchDataGoThByCity(citySearchTerms(config))` re-runs
   the same queries — this is a live harvest, not a one-off snapshot, so a
   newly published dataset shows up without a code change.
4. `buildCatalogPage(datasets)` groups by publishing organization and format,
   for a browsable `/<city>/data` page — see the Lopburi reference build's
   `/lopburi/data` route for the shipped example.

## The quirks (CKAN, observed)

- `q=` doesn't reliably OR multiple free-text phrases — run one call per
  spelling variant (Thai name, English name, common aliases) and de-dupe by
  dataset `id`, rather than trying to build one clever query string.
- `title_th` is sometimes empty even when the dataset is Thai-only — fall
  back to `title` for display, never leave a blank field visible.
- Resource `last_modified` is per-resource, not per-dataset — a dataset's
  own `metadata_modified` is the more reliable "how fresh is this listing"
  signal; the resource-level date only tells you when that specific file was
  last replaced.
- One bad/timing-out query term must not fail the whole harvest — the
  connector already returns `[]` for a failed term rather than throwing; keep
  that behavior if you extend it.

## Pairs with

`dr-non-vibecoding-skills/skills/data-catalog` — the general "two-tier
freshness, cache aggressively, keep last-good" discipline this harvester
follows. This skill is the Thailand-specific instance of that pattern.
