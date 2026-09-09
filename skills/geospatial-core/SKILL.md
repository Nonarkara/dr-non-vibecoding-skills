---
name: geospatial-core
description: >-
  Source, simplify, project, and serve map layers without shipping a 40MB
  GeoJSON. Use when a surface renders boundaries, points, routes, or basemaps.
license: MIT
---

# Geospatial Core

> A map layer has three sizes: the one the agency published, the one your browser can render, and the one that is still true. Getting from the first to the third without losing the third is the whole job.

[`map-3d-city`](../map-3d-city/SKILL.md) handles 3D buildings and the glitchy-overlap problem. [`satellite-change-watch`](../satellite-change-watch/SKILL.md) handles dated raster time-stacks. This skill is the plumbing under both, and under every control tower and civic dashboard in the practice: **where a layer comes from, what coordinate system it is in, how big it is allowed to be, and how precise you are allowed to make it.**

The recurring shape, observed across this practice's dashboards: a `public/geo/<place>/` tree carrying boundaries, roads, waterways, risk polygons, POIs, and heritage — every one of which arrives from a different source in a different projection at a different fidelity, and every one of which is a page-weight decision.

---

## The rule

Every layer carries its source, its date, its CRS, and its simplification tolerance — in a manifest, next to the file. A layer nobody can trace is a decoration, not data.

---

## The procedure

### 1. Coordinates: one rule that prevents most bugs

**Store and ship WGS84 lon/lat (EPSG:4326). Project only to draw.** Web maps display in Web Mercator (EPSG:3857); your data should not be stored in it, because Mercator distorts area badly at the latitudes where area matters.

GeoJSON is **lon, lat** — in that order. Almost every other tool, and every human, says "lat, long". This single transposition is the most common geospatial bug there is, it puts Bangkok in Somalia, and it is silent because both numbers are valid.

For anything in metres — buffers, distances, areas — project to a local metric CRS first. In Thailand that is UTM zone 47N (EPSG:32647) or 48N (EPSG:32648) depending on longitude. Computing a "500 m buffer" in degrees produces an ellipse that is wrong by a factor that changes with latitude.

### 2. Precision is a privacy decision, not a formatting one

Six decimal places locates a person to about 10 cm. Coordinate precision is how a "public open data layer" quietly becomes personal data under [`data-protection-pdpa`](../data-protection-pdpa/SKILL.md).

| Decimals | Roughly | Use for |
|---|---|---|
| 5 | 1 m | Survey, engineering assets |
| 4 | 10 m | Buildings, POIs, bus stops |
| 3 | 100 m | District-level display, most dashboards |
| 2 | 1 km | Incident reporting where the household must not be identifiable |

Round on export, deliberately, and write the choice in the manifest. Rounding also shrinks the file, often by more than simplification does — five decimals to three can halve a point-heavy layer for free.

### 3. Simplify to a budget you set first

Pick the page-weight budget before you touch the data, then simplify to it. Douglas–Peucker with topology preservation, so shared borders do not tear apart:

```bash
# Preserves shared boundaries between adjacent polygons — plain simplify does not
npx mapshaper districts.geojson \
  -simplify 8% keep-shapes \
  -filter-fields name_en,name_th,code \
  -o precision=0.001 format=geojson districts.min.geojson
```

`-filter-fields` is usually the bigger win. Agency exports carry thirty attribute columns and you render two; the other twenty-eight are page weight shipped to a phone on a flood day.

**Check what you broke.** Simplification is lossy and the loss is visual: render before and after at the zoom you actually ship, and confirm the coastline still meets the river.

### 4. Static files until they hurt, then tiles

| Layer size | Serve as | Why |
|---|---|---|
| < 500 KB simplified | GeoJSON on the CDN | One request, cacheable forever, no tile server to keep alive |
| 500 KB – 5 MB | Split by district, load on demand | The user looks at one district at a time |
| > 5 MB, or many zoom levels | Vector tiles (PMTiles) | A single file on object storage, range-requested — no tile server, which matters when the budget is `$0` |

Do not start with tiles. Most civic layers are a few hundred kilobytes after step 3, and a static file on a CDN is the thing that still works when everything else is down — which is the [`dual-write-resilience`](../dual-write-resilience/SKILL.md) posture applied to geometry.

### 5. Basemaps have licences, and they are load-bearing

OpenStreetMap data is ODbL: attribution is required, and it is not decorative. Keep "© OpenStreetMap contributors" visible, not in a collapsed panel. Commercial tile providers meter requests — check the tier before a dashboard goes on a screen in a control room and refreshes forever.

The offline question decides the architecture: a control room that must work during an outage needs self-hosted tiles, and that is a decision to make on day one, not after the first outage.

### 6. Admin boundaries: name them, do not trust them

Boundary files disagree — between agencies, between years, and between the official name and the one people use. Every boundary layer records **which agency published it, which year, and which code system** (in Thailand, ADM1/ADM2/ADM3 with TIS or HDX codes). Join on the code, never on the name: names carry transliteration variance, and Thai–English transliteration is not stable.

```json
// public/geo/<place>/manifest.json — next to the layers, not in a wiki
{
  "districts": {
    "source": "HDX Thailand ADM2, 2565 boundaries",
    "retrieved": "2026-08-14",
    "crs": "EPSG:4326",
    "simplify": "mapshaper 8% keep-shapes",
    "precision": 3,
    "join_key": "adm2_pcode",
    "licence": "CC-BY-IGO"
  }
}
```

That manifest is the geometry version of [`honest-envelope`](../honest-envelope/SKILL.md)'s `{source, tier, age}`, and it is what lets the next agent — or you in five weeks — regenerate the layer instead of guessing.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Shipping the agency's raw GeoJSON | Thirty unused attribute columns and 40 MB, on a phone, in a flood |
| `[lat, lon]` in GeoJSON | GeoJSON is `[lon, lat]`. Both numbers are valid, so nothing errors — it just draws in the wrong country |
| Buffering or measuring in degrees | A degree is not a distance. Project to a local metric CRS first |
| Six decimals on public incident data | That is 10 cm, and it may identify a household |
| Simplifying polygons independently | Shared borders tear. Use topology-preserving simplification |
| Starting with a tile server | Most civic layers fit on a CDN after simplification, with nothing to keep alive |
| Joining regions by name | Transliteration is not stable. Join on the official code |
| A layer with no source or date | Unreproducible, uncorrectable, and unciteable |

---

## The test

Delete every derived geo file and rebuild the tree from the manifest and the scripts. If you cannot — because a layer's source was a download somebody did once, in a projection nobody recorded — that layer is not data you have, it is data you found.
