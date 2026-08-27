---
name: itic-cctv-integration
description: Wiring Thailand's public Longdo/iTIC traffic-camera and incident feeds into a city dashboard — the fetch/cache/fallback shape, the three degrees of "live" a camera can actually offer, and where the current best implementation lives. Use when adding real-time traffic cameras to any Thai city dashboard.
license: MIT
---

# iTIC / Longdo CCTV Integration

Thailand's iTIC Foundation traffic system (rendered publicly at live.iticfoundation.org, vendored by Longdo) exposes two free JSON feeds this practice already integrates in five separate projects. This is the pattern, and — per `data-catalog`'s own rule — the extraction that's now overdue.

## The two feeds

```
https://event.longdo.com/feed/json           incidents (type, location, description)
https://camera.longdo.com/feed/?command=json  cameras (lat/lng, snapshot imgurl, sometimes hls_url)
```
No key required. Normalize, cache with a TTL (these aren't second-by-second feeds), and render on a map.

## The three degrees of "live" — pick honestly, per camera

A camera entry does not guarantee a video stream. In order of what's actually available, worst to best:

1. **No stream** — camera exists on the map, no `imgurl`/`hls_url` resolves. Show it as a pin only.
2. **Snapshot polling** — an `imgurl` that returns a fresh JPEG on request. Poll it (every ~5s is what's shipped), display as an `<img>`. This is what most cameras actually offer — not true video, a refreshing photo. Label it as such; don't imply live video where there's a still image refreshing.
3. **HLS stream** — an `hls_url` resolves to a real `.m3u8`. A plain `<video>` tag plays it natively on Safari/iOS; Chrome needs `hls.js` (not yet wired in the current best implementation — a real, known gap, not an oversight to silently work around).

This maps directly onto `honest-envelope`'s tier discipline: a snapshot-polling camera labeled as "live video" is exactly the kind of tier promotion that skill exists to catch.

## Where the pattern actually lives — and has drifted

Five independent implementations exist, in increasing order of sophistication:
- **`consulting/chula`** (`apps/api/src/adapters/{itic,cctv}.ts`) — the most hardened: cache-busting on snapshot URLs that already carry a query string, an XSS-safe URL wrapper other forks lack.
- **`dashboards/chonburi`** — a near-verbatim fork, missing the chula hardening.
- **`nst-control-tower`** — the most defensive: wraps the fetch in try/catch so a first-boot outage degrades to a calm placeholder feed instead of a 500.
- **`thailand-smart-city/monitor`** (Bangkok Governor's IOC) — the most sophisticated independent build: live-probes each camera's snapshot with HEAD/GET before calling it "live" vs "offline," a Pak Kret fallback constructing direct `iticfoundation.org/jpeg2.php` URLs, distance-deduplication, and a derived Bangkok congestion index from the incident feed. Has been running live daily since July 2026 — this is the reference implementation if you need the deepest version, not just the cleanest.
- **`UNL`** — a different mechanism entirely: renders Longdo's live traffic-*tile* layer directly (`ms.longdo.com/mmmap/tile.php?mode=traffic`) rather than discrete camera points. Good for a congestion-heatmap view; doesn't give per-camera imagery.

Four adapters implementing the same two feeds, at four hardening levels, is exactly `data-catalog`'s "rebuilding the same API adapter in the fourth project" — extract `chula`'s hardening + `thailand-smart-city/monitor`'s liveness-probing into one `_shared/capabilities/itic-cctv/` module the next time either is touched, rather than a fifth fork.

## A related, separate camera pattern — non-iTIC public webcams

`phuket/dashboard` and `dashboards/HCMC` (byte-identical) HTTP-probe a curated list of public webcam pages and content-sniff the response to classify live/reachable/offline — no video decoding, just reachability. `dashboards/geopolitics` does a page-scrape + image-proxy variant (Pictimo `og:image` meta tags, proxied through a Next.js route) for ASEAN border-crossing cameras. Neither touches iTIC/Longdo — different data source, same "don't claim video you don't have" discipline applies.

`nst-control-tower`'s try/catch-to-calm-placeholder degradation is the same instinct as [`dual-write-resilience`](../dual-write-resilience/SKILL.md)'s fallback mirror, one tier simpler — no mirror store to fail over to, just an honest "temporarily unavailable" state instead of a 500. Cheaper than a full dual-write, and the right choice when the upstream feed itself (not your own database) is the thing that goes down.

## The honest gap — computer-vision analysis is not built

A separate ambition — vehicle speed estimation from these camera feeds (YOLO detection → ByteTrack → homography → gate-method speed calc) — exists only as a research note (`Knowledge/Topics/computer-vision-speed-estimation.md`) and one honest stub: `consulting/chula/apps/api/src/lib/cvEvents.ts` is a working *receiver* endpoint whose own doc comment says the actual inference step is an external sidecar that was never built. If this comes up again: the pipeline design is already researched (pipeline stages documented, library choices made — `ultralytics`, `supervision`, `opencv-python`), but zero lines of the actual CV code exist anywhere in this workspace as of this writing. Say so plainly rather than treating the research note as a shipped capability.
