---
name: map-first-dashboard
description: >-
  Give the map most of the screen and keep the bars slim. Use on the first
  layout of a map dashboard, and before calling that layout done. Do not use
  for a page with no map.
license: MIT
---

# Map-first dashboard

> The map is the cadaver on the surgical table. It gets the centre and the most space. The bars are the instrument tray: pick up a tool, then go back to the table. A surrounding panel exists only to add something to the map.

This fires on the **first layout**, before cards, tabs, or a second bar exist. A thick chrome that a later pass is supposed to slim has already failed.

## The incident

13 Oct 2026, the Malaysia · God Mode screen. The top bar carried a title, a search field, a view switch, language chips, and a row of section tabs. Under it sat an alert essay and a row of stat tiles. A bottom nav closed the page. The map, which is the product, was the leftover window. The owner named the surgical table that day, and said this screen happens every time.

## The rule

1. Lay the shell out as one column: top bar, map, bottom nav. The map is `flex: 1`. The page is `100dvh` and does not scroll to reveal more chrome.
2. Stat tiles, alert essays, gauge cards, and section tabs are not siblings above the map. They live in one drawer or one overlay that opens on purpose and closes back to the map. Default is closed.
3. A card left sitting on the map is the banned float (standing contract §8). A drawer that opens and closes is the tray.
4. The painted control is slim. The hit target stays 44×44px. Spacing carries the hit area. Padding does not.

Mark the three regions `data-map`, `data-map-bar`, and `data-map-nav`. The box of `[data-map]` is the map the eye sees. A canvas that runs under the header does not get to count the covered pixels. Inset the map element to the visible region, or put the bars outside it.

## The gates

Measure with `getBoundingClientRect` at two viewports. These are fail lines, not targets to approach later.

| Gate | Fail if |
|---|---|
| Mobile map, **390×844** | `[data-map]` height / viewport height **< 0.65**. The first layout aims at **≥ 0.70**, so one extra line cannot sink it under 0.65. |
| Desktop map, **1440×900** | `[data-map]` area is not **strictly the largest** region. Test the drawer **closed**. An open side dock that is larger than the map fails. |
| Top bar | Taller than **44px** below 768px, or taller than **48px** at 768px and up. Two rows fail even when each row is short. |
| Bottom nav | Taller than **56px**. The home-indicator inset fits inside that 56px. If the OS inset would push the row past 56px, something else in the chrome gives the space back until the map gate still passes. |
| Painted chip | Vertical padding outside **4–6px**, or a border thicker than **1px**. |
| Hit target | The control's border box is under **44×44px**, or adjacent hit boxes are under **8px** apart. |
| Cards | Any stat tile, alert card, or section-tab row in document flow above `[data-map]`. |
| Scroll | `document.documentElement.scrollHeight > window.innerHeight` on the map shell. The map page does not scroll to show chrome. |

## First layout

Write this before any card. `min-height: 65dvh` is the floor the browser holds. Do not drop it to make a card fit.

```css
.map-shell {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}
.map-shell [data-map-bar] {
  flex: 0 0 auto;
  max-height: 44px;
  border-bottom: 1px solid var(--line);
}
@media (min-width: 768px) {
  .map-shell [data-map-bar] { max-height: 48px; }
}
.map-shell [data-map] {
  flex: 1 1 auto;
  min-height: 65dvh;
  min-width: 0;
  position: relative;
}
.map-shell [data-map-nav] {
  flex: 0 0 auto;
  max-height: 56px;
  border-top: 1px solid var(--line);
}
```

Search that does not fit the bar expands **over** the map. It does not grow the bar. Section tabs (Nation, Water, Mobility, and the rest) live in the drawer.

```css
.map-chip {
  /* hit box — phone-first and accessible-by-default */
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.map-chip__face {
  padding: 4px 8px; /* 4–6px vertical */
  border: 1px solid var(--line);
  border-radius: 0;
}
```

House law still holds: 0 radius, hairline, no glow, no gradient on the chrome.

## Pre-ship check

Screenshot both sizes, then measure in the page. A screenshot without the numbers is not this check.

```bash
npx playwright screenshot --viewport-size=390,844  "$URL" /tmp/map-390.png
npx playwright screenshot --viewport-size=1440,900 "$URL" /tmp/map-1440.png
```

```js
function mapGates() {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const named = [
    ["map", "[data-map]"],
    ["bar", "[data-map-bar]"],
    ["nav", "[data-map-nav]"],
    ["dock", "[data-map-dock]"],
  ];
  const regions = named.flatMap(([name, sel]) =>
    [...document.querySelectorAll(sel)].map((el) => {
      const r = el.getBoundingClientRect();
      return { name, area: r.width * r.height, h: r.height };
    })
  );
  const map = regions.find((r) => r.name === "map");
  const bar = regions.find((r) => r.name === "bar");
  const nav = regions.find((r) => r.name === "nav");
  const heightShare = map ? map.h / vh : null;
  const mapIsLargest = !!map && regions.every((r) => r.name === "map" || r.area < map.area);
  const barCap = vw >= 768 ? 48 : 44;
  const fail = !map
    || (vw < 768 && heightShare < 0.65)
    || (vw >= 768 && !mapIsLargest)
    || (bar?.h ?? 0) > barCap + 0.5
    || (nav?.h ?? 0) > 56.5
    || document.documentElement.scrollHeight > vh;
  return { viewport: `${vw}x${vh}`, heightShare, bar: bar?.h ?? null, nav: nav?.h ?? null, mapIsLargest, scrolls: document.documentElement.scrollHeight > vh, fail };
}
```

Paste the two result objects in the PR. **Fail the ship** when any row in the gates table fails. Do not average the two viewports. Do not pass desktop and skip 390×844.

On mobile, height share under 0.65 fails. Between 0.65 and 0.70 is a pass with a debt: the next line of chrome will fail it, so the first layout should already be at or above 0.70.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Slim the bars in a follow-up | The first layout is the one that ships. The incident was a follow-up that never came. |
| A second row of tabs "because they fit" | That row is why the top bar stops being 44px. |
| Alert card and stat tiles stacked above the map | They are the instrument tray. Open them, read them, close them. |
| `min-height: 44px` on the painted chip | That is how the button becomes a thick box. The button is 44px. The face inside it is 4–6px of padding. |
| Full-bleed canvas under a fat header, reported as 100% | Covered pixels are not map. |
| Measuring one viewport | 390×844 and 1440×900 are both required. |

## The check

```
□ Shell is top bar / map / bottom nav, map flex 1, page 100dvh, no document scroll?
□ [data-map] ≥ 0.65 of height at 390×844, and the largest area at 1440×900 with the drawer closed?
□ Top bar ≤ 44px mobile / ≤ 48px desktop, one row? Bottom nav ≤ 56px?
□ Painted chips 4–6px vertical padding, 1px border? Hit boxes ≥ 44×44 with ≥ 8px between?
□ Stats, alerts, and section tabs in a drawer or overlay, closed by default?
□ Both screenshots and both mapGates() objects in the PR, and nothing in the gates table failed?
```

Pairs with [`dashboard-discipline`](../dashboard-discipline/SKILL.md), [`phone-first`](../phone-first/SKILL.md), [`accessible-by-default`](../accessible-by-default/SKILL.md), [`map-3d-city`](../map-3d-city/SKILL.md), [`see-and-revise`](../see-and-revise/SKILL.md), [`no-design-tells`](../no-design-tells/SKILL.md). Geometry, contrast, and honesty of the numbers are their jobs. This skill is only the share of the screen.
