---
name: animated-games
description: >-
  Keep one game engine honest across arcade and board modes. Use when building
  or merging an animated game or sim. Do not use for a map dashboard.
license: MIT
---

# Animated games

> One engine, two modes, a recorded hash, and a playtester who did not write the build.

Named from the Super League soccer twin. This repo does not contain that game. The failure modes below are the ones that twin already paid for: a ball the picture shows and the simulation does not own (phantom-ball), and a player acting on a ball the possession state did not assign (ghost-possession).

Load [`build-check-split`](../build-check-split/SKILL.md) before merge. A flyover of a city is [`3d-flyover-walkthrough`](../3d-flyover-walkthrough/SKILL.md). A map dashboard is [`map-3d-city`](../map-3d-city/SKILL.md).

## The rule

1. **One shared engine.** Simulation lives in one module. Arcade and board are modes of that module. A second copy of ball physics, possession, or the clock is a defect.
2. **Modes change input and camera, not the model.** Arcade and board read the same ball id, the same possession field, and the same score.
3. **Twin parity is a recorded hash.** Same recorded input in, same state hash out. A new hash belongs in the same change as the reason. Updating the hash only to silence a red check fails the merge.
4. **Phantom-ball fails the build.** The renderer draws only a ball id the simulation owns. A sprite with no id, or an in-play id with no sprite, is a fail. Trace one id from sim to sprite before you call the frame done.
5. **Ghost-possession fails the build.** Possession is one field. Input from anyone who does not hold it does not move the ball. Both modes read that field.
6. **A different agent plays it.** Before merge, a playtester who did not author the change either plays the build or replays the recorded hash and pastes the result. The author's own run does not close this gate. See [`build-check-split`](../build-check-split/SKILL.md).
7. **A real place keeps real coordinates.** If the pitch is a real ground, coordinates come from a source ([`geospatial-core`](../geospatial-core/SKILL.md)). Do not invent a lat/lon to make the twin sit on a city. A fictional pitch still has one written coordinate frame, shared by both modes.

## The procedure

1. Name the mode under test (arcade or board) and the shared module path.
2. Replay the recorded input. Write down the expected hash and the hash you got.
3. Pick one in-play ball id. Show the sim row and the sprite that uses it.
4. Send input from a player who is not the possessor. The ball stays put.
5. Hand the build to the playtester with the hash and the two checks. No narration of why it is fine.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| A second physics file "just for arcade" | The twin drifts, and the hash stops meaning anything. |
| "Looks right" with no hash | That is how phantom-ball ships. |
| The author signs the playtest | Same-agent review does not count. |
| A new ball object for the highlight reel | If the sim does not own it, it does not get drawn. |
| Inventing the stadium coordinate | A pretty camera on a made-up point is a false twin. |

## The test

```
□ Arcade and board import one engine module?
□ Recorded input hash matches, or the hash change is explained in the same diff?
□ One in-play ball id is owned by the sim and drawn once?
□ A non-possessor cannot move the ball in either mode?
□ A different agent pasted the playtest or the hash replay?
```
