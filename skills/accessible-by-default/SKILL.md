---
name: accessible-by-default
description: >-
  Build surfaces usable by keyboard, screen reader, and low vision on a cheap
  phone. Use when shipping any public, civic, or user-facing interface.
license: MIT
---

# Accessible by Default

> The reader this practice keeps naming — someone on a five-year-old Android, in a flood, who may not read English — is also someone with cataracts, one free hand, and a cracked screen in daylight. Everything below follows from taking that reader literally.

The design cluster in this repo governs how a surface *looks*
([`axiom-design-core`](../axiom-design-core/SKILL.md),
[`design-dna`](../design-dna/SKILL.md)) and how it avoids looking machine-made
([`no-design-tells`](../no-design-tells/SKILL.md)). This skill governs whether it
can be **operated** at all. Those are different questions and the second one is
the one with legal and civic weight.

`no-design-tells` already carries a four-line accessibility gate. That is a
checklist item at the end. This is the practice that makes passing it the default
rather than a scramble.

---

## The rule

Keyboard, contrast, target size, and a text alternative are structural, not
polish. They are decided when the markup is written and are expensive to retrofit
after.

---

## The five that catch almost everything

Ranked by how often they break real usage, not by how often they appear in audits.

### 1. Everything interactive is reachable and visible by keyboard

Tab through the whole surface without a mouse. Every control reachable, in a
sensible order, with a focus ring you can actually see. `outline: none` with no
replacement is the single most common accessibility defect on generated
interfaces, and agents add it constantly because it looks tidier.

```css
/* never ship this alone */
:focus { outline: none; }

/* ship this */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

A `<div onclick>` is not a button. It is not focusable, not announced, and does
not fire on Enter or Space. Use the real element; the browser has done this work.

### 2. Contrast that survives a phone in sunlight

Body text ≥ 4.5:1 against its actual background, large text (≥24px, or ≥19px bold)
≥ 3:1, and **UI components and focus indicators ≥ 3:1** — the last one is the one
everybody forgets, and it is why a beautiful hairline border can be invisible on
the device that matters.

Grey-on-grey secondary text is the most common failure in dashboards. If a label
is "de-emphasised" below 4.5:1, it is not de-emphasised, it is gone.

### 3. Targets big enough for a thumb in the rain

44×44 CSS pixels minimum for anything tappable, with real spacing between
adjacent targets. See [`phone-first`](../phone-first/SKILL.md) — this is the same
constraint arriving from the accessibility side, and the two agree.

### 4. Every non-text thing has a text equivalent

Images that carry information get real alt text that says what the image *tells
you*, not what it depicts. Decorative images get `alt=""` — empty, not missing, so
the screen reader skips them instead of reading the filename.

Charts and maps are the hard case and the one this practice hits constantly: a
dashboard whose only representation of the data is a canvas is unreadable to a
screen reader and to anyone whose connection dropped the tiles. **Ship the table
too.** It is usually five lines, it is better for copy-paste and for citation, and
per [`data-display`](../data-display/SKILL.md) the numbers were supposed to be
legible anyway.

### 5. State changes are announced, not just animated

If a value updates, a filter applies, or an error appears, a sighted user sees it
move. Nobody else does. Put important updates in a live region, and put the error
message next to the field, in text, associated with the input — not in a colour
change and not only in a toast that vanishes.

```html
<div aria-live="polite">Air quality updated — 3 minutes ago</div>
<label for="q">Search</label><input id="q" aria-describedby="q-err">
<p id="q-err" role="alert">Enter at least two characters.</p>
```

**Colour is never the only carrier.** Red-for-bad and green-for-good, alone,
excludes roughly one in twelve men. Add a word, a shape, or a position — which
[`honest-envelope`](../honest-envelope/SKILL.md) already requires for a different
reason, since a colour cannot carry `{source, tier, age}` either.

---

## Verify it, do not assert it

An agent claiming "the interface is accessible" without running anything is
exactly the [`wrong-green`](../wrong-green/SKILL.md) failure. Three checks, in
increasing cost:

```bash
# 1. Automated pass — catches roughly a third of real issues. Necessary, not sufficient.
npx @axe-core/cli https://your-live-url

# 2. Keyboard pass — 60 seconds, catches what automation cannot.
#    Tab through the whole flow. Can you reach every control? See where you are?
#    Complete the task and escape every dialog without touching the mouse?

# 3. Zoom pass — set the browser to 200% and to a 320px-wide viewport.
#    Nothing may be cut off, overlap, or require horizontal scrolling to read.
```

Then verify on the live URL per [`browser-as-t`](../browser-as-t/SKILL.md), and
report which of the three you actually ran. "Axe found zero violations" is a true
statement about a tool, not a claim that the surface is usable.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| `outline: none` because the focus ring is ugly | You removed the only way a keyboard user knows where they are. Restyle it, do not delete it |
| `<div onclick>` styled as a button | Not focusable, not announced, does not fire on Enter. Use `<button>` |
| Placeholder text instead of a label | It disappears on focus, fails contrast, and is not announced as a label |
| An accessibility pass scheduled after launch | Every one of these is a markup decision; retrofitting means rewriting the markup |
| `aria-label` sprinkled onto native elements | ARIA overrides the accessible name the element already had, usually making it worse. First rule of ARIA is not to use ARIA |
| A chart with no table | Unreadable to a screen reader, and to anyone whose tiles failed to load |
| Colour alone for status | Excludes about one in twelve men, and carries no provenance either |
| "Automated audit passed" as the claim | Automation catches a minority of real issues; say which checks you ran |

---

## The test

Unplug the mouse and complete the primary task. Then set the browser to 200% zoom
and do it again. If either is impossible, the surface is not finished — and for a
public civic surface, it is not shippable, whatever the design looks like.
