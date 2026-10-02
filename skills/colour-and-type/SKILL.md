---
name: colour-and-type
description: How to choose a palette and a type scale, not just enforce one. Use when starting a design system.
license: MIT
---

# Colour and Type

> `design-dna` is the enforcement layer — it makes tokens binding once they exist. This is the layer before it: how the values get chosen in the first place, so the answer is not "whatever the model reached for."

---

## 1. Start from the ground, never the accent

The ground colour decides the whole system: what contrast is available, how much weight text needs, whether hairlines read at all, what the accent has to fight through. Choosing the accent first and hunting for a background that tolerates it is backwards, and it is what produces the purple-on-charcoal default.

- **Never pure `#fff` or pure `#000`.** Pure white glares; pure black kills subtle borders and looks like an unstyled `<body>`. Warm off-whites and warm near-blacks read as chosen.
- **A ground has a temperature.** Pick warm or cool and hold it across every neutral. A warm ground with cool greys is the most common invisible error — it reads as "slightly wrong" without anyone naming why.

## 2. The neutral ramp does most of the work

Most of any interface is neutrals. Build the ramp deliberately, in perceptual space:

- **Use OKLCH** (or LCH) to generate the ramp. Stepping lightness in sRGB gives uneven perceptual jumps; OKLCH steps look even because it models how eyes actually work.
- **Hold hue and chroma; vary lightness.** A neutral ramp carrying a faint consistent hue reads as a considered material. A ramp that drifts hue reads as several greys that happened to meet.
- **Five to seven steps is plenty**: ground, panel, hairline, structural line, tertiary text, secondary text, primary text. Each has one job — name it.

## 3. One accent, and it means something

- **The accent marks the exception, not the brand.** If it appears on every card, it signals nothing.
- **Choose it for meaning, then check it for contrast** — not the reverse. An accent that fails 4.5:1 on your ground is not an accent, it is a decoration you cannot use for text.
- **Check contrast while choosing, not after shipping.** Retrofitting contrast means re-picking the colour, which means re-picking everything that was harmonised against it.
- **Semantic status colour is separate from the accent** and only exists where it names a real state. A warning colour that appears decoratively has spent its meaning.

### Choose relationships, not isolated swatches

Once the ground and neutral ramp exist, load `wada-colour-chords` before choosing
the authored colours. Select two to four colours as one relationship, then give
them unequal weights and separate jobs. For Dr Non surfaces the standing rule is:

> Monochrome carries the work. Amber points. One companion colour sets the
> atmosphere. Status colours report facts.

The companion is a bounded editorial or structural field, not a second accent.
It never marks actions, focus, links, selection, or status. Reconstruct historical
colour relationships in OKLCH; do not promote sampled scan pixels into canonical
web values.

## 4. Type: earn the second family

Before choosing families, use `bringhurst-contextual-type`: write the reader/task,
text/medium/script brief and proof the approved family on real content. The
numeric scale below is a house starting policy, not a universal typographic law.
Use the project's contract when it already defines tokens; show evidence and
request a scoped exception when that contract fails legibility or script coverage.

Start with one family. A second must justify itself with a **role**, not a mood — a serif for the read, a mono for character-cell alignment. "It looks nice with it" is not a role. Three families is almost always one too many.

**Build the scale, don't eyeball it.** Pick a base size and a ratio, then take steps:

- Base 14–16px for interface, 16–18px for reading.
- Ratio 1.25 (major third) for dense UI, 1.333–1.5 for editorial. One ratio per surface.
- **Three rendered sizes per view.** Base, one step down, one step up. A fourth size is a decision nobody made — and deriving them from one ratio makes the constraint structural instead of disciplinary.

**Hierarchy comes from size and weight.** Not colour variety, not italics, not letter-spacing tricks. If a heading needs a colour to read as a heading, the size relationship is wrong.

## 5. The craft details that separate authored from generated

- **Proof tracking, don't automate tightness.** Negative display tracking may help a particular face; it may also damage it. Inspect actual words and case. Do not apply Latin spacing to Thai/CJK by habit.
- **Proof measure on real text.** 65–75 characters is a Latin-prose starting range, not a hard limit for every role or script. CSS `ch` is the zero-glyph width, not a character counter.
- **Couple leading with size, measure and script.** Roughly 1.5 for body and 1.1–1.25 for display are starting points; inspect return paths and stacked marks. One ratio is not evidence of AI authorship.
- **Tabular figures in columns, proportional in prose.** `font-variant-numeric: tabular-nums` on any column of numbers.
- **Set a real fallback stack.** A web font that fails to load should degrade to something with similar metrics, not to Times.
- **Never fake a weight.** Synthetic bold and synthetic italic are the browser smearing glyphs. Load the real cut or use the weights you have.

## 6. The subtraction test

Before shipping the system, try to delete:

- one type size
- one weight
- one neutral step
- one colour

If nothing breaks, it was never load-bearing. A palette that survives this test is a system; one that does not is an accumulation.

---

## The check

```
□ Was the ground chosen before the accent?
□ Pure #fff or #000 anywhere?
□ Do all neutrals share one temperature and one hue drift?
□ Was the ramp generated perceptually (OKLCH), or stepped by eye?
□ Does the accent mark exceptions, or appear everywhere?
□ Was the authored colour chosen as a 2–4 colour relationship, not one swatch at a time?
□ Is the companion bounded and forbidden from action or status roles?
□ Does the accent pass 4.5:1 on the ground it actually sits on?
□ Does the second type family have a role, or a mood?
□ Is the scale derived from one ratio — and does it render as three sizes?
□ Real-text tracking/measure/leading proof, script coverage, tabular figures in columns?
□ Can you delete one size, one weight, one neutral, one colour and lose nothing?
```

Pairs with `wada-colour-chords` (relational palette selection), `design-dna` (enforcement), `design-registers` (which ground and accent policy), `no-design-tells` (the palettes that mark a surface as generated).
