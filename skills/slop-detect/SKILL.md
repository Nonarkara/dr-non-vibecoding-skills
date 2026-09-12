---
name: slop-detect
description: Use when a landing page must be scored against AI-design-slop tells before ship. Bridges the qualitative discipline (no-design-tells) and the ravidsrk/slop-detect tool.
license: MIT
---

# Slop Detect

> The agent applied the discipline; the tool measures the result. The bridge between *no-design-tells* (the qualitative discipline the agent follows) and `ravidsrk/slop-detect` (the quantitative tool that scores the agent's output).

This skill is the *bridge* between the qualitative discipline the agent already knows (the design DNA in [`axiom-design-core`](../axiom-design-core/SKILL.md), the tells to refuse in [`no-design-tells`](../no-design-tells/SKILL.md), the descriptive discipline in [`adrian-martinez-curated-web-design-skills-2026`](../adrian-martinez-curated-web-design-skills-2026/SKILL.md)) and the *quantitative tool* that scores the agent's output against a measurable fingerprint.

The tool is [`ravidsrk/slop-detect`](https://github.com/ravidsrk/slop-detect) — MIT licensed, by Ravindra Kumar. It scores any landing page on 4 axes (design slop, copy slop, system adherence, AEO/agent-readable) against a weighted catalogue of CSS and copy tells that Cursor, v0, Lovable, and Bolt converged on by April 2026. Returns a letter grade (A+ → F) and a copy-pasteable fix prompt.

**Provenance:** distilled from three converging practices — the [`ravidsrk/slop-detect`](https://github.com/ravidsrk/slop-detect) tool (the scoring engine + the 16/19/27-rule catalogue), the [Adrian Krebs](https://www.adriankrebs.ch/blog/design-slop/) original 12-pattern fingerprint study (the source of the design-slop tells), and [Meng To's Aura tutorial](https://x.com/MengTo) (which codified the gradient-letter avatar pattern). The skill is the *agent-facing wrapper* — the tool is the implementation; the discipline is the practice; the skill is the bridge.

---

## When to use this skill

Load `slop-detect` before any of these:

- A landing page is about to ship and the operator wants to confirm it does not read as AI-generated.
- A landing page is live and the operator wants to score it against the CSS / copy tells.
- The operator has shipped AI-generated pages before and the *pattern* of the pages is the same; the operator wants to know *what to fix* before shipping the next one.
- The agent has been asked to *audit* an existing AI-generated page and produce a fix prompt for the operator to clean it up.
- The operator is reviewing a design and wants a *quantitative score* alongside the qualitative judgment.

Do **not** use this skill for:

- Pages that have *not* shipped yet and have not been *committed*; the discipline says ship and measure, not measure before ship.
- Pages whose primary deliverable is the prose, not the layout (use [`no-ai-tells`](../no-ai-tells/SKILL.md) for the prose layer).
- Pages where the operator's judgment is the only authority (the tool is a *measurement*, not a *verdict*).

---

## The 4 axes

The slop-detect tool scores a page on 4 independent axes. The two *slop* axes want a *low* score; the two *system* axes want a *high* score.

### Axis 1 — design slop (the original CSS fingerprint)

27 weighted tells that AI builders converged on by April 2026. The most common tells the operator will see:

- **Slop fonts** — Inter, Roboto, system-ui at body weight 400 as the only typeface. The fix is a *display face* paired with the body face.
- **Purple/violet/indigo gradients** — the `#6366f1 → #8b5cf6` range. The fix is the project's *declared* palette (DESIGN.md), not the AI default.
- **Gradient text** — gradient applied to body copy for "emphasis". The fix is `font-weight` or `font-style`, not gradient.
- **Glassmorphism** — `backdrop-filter: blur()` over a colored background. The fix is a real surface (a card, a border, a shadow).
- **Bento grids** — every section is a 4-tile mosaic. The fix is a layout that follows the *content's* hierarchy, not the template's hierarchy.
- **Centered text density** — more than 60% of body text is centered. The fix is left-aligned prose.
- **Generic hero copy** — *"Unlock the power of..."* / *"The future of..."* / *"Get started in seconds"*. The fix is the operator's *real* claim, in the operator's *real* voice.
- **AI box-shadow** — `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)` as the default. The fix is the project's *declared* shadow scale (or no shadow at all).
- **Emoji as design elements** — 🚀 in a CTA button. The fix is a label.
- **AI sparkles** — animated sparkle / glow / gradient blobs in hero sections. The fix is a real image or a real product shot.

A *Light* score on this axis means the page reads as *distinctive*. A *Heavy* score means the page reads as *Cursor / v0 / Lovable / Bolt*.

### Axis 2 — copy slop (9 text tells)

9 weighted text tells on the page's own prose:

- **Buzzword density** — *leverage*, *synergy*, *ecosystem*, *holistic*, *robust*, *paradigm* used as decoration. The fix is the *specific* verb the operator means.
- **Em-dash overuse** — three or more em-dashes per paragraph. The fix is a period or a comma.
- **"Not just X, but Y" / "It's not X, it's Y"** — the LLM-default antithesis. The fix is two independent claims.
- **Filler openers** — *"In today's world"*, *"Let's dive in"*, *"Let's unpack"*, *"Without further ado"*. The fix is the *first fact*.
- **"It's important to note that"** — the meta-filler. The fix is the note itself.
- **"Delve" / "Tapestry" / "Landscape" / "Robust"** — the LLM-default adjectives. The fix is the specific noun.
- **Hedging language** — *"may", "might", "could potentially"*. The fix is a *commitment* or a *concrete example*.
- **Triples** — three abstract nouns in a row (*"clarity, purpose, and meaning"*). The fix is one concrete noun.
- **Section headers as questions** — *"Why is X important?"*. The fix is a *statement*.

### Axis 3 — system · DESIGN.md (does the page honor its own declared design system?)

This is the *durable* axis. The slop axis asks "does this look AI-generated?" The system axis asks the better question: *does this page honor its own declared design system?*

The tool can be pointed at a `DESIGN.md` (Google Labs' open spec — colors, typography, radii, spacing). It reports *drift*: fonts in use that aren't declared, CTA or surface colors off the palette, radii off the scale.

A page that is bespoke and checked against its own system scores *Aligned*, never *"slop"*. The system axis is *higher-is-better*.

The discipline: a bespoke site that scores Heavy on the slop axis but Aligned on the system axis is *not* slop — the page is *distinctive*, the tool just doesn't have a category for it. The system axis is the operator's *own* rule; the slop axis is the *AI default's* rule. The operator can override the tool with the system axis.

### Axis 4 — AEO · agent-readable

Can AI engines actually *fetch, read, and cite* the page?

- The page has a `<title>`, a `<meta description>`, and structured data (JSON-LD, Open Graph).
- The page's content is in semantic HTML (no div-soup).
- The page's images have `alt` attributes.
- The page's content is reachable by the crawlers in the [live registry](https://slop-detect.com/docs).
- The page's canonical URL is set.

A *high* score on this axis means the page is *citation-ready*. A *low* score means the page is invisible to AI engines.

The AEO axis is *higher-is-better*.

---

## The discipline (the cheatsheet rules)

The 7 rules the agent follows *before* invoking the tool, and *after* receiving the score.

### 1. Apply the qualitative discipline first

The agent applies *no-design-tells* and *adrian-martinez-curated-web-design-skills-2026* *before* invoking the tool. The qualitative discipline is the *primary* filter; the quantitative tool is the *secondary* filter. The tool measures *how much* of the discipline the agent followed.

### 2. Invoke the tool at the right moment

The right moment is *just before ship*, after the agent has applied the discipline and the operator has approved the page. The tool is the *gate*, not the *generator*. The operator does not run the tool to *find* what to build; the operator runs the tool to *verify* what the agent built.

### 3. Interpret the score honestly

The score is a *measurement*, not a *verdict*. The score measures *how generic the result reads*, nothing about the team behind it. A Heavy score does not mean *bad team*; a Light score does not mean *good team*. The score measures *how much of the operator's discipline* the page reflects.

### 4. Read the fix prompt

The tool returns a *fix prompt* — a paste-ready block of text that de-slops the page. The agent reads the prompt and applies the fixes. The fix prompt is the *most valuable output* of the tool; the score is the *least valuable*.

### 5. Re-score after the fix

The agent fixes the page, then re-runs the tool. The re-score confirms the fix landed. If the re-score is still Heavy, the agent reads the new fix prompt and applies it again. The discipline is *iterate until Light*, not *iterate once*.

### 6. Use the system axis as the operator's own rule

The operator can write a `DESIGN.md` that names the operator's *own* design system — the colors, the typography, the radii, the spacing. The tool then reports *drift* against the operator's own system. A bespoke site checked against its own system scores *Aligned*, even if it scores Heavy on the slop axis. The operator's system is the *override*.

### 7. Ship the score as part of the work

The score is part of the *evidence* the operator hands to the customer. A page that ships with a *Light* score (slop axis) and an *Aligned* score (system axis) is a page the customer can verify. A page that ships without a score is a page that *might* be slop. The score is the *audit trail*.

---

## The corollary disciplines (the agent's daily practice)

### 1. The "did I follow no-design-tells" check

Before invoking the tool, the agent runs the *no-design-tells* check:

- Did I use a *display face* paired with the body face? (Slop fonts: no.)
- Did I follow the *declared palette*, not the AI default? (Purple gradients: no.)
- Did I avoid *gradient text*, *glassmorphism*, and *bento grids*? (Slop templates: no.)
- Did I write *specific* hero copy, not *generic* hero copy? (Buzzwords: no.)
- Did I left-align the body text? (Centered text: no.)

If the agent cannot check all five, the agent is not ready to invoke the tool.

### 2. The "what is the AI default" check

When in doubt, the agent asks: *is this the AI default?* The AI default is the AI builder's most-likely output for the same brief. The 27 tells are the *signature* of the AI default. If the page is doing what the AI default would do, the page is *slop* by definition.

The check is the agent's *mirror*: the agent holds the page next to the AI default. The gap between the page and the AI default is the *non-slop* part of the page.

### 3. The "is the page distinctive" check

The opposite of slop is not "good" — it is *distinctive*. A page that is *distinctive* has a *specific* answer to "what does this page do that no other page does?" If the operator cannot answer that question, the page is not distinctive; the page is *generic*.

The check is the operator's *north star*: the operator ships pages that are *distinctive*, not pages that are *good*. Good is the *absence* of slop; distinctive is the *presence* of the operator's own work.

### 4. The "what would the operator's customer say" check

The slop-detect tool's grade is the *measurement*. The operator's *customer* is the *audience*. The two are not the same. A page that scores Heavy but the customer loves is *not* slop — the page is *distinctive in a way the tool doesn't have a category for*. The tool is the *first check*, not the *last*.

The check is the *hierarchy*: tool first, customer second, operator's judgment last. The three are stacked.

### 5. The "what does the system axis say" check

The system axis is the *durable* question. A page that scores Heavy on the slop axis but Aligned on the system axis is *not* slop — the page is *distinctive within its own system*. The system axis is the operator's *override* on the slop axis.

The check is the operator's *override*: the operator writes a DESIGN.md that names the operator's own design system; the tool reports drift against the system; the operator trusts the system score over the slop score when they conflict.

### 6. The "is the fix prompt actionable" check

The tool's fix prompt is *most valuable output*. A fix prompt that is not actionable is a *broken* fix prompt. The agent reads the fix prompt and asks: *can I apply this fix in the next commit?* If yes, the agent applies the fix. If no, the agent escalates: the prompt is too vague, the agent needs more context, or the operator needs to make a judgment.

### 7. The "ship the score, not the page alone" check

The score is part of the *evidence* the operator hands to the customer. A page that ships with the score (Light / Heavy / Aligned / Drift, with the version) is a page the customer can verify. A page that ships without the score is a page that *might* be slop.

The check is the *audit trail*: the operator keeps the score in the commit history, in the changelog, in the build journal. The score is the *evidence* the operator's discipline worked.

---

## What this skill is *not*

- It is not a substitute for [`no-design-tells`](../no-design-tells/SKILL.md). `no-design-tells` is the *qualitative discipline* the agent follows; `slop-detect` is the *quantitative tool* the agent uses to *measure* the discipline. The two stack.
- It is not a substitute for [`adrian-martinez-curated-web-design-skills-2026`](../adrian-martinez-curated-web-design-skills-2026/SKILL.md). That skill is the *descriptive* discipline — how to write *about* design. `slop-detect` is the *measurement* of design. The two stack.
- It is not a substitute for [`axiom-design-core`](../axiom-design-core/SKILL.md). That skill is the *design law* the operator applies. `slop-detect` measures *how much of the law* the page reflects. The two stack.
- It is not a substitute for the operator's judgment. The tool is a *measurement*, not a *verdict*. A Heavy score does not mean *bad*; a Light score does not mean *good*. The operator's judgment is the *last* check.
- It is not a vendoring of the 16/19/27 rules. The rules live in the tool; the skill is the *agent-facing wrapper* that teaches the agent *when* and *how* to use the tool.

## Pairs with

- [`no-design-tells`](../no-design-tells/SKILL.md) — the *qualitative* discipline. The skill is the *primary* filter; this skill is the *secondary* measurement. The two stack: the agent follows no-design-tells *first*, then invokes the slop-detect tool to *verify* the discipline.
- [`adrian-martinez-curated-web-design-skills-2026`](../adrian-martinez-curated-web-design-skills-2026/SKILL.md) — the *descriptive* discipline. The agent writes the *Why it works* description; this skill measures the *measurement*.
- [`axiom-design-core`](../axiom-design-core/SKILL.md) — the *design law*. The agent applies the law; this skill measures the application.
- [`browser-use`](../browser-use/SKILL.md) — the *browser interaction* layer. The slop-detect tool uses a real headless Chromium; `browser-use` is the agent-facing discipline of *acting* through a real browser. The two stack.
- [`wrong-green`](../wrong-green/SKILL.md) — *test the failure the user cares about*. A Light slop-detect score is *not* a guarantee the page is good; the slop-detect score is the *measurement*, not the *outcome*. The wrong-green check is the *next* layer.
- [`production-spine`](../production-spine/SKILL.md) — *software touching users, money, or data is production*. A landing page is production. The slop-detect score is the *gate* before the page ships.
- [`cognition-first`](../cognition-first/SKILL.md) — *design for the human who shows up*. The agent applies cognition-first; this skill measures the application.

## Check

A "slop-detect" check is *ready* to run when:

- The qualitative discipline has been applied (`no-design-tells` checklist passes).
- The agent can describe what the page does that no other page does (the *distinctive* test).
- The operator has approved the page (the *gate* before measurement).
- The agent has a `DESIGN.md` to point the system axis at (or has explicitly chosen *not* to).
- The agent can run the tool (`npx slop-detect https://the-site.com` or the MCP `scan_page` tool).
- The agent is ready to *read the fix prompt*, *apply the fixes*, and *re-score*.

A "slop-detect" check is *ready* to ship when:

- The score is *Light* on the slop axis (or *Aligned* on the system axis).
- The fix prompt has been read; the fixes have been applied; the re-score is *Light*.
- The score is part of the *commit history* (the audit trail).
- The customer can verify the score (the operator hands the score to the customer as *evidence*).
- The operator's judgment is *consistent* with the score (the tool and the operator agree; if not, the operator escalates with a *named* reason).
