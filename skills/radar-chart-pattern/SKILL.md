---
name: radar-chart-pattern
description: The N-axis radar/spiderweb chart math (data-driven, no chart library needed) and why every existing implementation across the estate reimplements it from scratch, including three separate copies inside one project. Use when scoring or comparing something across multiple weighted dimensions, or before writing another hand-rolled polar-coordinate block.
license: MIT
---

# Radar Chart Pattern

The signature shape for any multi-pillar scoring system in this practice — SCITI's 7 pillars, SLIC's 5, a district-vulnerability comparison's 5. The math is nine lines and identical every time it's written; it has been written from scratch at least eight separate times across the estate, three of them for the *same* 7 pillars inside one project.

## The math — data-driven, N axes, no chart library required

```js
const angleStep = (2 * Math.PI) / axes.length;
const startAngle = -Math.PI / 2;              // 12 o'clock, clockwise
const polarToXY = (i, valueFraction, radius) => {
  const angle = startAngle + i * angleStep;
  return {
    x: cx + radius * valueFraction * Math.cos(angle),
    y: cy + radius * valueFraction * Math.sin(angle),
  };
};
// background: N spokes + a few concentric rings (25/50/75/100%) as hairlines
// data: one <polygon> from polarToXY(i, score[i]/max, maxR) for each axis
```
This is the entire reusable core. Every hand-rolled version in the codebase (SCITI, SLIC's allocators, the district comparison, the portfolio-quadrant variant) is this same nine lines with different axis counts, radii, and styling wrapped around it — which is exactly why it should be one parameterized component, not eight.

## The two real shapes this pattern takes

1. **Scoring radar** — one polygon per subject, axes are the fixed dimensions being scored (SCITI's 7 pillars, SLIC's 5). Usually paired with a companion stat-bar list below it (SCITI's `rpg-stat-row` pattern: color swatch, axis name, weight %, a 0–100 bar, letter grade) — the radar is the glanceable shape, the stat block is the audit-grade breakdown. Pair them; they're not redundant.
2. **Comparison overlay** — 2+ translucent polygons on the same axes (a district-vulnerability comparison, a portfolio-quadrant view). Needs a categorical palette (one hue per series), not the single-accent rule — this is a legitimate exception to the one-amber-accent law, the same way per-client color coding is in a multi-series chart.

## The reuse gap — and where it's worst

No shared radar component exists anywhere in the estate. Every project re-derives the trig from first principles:

- **thailand-smart-city/index has three independent implementations for the identical 7 SCITI pillars** — one in the city detail page, a second (different constants, CSS-class-driven instead of inline) in the compare page, and a third, `SpiderAllocator.tsx`, that is **dead code** — not imported or routed anywhere — and has drifted to 6 axes (missing "digital") against the current 7-pillar spec. Dead code with a stale data shape is worse than no code; it will confidently mislead the next person who finds it and assumes it's live.
- **slic-index** does it once per version folder correctly (a real prop-driven `ZeroSumAllocator` reused across three pages within `v3-current`) but the component itself is copy-pasted across `v2-taipei` → `v2.5-summit` → `v3-current` rather than shared — expected for a versioned-snapshot repo, still a fourth copy of the same math.
- **`nst-control-tower`** is the one project that got this right structurally: one generic `ChartRenderer` dispatching across nine chart kinds (donut/bar/line/radar/etc.), with the radar's axis count and data driven entirely by the API's own `axes: [...]` array rather than hardcoded per screen. That's the shape worth extracting into `_shared/capabilities/` — a data-driven radar taking `{axes: [{label, value, max}], seriesColor | seriesColors[]}` and rendering N-axis, single- or multi-series, from one component.

The `SpiderAllocator.tsx` dead-code-with-stale-data case is exactly what [`anti-regression`](../anti-regression/SKILL.md)'s "orphaned WIP" pre-flight check exists to catch — a `git log -5 --oneline` on that file before assuming it's live would have shown it was never wired to a route, and diffing its axis list against the current `types.ts` would have shown the drift, before either got mistaken for working code.

## SCITI's 7 pillars — the flagship worked example

`livability(25%) economy(20%) safety(15%) wellbeing(15%) environment(10%) hospitality(10%) digital(5%)` — a deliberately *different* set from depa's official 7 Smart City dimensions, with the codebase's own comment explaining why: "what actually matters for livability," not the government taxonomy. Composite = Σ(score×weight)/Σ(weight), tiered into Alpha/Beta/Gamma bands. Two pillars are themselves blends of a hand-assessed score plus a data-driven correction — safety is 70% manual + 30% a real road-fatality-rate curve; livability is 75% manual + 25% a GISTDA flood-frequency score. That blending pattern (start from expert judgment, correct with real data, document the split) is worth reusing anywhere a pure-data score would be noisy but pure opinion would be unaccountable.

## A found code-hygiene issue, worth fixing where you see it repeated

SCITI's radar hardcodes raw pixel font sizes (`fontSize="9"`) and inline fallback hex colors (`fill="#888"`) instead of the canonical `--text-micro` token and pure CSS custom properties used elsewhere in the same codebase — almost certainly a component that predates the token system and slipped past the "three sizes only, always CSS vars" convention (§11.7/§14 design-contract). Worth a pass whenever this component is next touched, and worth checking any other pre-token-system SVG component for the same drift.
