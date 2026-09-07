---
name: satellite-change-watch
description: >-
  Collect trusted satellite imagery over time and show what changed. Use when
  monitoring land, flood, fire, or coast from NASA and open sources.
license: MIT
---

# Satellite Change Watch

> One image is a picture. A dated stack of the same tile is evidence. Collect on a schedule, diff honestly, label the latency.

[`data-catalog`](../data-catalog/SKILL.md) says catalogue once and port the adapter; [`reference/free-apis.md`](../../reference/free-apis.md) lists the free sources. This skill is the behaviour on top: build a time-stack of trusted imagery and render change — flood extent, burn scars, coastline — with the age printed next to the claim.

---

## The rule

Every change view names its two dates, its source, and its resolution. "Before/after" with no dates is a meme, not monitoring.

---

## The procedure

### 1. Sources (trusted, free, no scraping)

| Source | Gives | Access |
|---|---|---|
| NASA FIRMS (MODIS/VIIRS) | Active fire / thermal points | Free key, see `free-apis.md` |
| NASA EONET | Storms, floods, volcanoes, wildfires events | No key |
| NASA GIBS / Worldview | Daily imagery tiles (MODIS, VIIRS) | No key, tile URLs |
| Copernicus (Sentinel via CDS) | 10m optical for real change diffs | Free account |

Start with FIRMS points + GIBS tiles — no account, same-day results. Sentinel earns its account when 10m resolution changes a decision.

### 2. Collect on a schedule, store the stack

- Cron/launchd job per [`always-on-services`](../always-on-services/SKILL.md): fetch tile for fixed bbox + zoom, save `sat/<source>/<YYYY-MM-DD>.tif|.png`.
- Catalogue the source once per [`data-catalog`](../data-catalog/SKILL.md): endpoint, observed cadence → real latency, quota hits, the quirk (cloud mask lies, timestamps in UTC, tile edges).
- Keep last-good on failure; the dashboard shows "imagery 3 days old" rather than a gap — [`honest-envelope`](../honest-envelope/SKILL.md) tier discipline.

### 3. Diff simply, show the delta

- Level 1 (no vision model): side-by-side same-tile slider + FIRMS-point overlay. Ships in a day, answers most questions.
- Level 2: pixel diff on aligned tiles (same zoom/bbox or it is meaningless) → changed-area mask → area km² number with source + dates.
- Level 3 (only if Level 2 changes a decision weekly): CV segmentation — and then it is a [`know-when-to-wait`](../know-when-to-wait/SKILL.md) question, not a weekend patch. The iTIC skill's honest CV gap (researched pipeline, zero shipped inference lines) is the cautionary tale: say plainly what is thresholding vs what is a model.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Comparing different zooms/sources as before/after | Unaligned tiles diff into fiction — same bbox, same zoom, same source |
| Hiding the date gap | "Change" over a cloudy 40-day gap is weather, not deforestation — print both dates |
| Paid imagery day one | GIBS + FIRMS answer most civic questions free; pay only when 10m changes the call |
| Live-imagery claims | Revisit latency is days, not seconds — label age or lose trust |
| CV model before the slider survives | The slider + overlay is the product; the model is an upgrade with an eval set |

---

## The test

Pick a known event (a dated fire, a flood week). The stack shows the tile before, the tile after, the FIRMS overlay, both dates, and the source — all from local files, all reproducible by re-running the fetch job.
