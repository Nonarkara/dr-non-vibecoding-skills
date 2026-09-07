---
name: design-registers
description: >-
  Choose a Console, Index, Civic, Editorial, or Institutional register before
  styling. Use when a shared design system makes products feel identical.
license: MIT
---

# Design Registers

> The invariants stay. The room changes.

[`axiom-design-core`](../axiom-design-core/SKILL.md) explains why the system exists. [`design-dna`](../design-dna/SKILL.md) makes its tokens enforceable. This skill chooses the speaking register before either becomes CSS.

## Start with one design read

Before code, write one sentence:

> Reading this as: **[surface]** for **[primary reader]**, used under **[conditions]**, in the **[register]** register.

Then set three dials 1–10 (from [taste-skill](https://github.com/Leonxlnx/taste-skill) v2, also the numeric handle in [`no-design-tells`](../no-design-tells/SKILL.md) §4.0):

- **DESIGN_VARIANCE 1–10** — 1 = perfect symmetry · 10 = artsy chaos.
- **MOTION_INTENSITY 1–10** — 1 = static · 10 = cinematic / physics.
- **VISUAL_DENSITY 1–10** — 1 = airy / gallery · 10 = cockpit / packed.

These dials prevent the model from reaching for its last successful layout. They do not override the project's own design contract. Baseline for a general landing is `8 / 6 / 4`; registers below override from audience, not taste.

## The five registers

| Register | Reader and conditions | Ground | Starting dials: VARIANCE / MOTION / DENSITY (1–10) |
|---|---|---|---|
| **Console** | Operator at 2am, repeated use, many simultaneous signals | Dark, dense, high contrast | `6–7 / 5–6 / 6–7` |
| **Index** | Analyst comparing ranks, scores, or methods | Light or dark, table-first, audit-friendly | `5–6 / 3–4 / 6–7` |
| **Civic** | Citizen on a phone, often outside or under stress | Light, low density, large targets | `3–4 / 2–3 / 4–5` |
| **Editorial** | Reader following an argument or narrative | Reading ground; serif allowed when earned | `6–7 / 4–5 / 2–3` |
| **Institutional** | Mayor, board, ministry, deck, or print reader | Calm, formal, near-zero motion | `4–5 / 1–2 / 5–6` |

Starting dials are not themes. Move them when the brief gives evidence, then state why. The dials are the numeric handle; the register is the named audience — both must be written down before the first line of CSS (see `no-design-tells` Delivery Gate Block 2).

## Invariants across every register

- Zero `border-radius`, except a true circle.
- No gradients, except a dark photo overlay needed for legibility.
- One accent: amber `#f59e0b`.
- Maximum three text sizes per page.
- Mobile-first; prove the 390px layout before scaling up.
- Motion communicates feedback or state, stays under 300ms for ordinary UI, uses `transform` or `opacity`, and respects `prefers-reduced-motion`.
- Default type: Josefin Sans for display, Source Sans 3 for body, JetBrains Mono for data.
- Thai uses non-looped faces only: IBM Plex Sans Thai, Noto Sans Thai, Prompt, or Kanit. First person is `ผม`. Preserve “Samastiti,” SCITI, and SmaSCITI exactly.

A project may break an invariant only when the exception is named, load-bearing, and written into its contract.

## Redesign: audit before touching

Taste-skill gets this exactly right. Record the current surface before proposing changes:

- brand tokens and type;
- information architecture and routes;
- copy voice and real content;
- signature interactions and live elements;
- accessibility, analytics events, IDs, and SEO that must survive;
- current variance, motion, and density.

Modernize in the lowest-risk order: typography, spacing, color calibration, feedback motion, then composition. Full block replacement comes last and requires explicit scope.

## Complete states, not a perfect screenshot

For every interactive surface, verify:

- loading;
- empty;
- error;
- stale or fallback data;
- keyboard focus;
- reduced motion;
- the narrowest supported phone.

For Console and Index, numbers also need `{source, tier, age}`. For Civic, that provenance must remain legible in sunlight and under stress.

## What was deliberately not imported from taste-skill

- AI-image-first conflicts with this practice's “only when Dr Non asks” rule.
- Dark mode is not mandatory for Civic, Editorial, or Institutional work.
- Rounded systems, glow, gradients, and decorative motion remain outside the design DNA.
- A giant universal checklist is replaced by the register, project contract, and a short state matrix.

Attribution matters because borrowing a decision is different from copying a style.

## The test

Hide the logo. Does the surface still look designed for its actual reader and conditions? If all five registers would produce the same page, the register was never chosen.
