---
name: beyond-the-screen
description: Decks, PDFs, documents, and social cards under the same design law. Use for any non-app surface.
license: MIT
---

# Beyond the Screen

> A design system that only governs web UI will lose the room in the surfaces that carry the most weight — the deck in front of a ministry, the PDF a client forwards, the card that gets screenshotted. These are not lesser artifacts. Often they are the only artifact a decision-maker ever sees.

The invariants do not change here. What changes is the medium's constraints, and each one has a failure mode the screen never taught you.

---

## 1. Decks

The register is Institutional: light ground, print-safe, near-zero motion, generous whitespace. **The restraint is the argument.** A ministry deck that looks like a startup landing page loses the room before slide two.

- **One idea per slide.** If the slide needs a second heading, it is two slides.
- **The slide is not the document.** Speaker notes carry the detail. A slide dense enough to read is a slide nobody listens through.
- **It will be projected badly.** Assume a washed-out projector in a bright room: hairlines vanish, mid-greys turn white, thin weights disappear. Test contrast harder than for screen.
- **It will be screenshotted.** Any single slide may travel alone, out of sequence. Each one needs enough context to survive that — a title that means something without the previous slide.
- **Motion is 0–1.** It may be printed, projected, or pasted into a chat thread. Build for the still frame.
- **16:9, and check the bottom.** Projector overscan and lower-thirds eat the last ~8% of the frame. Nothing load-bearing lives there.

## 2. PDFs and documents

- **Real page geometry.** Margins that survive printing and binding; nothing critical inside 15mm of an edge.
- **It must survive greyscale.** Someone will print it on a mono office printer. If the only difference between two series is hue, it is gone. This is the same discipline as never encoding by colour alone.
- **Measure still caps at 65–75 characters.** A full-width A4 text block is unreadable — use a column, or genuine multi-column.
- **Page numbers, running heads, a date.** A document that circulates for months without a version or date becomes a liability, because someone will act on the stale one.
- **Hyperlinks must also be readable as text.** "Click here" dies the moment it is printed. Write the destination.

## 3. Social and share cards

- **The card is the first impression, not the page.** It is what gets seen in the feed and in the chat preview.
- **Legible at thumbnail.** Test at roughly 200px wide. Body text will not survive; a short line and a strong structure will.
- **Text-safe area.** Platforms crop differently at different sizes. Keep type well inside the frame.
- **`og:image` at 1200×630, and set it deliberately.** A missing OG image gets you a grey box or a scraped logo — the ugliest possible first impression, and completely avoidable.

## 4. Infographics

The most-abused format, because it invites decoration:

- **The data still obeys `data-display`.** Bars start at zero on a poster exactly as on a screen.
- **One reading path.** An infographic with no clear entry point and direction is a poster with numbers on it. Decide where the eye starts and where it goes.
- **Every icon carries information or is deleted.** Decorative icons beside statistics are the infographic equivalent of chartjunk.
- **Source, method, and date, visibly.** These circulate far from their author and get cited. An uncredited infographic is a rumour with a chart.

## 5. What transfers, and what does not

| Holds everywhere | Changes by medium |
|---|---|
| Zero radius, no gradients, no shadows | Motion budget — screen has one, print has none |
| One accent, meaning-carrying | Ground — print goes light, print-safe |
| Three sizes per surface | Absolute sizes — physical media need larger minimums |
| Every edge resolves to another edge | Grid — page geometry is not a viewport |
| Provenance on every number | Interaction — none exists; all context must be on the page |
| Measure 65–75ch | Column structure to achieve it |

**The recurring mistake** is treating non-screen surfaces as a lesser output of the web design — exporting a screenshot into a deck, or a webpage to PDF. Each medium is composed for its own constraints, or it looks like what it is: a leftover.

---

## The check

```
□ Right register — Institutional for decks and print?
□ Does it survive greyscale?
□ Does it survive a bad projector — hairlines and mid-greys still visible?
□ Does a single slide or page still make sense alone, screenshotted?
□ Is anything load-bearing in the bottom 8% or within 15mm of an edge?
□ Measure still 65–75ch?
□ Date, version, source, method present?
□ Is the OG/share card set, and legible at 200px?
□ Do charts obey data-display, or did the poster format loosen them?
□ Was this composed for the medium, or exported from the website?
```

Pairs with `design-registers` (Institutional), `data-display`, `honest-envelope`, `make-it-stick`.
