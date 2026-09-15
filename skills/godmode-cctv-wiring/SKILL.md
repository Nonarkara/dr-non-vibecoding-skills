---
name: godmode-cctv-wiring
description: Wire ITIC/Longdo public traffic cameras (and any provincial CCTV feed) into a city dashboard honestly. Use when adding camera/incident layers to a Thai city map.
license: MIT
---

# Godmode CCTV Wiring

The mechanism is already fully specified in
`dr-non-vibecoding-skills/skills/itic-cctv-integration` — read that first.
This skill is the Thailand-city-godmode-specific delta: how it plugs into a
city config and this toolkit's cook/coupling layer.

## The two feeds (unchanged, no key)

```
https://event.longdo.com/feed/json           incidents
https://camera.longdo.com/feed/?command=json cameras
```

`../../thailand-godmode/packages/connectors/cctv/itic-longdo.ts` filters both by the city config's
`cctv.bbox` — every province gets the same national feed, scoped to its own
bounding box, at zero marginal integration cost.

## The rule, restated for this toolkit

Three honest liveness tiers, never conflated:

1. **pin** — no `imgurl`/`hls_url`. Camera exists on the map, no image.
2. **snapshot** — `imgurl` resolves to a refreshing JPEG. Label it as a
   still image that refreshes, never "live video". This is what most
   cameras in Thailand actually offer.
3. **stream** — `hls_url` resolves to a real `.m3u8`.

Use `CAMERA_LIVENESS_TH` for the exact Thai label per tier — never write a
bespoke label that implies more than the tier actually delivers.

## Where this touches the cook/coupling layer

CCTV imagery is presentation-adjacent, not a cook.ts input, with one
exception worth naming explicitly: an incident report from the Longdo event
feed (`ThaiTrafficIncident`) near a corridor the operator is already
watching is useful context next to that corridor's coupling card, but it is
**descriptive annotation, not a new coupling formula** — don't invent a
"traffic × flood" coupling unless a real relationship (e.g. a road segment
known to close at a specific water level) is being modeled, and if you do,
follow `godmode-cook-and-couple`'s procedure for it.

## Anti-patterns

Same as `itic-cctv-integration`'s table — most importantly: never claim
video where a still image is refreshing, never a public stream URL for a
private/provincial camera without an access gate, never let one failed
camera fetch break the whole grid (each camera's tile degrades
independently to a calm placeholder).
