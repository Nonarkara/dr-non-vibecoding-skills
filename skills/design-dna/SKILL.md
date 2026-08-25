---
name: design-dna
description: >-
  Encode a design system as an enforceable contract agents cannot quietly regress. Use when
  starting a UI, defining tokens/typography/colour, reviewing generated visual code, or when
  a design keeps drifting back toward generic AI defaults.
license: MIT
---

# Design DNA

> A design system that lives in your head is a design system the agent will regress on Tuesday.

Left alone, generated UI converges on the same thing: Inter, `border-radius: 8px`, a purple-blue gradient, four shades of grey, and six font sizes. It is competent and it is nobody's. The fix is not more taste in the prompt — it's a written contract with **named violations**.

*Visual summary: [`INFOGRAPHICS.md`](../../INFOGRAPHICS.md), pages 8–9.*

---

## 1. Declare a lineage, not a preference

"Clean and modern" is unenforceable. A lineage is:

> This dashboard descends from **Dieter Rams** and **Braun**. Every new component must answer "would this fit on a 1965 Braun travel clock?" before it ships. If a thing is decorative, remove it. If a thing is informational, expose it with mathematical precision. This is not a stylistic preference. It is the project's DNA.

Now an agent can *reason* about a new component instead of pattern-matching your adjectives. Pick a real lineage — Rams, Vignelli, Tufte, Swiss grid, brutalist web, whatever — and write down its rules and its visual cues.

---

## 2. Give every token a single role, and forbid the overlaps

Most design drift is one token quietly doing two jobs. Name the roles explicitly:

| Token | Value | Role — and only this role |
|---|---|---|
| `--amber-nav` | `#ffd000` | **Wayfinding only** — nav active state, tab underline |
| `--bull` | `#00c896` | **Signal only** — gain, buy, positive. Never a nav active state. |
| `--red-anchor` | `#e8002d` | **Brand identity only** — the wordmark marker. Never bull/bear, never alerts. |
| `--night` | `#0a0c12` | **Atmospheric surface** — interpretive/editorial panels only |

Then state the invariant in a sentence an agent can check:

> Amber = wayfinding. Green = signal. Red = signal-loss or brand. These three channels must never bleed into each other.

---

## 3. Name the regressions, with the code that constitutes them

This is the part almost nobody writes, and it's the part that works:

```markdown
- If you see `color: active ? "var(--bull)"` on a nav element:
  that is a regression. Replace with `var(--amber-nav)`.
- If you see `--red-anchor` on a P&L row or market signal:
  that is a regression. The red anchor is for the wordmark only.
```

Now "don't regress the design" is a grep, not a vibe.

---

## 4. Constrain the ladders — hard

Unconstrained, an agent invents `0.82rem` at 3am.

- **Three type sizes.** Display / Body / Micro. Not four. Write "do not introduce a fourth" explicitly.
- **One numeric font.** Every number in the same monospace, so columns align and figures read as data.
- **A closed font stack.** Name the fonts *and* name the banned ones. Inter, Roboto, and Poppins are the defaults an agent falls back to when it forgets.
- **One geometric decision, absolute.** Mine is zero border-radius, enforced by a global reset with `!important` and documented as load-bearing. Absolute rules survive; guidelines don't.

---

## 5. Enforce it in CSS, then document that the enforcement is deliberate

```css
/* globals.css */
* { border-radius: 0 !important; }
```

And in `CLAUDE.md`:

```markdown
1. Zero border-radius — enforced in globals.css. Do not remove the
   `border-radius: 0 !important` reset. It is load-bearing.
```

Without the second half, a future agent finds an `!important` and helpfully cleans it up.

---

## 6. Accessibility as a design axis, not a checklist

Real constraints, on real surfaces:

- **Touch targets ≥ 44px** on every interactive element. Not "mostly". I have shipped a fix whose entire commit message was hit-testing every interactive element at 1280/768/375 and finding a locate button unreachable behind a legend.
- **A third theme.** Light / Dark / **Warm** — the warm mode being a colour-blind-safe palette tuned for protanopia and deuteranopia, AAA contrast, no blue light. *"Public service is measured by who it leaves behind."*
- **A low-literacy mode** where the domain warrants it: pictogram-only, no prose. If your users include people who can't read your language, the beautiful typographic layout is an obstacle.
- **Large-text mode** for elderly users, as a first-class toggle, not a browser-zoom afterthought.

---

## 7. Record reverted experiments

You will trial something and back it out. Write it down, or it comes back:

```markdown
### Hero-font exception — TRIALED THEN REVERTED (2026-07-22 to 2026-07-24)
Two non-canonical fonts were wired into nine "wow"-moment components,
then fully reverted. This note is retained so the exception is not
silently reintroduced, nor mistaken for an accidental deletion.
```

---

## The test

Show a screenshot to someone who knows your work. Can they tell it's yours without the logo?

If no, you don't have a design system. You have defaults.
