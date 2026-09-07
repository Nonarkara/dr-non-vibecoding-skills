# The Digital Twin

How the whole stack composes into one system: layered satellites, cameras, and data a stranger can use in five minutes — front to backend to security — and why each layer exists.

---

## The shape

A digital twin here is not a 3D demo. It is a **layered, honest, always-on picture of somewhere real**: base map, satellite time-stack, camera grid, sensor feeds, and an annotation layer saying what it means — every number carrying `{source, tier, age}`.

```
satellite-change-watch (time-stack + diffs)
  + home-cctv-grid / itic-cctv-integration (eyes on the ground)
  + data-catalog feeds (weather, quakes, air — free-apis.md)
  + map-3d-city (buildings without the glitches)
  → dashboard-discipline surface (no hero behind login, no glowing dots)
  → honest-envelope numbers + data-display charts
  → deploy-verification proof + appsec-stack gates + always-on-services uptime
```

Each line is a skill that already exists. The twin is what happens when they all fire on the same place.

## The build order (cheap layers first)

1. **Base + one feed.** Map + one catalogued source, deployed to the web day one — localhost is never the test (`ship-discipline`).
2. **Satellite stack.** FIRMS points + GIBS tiles for the bbox; the before/after slider is the product, CV later or never (`satellite-change-watch`).
3. **Cameras.** Public iTIC or home RTSP grid — honest tiles, calm offline states (`home-cctv-grid`).
4. **3D.** Extrude buildings only after the 2D twin survives a week (`map-3d-city`).
5. **Security + spine.** Seven AppSec layers, five production gates, then the maturity label (`appsec-stack`, `production-spine`).
6. **Staff it.** Researcher collects new feeds, field probes them, orchestrator assembles (`staff-swarm`) — and the [`improvement-radar`](../skills/improvement-radar/SKILL.md) watches for the next layer to steal.

## Why it stays usable

- **Legibility over density** (`legible-systems`): paths, edges, districts, nodes, landmarks — a twin without landmarks is a screensaver.
- **Phone first** (`phone-first`): shared as a link, opened on a phone, in the sun.
- **Design registers**: Console for operators, Civic for citizens — never one skin for both (`design-registers`).
- **Memory**: the twin's contract + lessons + radar verdicts live in the vault (`shared-memory-hub`), served by the forge (`obsidian-mcp-forge`).

## The test

A stranger opens the URL on a phone, finds the fire / flood / camera they care about in under a minute, and can point at every number's source and age. If they cannot, it is a demo with layers — not a twin.
