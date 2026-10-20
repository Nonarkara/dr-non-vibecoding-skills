---
name: anti-slop-design
description: >-
  Apply Dr Non's composition rules. Use before building or reviewing a page,
  dashboard, deck or visual that risks generic AI design.
license: MIT
---
# Anti-slop design rules (hard rules)

These are known AI design-slop patterns. Check every page against them before shipping, and fix any hit. They come on top of the house design system (Palette) and any map rule such as the map taking most of the screen.

The original seven rules below are Dr Non's existing local skill, now packaged
for forks. Also read the project's `ANTI-SLOP.md` where present; this skill does
not relax a stricter project rule. [Bauhaus Human Design](../bauhaus-human-design/SKILL.md)
supplies the positive composition method and its credited Ruttl source map.
Conventional controls stay familiar; authorship comes from the content's arrangement.

## 1. Boxes fit their content
- No text box, card, button or panel that is much wider or taller than the text inside it.
- Padding is proportional to the type size (roughly 0.5 to 1.5 times the line height), never a fixed fat padding.
- No fixed heights or min-heights that leave empty space under short text. Let content set the size.

## 2. Balanced composition
- Every page has a deliberate grid, and its visual weight is balanced. No heavy side with an empty side, no orphan block floating alone.
- Check the page at desktop, tablet and phone widths, and squint at it: the masses should balance.

## 3. Readable line length (the A4/A5 rule)
- Body text lines are no longer than a line on an A4 or A5 page: about 45 to 75 characters, ideally 60 to 70. In CSS, `max-width: 65ch` or so for prose.
- Thai and Chinese text: keep the same physical measure, which holds fewer characters (roughly 30 to 45 Chinese characters).
- Wide screens get columns or margins, never full-width paragraphs.

## 4. No AI-slop fonts
- Banned as primary faces: Inter, Poppins, Montserrat, Roboto, Open Sans, Lato, DM Sans, Space Grotesk, Geist, Plus Jakarta Sans, Manrope, Nunito, and any system-ui default stack used as the design font.
- Use a modern Bauhaus / Bayer Universal–style geometric face with a verified license. Free options include Jost (first choice, Futura and Bauhaus in spirit), Josefin Sans or League Spartan for display, and Prompt or Kanit for Thai. For Chinese, use a matching geometric sans and keep its weights consistent.
- At most two families per product.

## 5. No lazy ornaments
- No decorative boxes, borders, cards, dividers, blobs, gradients, glows or icon tiles added only to fill space or balance a page.
- Every container must group something that belongs together. If removing it loses no meaning, remove it.
- No emoji used as icons, stock icon sets used as decoration, or generic gradient heroes.

## 6. Clear hierarchy: something must win
- Every page has one obvious first thing to look at (the hero number, the map, the headline), then a clear second and third.
- Use real contrast in size (at least a 1.5 to 2 times type-scale step between levels), weight, colour and space. No grid of equal cards where everything has the same weight.
- If a screenshot squinted at shows no focal point, it fails.

## 7. More slop to kill
- Centre-everything layouts and symmetric card grids used by default.
- Fake depth: stacked shadows, glassmorphism, rounded-everything at the same radius.
- Hero sections with a vague slogan and no real content.
- Filler copy ("Unlock the power of...", "Seamless", "Revolutionize") and lorem-style placeholder stats.
- Too many colours. Use one accent that means something.
- Thick top and bottom bars and padded chrome that shrink the main content.
- Icons and badges on every line.
- Dense pages where all the text is the same small grey.

## Review checklist (run before shipping)
1. Screenshot the page at 1440, 1024 and 390 px wide.
2. Check each of rules 1 to 7 above, and list every hit with its element.
3. Fix the hits, then screenshot again.
4. Have a different agent or person check the result; never self-review.

Use the [composition worksheet](../bauhaus-human-design/assets/composition-brief.md)
for decisions, real task outcomes and unverified checks. Neither lint nor a
completed worksheet certifies taste, accessibility or human authorship.

## Spatial relationships and narrative images

When a composition is aligned yet arbitrary, or an image feels pasted beside text, read [Anti-spatial-hallucination](references/spatial-hallucination.md). It defines image roles, hero/overlay acceptance, whitespace intent and responsive evidence. Do not enlarge every image or weaken the host project’s style rules. This packaged reference mirrors the root guide; update both together.
