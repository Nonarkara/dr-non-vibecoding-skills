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
