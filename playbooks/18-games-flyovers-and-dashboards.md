# Games, flyovers, and dashboards

Civic dashboards, animated games, and cinematic 3D are one practice. Load the row for the thing in front of you. Do not load the whole catalog.

`Kit/Project-Types.md` is the owner's list when this machine has it: animated game/sim, 3D flyover/city twin, GLB walkthrough, maps. That note is on the box through commit `82dcd473` and is not on Pro or GitHub yet (Pro mid-rebase, box 131 ahead unpushed). If the file is missing, use the table below and say the Kit note was not readable. Do not create it.

## Load order

| Project | Load, in this order | Do not load for this job |
|---|---|---|
| Maps and civic dashboards | `map-api-recycle`, `geospatial-core`, `data-catalog`, `map-3d-city`, `dashboard-discipline`, `phone-first`, `anti-slop-design`, `msh-gate` | `animated-games`. `human-walkthrough` only at a major release. |
| Animated game or sim | `animated-games`, `build-check-split`, `msh-gate` if there is a HUD | `map-3d-city` unless the game is also a real-city twin. |
| 3D flyover or city twin | `3d-flyover-walkthrough`, then `map-3d-city` only if the tier choice lands on extrusion or Arnis, `msh-gate`, `phone-first` | `human-walkthrough` as the camera test. |
| GLB walkthrough | `3d-flyover-walkthrough` (GLB tier), `msh-gate` | A guessed lat/lon. `map-3d-city` unless the model is georeferenced from a source. |
| Hybrid | The row for the surface the person sees first, then the others. One checker for the set (`build-check-split`). | A new skill that restates the four rows. |

Session start and stop, on every row: `session-secondbrain-handoff`. Which Mac: `machine-fleet`.

Maps also read `Kit/Anti-MSH.md` and `Kit/Map-API-Recycling.md` when those files are in the checkout, plus this repo's `ANTI-SPATIAL-HALLUCINATION.md`. Leave the Kit files unedited.

Draft PR #21 (`map-first-dashboard`) is the unmerged numeric map-chrome rule. Until it lands, `map-3d-city` plus `msh-gate` are what this tree enforces.

## Anti-patterns

| Temptation | What it costs |
|---|---|
| Treating a GLB walk as a Mama-rule test | The person never has to finish a task, and the camera still gets called "verified." |
| A second physics module for arcade mode | Phantom-ball and ghost-possession come back. |
| A new map endpoint when an older Non project already wraps that feed | The clients disagree the next time the upstream moves. |
| The author ticks MSH, the hash, and the phone budget | Nothing was checked. |
| Copying `/Users/...` into a committed `mcp.json` | The other machine cannot use it. Roots stay in `Kit/Machines.md` and local config. |
| Saying Kit is on the Pro because a skill mentioned the path | The note has not been pushed. |

## What this does not replace

Open drafts this playbook does not close or stack on: #8, #11, #13, #17, #18, #19, #20, #21, #22. #20 already drafts `now-stack.md`, `machine-routing.md`, and `stack-gaps.md`. Those files are not in this tree. #21 drafts `map-first-dashboard`. Security and foundation drafts stay as they are.

## Still open

- Studio hostname and vault path. Unset on purpose.
- Which Mac writes the vault tonight, until Studio cutover. One writer, not two. The name is not in this repo.
- Three of the bridge's 14 tool names. Not invented here. Read the live tool list.
- `MSH.md` as a filename in Non-Slop. Checked 2026-11-02: the massacre line is in that repo's README, and the gate is `skills/review`. This repo does not add a fake `MSH.md`.
- Kit on Pro and on GitHub. Blocked on the rebase and the unpushed box commits.
