---
name: 3d-flyover-walkthrough
description: >-
  Pick the shallowest 3D tier for a flyover, city twin, or GLB walk. Use for
  cinematic cameras and walk or fly modes. Do not use for a Mama-rule UX pass.
license: MIT
---

# 3D flyover and walkthrough

> The shot is a camera path through a world you can name. The shallowest tier that can hold that shot is the one you build.

This is the cinematic system: a directed flight, a walk, or a GLB the person moves through. It is not the other two skills people reach for by name.

| The job | Load |
|---|---|
| Operational dashboard, MapLibre extrusion, or an Arnis/Minecraft city bake | [`map-3d-city`](../map-3d-city/SKILL.md). Stay there. |
| An older nontechnical person must finish a task (the Mama Rule) | [`human-walkthrough`](../human-walkthrough/SKILL.md). A camera path is not that test. |
| A directed flyover, a city-twin camera, or a GLB walkthrough | This skill. |

Chrome around the view still passes [`msh-gate`](../msh-gate/SKILL.md). Coordinates still pass [`geospatial-core`](../geospatial-core/SKILL.md). Composition still passes [`ANTI-SPATIAL-HALLUCINATION.md`](../../ANTI-SPATIAL-HALLUCINATION.md): a camera move does not invent a reason for empty panels to exist.

When the vault checkout actually contains it, read `Kit/Project-Types.md` before planning. That note is not on every Mac yet. See the caveat in [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md).

## Pick the tier

Write the shot in one sentence: what the person must see, from where, to where.

1. **Dashboard extrusion.** The shot is "the live city, from the map." Stop. [`map-3d-city`](../map-3d-city/SKILL.md) already owns MapLibre `fill-extrusion`. Do not wrap it in a second camera rig.
2. **Arnis / Minecraft twin.** The shot is "walk streets that were baked from OSM." Camera-rig that world. Do not rebuild the same city in Three.
3. **MapLibre camera.** The shot is a directed path the map camera can hold (a flight line, a street, a before/after). Stay on the map. Keyframes are data.
4. **GLB walkthrough.** The shot is a glTF binary (`.glb`): inside a building, around an object, along a modeled street. The asset is the world. A city map is not required.
5. **Three / WebGL.** The path, the material, or the collision walk cannot be expressed as the map camera or as playback of the GLB. This is the last tier, not the first one that looks cinematic.

Walk and fly are modes of one world. Switching mode does not load a second scene. Walk keeps an eye height and collision. Fly keeps an altitude cap.

## Coordinates

Never invent a coordinate.

- A geospatial keyframe is `[lon, lat]` plus height, from a sourced point, or an offset from a sourced origin written in a manifest.
- A GLB that is not georeferenced has a model origin inside the file. Do not pin that file to a city by guessing. If a later manifest gives a sourced origin, record the source in the manifest.
- A missing source means the key does not ship. "Approximately Bangkok" is not a key.

## Phone budget

State, in the change:

- the device class (a real phone when one is available; otherwise say the check is a phone-sized viewport and unverified on device)
- the frame budget
- the first thing that drops (far LOD, then shadows, then fly mode)

Desktop-only capture does not clear the phone budget. [`phone-first`](../phone-first/SKILL.md) still applies.

## Camera path

Store the path as data: named keys, duration, easing, look-at target id. A one-off script per scene will be rewritten wrong the second time. LOD steps are named in the same file as the path.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Three, because the dashboard felt flat | Extrusion was the job. A second renderer adds a seam. |
| A flyover rig around a Mama-rule test | The person still has to finish the task. That test is `human-walkthrough`. |
| A GLB dropped on a guessed lat/lon | The model has no city until a source says so. |
| Two scenes for walk and fly | The modes drift, and the hash of "where am I" dies. |
| Chrome that scrolls beside a view that already fills the screen | [`msh-gate`](../msh-gate/SKILL.md). The view wins. |

## The test

```
□ Shot is one sentence, and the tier is the shallowest one that holds it?
□ Every geospatial key has a source, or the GLB stays ungeoreferenced on purpose?
□ Walk and fly share one world?
□ Phone budget is stated, with what drops first, and desktop-only is marked unverified?
□ A different agent ran msh-gate on the chrome?
```
