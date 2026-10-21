---
name: no-design-tells
description: Stop shipping UI a stranger can spot as agent-built. Use before any visual work.
license: MIT
---

# No Design Tells

> The sibling of `no-ai-tells`. That one catches machine-written prose. This one catches machine-*designed* surfaces. Same taxonomy, different layer — and neither substitutes for the other.

People identify agent-built sites in about a second. Not from one smoking gun — from a **stack** of defaults: Inter, a purple gradient, three identical cards, "seamlessly transform your workflow," and a `border-radius: 12px`. Any one is a choice. Five together is a fingerprint.

This skill is the registry of those tells, the honest account of which ones a disciplined system now trips anyway, and the positive rules that close the gap.

Influences: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (Design Read + 3 dials + design-system map + hard gates — 85k★) and [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) (38 rules in 3 tiers + Liveliness Toolkit + Delivery Gate — filter, not style). This skill is a compressed synthesis, not a copy; it applies taste's dials and anti-slop's tiers inside this practice's stack doctrine and registers.

**Boundary:** This skill is a **filter, not a beautifier.** It rejects slop and requires liveliness. It does not invent direction. `DESIGN.md` (yours) supplies identity, personality, palette, typography, and mood — the soul. Without a Design Read the output converges on sterile, not good (anti-slop R-37). A sterile result means direction was missing or liveliness was not added — fix both, not more bans.

---

## 1. The stack doctrine

**Score the stack, not the item.**

A surface can pass every individual ban and still be obviously generated, because the tells that remain are the ones no rule named. A surface can also break a rule deliberately and read as authored, because the break is load-bearing and everything around it is specific.

The ship question is never *did I violate a rule.* It is:

> **Would someone who has seen thirty agent-built sites place this one among them?**

---

## 2. The tell registry — tiered

Tier matters. **Hard Gate** = absolute fail regardless of purpose. **Purpose-Gate** = technique allowed only with a written reason (hierarchy, identity, or readability). **Quality Lock** = consistency; technique must be locked across the surface.

### Typography — the strongest visual tell (Hard Gate / Purpose-Gate)
Banned as default (Hard Gate): **Inter, Roboto, Open Sans, Lato, Poppins, Montserrat, Geist, Space Grotesk, Manrope, DM Sans, Instrument Serif**, and `system-ui` as a primary face. Inter is the worst offender precisely because it is good — which is why it is everywhere, and why it now signals *nobody chose this.* Inter is acceptable only with a stated reason (public-sector accessibility, explicit brand ask) — otherwise Purpose-Gate.

### Colour (Hard Gate / Purpose-Gate)
- **VibeCode purple** — any indigo/violet/purple gradient or accent (`#6366f1 #8b5cf6 #a855f7 #7c3aed`). The most-cited palette tell of the era. (Hard Gate as default; embrace only when brand explicitly asks with a locked palette.)
- Tailwind default blue `#3b82f6`. (Hard Gate.)
- Gradient text on headings (`bg-clip-text`). (Purpose-Gate — needs hierarchy reason.)
- Neon accents on near-black; cyan-on-dark. (Purpose-Gate.)
- **Premium-consumer beige+brass trap** — warm paper `#f5f1ea/#f7f5f1/#efeae0` + brass/clay `#b08947/#b6553a` + espresso text `#1a1714`. Banned as default for premium briefs (taste's second-most-recurring tell). Rotate to Cold Luxury / Forest / Cobalt+Cream / Terracotta+Slate or monochrome+pop. (Quality Lock — lock one palette, audit every component.)

### Provenance — invisible in a screenshot, obvious in View-Source (Hard Gate)
The layer most checklists forget:
- `<meta name="generator">` naming the builder.
- Builder hosts: `lovable.app`, `bolt.new`, `v0.dev`, `.framer.app`.
- Client-side calls to `api.anthropic.com` / `api.openai.com` — which also leaks the key.
- API-key literals (`sk-ant-…`, `sk-…`, `AIza…`). A key that touched history is burned, not deleted.
- `localhost:5173` / `127.0.0.1` shipped to production.

Scan built output, not just source — this layer lives in the bundle.

### Layout reflexes (Purpose-Gate / Hard Gate)
Three identical cards in a row · centred everything · equal-weight grids where every card is interchangeable · nested cards · `01/02/03` step rhythm · fake-precision stats (`99.9%`, `10k+`, `24/7`) with no source · sparkle and "Now in Beta" pills · bento grids · decorative glassmorphism. (Purpose-Gate: each needs a hierarchy reason; identical cards are Hard Gate when content is not peers.)

**And the dashboard-specific one:** every screen a slight variation of the same card grid instead of a purpose-built flow. Multi-screen sameness is the tell a portfolio of dashboards is most exposed to. (Quality Lock.)

### Product UI — the tells the landing-page skills never cover (Hard Gate / Purpose-Gate)

`taste-skill` states its own scope: *"Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI."* Most of this practice is exactly what it excludes, so these are the tells nobody else's list carries. From `kuras3/product-ui-design`, `LeoStehlik/no-slop-ui`, `Vanszs/Anti-AI-UI`, `nutlope/hallmark`, `Krishna-Modi12/frontend-design-pro`.

- **The glowing status dot.** A `●` carrying a `box-shadow` glow to mean "live." Named by `product-ui-design` as *the single most common product-UI tell*. A live indicator is a dot and, at most, an opacity pulse. (Hard Gate — the glow is a shadow, already banned.)
- **Monospace used as a label voice.** The most-violated rule here. **Monospace is a data voice** — numbers, codes, timestamps, anything needing character-cell alignment. Tracked uppercase mono on every section header and field label is scaffolding wearing a lab coat: it reads "technical" without being technical. Use mono where columns must align; use the sans face for labels. (Purpose-Gate: each mono label needs a stated alignment reason.)
- **A hero, or any marketing rhythm, behind the login.** An operator who has authenticated does not need to be sold to. (Hard Gate.)
- **The metric-card-grid as the default top row.** Four equal cells because that is what dashboards look like. If the four metrics are not genuine peers, the grid is lying about their relationship — rank them or nest them. Same failure at smaller scale: unequal stat strips. (Hard Gate when not peers.)
- **Rainbow status badges on every row.** Colour on every row means colour signals nothing. Colour marks the exception. (Hard Gate.)
- **Non-semantic data markup.** A grid of `<div>`s pretending to be a table. Use `<table>` for tabular data, `<dl>` for key–value pairs, plus `<nav>`, `<dialog>`, `<button>`, `<a>`. Fails keyboard, screen readers and copy-paste — and reliably marks generated markup. (Hard Gate.)
- **Fake loading.** A `setTimeout` standing in for real async. It always looks right in the demo and lies about system state in production. (Hard Gate — this is `honest-envelope` in motion.)
- **Missing states.** Generated product UI ships the happy path only. Every interactive component covers eight — default · hover · `:focus-visible` · `:active` · disabled · loading · error · success. Every data surface covers four — loading · empty · error · success. The empty state is where the curse of knowledge does most damage: the author has never seen it. (Hard Gate.)
- **MSH, massacre spatial hallucination (owner's root-cause law, 2026-10-22; first seen as "the real-estate leak", 2026-10-16).** An interface that invents a reason for things to occupy space: a bar that does nothing, buttons far bigger than their words, boxes stretched to fill a container, a surface that scrolls when it could have fitted one screen, equal weight with no focal point, panels on top of the labels that explain them. It is the root cause of *bad* design, not only of AI-slop. Kill every instance before the first line of CSS. **A box is its label plus padding** (no `min-height`, `width:100%` or `1fr` inflation). **Chrome earns its pixels** (delete it; if no decision is lost it stays deleted). **One screen first** at 390×844 and 1440×900, scroll only where a reading surface earns it. **The repair is deletion or regrouping, never padding.** Source cases: Jakarta rain panel (88 px buttons, a one-letter "n" label, 16 Oct) and the haze panel (44 px chips, a one-word disclosure rendered as a 188×112 px box, link rows 44 px tall, 22 Oct). Full law: workspace `CLAUDE.md` §11.12. (Hard Gate.)
- **44 px versus MSH.** Isolated primary actions and map/icon controls keep real 44 px targets. A dense group of text controls (chips, toggles, tabs, tool rows) keeps label-plus-padding boxes: 32 px high on touch at least, never below the 24 px WCAG 2.2 floor, 4 px apart. Touchability comes from layout and from fewer controls, never from padding every box to 44 px; links in running text get an invisible hit area. (An earlier version of this skill said to meet 44 px "through height"; that produced the slabs above and is withdrawn.)
- **Interactive elements wired to nothing.** Worse than a missing control — it teaches the operator the surface is decorative. (Hard Gate.)

### Copy
Defer to `no-ai-tells` for the full taxonomy. Worst offenders: *seamless, cutting-edge, transform your, unlock the power, elevate your, revolutionise, supercharge, delve, tapestry.* (Hard Gate.)

---

**Two faster versions of the same question**, when the full audit is too slow:

> **Swap the logo for a competitor's. Would anyone notice?** If not, it is slop. (`Anti-AI-UI`)
>
> **Do any two screens differ only in their card contents?** Then one of them was not designed.

---

## 3. The trap — restraint is now the default

Read this part twice.

The 2026 generated default is no longer purple gradients. It is **restraint**: warm off-white ground, a serif accent, hairline rules, tracked-out uppercase eyebrows, one muted accent, generous whitespace, near-black-and-one-colour dashboards.

That is a description of most well-disciplined design systems, including this practice's own.

The convergence is not anyone's fault — the models learned restraint from the same canon (Rams, Vignelli, Swiss grid) the good systems descend from. But the consequence is concrete: **compliance and distinction have come apart.** The tells a mature system bans are the ones the *previous* generation of generators had. The look it mandates is what the *current* generation produces.

| A disciplined system's rule | What it now shares with the default |
|---|---|
| Warm off-white ground | Cream/beige is the "tasteful" 2026 default |
| Hairline rules, no shadows | Broadsheet hairline layouts are a named tell |
| Tracked uppercase micro-labels | "Template chrome" |
| Middle-dot meta strings (`A · B · C`) | "Template chrome" |
| Near-black + one accent | The current dark-dashboard default |

**The response is not novelty.** Adding a gradient to prove a human made it is the same failure pointing the other way. The response is §4 — the craft a generator skips because nothing forces it to. Removing slop does not reveal good design; it leaves a void. Liveliness must be **added** (taste + anti-slop), not assumed. A sterile result means the Design Read was missing or the liveliness dials were left at 1.

---

## 4. The positive half — bans alone converge on the average

A page defined only by what it avoids becomes the average of what remains. Commit to these *before the first line of CSS*, written into the project's `context.md`. The first (Design Read + dials) supplies direction; the rest supply the craft that makes it alive.

### 0. The three dials — set before anything else (from taste)

After the Design Read, set three numeric dials 1–10. Every layout, motion, and density decision below is gated by these. Do not ask the user to edit a file — overrides happen conversationally.

- **`DESIGN_VARIANCE` 1–10** — 1 = perfect symmetry · 10 = artsy chaos
- **`MOTION_INTENSITY` 1–10** — 1 = static · 10 = cinematic / physics
- **`VISUAL_DENSITY` 1–10** — 1 = airy / art-gallery · 10 = cockpit / packed

**Baseline:** `8 / 6 / 4` for a general landing. Override from the Design Read:

| Signal in brief | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Minimal / calm / editorial / Linear-style | 5–6 | 3–4 | 2–3 |
| Premium consumer / luxury / brand | 7–8 | 5–7 | 3–4 |
| Playful / Dribbble / Awwwards / agency / experimental | 9–10 | 8–10 | 3–4 |
| Trust-first / public-sector / regulated / a11y-critical | 3–4 | 2–3 | 4–5 |
| Redesign — preserve existing | match existing | +1 | match existing |
| Redesign — overhaul | +2 | +2 | match existing |

**Register → dial mapping (this practice):** Console (dark operator, 2am) = 6–7 / 5–6 / 6–7 · Index (rankings) = 5–6 / 3–4 / 6–7 · Civic (citizen in sun, light ground) = 3–4 / 2–3 / 4–5 · Editorial (reading, serif permitted) = 6–7 / 4–5 / 2–3 · Institutional (decks/print) = 4–5 / 1–2 / 5–6. See `design-registers` for the full register definitions; the dials are the numeric handle, the register is the named audience.

### 1. The Design Read — one sentence.
> *"Quiet editorial. High-contrast ink on cream. Strong hierarchy, asymmetric, one dominant number per section."*

If it could describe any other surface you own, it is not specific enough yet. Without this sentence, leave `VISUAL_DENSITY` at 3–4 and mark the build *"draft without direction"* — not shippable.

### 2. A named reference. Not "clean and modern" — unenforceable. Name a real artifact: *the Braun ET66*, *the 1972 Vignelli subway diagram*, *moma.org*, *a Linear product page*, *a specific magazine spread*. An agent can reason about a named reference; it cannot reason about an adjective.

### 3. Dr Non's MoMA-inspired layout rules.
1. Clean and visually stunning — minimal is the floor, not the goal.
2. **Lines carry different weights when they play different roles.** A structural divider is not a cell separator is not an emphasis rule. Uniform 1px hairlines everywhere is itself a flatness tell: it says nobody decided which line mattered.
3. Invisible grid — everything locks in, nothing left hanging, every edge resolves to another edge.
4. Spacing compact and beautiful. No lingering whitespace.
5. Simple mechanics, simple movements. Motion confirms, never performs.
6. Classy colour — restraint over range.
7. Consistency is the gold standard.

### 4. Hierarchy and asymmetry.
- One element dominates each section. A grid where everything weighs the same is a grid where nothing was decided.
- Never a 50/50 split. Golden section, or 2/3 + 1/3.
- Hero content off-centre — columns 2–8, not centred.
- Vary card sizes when importance genuinely differs. Equal cards are correct only for genuine peers.
- Every value from a token. No hard-coded hex, no raw pixel spacing.

### 5. Craftsmanship — the bar after "not slop" (from anti-slop C1–C5)
"Not slop" is the floor, not the goal. A surface passes only when:
- **C-1 Intentionality** — every technique has a reason you can articulate; "AI default" is a red flag.
- **C-2 Functional Completeness** — every interactive element works, or it does not exist. Happy-path-only is broken.
- **C-3 Content-Driven Composition** — sections exist because content needs them, not because every landing has Hero + 3-cards + Testimonials + FAQ.
- **C-4 Resilience** — holds up empty / loading / error, every theme, every breakpoint, keyboard-only.
- **C-5 Evidence Over Claims** — testimonials, stats, security claims are real and verifiable, or not shown (no `99.9%` without source).

### 6. Liveliness — what to add after banning (taste + anti-slop)
A filtered surface without liveliness reads as sterile — taste's and anti-slop's shared lesson. Before calling anything done, check:
- **Energy** — one place where hierarchy snaps (dominant number, oversized type, strong asymmetry) — not "safe small type everywhere."
- **Rhythm** — layout families vary: at most one section per layout family per page (3-card grid, split, bento, full-bleed quote). Taste bans >2 consecutive image+text splits and 6 white-on-white bento cards.
- **Motion as confirmation** — hover lifts, active scales (`scale(0.97)`), scroll pins only where `MOTION_INTENSITY` warrants; `prefers-reduced-motion` respected.

---

## 5. Rejected advice, recorded

A widely-circulated anti-slop prompt advises *"prefer atmosphere — subtle texture, layered backgrounds, geometric patterns — over flat solid colours."*

**Rejected** in this practice. It contradicts the materials rule (surfaces do not pretend to be things they are not) and the ban on decorative texture behind text. Atmosphere comes from type, spacing and line weight — never applied texture. Recorded here so a later agent who has only read the prompt does not re-adopt it.

---

## 6. Hard Gates — ship is blocked if any fail

These are mechanical checks. Run them before the Delivery Gate; a fail blocks ship regardless of purpose.

These gates are written to be checked against code and computed values. For the loop that checks a *rendered* screenshot with vision — the same gates, plus everything that only shows up once a human (or an agent's eyes) actually looks at the page — see [`see-and-revise`](../see-and-revise/SKILL.md).

- **Eyebrow restraint (taste):** max **1 eyebrow per 3 sections** (eyebrow = small uppercase wide-tracking label above a headline, e.g. `text-[11px] uppercase tracking-[0.18em]`). Count `uppercase tracking` across sections; if > `ceil(sectionCount/3)` → FAIL.
- **Hero viewport (taste):** headline max 2 lines desktop, subtext max 20 words and 3–4 lines, total hero text elements max 4 (eyebrow + headline + subtext + 1–2 CTAs). CTA text single line; two CTAs with same intent (e.g. "Get in touch" + "Contact us") → one label only. Hero must fit initial viewport (`min-h-[100dvh]`, not `h-screen`; top padding ≤ `pt-24`). FAIL if overflow forces scroll to CTA.
- **Navigation:** single line on desktop (≥1024px), height ≤80px (default 64–72px). Every nav item has a real destination; links to nowhere are Hard Gate FAIL.
- **Section repetition:** a layout family (3-col card grid, split-text-image, full-bleed quote, bento) may appear **at most once** per page. Alternating left-image/right-text zigzag max 2 in a row; third consecutive is FAIL. Bento cell count must equal content count (no empty cells).
- **Accessibility (anti-slop R-25 / R-03):** text contrast ≥4.5:1 (large ≥3:1), tap targets ≥44px, no horizontal overflow, no keyboard trap. FAIL on any violation.
- **Product UI states:** every interactive component covers all eight states, every data surface all four. Any loading state driven by `setTimeout` rather than real async → FAIL. Any interactive element with no behaviour → FAIL.
- **Semantic data markup:** tabular data in `<table>`, key–value in `<dl>`. A `<div>` grid standing in for either → FAIL.
- **MSH gate (Dr Non, 2026-10-22; supersedes the 2026-10-16 real-estate gate):** judged on the rendered screenshot and on measurements, never on code. FAIL if any text control's box is much bigger than its label (area more than ~3× its text, or padded to 44 px inside a dense group), any bar or band carries less than it costs, any overlay is mostly empty, any label is clipped or squeezed, two blocks overlap (especially a panel over the card that names a source), the first screen at 390×844 or 1440×900 does not carry the focal element, or a dashboard/tool that could fit one screen scrolls. Run a rendered geometry audit (render, hit-test, measure overlaps, row edges, sideways overflow); a passing source scan is not evidence. The hero map or canvas outranks empty panel space, always.
- **No empty-proof publishing:** no fake stats (`10k+` without source), no AI avatars as testimonials, no links to nowhere. Empty is better than deceptive.

---

## 7. The gate

The detector ships with the Axiom and Rams × NYCTA design cores:

```bash
npx axiom-audit .            # source
npx axiom-audit dist         # built output — provenance tells live here
npx axiom-audit . --strict   # CI: exit 1 on errors
```

`error` = Hard Gate violation, fails the build. `warn` = Purpose-Gate judgment, a human decides.

Then answer in writing — the 4-block Delivery Gate (from anti-slop):

```
Block 1 — PURPOSE TEST
  For every technique that survived the registry, state the reason
  (hierarchy / identity / readability). No reason → remove the technique.

Block 2 — LIVELINESS + CRAFTSMANSHIP
  □ DESIGN READ    — one sentence in context.md, specific to this surface
  □ REFERENCE      — a named real artifact, not an adjective
  □ DIALS          — VARIANCE / MOTION / DENSITY set and justified from brief
  □ ENERGY/RHYTHM/MOTION — one snap, varied families, motion as confirmation
  □ C1–C5          — Intentionality, Functional Completeness, Content-Driven, Resilience, Evidence

Block 3 — HARD GATES
  □ EYEBROWS       — ≤1 per 3 sections
  □ HERO           — headline 2 lines, subtext 20 words / 4 lines, ≤4 elements, CTA single line, fits viewport
  □ NAVIGATION     — single line at 1024px, ≤80px, every link real
  □ SECTIONS       — no layout family repeated, zigzag ≤2, bento cells = content, palette locked
  □ ACCESSIBILITY  — contrast 4.5:1, 44px taps, no overflow, keyboard navigable
  □ PROVENANCE     — dist has no generator meta, builder host, or leaked key

Block 4 — THE STACK
  □ Would a stranger who has seen thirty agent-built sites place this one among them?
  □ If logo and product name were swapped, would this still feel like itself?
  □ AUDIT          — --strict exits 0, and dist is clean
```

An unchecked box is unfinished work, not a style opinion. Blocks 1–3 are PASS/FAIL; Block 4 is the human judgment that catches what rules cannot.

---

## Pairs with

`design-dna` (the enforceable token contract) · `design-registers` (which register this surface is — dials are the numeric handle, registers the named audience) · `anti-regression` (do not let cleanup undo it) · `no-ai-tells` (the prose layer of the same problem) · `ux-archaeology` (mine 67 DESIGN.md from bergside/awesome-design-skills for prior art).

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
