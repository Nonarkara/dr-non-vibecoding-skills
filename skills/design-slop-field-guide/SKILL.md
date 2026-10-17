---
name: design-slop-field-guide
description: >-
  Catch AI design slop before it ships: 18 observed patterns, each with a test. Use when shipping an interface people act on, or when an agent reports work done.
license: MIT
---

# Design Slop Field Guide

> Slop is not ugliness. It is output that looks finished and authoritative but is not grounded — in data, in the reader's task, or in the design's own rules. Most of it was clean, dark and confident.

Distilled from a study of 44 citizen-built, mostly AI-assisted flood apps (Thailand, 27 Sep – 3 Oct 2026) and from FloodDash's own corrections — FloodDash is AI-built too. The full guide, with evidence, danger, test and fix for each pattern, is [`field-guide.md`](field-guide.md).

## When to use

Before shipping any interface someone will act on — civic, safety, money, health — and whenever an agent reports work as "done", "verified" or "live".

## The 18 patterns

| Group | Patterns |
|---|---|
| **A. Truth and data** | A1 no data shown as "safe" · A2 fallback data shown as live · A3 live-looking but not live · A4 credited sources that deliver nothing · A5 unsourced thresholds turned into advice · A6 countdowns that outlive their window · A7 numbers without units, nulls printed as numbers |
| **B. Reader and task** | B1 dashboard before the answer · B2 a measurement where a consequence was asked for · B3 every line written twice · B4 wrong place, wrong scope |
| **C. Layout and interaction** | C1 layout that only works at the builder's viewport · C2 targets too small, or icon-only |
| **D. Colour and identity** | D1 colours without a defined job · D2 the template app |
| **E. Build and process** | E1 the agent's report doesn't match the diff · E2 security by obscurity, and publishing the exploit · E3 tests that check the string, not the claim |

## Procedure

1. Run the 19-line **pre-ship checklist** at the end of [`field-guide.md`](field-guide.md); each line names the pattern it catches.
2. For every "done" claim from an agent, demand file:line or command output, and re-run it yourself (E1).
3. Render every status component empty, null, failed and stale before anything else (A1–A3).
4. When studying someone else's system: read-only, GET only, describe it by type and place, and publish harm — never method — until it is fixed (E2).

## Related

[`accessible-by-default`](../accessible-by-default/SKILL.md) · [`adversarial-review`](../adversarial-review/SKILL.md)

## Anti-slop design rules (hard rules)

These are known AI design-slop patterns. Never re-create them. Check every page before shipping; fix any hit. They sit on top of Palette and any map-first rule.

1. **Boxes fit their content.** No text box, card, button or panel much wider or taller than its text. Padding follows type size (~0.5–1.5× line height). No fixed/min heights that leave empty space under short text.
2. **Balanced composition.** Deliberate grid; visual weight balanced. No heavy side with an empty side, no orphan block. Squint-test at desktop, tablet and phone.
3. **Readable line length (A4/A5).** Body ~45–75 characters (ideally 60–70); CSS `max-width: 65ch`. Thai/Chinese keep the same physical measure (~30–45 Chinese chars). Wide screens get columns or margins, never full-width paragraphs.
4. **No AI-slop fonts.** Banned as primary: Inter, Poppins, Montserrat, Roboto, Open Sans, Lato, DM Sans, Space Grotesk, Geist, Plus Jakarta Sans, Manrope, Nunito, system-ui-as-design-font. Prefer Bauhaus/Bayer Universal lookalikes: **Jost** first, Josefin Sans or League Spartan for display, Prompt or Kanit for Thai; matching geometric sans for Chinese. At most two families per product.
5. **No lazy ornaments.** No decorative boxes, borders, cards, dividers, blobs, gradients, glows or icon tiles only to fill or "balance". Every container groups things that belong together; if removing it loses no meaning, remove it. No emoji-as-icons, decorative stock icons, or generic gradient heroes.
6. **Clear hierarchy: something must win.** One obvious first look (hero number, map, headline), then second and third. Real contrast in size (≥1.5–2× type step), weight, colour and space. No equal-weight card grids. Squint-test must show a focal point.
7. **More slop to kill.** Centre-everything / symmetric card grids by default; fake depth (stacked shadows, glassmorphism, same radius everywhere); vague slogan heroes; filler copy ("Unlock the power…", "Seamless", "Revolutionize") and fake stats; too many colours (one meaningful accent); thick chrome that shrinks content; icons/badges on every line; dense same-size grey text.

**Pre-ship:** screenshot at 1440 / 1024 / 390; list hits against 1–7; fix; re-screenshot; different agent/person reviews — never self-review.
