---
name: ux-archaeology
description: >-
  Borrow public product patterns and DESIGN.md files without copying pixels or secrets.
  Use when rebuilding from prior art or evaluating external design systems.
license: MIT
---

# UX Archaeology

> Steal patterns, not repos. Rebuild from the idea. Never scrape the running building.

The director names a source — "learn from that flood map," "that index's honesty about missing data." The agent impulse is to clone the DOM, lift the CSS, or fetch authenticated JSON. That is theft of the wrong thing, and on civic systems it is how you accidentally copy a secret.

This skill is the allowed reverse-engineering: **public behaviour → named pattern → your DNA**.

For the *operational step* of getting tokens and structure from a public URL, use [`design-extract`](../design-extract/SKILL.md) (the orchestrator) and the catalog at [`reference/design-extractors.md`](../../reference/design-extractors.md) (dembrandt, design-extract/designlang, firecrawl, and the rest). This skill is the discipline; `design-extract` is the workflow.

Influence: [Vercel's agent skills](https://github.com/vercel-labs/agent-skills) + [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (73 DESIGN.md) + [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) (67 SKILL.md + DESIGN.md pairs) + [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (design anti-patterns).

---

## Allowed

- Public pages, public repos, public docs, published methodology
- What the *human* can see: layout job, information order, empty state, stale labelling, map-as-page vs map-in-a-card
- One row in the lesson doc: Source → Pattern → Where it landed (see [`templates/lesson.md.template`](../../templates/lesson.md.template))

Vercel `web-design-guidelines` is a catalogue of *jobs* (focus, forms, URL reflects state, i18n). Use it as a reminder of jobs, not as a restyle-to-Vercel order. Your surface still obeys [`axiom-design-core`](../axiom-design-core/SKILL.md) and [`design-dna`](../design-dna/SKILL.md).

---

## Ingesting external DESIGN.md files

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) is a standard format (introduced by Google Stitch) for describing a brand's visual design system as plain markdown that agents read. Two public corpora make this practical:

- [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) — 73 analysed examples (Claude, Stripe, Vercel, Nike, Apple, Linear…) each as a drop-in `DESIGN.md` plus preview HTML.
- [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) — 67 SKILL.md + DESIGN.md pairs (agentic/bento/brutalism/editorial/clean…), pullable via `npx typeui.sh pull <name>` and previewed at [typeui.sh/design-skills](https://typeui.sh/design-skills). Each skill ships human DESIGN.md + agent SKILL.md together.

Both are reference material, not source-of-truth. They describe *what a brand looks like*, not *what your project should do*. Pull one, then extract with this procedure:

1. **Read the DESIGN.md for patterns, not tokens.** What jobs do the color roles do? How is typography hierarchy structured? What does the component states section reveal about interaction design? Extract the *reasoning*, not the hex values.
2. **Name the pattern without the brand.** "Apple's progressive disclosure through layered navigation" is a pattern. "Use Apple's colors" is a template.
3. **Filter through Dr Non's invariants.** Every extracted pattern must pass:
   - Zero `border-radius` (except true circles) — Apple's rounded corners, Stripe's pills, Linear's soft edges are refusals here.
   - One accent: amber `#f59e0b` — Figma's multi-color, Spotify's green, Vercel's blue are refusals.
   - Banned fonts: Inter, Roboto, Poppins — these appear in most DESIGN.md files. Your default pair (Josefin Sans + Source Sans 3 + JetBrains Mono) wins.
   - Max 3 text sizes per page, mobile-first at 390px.
   - Motion as feedback, not decoration — under 300ms, `transform`/`opacity` only.
4. **Adapt inside the register.** A Civic surface reading a Console-oriented DESIGN.md extracts *data density patterns*, not dark themes. An Editorial surface reading an e-commerce DESIGN.md extracts *progressive disclosure*, not product-card grids.
5. **Record Source / Pattern / Refused / Landed** — same format as any archaeology row.

What to extract from specific DESIGN.md sections:

| DESIGN.md section | Extract | Refuse |
|---|---|---|
| Color Palette & Roles | How semantic roles map to visual weight | Specific hex values, multi-accent palettes |
| Typography Rules | Hierarchy logic (display/body/micro mapping) | Font family choices that hit the banned list |
| Component Stylings | State coverage (loading/empty/error), interaction patterns | Rounded corners, gradient fills, decorative shadows |
| Layout Principles | Spacing rhythm, grid philosophy, whitespace density | Any layout that requires >3 screen widths to scroll |
| Depth & Elevation | Surface hierarchy logic (what gets visual prominence) | Drop-shadow systems beyond inset hairlines |
| Do's and Don'ts | Anti-patterns worth adopting (often the best section) | Do's that conflict with Dr Non's invariants |
| Responsive Behavior | Breakpoint strategy, touch-target sizing | Desktop-first collapsing patterns |

The DESIGN.md format is useful precisely because it is structured. Treat it like a public design audit — extract the decision logic, discard the aesthetic choices that conflict with your contract.

---

## Forbidden

| Move | Why |
|---|---|
| Dumping a production bundle, source maps, or private API | Secrets, ToS, and you still have not understood the pattern |
| Copying tokens, sheet IDs, host lists, or analytics IDs out of someone else's page | [`reference/security-hygiene.md`](../../reference/security-hygiene.md) |
| Pixel-matching a vendor dashboard into Axiom DNA | Template reflex — Codex Incident energy |
| "I'll just fetch `/api/internal`" | If it is not documented public, it is not prior art |
| Rebuilding FloodDash by scraping flood.nonarkara.org instead of reading FloodDash-Blueprint | The blueprint *is* the forkable method |

Official agencies' **open data** is fair (with attribution). Their **ops consoles** are not a kit.

---

## Procedure

1. Name the source and the job it does in one line ("stale water level visible as stale, not as zero").
2. Name the pattern without the brand ("honest empty vs lying zero").
3. Implement inside **this** project's contract: tokens, map-first-or-not, bilingual toggle, envelope on numbers.
4. Record Source / Pattern / Landed — and **Refused** if you looked at something that did not fit.
5. Verify with [`browser-as-t`](../browser-as-t/SKILL.md), not by overlaying screenshots until the pixels match. Walking *this* system as three users is [`human-walkthrough`](../human-walkthrough/SKILL.md) — archaeology extracts a pattern; the walkthrough tests whether *your* surface still has it.

---

## The test

A stranger can read the lesson row and reproduce the *idea* without the original URL. If the only way to rebuild is to scrape the original, you archaeologized the building, not the method.
