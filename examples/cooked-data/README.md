# Cooked data, without a live-data costume

From the repository root:

```bash
python3 examples/cooked-data/cook.py examples/cooked-data/observations.json
python3 scripts/test-cooked-data.py
```

Python 3 standard library only, offline and read-only; output is printed GeoJSON.
No server, account, database, scheduler or model is installed. The source locations
and readings are **synthetic teaching data**. A current run correctly labels old
readings stale. `--as-of 2026-10-18T13:00:00Z` is for a repeatable historical test,
never a way to make old observations look fresh today.

Schema: `schema_version: 1`, `source` with name/license/url/tier, timezone-qualified
`fetched_at`; places have unique id/name/WGS84 `[longitude, latitude]`. Observation
rows have `place_id`, zoned `at`, `water_level_m`, `rain_24h_mm` (finite numbers or
explicit null). Non-synthetic tiers `observed`/`cache` require an HTTPS source URL.
Only public non-sensitive data belongs in examples; declarations do not verify a source.

The latest two water levels at the same place, at most 24h apart, produce delta
and interval. Missing values/history stay `insufficient-data`, never zero. Rain is
context, not proof of causation. Six hours is this example's latest-reading stale
policy, not a universal cadence; the oldest comparison-input age is exposed too.
The raw-file SHA-256, method, limitations and source tier travel with the GeoJSON.

Input is bounded to 1 MB, 100 places and 1,000 observations; invalid input exits
nonzero without a partial result. Units must be converted by a reviewed adapter.
Bounds cannot detect every coordinate swap; spot-check a known landmark. No
cross-place aggregation, flood threshold, forecast, validated alert, raster
analysis or 3D runtime is included. Rendering a table/map is a separate next step
in [BUILD_PATHS.md](../../BUILD_PATHS.md), not an already-passed screen test.

Tests exercise missing/zero, stale/empty, wrong geography, duplicate IDs/times,
malformed units/times, non-finite numbers, long intervals and CLI receipts.
Original example: MIT, applying this repo's [honest-envelope](../../skills/honest-envelope/SKILL.md)
and [cook-and-couple](../../skills/godmode-cook-and-couple/SKILL.md) disciplines.
