---
name: ux-archaeology
description: >-
  Steal patterns from public products, not pixels and not running internals.
  Use when rebuilding a dashboard, map, or civic surface from prior art the
  human named. Do not scrape a live private app, copy tokens, or "inspect
  production" as a substitute for a spec.
license: MIT
inspired-by:
  - https://github.com/vercel-labs/agent-skills
---

# UX Archaeology

> Steal patterns, not repos. Rebuild from the idea. Never scrape the running building.

The director names a source — "learn from that flood map," "that index's honesty about missing data." The agent impulse is to clone the DOM, lift the CSS, or fetch authenticated JSON. That is theft of the wrong thing, and on civic systems it is how you accidentally copy a secret.

This skill is the allowed reverse-engineering: **public behaviour → named pattern → your DNA**.

---

## Allowed

- Public pages, public repos, public docs, published methodology
- What the *human* can see: layout job, information order, empty state, stale labelling, map-as-page vs map-in-a-card
- One row in the lesson doc: Source → Pattern → Where it landed (see [`templates/lesson.md.template`](../../templates/lesson.md.template))

Vercel `web-design-guidelines` is a catalogue of *jobs* (focus, forms, URL reflects state, i18n). Use it as a reminder of jobs, not as a restyle-to-Vercel order. Your surface still obeys [`axiom-design-core`](../axiom-design-core/SKILL.md) and [`design-dna`](../design-dna/SKILL.md).

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
5. Verify with [`browser-as-t`](../browser-as-t/SKILL.md), not by overlaying screenshots until the pixels match.

---

## The test

A stranger can read the lesson row and reproduce the *idea* without the original URL. If the only way to rebuild is to scrape the original, you archaeologized the building, not the method.
