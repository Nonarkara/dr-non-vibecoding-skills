---
name: data-display
description: Charts, tables, and numbers that do not lie or decorate. Use whenever data is rendered.
license: MIT
---

# Data Display

> A dashboard practice with no chart discipline will ship beautiful surfaces carrying dishonest numbers. This is the layer between the data and the eye.

Lineage: Edward Tufte's data-ink argument, filtered through the house position that **density is correct when every element is load-bearing**. Tufte is often misread as "less ink." The rule is *less non-data ink* — that is not the same thing, and it is the difference between a sparse dashboard and a legible one.

---

## 1. The chart follows the question, not the data shape

Pick from the question the reader is actually asking:

| The question | The form |
|---|---|
| How do these rank? | Horizontal bars, sorted. Not a pie. |
| How has this moved? | Line. Time on x, always. |
| How do parts make a whole? | Stacked bar — **one** stack. Not a pie, not a donut. |
| How do two variables relate? | Scatter. |
| How does one thing compare across many places? | Small multiples — same axes, repeated. |
| Is this value in or out of range? | A single number with a threshold marker. Not a gauge. |
| How is this distributed? | Histogram or box, never an average alone. |

**If you cannot name the question, the chart is decoration.** Cut it, or replace it with the number.

## 2. The lies charts tell by default

- **A truncated bar axis is a lie.** Bars encode magnitude by length; starting at 40 triples a 10% difference. **Bars start at zero, always.** Lines may truncate — they encode change, not magnitude — but say so on the axis.
- **Dual axes manufacture correlation.** Two series, two scales, one frame: the crossing point is an artifact of the scales you chose. Use two stacked charts sharing an x-axis instead.
- **Pie charts fail past three slices.** People compare angles badly. Ranked bars answer the same question and can be read.
- **An average without a distribution hides the story.** Show the spread, or say you are not showing it.
- **Smoothing invents data.** A curve through five points implies measurements you do not have.
- **Area charts stack invisibly.** Readers try to read the top series against zero. Only stack when the total is genuinely meaningful.

## 3. Colour in charts

- **Neutral by default; the accent marks the one series that matters.** A rainbow palette means every series is equally important, which is never true.
- **Never encode by colour alone.** Roughly 1 in 12 men cannot separate red from green. Pair colour with position, label, or shape.
- **Sequential data gets a single-hue ramp**, ordered by lightness. Diverging data gets two hues around a meaningful midpoint — and the midpoint must be real, not the mean of your sample.
- **Categorical colour caps at about five** before the legend becomes a memory test.

## 4. Label directly; kill the legend

A legend is a lookup table the reader must hold in working memory. Where a series can be labelled at its own end point, do that instead — the eye never leaves the data.

Axes: label the unit, once. Gridlines are hairlines or absent, never competing with the data. No 3D, no drop shadows, no bevels, no textures — these add ink that encodes nothing.

## 5. Tables are a visualisation

Most "chart" requests are better served by a table that has been designed:

- **Numbers right-aligned, `font-variant-numeric: tabular-nums`.** Non-tabular figures in a column make digits dance and destroy scanability.
- **Text left-aligned. Headers match their column's alignment.**
- **Structure with hairlines, not zebra stripes.** Stripes are a workaround for rows that are too tall.
- **The active row gets one marker** — a single left edge — not a fill, not a glow.
- **Sort by what the reader came for**, not by ID. A default sort is an editorial decision; make it deliberately.
- **Sparklines belong in table cells.** A trend column beside a value column answers "and is that good?" without a second chart.

## 6. Numbers themselves

- **Show the precision you actually have.** `67.3948%` from a sample of 40 is a lie told in decimals. Round to the resolution the method supports.
- **Units always, abbreviations consistently.** Pick `k`/`M` or full digits and hold it across the surface.
- **Deltas carry sign and baseline.** "+12% vs. last week" — never a bare "+12%".
- **Every number carries source, tier and age** — see `honest-envelope`. A chart without provenance is a claim without evidence.
- **Zero, null and "not collected" are three different things.** Rendering them identically is a data-integrity bug wearing a design costume.

## 7. Motion and updates

Data does not animate itself. No counters ticking up on load, no bars growing on scroll, no chart re-rendering in the reader's face because a poll returned. An interface that moves while being read competes with its own reader. Live data updates on a visible, legible cadence — or on request.

---

## The check

```
□ Can you state the question this chart answers, in one sentence?
□ Do bars start at zero?
□ Any dual axis? (almost always a lie)
□ Is colour carrying meaning, or decorating series?
□ Is anything encoded by colour alone?
□ Could a labelled table replace this chart? (often yes, often better)
□ Numbers right-aligned and tabular?
□ Is the precision honest to the method?
□ Source, tier and age present?
□ Are zero, null and unmeasured visually distinct?
□ Does anything animate that the reader did not ask for?
```

Pairs with `honest-envelope`, `radar-chart-pattern` (the N-axis case), `dashboard-discipline`, `cognition-first` (anchoring: the first number sets the frame).
