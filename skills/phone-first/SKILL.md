---
name: phone-first
description: The link gets opened on a phone. Build there first. Use for any surface that will be shared.
license: MIT
---

# Phone First

> Almost everything gets discovered the same way: a link dropped into WhatsApp, LINE, or a Telegram group. The recipient opens it on a phone, in portrait, with one thumb, often on a slow connection. **That is the first impression.** Desktop is the second one, for people already convinced.

This is not "make it responsive." Responsive usually means a desktop design that survives being squeezed. This is the reverse: design at 390px, then let the extra room earn its keep.

---

## 1. The direction of the media query tells you everything

Base CSS is the phone. Everything above it is `@media (min-width: …)`. If the stylesheet reads desktop-first with mobile patches, the phone got the leftovers — and the leftovers are what most people will see.

A quick audit: search the stylesheet for `max-width`. A pile of them is a desktop-first design wearing a mobile costume.

## 2. The hard numbers

- **Every interactive target ≥ 44 × 44px.** Not most. `display: inline-flex; align-items: center; min-height: 44px` is the canonical implementation, because padding alone does not make a target when the line box is short.
- **At least 8px between adjacent targets.** Individually-legal buttons packed together still produce mis-taps.
- **No horizontal scroll on the main axis, ever.** A deliberate horizontal scroller (one map row, one table) is an explicit exception with `overflow-x: auto` on that element — never the page.
- **Read at 360px without breaking.** Not 375. The floor is lower than the popular device.
- **No fixed pixel widths in body content.** `min(var(--w), calc(100% - 32px))` or equivalent.
- **`100dvh`, not `100vh`.** `vh` ignores the mobile browser chrome, so a "full height" hero is cut off exactly where the CTA sits.
- **`overflow-x: clip` on both `html` and `body`** as a backstop. One overflowing child otherwise makes the whole page slide.

## 3. What changes shape, and what does not

- **Every grid collapses to one column.** Cleanly — not with orphaned cells.
- **Type stays in the three-size hierarchy.** Shrinking the display tier on phone flattens the hierarchy exactly where it is needed most. `clamp()` with a real floor, not a scale-everything-down.
- **Photographic aspect collapses for legibility.** A 21:9 cinematic crop on desktop becomes 4:3 or 3:2 on a phone. A letterboxed sliver with the caption overlapping is a failure, not a compromise.
- **Tables do not become cards automatically.** Decide: horizontal scroll with a frozen first column, or a genuine per-row layout. Auto-stacking a table into cards loses the column relationships that made it a table.

## 4. Conditions, not just dimensions

The phone is not a small desktop. It is a different situation:

- **Outdoors, in sun.** Low-contrast greys that pass on a calibrated monitor disappear. This is why the Civic register defaults to a light ground.
- **One thumb.** The reachable zone is the bottom two-thirds. Primary actions belong there, not in a top-right corner.
- **A slow connection.** Web fonts, hero images, and analytics all block the first impression. Weigh what loads before first paint.
- **Interruption.** The reader is walking, in a meeting, half-attending. State must be legible at a glance — see `cognition-first`.

## 5. Verify on the device, not in the emulator

Devtools responsive mode does not reproduce: real touch targets, the browser chrome eating viewport height, OS text-size settings, sun, or a thumb. Load the actual URL on an actual phone before calling a layout change done.

**The test:** would you hand the phone across a table to a stranger and say "look at this"? If not, it is not finished.

---

## The check

```
□ Is base CSS the phone, with min-width queries up?
□ Every interactive target ≥44px, with ≥8px between?
□ Any horizontal scroll on the main axis?
□ Does it read at 360px?
□ 100dvh rather than 100vh?
□ overflow-x: clip on html AND body?
□ Do grids collapse to one column without orphans?
□ Does the display size hold, or did the hierarchy flatten?
□ Are primary actions in the thumb zone?
□ Opened on a real phone, on the live URL?
```

Pairs with `cognition-first`, `dashboard-discipline`, `no-design-tells`, `ship-discipline` (the live URL is the test surface).
