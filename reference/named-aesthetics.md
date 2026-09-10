# Named Aesthetics — Agent-Facing Catalog

When a brief says "make it look like X" or "not another purple-gradient landing page," this file is the *index* of named aesthetics an agent can name and apply without slop. It is the answer to the question **"what's the opposite of generic?"** — paired with `axiom-design-core` (the design law) and `no-design-tells` (the tell list).

Read this when a brief is aesthetic-led and you need a non-default starting palette + type pairing + motion + background recipe. Pair it with `design-extract` when a reference site exists, and with `no-design-tells` when you need a tell list for the chosen aesthetic.

---

## How this file is organised

A **named aesthetic** is a name + a recipe + a tell list. The recipe is what to apply; the tell list is what to avoid when applying it. The discipline travels; the palette and type pair are the start of *one* version of the aesthetic, not a fixed spec.

Five axes define each aesthetic, in this order:

1. **Palette** — primary, surface, accent, ink. Always hairline rules, no gradient, no shadow.
2. **Type** — display weight (typically 800–900) + body weight (typically 200–400), and the pairing.
3. **Spacing** — the rhythm. Most named aesthetics use a non-default scale (e.g. 8px base vs 4px base) or a generous grid (e.g. 12-col with 32px gutter).
4. **Motion** — entrance, hover, transition. Most use a small orchestrated page-load choreography.
5. **Background** — flat colour, layered gradient, texture, or pattern.

The recipes below are **starters**, not specs. The agent is expected to use `design-extract` against a reference image / site and *replace* the starter palette + type with the real numbers.

---

## The 12 starters

These are the aesthetics most often requested and most often done badly. Each is a starter recipe + a tell list. Apply the recipe only if the brief matches; if the brief specifies a different reference, use `design-extract` and skip the starter.

### 1. Cyberpunk (Blade Runner lineage)

- **Palette**: `--bg-primary: #0a0e27` (deep indigo-black), `--surface: #050714`, `--accent-1: #ff2e97` (neon pink), `--accent-2: #00d9ff` (neon cyan), `--ink: #e4f1ff`.
- **Type**: Display 800 (Space Grotesk 900 or Archivo Black), body 300 (Inter Light). Mono for code/data.
- **Spacing**: 8px base. Cards with 1px hairline border in `--accent-2/40`.
- **Motion**: Stagger 60ms on entrance, 200ms ease-out. Accent border glow on hover (1px → 2px, not a shadow).
- **Background**: Layered gradient with two stops at 4% opacity over a flat surface. CRT scanline pattern at 4% opacity is the giveaway.
- **Tells to avoid**: Full-bleed neon, drop-shadow on type, gradient text, comic-book halftones. The look is *cold* — the colour is hot but the surface is dark.

### 2. Brutalist (Raw concrete)

- **Palette**: `--bg-primary: #e8e6e1` (concrete), `--ink: #0a0a0a`, one accent (`--accent: #ff4500` or `--accent: #ffd400`).
- **Type**: Display 900 (Helvetica Neue Black, Inter 900, or IBM Plex Mono 700), body 400. All-caps display.
- **Spacing**: 4px base. Heavy gutters, no padding inside cards — the card is the rule line.
- **Motion**: Almost none. 80ms linear transitions. No easing curves. Hover = colour invert.
- **Background**: Flat colour, hard edges. No gradient. No shadow. No rounded corner.
- **Tells to avoid**: Comic Sans, drop-shadows, rounded buttons, any 1px hairline that isn't perfectly straight. Brutalism is *rectilinear*; if a curve is on the page, it isn't brutalist.

### 3. Vaporwave (80s/90s retro)

- **Palette**: `--bg-primary: #1a0b2e` (deep purple), `--accent-1: #ff71ce` (pink), `--accent-2: #01cdfe` (cyan), `--accent-3: #b967ff` (lilac), `--ink: #fff5f5`.
- **Type**: Display 800 (Times New Roman is the original move; or a slab serif), body 300 (sans). Heavy use of italic and small caps.
- **Spacing**: 8px base. Asymmetric grids; overlapping elements; rotated text (2–4°).
- **Motion**: Slow 400ms ease-in-out, 2-step easing curves, scroll-driven parallax. Drifting 3D shapes (low-poly torus / sphere).
- **Background**: Layered gradient + grid pattern + sun/sunset motif. Heavy use of scanlines and chromatic aberration.
- **Tells to avoid**: Sans-serif throughout (the serif is the point), single accent (use 3), sober layout (the chaos is the point), flat colour (the layered gradient is the point).

### 4. Nordic Minimalism (Scandinavian)

- **Palette**: `--bg-primary: #faf8f5` (off-white), `--surface: #ffffff`, `--ink: #1a1a1a`, single accent (`--accent: #c8341d` or `--accent: #2e5b3f`).
- **Type**: Display 300 (Söhne, Inter Light), body 400. Generous leading (1.6–1.8). No italics in display.
- **Spacing**: 12px base. Generous gutters (48px on desktop). The negative space is the design.
- **Motion**: Almost none. 160ms ease-out. Opacity transitions over translate.
- **Background**: Flat colour. Maybe a single hairline rule across the page. Photography is the only "decoration."
- **Tells to avoid**: Tailwind-blue accents, rounded corners, drop-shadows on cards, dense grids, gradient backgrounds, decorative icons.

### 5. Swiss / International Typographic Style (Müller-Brockmann lineage)

- **Palette**: `--bg-primary: #ffffff`, `--ink: #000000`, one accent (`--accent: #e30613` red is canonical; or `#ffcd00` yellow).
- **Type**: Display 700 (Helvetica / Akzidenz-Grotesk / Neue Haas Grotesk), body 400. Left-aligned ragged-right. No italics in display.
- **Spacing**: 8px base. Strict 12-col grid. Generous margins. Body type set in a 60–75 character measure.
- **Motion**: None, or only opacity. This is a print aesthetic brought to screen.
- **Background**: Flat. The grid is the only visible structure (and only when you ask for it).
- **Tells to avoid**: Rounded corners, drop-shadows, soft transitions, decorative type, full-bleed imagery. Swiss is *type-as-image*; the type is the design.

### 6. MoMA (the institutional register, also `axiom-design-core` default)

- **Palette**: `--bg-primary: #F5F1E8` (cream), `--ink: #0a0a0a`, one accent (`--accent: #F59E0B` amber).
- **Type**: Display 700 (Spectral or Inter Display), body 400 (IBM Plex Sans). Generous leading. Generous margins.
- **Spacing**: 8px base. 12-col with 32px gutter. Hairline rules (1px `--ink/12`).
- **Motion**: 200ms ease-out, opacity + 4px translate. Nothing else.
- **Background**: Flat cream. The hairline rules are the only structure.
- **Tells to avoid**: Drop-shadows, gradients, rounded corners, decorative icons, decorative type. The aesthetic is *what's not there*.

### 7. Neobrutalism (web-pop variant of brutalism)

- **Palette**: `--bg-primary: #fff8e7` (cream), `--ink: #000000`, one accent (`--accent: #ffeb3b` yellow; or `#ff4081` pink; or `#00bcd4` cyan).
- **Type**: Display 900 (Archivo Black, Space Grotesk 900), body 400. All-caps display.
- **Spacing**: 4px base. Cards with **3px solid black border** and **6px solid black box-shadow** offset (no blur). This is the giveaway.
- **Motion**: 100ms linear. Hover = `translate(-2px, -2px)` + grow shadow to 8px.
- **Background**: Flat colour, often pastel. Maybe a grid pattern at 8% opacity.
- **Tells to avoid**: Soft shadows, gradients, rounded corners, thin borders, sans-serif body. If the shadow isn't solid black and offset, it isn't neobrutalism.

### 8. Risograph (print-grain)

- **Palette**: `--bg-primary: #f4f1ea` (paper), `--ink: #1a1a1a`, two spot colours (`--spot-1: #ff5b3e` orange-red, `--spot-2: #1e3a8a` navy).
- **Type**: Display 700 (a slab serif like Roboto Slab), body 400 (a humanist sans).
- **Spacing**: 8px base. Misregistration is the point — 1–2px offset on a coloured layer over the base.
- **Motion**: None. This is a still aesthetic.
- **Background**: Flat paper colour + a grain texture (SVG noise) at 6% opacity.
- **Tells to avoid**: Photographic backgrounds, drop-shadows, smooth gradients, anti-aliased edges. The grain and misregistration are the look.

### 9. Warholean repetition (Warhol / repetition-as-aesthetic)

- **Palette**: Two strong colours + paper (`--bg-primary: #fff8e7`, `--ink: #1a1a1a`, `--accent-1: #ff4081`, `--accent-2: #00bcd4`).
- **Type**: One display face, one body face, **set identically across the repetition**. The repetition is the design; the type stays still.
- **Spacing**: Each tile in a 4×4 or 5×5 grid is identical; the grid spacing is what varies.
- **Motion**: Tiles fade in 30ms apart, otherwise still. Hover reveals a 5% detail change.
- **Background**: Each tile carries the same flat colour or photo; the *grid of identical tiles* is the design.
- **Tells to avoid**: Decorative typography, varied tiles, soft transitions, gradients, rounded corners.

### 10. Dieter Rams (functional minimalism)

- **Palette**: `--bg-primary: #f5f5f5`, `--ink: #1a1a1a`, single muted accent (`--accent: #a0522d` or `#5a7d3a`).
- **Type**: Display 400 (a grotesque: Söhne, Akzidenz-Grotesk), body 400. No italic. No display weight above 500.
- **Spacing**: Generous. 16px base. The negative space carries the design.
- **Motion**: 200ms ease-out, opacity-only. No translate. No scale.
- **Background**: Flat. No texture. No gradient.
- **Tells to avoid**: Bold display type, decorative icons, drop-shadows, rounded corners, accent colour used more than once per viewport. Less, but better.

### 11. Mondrian (rectilinear grid)

- **Palette**: Three primaries + black + white (`--red: #e70012`, `--blue: #1a4cb0`, `--yellow: #ffd900`, `--ink: #000000`, `--bg-primary: #f8f4ec`).
- **Type**: Display 700 (Inter, IBM Plex Sans), body 400. Type sits inside a tile, never on a rule.
- **Spacing**: Asymmetric grid with 1–3 large tiles per row, separated by 6–10px black rules.
- **Motion**: None.
- **Background**: The grid is the design. No further background.
- **Tells to avoid**: Rounded corners, soft colour, decorative type, gradient. If the rules are not perfectly 1px black, it isn't Mondrian.

### 12. NYCTA (NYC subway wayfinding, Vignelli + Noorda)

- **Palette**: `--bg-primary: #ffffff`, `--ink: #0a0a0a`, one accent per line — canonical NYC colours: red `#ee352e`, green `#00933c`, blue `#0039a6`, orange `#ff6319`, yellow `#fccc0a`.
- **Type**: Display 700 (Helvetica, the original; or Inter), body 400. White on colour for accent blocks.
- **Spacing**: Strict 8px base. Heavy use of full-bleed colour blocks with reversed-out type.
- **Motion**: None for the wayfinding surface. Allowed: a single 200ms fade on hover for non-essential surfaces.
- **Background**: Flat colour or full-bleed colour block. The block is the design.
- **Tells to avoid**: Decorative type, soft colour, gradients, drop-shadows, rounded corners. Vignelli is geometry + Helvetica + colour — anything else is not NYCTA.

---

## Tell list (cross-aesthetic, applies to all 12)

From `no-design-tells` and the project-wide design law. The agent should refuse to ship a UI that hits any of these:

- **Purple-gradient background**. The single biggest tell of an agent-built page.
- **Inter / Roboto / system-ui at body weight 400** as the only typeface. Always pair with a display face.
- **Rounded corners > 4px** on cards, buttons, or inputs. Dr Non's hard rule: sharp edges only.
- **Drop-shadows on cards**. Use 1px hairline border instead.
- **Three or more accent colours** in one viewport. One accent, maybe two. Never three.
- **Decorative iconography** (illustrations, mascots, empty-state cartoons).
- **"AI made this in 30s" templates** — gradient hero, three feature cards, a testimonial carousel, a footer with five social icons.
- **Lottie animations, particles, or background video** in a non-decorative context.
- **Stock-photo people pointing at screens**, especially in hero sections.
- **Animated gradient backgrounds** that loop behind content.

If a brief is *taste-led* and points at "modern web" or "clean and professional," the agent is being asked to default to the worst version of the tell list. The answer is one of the 12 above, with a reference image extracted via `design-extract`.

---

## How to pick

1. **Read the brief**. What is the *feeling*? Cold? Warm? Institutional? Playful? Geometric? Editorial?
2. **Match the feeling to one of the 12**. If none match, the brief is asking for an aesthetic that doesn't have a name yet — use `design-extract` against three reference sites and propose a name + recipe.
3. **Apply the recipe**. Replace the starter palette + type with the extracted numbers if a reference exists. Keep the spacing/motion/background shape.
4. **Run `no-design-tells`** against the result. If any tell is hit, the aesthetic has been contaminated — fix and re-check.
5. **Document the choice** in the project README: "Aesthetic: MoMA / Nordic / NYCTA. Why: <one sentence>." This is the discipline — every shipped surface declares its aesthetic, so future agents don't drift.

---

## What this file is *not*

- It is not a list of "themes you can switch between." Each aesthetic is a *commitment*; if you want all of them, you don't want any of them.
- It is not a CSS framework. There are no utility classes, no Tailwind config, no component library. The recipe is the type and the palette and the motion; the implementation is one of many.
- It is not a vibe word glossary. Each entry is a *recipe* — you can apply it; you cannot apply "elegant" or "premium."

## Pairs with

- [`axiom-design-core`](../skills/axiom-design-core/SKILL.md) — the design law. This file is the *palette* layer; the skill is the *principle* layer.
- [`no-design-tells`](../skills/no-design-tells/SKILL.md) — the tell list. Cross-applied.
- [`design-extract`](../skills/design-extract/SKILL.md) — extracts a real reference into numbers, then this file provides the *name* and *recipe shape*.
- [`design-dna`](../skills/design-dna/SKILL.md) — encodes the visual decisions as tokens.

## Check

A new aesthetic is *ready* to ship when:

- The recipe can be expressed as 4–6 CSS custom properties (palette) + 1 type pairing + 1 motion timing.
- The tell list is at least 5 items that would *contaminate* the aesthetic.
- The aesthetic has a clear lineage (who did it first, what's the reference image).
- The aesthetic does not overlap with another entry in the catalog.
