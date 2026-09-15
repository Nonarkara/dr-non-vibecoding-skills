---
name: godmode-new-city
description: Stand up a new Thai city/province God Mode dashboard from this toolkit. Use when asked to add a new city, port the Lopburi build to another province, or bootstrap a Thailand ops dashboard from scratch.
license: MIT
---

# Godmode New City

> If shipping a city requires editing `../../thailand-godmode/packages/core` or `../../thailand-godmode/packages/connectors`
> instead of `../../thailand-godmode/configs/cities/<slug>.city.json`, that's a bug in the toolkit,
> not a one-off exception — file it, don't work around it.

## Procedure

1. `node scripts/new-city.mjs "<City Name>"` — scaffolds the config.
2. Work `../../thailand-godmode/docs/NEW-CITY-CHECKLIST.md` top to bottom. Do not skip step 3/4
   (hydrology/air stations) by copying another province's station IDs —
   an invented station is worse than an honestly empty array, which the
   cook layer already handles (`unavailable` tier, no invented number).
3. Consult [`godmode-datagoth-harvest`](../godmode-datagoth-harvest/SKILL.md)
   for step 2, [`godmode-floodair-dash`](../godmode-floodair-dash/SKILL.md)
   for steps 3–4, [`godmode-ootbpap-maps`](../godmode-ootbpap-maps/SKILL.md)
   for step 5, [`godmode-cctv-wiring`](../godmode-cctv-wiring/SKILL.md) for
   step 7, [`godmode-social-listening`](../godmode-social-listening/SKILL.md)
   for step 8.
4. Brand palette (step 9): the province's own flag colors + one seasonal/
   local motif, through `../../thailand-godmode/packages/design/palette.ts`. Never let a brand
   color collide with the flood/AQI/coupling status ramp — see that file's
   header comment for the exact invariant.
5. Deploy on the zero-baht stack (`../../thailand-godmode/docs/ZERO-BAHT-STACK.md`), gate, verify
   on the deployed URL — not on "should work."

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Copying Lopburi's corridor/station data as placeholders "to fill it in later" | It ships as real data if nobody remembers to change it — leave arrays empty instead |
| Writing a new module registry shape for this city | Reuse `../../thailand-godmode/packages/core/src/module-registry.ts` exactly — see `../../thailand-godmode/docs/SIBLING-REPOS.md` |
| Inventing a threshold when an agency band doesn't cleanly apply to this province | Use the closest published band and say so, or mark `unavailable` — never invent |
| A new design token system for "this city's vibe" | Axiom Design Core's tokens are fixed; only `brandPalette` changes per city |

## The test

Deploy with every API key unset. Every module should render at `scenario` or
`reference` tier, not a blank page or an error boundary. Only then start
wiring real keys and station IDs.
