---
name: home-cctv-grid
description: >-
  Unify home cameras into one honest grid with local storage. Use when wiring
  RTSP or ONVIF cameras around a house into a single view.
license: MIT
---

# Home CCTV Grid

> Show what each camera actually offers — stream, snapshot, or pin — and store it locally. A grid that claims video where there is a still is a lie with thumbnails.

[`itic-cctv-integration`](../itic-cctv-integration/SKILL.md) proved the discipline on public traffic cameras (three degrees of "live", never claim video you don't have). This skill is the same honesty applied to private cameras around a house: RTSP/ONVIF in, one grid out, disk local.

---

## The rule

Same three degrees as iTIC, per camera: **stream** (real `.m3u8`/WebRTC) · **snapshot** (refreshing JPEG, labelled as such) · **pin** (exists, unreachable — no fake player). Colour marks the exception, not every row.

---

## The procedure

### 1. Ingest locally (no cloud camera vendor)

- Cameras expose RTSP (`rtsp://<cam>/stream`) and usually ONVIF discovery. Keep them on the LAN; no port-forward.
- Restream with [go2rtc](https://github.com/AlexxIT/go2rtc) (one binary, RTSP→WebRTC/MSE/HLS) or [Frigate](https://frigate.video) if object detection earns its keep. Start with go2rtc — Frigate's detector is a second project, not a prerequisite.
- Snapshot fallback: most cameras serve a JPEG endpoint — poll every ~5s exactly like iTIC snapshot mode, label it "snapshot".

### 2. Store on disk you own

- Continuous record to an external volume (`APP_DB_PATH` pattern from [`always-on-services`](../always-on-services/SKILL.md) — a full boot disk crash-loops every service, not just CCTV).
- Retention: 7–14 days rolling, then downsample to snapshots. Nightly backup job separate from the server job.
- Pre-flight: `df -h` the volume before enabling record — the disk watchdog alerts at 85%, not 99%.

### 3. One grid, honest states

- Each tile: name, mode badge (LIVE / SNAPSHOT / OFFLINE), age of last frame (`{source, tier, age}` per [`honest-envelope`](../honest-envelope/SKILL.md)).
- Offline tile = calm placeholder, never a 500 — the `nst-control-tower` try/catch-to-placeholder instinct from the iTIC skill.
- Access behind the tunnel with auth; camera streams never get a public URL without a gate (see [`production-spine`](../production-spine/SKILL.md) gate 2).

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Cloud camera subscription first | Monthly fee for what go2rtc + disk does locally; vendor lock on your own house |
| Claiming LIVE on snapshot tiles | The exact tier promotion [`honest-envelope`](../honest-envelope/SKILL.md) exists to catch |
| Recording to the boot volume | ENOSPC takes down every service — external volume + 85% alert |
| Frigate + detectors day one | Grid + record + honest states first; detection after the grid survives a week |
| Public stream URLs | Auth + tunnel; a camera feed is private data even when the dashboard is civic |

---

## The test

Pull one camera's plug. Its tile turns OFFLINE with last-frame age inside 10s, everything else keeps playing, disk keeps recording the rest. Plug back in — LIVE resumes without a restart.
