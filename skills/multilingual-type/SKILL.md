---
name: multilingual-type
description: Type in a script you do not read. Use for any Thai, CJK, Arabic, or multi-script surface.
license: MIT
---

# Multilingual Type

> Native readers identify foreign-made work in a glance, and almost never from the words. They identify it from the *type* — a typeface choice that signals "learner material," a line-height tuned for Latin, a font stack that silently falls back to a system face nobody would have chosen.

If you cannot read the script, you cannot see the error. That is precisely why it needs written rules rather than judgment.

---

## 1. Thai — the loop is the tell

Thai letterforms traditionally carry a หัว, a small head-loop. Two things follow that most non-Thai designers never learn:

- **Loop size signals audience.** Learners' materials and children's books use large, prominent loops because the loop aids letter recognition. When Thai people handwrite, the loop shrinks until it is vestigial or gone.
- **So prominent loops read as "not made by Thais."** A large-looped face on a government dashboard, a corporate deck, or a city surface reads the way Comic Sans reads on an invoice — instantly, and to everyone.

**Use non-looped Thai faces:** IBM Plex Sans Thai, Noto Sans Thai, Prompt, Kanit.

**Never** IBM Plex Sans Thai *Looped*, Sarabun, or TH Sarabun New on a modern professional surface — regardless of how common they are in Thai government documents. Their ubiquity there is exactly the association being avoided.

**Mechanics beyond the face:**
- Thai has no spaces between words. Line breaking needs a dictionary, and CSS `word-break` will break mid-word without one. Use `line-break: normal` and test real sentences, not lorem.
- Thai stacks vowels and tone marks above and below the baseline. **Latin line-height crushes them.** Thai needs roughly 1.6–1.8 where Latin takes 1.5, or the marks collide with the line above.
- Thai has no capitals. Hierarchy comes from size and weight only — an `uppercase` transform does nothing to Thai and silently produces a mixed-signal heading.
- Thai text runs 15–30% longer than English. Buttons and columns sized to English will overflow.

**Voice, not type, but it travels with it:** first person is ผม. Never ฉัน, เรา, or ข้าพเจ้า in professional register.

## 2. CJK

- **Simplified for mainland China; Traditional for Taiwan and Hong Kong.** These are not interchangeable, and auto-converting between them produces text that reads as machine output.
- **Region-correct faces.** Chinese, Japanese, and Korean share many code points but render them differently — a Japanese reader sees a Chinese font as subtly wrong. Set `lang` correctly and use the right Noto CJK subset.
- **No synthetic bold.** Faux-bolding CJK smears dense glyphs into ink. Load a real weight.
- **Punctuation is full-width** (`，。：`), not Latin punctuation with spaces.
- CJK needs no word spacing and breaks anywhere, so it does not need the Thai treatment — but it does need generous line-height for dense glyphs.

## 3. Arabic, Hebrew, and RTL

- **Direction is a document property, not a text style.** Set `dir="rtl"` and let logical properties do the work: `margin-inline-start`, not `margin-left`. A layout built on physical properties mirrors incorrectly and will take longer to fix than to have built right.
- **Arabic is cursive and contextual** — letters change shape by position. Never letter-space it; tracking breaks the joins.
- **Numbers and embedded Latin stay LTR** inside RTL text. The bidi algorithm handles it if the markup is honest.
- Arabic needs more vertical space than Latin at the same nominal size.

## 4. Rules that hold for every script

- **Set `lang` correctly on the element.** It drives font selection, line breaking, hyphenation, and screen-reader pronunciation. Getting it wrong degrades all four silently.
- **Test with real text.** Lorem ipsum is Latin — it will never reveal a mark collision, a missing glyph, or a length overflow.
- **Check the fallback.** A stack that ends in a generic `sans-serif` will silently pick a system face that may be looped, wrong-region, or missing glyphs. Name a real fallback for each script.
- **Never mix scripts in one face unless it was designed for both.** Noto and IBM Plex ship matched families; most others do not, and the mismatch in weight and x-height is visible even to monolingual readers.
- **Size for the script, not the Latin.** The same `font-size` renders at different apparent sizes across scripts. Thai and CJK usually need a small bump.
- **Have a native reader look before shipping.** One glance catches what no checklist will. This is not optional on a public civic surface.

---

## The check

```
□ Thai: non-looped face only? No Sarabun / TH Sarabun New / Plex Looped?
□ Thai: line-height ≥1.6 so tone marks clear the line above?
□ Thai: no uppercase transform on headings?
□ Thai/CJK: does the layout survive 15–30% length expansion?
□ CJK: right variant for the region, real weights, full-width punctuation?
□ RTL: logical properties throughout, no letter-spacing on Arabic?
□ Is `lang` set correctly on every element?
□ Tested with real sentences, not lorem?
□ Is the fallback stack named per script, not just `sans-serif`?
□ Has a native reader actually looked at it?
```

Pairs with `colour-and-type`, `phone-first`, `beyond-the-screen`, `cognition-first`.
