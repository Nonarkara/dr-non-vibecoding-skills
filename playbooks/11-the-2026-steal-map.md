# The 2026 Steal Map

What we studied in the public skill ecosystem, what we actually took, and what we refused. Written so the next agent does not "helpfully" vendor Superpowers, gstack, or 400 Copilot skills into this tree.

The rule we kept: **fork the method, not the pack.** Ten behavioural skills beat five hundred domain prompts. This repo stays a curated synthesis.

Updated 2026-09: Second Harvest — taste v2, anti-slop v3, 67 DESIGN.md, PRPs, and the landscape as it actually ships.

---

## What we already had

Before the first harvest the practice already covered most of what the famous packs sell as their headline loop:

| Their slogan | Already here |
|---|---|
| Spec before code; alignment gate | [`planning-discipline`](../skills/planning-discipline/SKILL.md) |
| Localhost is not done; verify | [`ship-discipline`](../skills/ship-discipline/SKILL.md), [`result-honesty`](../skills/result-honesty/SKILL.md) |
| Don't flatten personality | [`anti-regression`](../skills/anti-regression/SKILL.md) |
| Taste as contract | [`axiom-design-core`](../skills/axiom-design-core/SKILL.md), [`design-dna`](../skills/design-dna/SKILL.md) |
| Context window vs enforcement | [`harness-hardening`](../skills/harness-hardening/SKILL.md) (from ECC, not a dump of ECC) |
| Surgical diffs, YAGNI | [`karpathy-guidelines`](../skills/karpathy-guidelines/SKILL.md) |

The holes were **how agents close the loop**: debugging without shotgun patches, browser T, writing the lesson, a second pair of eyes, distrusting the wrong green, stealing UX patterns without scraping buildings, and a meta-skill so this folder does not become a marketplace.

---

## What we studied — First Harvest (2026-08)

| Source | What it actually is | Verdict |
|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) | Canonical `SKILL.md` shape; Apache-2.0 examples; document skills are source-available | **Structure only.** Template + description-as-trigger. Do not vendor pdf/docx internals. |
| [obra/superpowers](https://github.com/obra/superpowers) — 282k★ | Brainstorm → worktree → plan → TDD → subagents → review → finish. MIT. | **Behaviour.** Took debugging phases and the "skills must fire" law. **Refused** TDD-always (fights 45-minute civic ships) and worktree-default (we already have [`workspace-lean`](../skills/workspace-lean/SKILL.md)). |
| [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) | 33 skills; brainstorm → plan → work → review → **`/ce-compound` capture**. MIT. | **The return arrow.** [`lesson-residue`](../skills/lesson-residue/SKILL.md) is that idea in our lesson template, not 33 slash commands. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Google-engineering SDLC for agents: spec/plan/build/test/review/ship. MIT. | **Stance.** Adversarial review + "spec before code" (already ours). **Refused** installing 25 skills and TDD-enforced `/build auto`. |
| [garrytan/gstack](https://github.com/garrytan/gstack) | 23 slash specialists (CEO, CSO, QA in a real browser, ship). MIT. | **QA in a real browser** → [`browser-as-t`](../skills/browser-as-t/SKILL.md). **Refused** the virtual org chart; it confuses agents and burns context. |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React/Next performance, web-design jobs, claimable Vercel deploy. MIT. | **Jobs not pixels** (focus, URL-state, i18n) inside [`ux-archaeology`](../skills/ux-archaeology/SKILL.md). **Refused** React 40-rule pack — Axiom DNA is the design law; Vercel is a vendor. |
| [trailofbits/skills](https://github.com/trailofbits/skills) | Real audit procedures. **CC-BY-SA 4.0** — do not paste. | **Stance only** (assume a flaw, false-positive gate, second opinion). No Solidity/YARA/DWARF in this repo. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) — 252k★ | Harness: memory, hooks, evals | Already mined: [`harness-hardening`](../skills/harness-hardening/SKILL.md). Study, don't clone the home directory. |
| Karpathy / `multica-ai/andrej-karpathy-skills` | Think before coding, surgical diffs | Already vendored. |
| Andrew Ng + Anthropic (DeepLearning.AI Claude Code course) | `CLAUDE.md` as constitution, parallel subagents, Playwright on UI | Already: [`agent-memory`](../skills/agent-memory/SKILL.md), [`subagent-routing`](../skills/subagent-routing/SKILL.md), now [`browser-as-t`](../skills/browser-as-t/SKILL.md). |

Andrew Ng's public point matches this studio: **specific instructions beat vibe**; the course design is a workflow, not a prompt dump.

---

## What we studied — Second Harvest (2026-09)

The landscape moved. These are the repos vibecoders actually install in September 2026, and what we stole — then improved — for the bible.

| Source | Stars / shape | What it actually is | Verdict for this bible |
|---|---|---|---|
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — **85k★**, #26 on cool-claude-code | Anti-slop frontend framework: Design Read + 3 dials (VARIANCE / MOTION / DENSITY 1–10), brief inference → dial values, design-system map, hard gates (hero viewport, eyebrow restraint, nav single-line), GSAP skeletons, redesign-audit. v2 is a rewrite. MIT. | **Steal the dials and hard gates; refuse the style.** We added numeric dials + inference to [`design-registers`](../skills/design-registers/SKILL.md) and [`no-design-tells`](../skills/no-design-tells/SKILL.md), plus taste's hero/nav/section hard rules. **Refused** taste's 10+ style variants (minimalist/brutalist/soft) — our registers plus no-design-tells is the filter; variants dilute the contract. Taste's image-gen skills (brandkit/mobile) stay out — we are a shipping bible, not a generator. |
| [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) — **1.6k★, v3.2.6** | 38 mandatory rules R-01..R-38 in 3 tiers (Hard Gate / Purpose-Gate / Quality Locks) + Liveliness Toolkit (ENERGY/RHYTHM/MOTION + Design Read) + 4-block Delivery Gate + 6 additive skills (ui/copy/human/mobile/code) + 7-agent plugin manifests. **Filter, not style guide.** MIT. | **Steal the tiers and liveliness; keep our stack doctrine.** We tiered [`no-design-tells`](../skills/no-design-tells/SKILL.md) (Hard Gate vs Purpose-Gate vs Quality Locks) and added the Craftsmanship Standard C1–C5 + liveliness bar from anti-slop. **Refused** copying 38 rules verbatim — we compressed to our ~20 load-bearing tells + purpose test. Anti-slop's "DESIGN.md gives soul, antislop gives filter" is now explicit in our no-design-tells §1. |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) — 2.7k★ | 67 DESIGN.md + SKILL.md pairs, each a visual style (agentic/bento/brutalism/editorial...), pullable via `npx typeui.sh pull <name>`. Human DESIGN.md + agent SKILL.md shipping together. | **Feedstock for [`ux-archaeology`](../skills/ux-archaeology/SKILL.md).** We cite the 67 as the DESIGN.md collection to mine, not to vendor. Our DESIGN.md ingestion (VoltAgent/awesome-design-md + Google Stitch) already handles this; bergside proves the corpus is real. **Refused** vendoring any single style as house style. |
| [coleam00/context-engineering-intro](https://github.com/coleam00/context-engineering-intro) — 13k★ | Context Engineering as system: `INITIAL.md` → `/generate-prp` → `PRPs/<feature>.md` → `/execute-prp`. Template has `.claude/commands/`, `prp_base.md`, critical `examples/` folder. Thesis: context failures > model failures. | **Steal PRP as evidence bar.** We wired PRP's "examples/ + documentation + gotchas + validation" into [`planning-discipline`](../skills/planning-discipline/SKILL.md)'s Implementation Plan and [`BLUEPRINT.md`](../BLUEPRINT.md)'s Step 2. **Refused** the two-command slash flow as religion — our Codex/Claude workbench already routes slash vs skill vs hook vs app (see [`codex-workbench`](../skills/codex-workbench/SKILL.md)). PRP is a paragraph in planning-discipline, not a second ceremony. |
| [cooler333/cool-claude-code](https://github.com/cooler333/cool-claude-code) + landscape | Weekly trending + Top 30 (openclaw 389k, superpowers 282k, ECC 252k, taste 85k…) + By Category (Official, Skills, MCP, Harness, CLI, Memory, Spec-driven). | **Map, not install.** Use to check "who actually ships" before studying. Confirms our bets: skills + anti-slop + structured context are the highest leverage — exactly our bible's spine. **Refused** chasing trending stars; we track star growth but gate on behaviour change. |
| [funboy322/avoid-ai-design](https://github.com/funboy322/avoid-ai-design) | Audit-and-rewrite AI frontends (purple gradients, Inter, default shadcn). 63★. | **After-mode, already covered.** [`no-design-tells`](../skills/no-design-tells/SKILL.md) §6 gate + Delivery Gate handles audit. No new skill. |
| [JCarterJohnson/vibecoded-design-tells](https://github.com/JCarterJohnson/vibecoded-design-tells) | Data-driven: 3.2M Reddit posts across 47 subreddits, ranked tells. | **Data, not skill.** Useful to calibrate which tells actually get flagged. Our provenance + layout reflexes already cover the top Reddit complaints. No new skill; cite as evidence. |

**Second Harvest principle:** taste and anti-slop converged on the same truth — *restraint is now the AI default, so bans alone converge on average*. The gap is no longer "what to ban" but **what to add after banning** (a named reference, a liveliness bar, a DESIGN.md soul). That is now §4 in no-design-tells and the Liveliness Toolkit — the part a generator skips because nothing forces it to.

---

## What we studied — Third Harvest (2026-09): Product UI, Animation & the Dashboard Gap

Marketing anti-slop was solved. The next gap was **product UI and motion** — dashboards, SaaS, tables, forms, settings that look restrained and correct, not templated, plus animation that reads as native, not website.

| Source | Stars / shape | What it actually is | Verdict for this bible |
|---|---|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — **66k★**, 23 commands, 61 detectors | Design language that makes harness better at design. One skill + `PRODUCT.md` (durable product truth: audience/purpose/context), `DESIGN.md` per surface, live browser iteration, `polish`/`bolder`/`quieter`/`distill`/`audit`/`critique`/`animate` commands, deterministic detectors. | **Steal PRODUCT.md + audit vocabulary.** Impeccable's `init → PRODUCT.md → DESIGN.md` is the same ladder we already have (`agent-memory` Tier 1/2 + `design-registers`). We now cite `PRODUCT.md` explicitly in [`agent-memory`](../skills/agent-memory/SKILL.md) and wired `audit`/`polish`/`bolder`/`quieter` into our `no-design-tells` Delivery Gate vocabulary. **Refused** its 23-command sprawl and binary engine — our 51 skills + `npx axiom-audit` is the harness; impeccable is a language, not a runtime. |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) — **36k★** | Skills for Designers and Engineers — Sonner/Vaul author's animation craft: `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`. Easing, duration, property, and vocabulary discipline. | **Steal the vocabulary; add to core.** We upgraded [`axiom-design-core`](../skills/axiom-design-core/SKILL.md) Layer 6 with Emil's easing/duration/property rules and the `find-animation-opportunities` discipline (motion only for state change, not delight). **Refused** vendoring Sonner/Vaul recipes — we reference the vocabulary, not the components. |
| [kuras3/product-ui-design](https://github.com/kuras3/product-ui-design) | Restrained production product UI — dashboards, SaaS, tables, forms that look **shipped** (Linear/shadcn register), not marketing. Three disciplines: *observe before invent* (anchor to real products), *floor/ceiling* (restraint vs character), *hard-checks + `scan-tells.py`*. Counterpart to `frontend-design`'s maximalism. | **Steal floor vs ceiling.** Marketing ceilings (grade, grain, glow, custom cursor) that read as slop in product UI are now explicit in [`no-design-tells`](../skills/no-design-tells/SKILL.md) Hard Gates. Our [`legible-systems`](../skills/legible-systems/SKILL.md) + [`design-registers`](../skills/design-registers/SKILL.md) already cover the product floor; kuras3 gave us the language to name when ceiling techniques leak. **Refused** separate product-ui skill — our Civic/Console registers *are* the product register; kuras3 is the restraint pattern inside them. |
| [iart-ai/web-animation-skills](https://github.com/iart-ai/web-animation-skills) | GSAP/SVG/Lottie/micro-interactions/60fps/a11y — dedicated motion primitives. | **Fold into core.** GSAP/Motion notes now live in `axiom-design-core` Layer 6 alongside Emil. **Refused** separate motion skill — motion is a system property, not a folder. |
| [LeoStehlik/no-slop-ui](https://github.com/LeoStehlik/no-slop-ui) | Hard guardrails vs glassmorphism/gradient abuse/unusable dashboards. 2★, fresh. | **Already covered.** Our no-design-tells §2 (Purpose-Gate) + Hard Gates handle the same tells. No new skill. |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — **125k★** | Large searchable DB: styles, palettes, fonts, UX guidelines, chart types. | **Database, not behaviour.** Useful as reference corpus like 67 DESIGN.md. **Refused** as skill — our `ux-archaeology` + `data-catalog` pattern covers "searchable DB" without vendoring it. |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) — **28k★**, 21 themes, 57 gates | Anti-slop with 4 verbs (`audit`/`redesign`/`study`/default) + 57 slop-test gates + macrostructure picking + Custom branch. | **Steal the verbs.** `audit`/`redesign`/`study` are now named modes in our no-design-tells gate (During vs After). 57 gates validate our ~20 tiered + hard gates — we don't need 57 to be strict. **Refused** 21 themes as house style; themes are in `ux-archaeology` feedstock, not the contract. |
| [Vanszs/Anti-AI-UI](https://github.com/Vanszs/Anti-AI-UI), [superdesigndev/superdesign-skill](https://github.com/superdesigndev/superdesign-skill), [Krishna-Modi12/frontend-design-pro](https://github.com/Krishna-Modi12/frontend-design-pro) | More anti-slop steering suites — filter + palette + research tools. | **Diminishing returns.** Taste + anti-slop already give us the filter; these are variant implementations. **Refused** — our filter is the synthesis, not the sum of every filter. |
| [starvingarc/agent-ui-atlas](https://github.com/starvingarc/agent-ui-atlas), [Heiberg-Industries/designbrief](https://github.com/Heiberg-Industries/ui-skills), [yzfly/awesome-design-html](https://github.com/yzfly/awesome-design-html) | Atlas / guardrails / 100+ brand HTML refs (Linear, Stripe…). | **Feedstock.** Like 67 DESIGN.md, these are corpora for `ux-archaeology` to mine. **Refused** as install. |
| [nexu-io/open-design](https://github.com/nexu-io/open-design) | Visual/prototyping alternative — Claude Design. | **Alternative workflow.** If you want image→code prototyping, use this; our bible is shipped product UI. No conflict. |

**Third Harvest principle:** Product UI is a **different register** than marketing UI. Marketing optimizes for an unforgettable artifact; product optimizes for *restraint that looks shipped* — floor (correctness, no slop) before ceiling (character). Animation optimizes for *state change made legible*, not delight. Both are now explicit: floor/ceiling in the registers, and Layer 6 in the core. That keeps dashboards from borrowing landing-page maximalism and keeps motion from becoming decoration.

---

## What we added — both harvests

Original prose, ideas credited. First harvest shipped 7; second harvest added 6 + 2 ported siblings:

| Skill | Stolen idea | Calibration for this bible |
|---|---|---|
| [`skill-writing`](../skills/skill-writing/SKILL.md) | Anthropic format + Superpowers "it must change behaviour" | A new folder needs a production receipt |
| [`systematic-debugging`](../skills/systematic-debugging/SKILL.md) | Superpowers / Compound four phases | No shotgun on a live map |
| [`browser-as-t`](../skills/browser-as-t/SKILL.md) | gstack `/qa`; Vercel "it's a UI" | Screenshot ≠ T; 1280/768/375 |
| [`lesson-residue`](../skills/lesson-residue/SKILL.md) | Compound `/ce-compound` | Our `docs/lessons/` template, mandatory close-out |
| [`adversarial-review`](../skills/adversarial-review/SKILL.md) | Osmani review gate; ToB stance; gstack `/review` | Civic axes; no CC-BY-SA paste |
| [`wrong-green`](../skills/wrong-green/SKILL.md) | Our war stories | Manufactured confidence as one law |
| [`ux-archaeology`](../skills/ux-archaeology/SKILL.md) | "Rebuild from the idea" + 67 DESIGN.md corpus | Never scrape the running building; mine DESIGN.md collections |
| [`no-design-tells`](../skills/no-design-tells/SKILL.md) | taste v2 Design Read + 3 dials + hard gates; anti-slop 38 rules + liveliness | Stack doctrine + trap + tiered registry + craftsmanship — filter, not style |
| [`no-ai-tells`](../skills/no-ai-tells/SKILL.md) | Wikipedia Signs-of-AI-writing + anti-slop copy rules | Prose sibling of no-design-tells; same taxonomy, different layer |
| [`ninja-innovation`](../skills/ninja-innovation/SKILL.md) | Our own "simplest path" move set | Reframe > refactor; subtract > add; 5-line move > 500-line feature |
| [`cognition-first`](../skills/cognition-first/SKILL.md) | Kahneman · Pink | Design for the human who shows up, not the rational one assumed |
| [`legible-systems`](../skills/legible-systems/SKILL.md) | Lynch · Alexander | Paths/edges/districts/nodes/landmarks as code |
| [`design-method`](../skills/design-method/SKILL.md) | Rowe · Kelley · Maeda | Diverge 3, prototype rough, subtract until break |
| [`make-it-stick`](../skills/make-it-stick/SKILL.md) | Heath · Pinker | Concrete + story + testable credibility, not adjectives |
| [`written-principles`](../skills/written-principles/SKILL.md) | Dalio · Smith | Recurring judgment → written principle + split across agents |

---

## Explicit refusals (do not re-propose)

- Wholesale Superpowers / Compound / gstack / Osmani / Vercel / Copilot installs
- TDD-always as a religion (life-safety and money paths can still demand tests; a 45-minute civic prototype must still *ship*)
- Default git worktree for every edit
- Smart-contract, YARA, DWARF, Firebase APK scanners
- Vercel "claimable deploy" as our ship path — we prove bytes on our CDN
- Anthropic document-creation internals (source-available, not our product)
- Any skill whose pitch is "clean this up / modernize / best practices template"
- **Second Harvest refusals:**
  - Copying taste's 10 style variants or image-gen skills as house style
  - Copying anti-slop's 38 rules verbatim (we compress to ~20 tiered tells + purpose test)
  - Vendoring any single DESIGN.md from bergside/awesome-design-skills (mine the pattern, don't ship the pixels)
  - Adopting PRP's two-command slash flow as second ceremony (PRP is a paragraph in planning-discipline)
  - Chasing weekly trending stars from the landscape as install signal

If a future pack looks essential, add **one** behavioural skill with a receipt, or a paragraph on an existing skill. See [`skill-writing`](../skills/skill-writing/SKILL.md).
