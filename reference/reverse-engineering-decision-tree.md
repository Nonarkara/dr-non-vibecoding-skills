# Reverse-Engineering Decision Tree

When a brief says "rebuild this site" or "match this design," the first question is *what kind of site is it?* The answer picks the path. This file is the decision tree — five paths, each with a recipe, an honesty check, and a set of tells that mean the path was wrong.

Read this before `design-extract` (which extracts design tokens from a *known* target). This file is the layer *above* `design-extract`: it picks the path, then the right tools for the path. Pair with `karpathy-guidelines` (assumptions first), `ninja-innovation` (reframe before refactor), and `no-ai-tells` (do not ship a clone that has the agent-built tells layered on top of the original).

---

## The five paths

The paths are mutually exclusive at the *strategy* layer. You might end up using two paths for a single site — e.g. (1) `wget` mirror of the marketing pages, then (2) template rebuild of the app. But you have to pick *one* path first; the second path is a known extension, not an open choice.

### Path 1 — Static HTML / CSS, no framework

**Signal**: `view-source:` shows hand-written HTML, no JS bundle, no SPA routing, page navigations are full reloads. Often a portfolio, marketing site, or small business site.

**Recipe**:

```bash
# Mirror the site
wget --mirror \
     --convert-links \
     --adjust-extension \
     --page-requisites \
     --no-parent \
     --no-host-directories \
     --restrict-file-names=windows \
     --reject-regex ".*\?(utm_|ref=|fbclid=|gclid=).*" \
     https://example.com

# Remove tracking
find example.com -type f -name "*.html" -exec sed -i '' \
  -e 's|https://www.googletagmanager.com/[^"]*||g' \
  -e 's|https://www.google-analytics.com/[^"]*||g' \
  -e 's|https://connect.facebook.net/[^"]*||g' \
  {} \;

# Replace copy
# Use sed / your editor to replace text and brand colours. Then verify in a real browser.
```

**Honesty check**:

- The `wget` mirror is the real source 1:1 faithful replica *if and only if* the site has no JS-driven dynamic content. If you can scroll the live site and see content the mirror doesn't show, this is the wrong path.
- Always keep `index-original.html` read-only as the source of truth.
- Write a `NOTES.md` (what was changed) and a `TEARDOWN.md` (how the original was structured) before replacing anything.

**Tells this path is wrong**:

- Live site shows animations / carousels / lazy-loaded content that the mirror doesn't.
- Live site has interactive elements (search, filter, form submission).
- The page becomes blank or empty after a navigation click.

### Path 2 — React / Vue / Next (content-focused)

**Signal**: JS bundle in the network tab, hydration markup, `__NEXT_DATA__` or `__NUXT__` in the page source, page navigations are client-side.

**Recipe**:

```bash
# Use a rebuild template (e.g. ai-website-cloner-template, Node 24+)
git clone https://github.com/JCodesMore/ai-website-cloner-template.git my-clone
cd my-clone
npm install

# Configure Claude Code with Chrome MCP
claude --chrome
/clone-website https://example.com
```

Then re-author each section as a real component, not a copy. Inject your content; do not modify the original text in place.

**Honesty check**:

- The rebuild template gives you *structure* — the route map, the layout shell, the build pipeline. It does not give you *content*; that is yours to author.
- If the live site has dynamic data (a blog, a catalogue, a CMS), the rebuild is a static clone; the dynamic part needs a real backend.
- Use `design-extract` to grab the type + palette + spacing, not to copy the markup.

**Tells this path is wrong**:

- The live site is data-driven and the rebuild shows hard-coded JSON.
- The original has a complex build (e.g. monorepo with custom webpack) that the template cannot mirror.
- Routing is non-trivial (i18n, deep nesting, modal routes).

### Path 3 — SPA / SaaS / data-driven

**Signal**: Single HTML shell, all data loaded via XHR/fetch after initial paint, route changes update the URL but not the document.

**Recipe**:

```bash
# Capture API fixtures with network-capture.mjs
# This produces a JSON file per endpoint, replayed by a local mock server.
node network-capture.mjs --url https://app.example.com --out ./fixtures

# Build the UI against the local fixtures
# Run your dev server with the mock server as the data source.
```

**Honesty check**:

- The fixtures are the *data*, not the *truth*. The real backend may have auth, rate limits, edge cases the fixtures do not.
- Always capture at least one authenticated and one anonymous session. The shapes differ.
- The mock server is a development tool, not a production substitute. If the rebuild is being shipped, it needs a real backend.

**Tells this path is wrong**:

- The site has WebSocket streams the capture cannot record.
- The site has a complex auth flow (OAuth, magic link, MFA) that the mock server cannot simulate.
- The data shapes change per user (personalisation) and the fixtures are not representative.

### Path 4 — Multi-page official / product site

**Signal**: Many routes, many templates per page type, heavy use of shared components (header, footer, nav). Often 20+ pages with the same chrome and different body.

**Recipe**:

```bash
# Crawl the route map
node route-crawl.mjs --url https://example.com --out ./routes.json

# Extract templates per page type (homepage, product, blog post, contact, etc.)
# For each unique template, capture one canonical example.
# Then unified content replacement: replace copy, brand, media across all pages.
```

**Honesty check**:

- The route crawl produces a *graph*; the templates are the *nodes*; the edges are the navigations. If the graph has cycles (e.g. infinite-scroll product list), the crawl needs a depth limit.
- Unified content replacement is a sed-level operation. Test on one page first.
- The shared chrome (header, footer, nav) is a single template used many times; treat it as a component, not as page-specific content.

**Tells this path is wrong**:

- The site has only one route (use Path 1 or 2).
- The site is a single-page app (use Path 3).
- The shared chrome varies by page (different header on mobile vs desktop is *not* a chrome change; different header on `/about` vs `/product` is).

### Path 5 — Complex interactions / WebGL / canvas

**Signal**: Heavy canvas, WebGL, scroll-driven animation, drag interactions, 3D scenes. The site *is* the interaction; a screenshot tells you nothing.

**Recipe**:

```bash
# Record interaction states
node interaction-probe.mjs --url https://example.com --out ./interactions.json

# The probe records: hover states, click states, scroll states, drag states,
# canvas content at multiple timepoints. The output is a JSON of {state, snapshot, diff}.

# For static builds with heavy WebGL (Astro / Vite SSG / Hugo), mirror the full asset set:
node mirror-site.mjs --url https://example.com --out ./mirror
# Self-host the fonts; remove tracking; serve the mirror as a true 1:1 replica.
```

**Honesty check**:

- Screenshots are not interactions. If you only have the first-screen screenshot, you don't have the site.
- The interaction probe is a finite sample; it does not capture the *full* state space.
- For WebGL / canvas, the only honest path is full-asset mirror + self-host + remove tracking. There is no "rebuild" path that preserves the visual fidelity.

**Tells this path is wrong**:

- The site has no significant interaction (use Path 1, 2, 3, or 4).
- The site is a static build with minimal JS (use Path 5's mirror variant, not the interaction probe).

---

## The pre-flight (always run)

Before picking a path, run these four checks. Each one either confirms the path or invalidates it.

1. **`gh api search/repositories?q=<name>`** — find the real source on GitHub first. If the site has an open-source repo (or an obvious sister repo), clone it and skip the reverse-engineering entirely. Reverse-engineering a site whose source is public is wasted work.
2. **Browser probe the site**: scroll the homepage, navigate to two inner pages, open the menu, open a modal, submit a form (with a fake email). Note which of the five signals match.
3. **Network tab inspection**: what does the initial HTML response contain? What does the JS bundle size say? What endpoints does the SPA call?
4. **Browser DevTools "Save As"**: save the homepage as a single `.html` file. Open it locally. If it still works, the site is largely server-rendered (Path 1 or 2). If it's blank, it's an SPA (Path 3).

After the pre-flight, you have *one* path. Pick it. If the pre-flight is ambiguous, default to Path 1 (the most honest — what you mirror is what's there) and document why the other paths were rejected.

---

## What this file is *not*

- It is not a "how to clone any website" tool. Cloning is a *legal* and *ethical* question as much as a technical one. Cloning a competitor's site to ship a competing product is not a vibe-coding task; it is a different discipline with different rules.
- It is not a substitute for the operator's own understanding of the site. The five paths are decision-tree branches, not autonomous agents.
- It is not a tool to copy proprietary code, trade secrets, or anything behind a login wall. The recipes assume public surfaces.

## Pairs with

- [`design-extract`](../skills/design-extract/SKILL.md) — extracts design tokens from a *known* target. This file picks the target; `design-extract` extracts the numbers.
- [`ninja-innovation`](../skills/ninja-innovation/SKILL.md) — reframe before refactor. Before cloning, ask: do you want a clone, a study, or a rebuild with new content?
- [`karpathy-guidelines`](../skills/karpathy-guidelines/SKILL.md) — assumptions first. State the path and the reason; the operator confirms.
- [`no-ai-tells`](../skills/no-ai-tells/SKILL.md) — when the rebuild ships, it should not have the agent-built tells layered on top of the original design.
- [`axiom-design-core`](../skills/axiom-design-core/SKILL.md) — the design law. The rebuild's *new* content should be expressed through the project's chosen aesthetic, not the original's.

## Check

A reverse-engineering task is *ready* to ship when:

- The path was picked from the pre-flight, not from the brief.
- The source is preserved (`index-original.html` read-only, or `NOTES.md` describing the source) so the work is auditable.
- The rebuild was verified in a real browser at three viewport sizes (mobile, tablet, desktop) and three network speeds (Fast 3G, Slow 4G, cable).
- The tell list for the chosen path was run, and no tells were hit.
- The operator signed off on *what was preserved from the original* and *what was newly authored*.
