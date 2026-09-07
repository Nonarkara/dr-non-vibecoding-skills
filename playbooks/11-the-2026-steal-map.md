# The 2026 Steal Map

What we studied in the public skill ecosystem, what we actually took, and what we refused. Written so the next agent does not "helpfully" vendor Superpowers, gstack, or 400 Copilot skills into this tree.

The rule we kept: **fork the method, not the pack.** Ten behavioural skills beat five hundred domain prompts. This repo stays a curated synthesis.

---

## What we already had

Before this pass the practice already covered most of what the famous packs sell as their headline loop:

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

## What we studied (primary sources)

| Source | What it actually is | Verdict |
|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) | Canonical `SKILL.md` shape; Apache-2.0 examples; document skills are source-available | **Structure only.** Template + description-as-trigger. Do not vendor pdf/docx internals. |
| [obra/superpowers](https://github.com/obra/superpowers) | Brainstorm → worktree → plan → TDD → subagents → review → finish. MIT. Optional telemetry on a visual companion. | **Behaviour.** Took debugging phases and the "skills must fire" law. **Refused** TDD-always (fights 45-minute civic ships) and worktree-default (we already have [`workspace-lean`](../skills/workspace-lean/SKILL.md)). |
| [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) | 33 skills; brainstorm → plan → work → review → **`/ce-compound` capture**. MIT. | **The return arrow.** [`lesson-residue`](../skills/lesson-residue/SKILL.md) is that idea in our lesson template, not 33 slash commands. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Google-engineering SDLC for agents: spec/plan/build/test/review/ship. MIT. | **Stance.** Adversarial review + "spec before code" (already ours). **Refused** installing 25 skills and TDD-enforced `/build auto`. |
| [garrytan/gstack](https://github.com/garrytan/gstack) | 23 slash specialists (CEO, CSO, QA in a real browser, ship). MIT. | **QA in a real browser** → [`browser-as-t`](../skills/browser-as-t/SKILL.md). **Refused** the virtual org chart; it confuses agents and burns context. |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React/Next performance, web-design jobs, claimable Vercel deploy. MIT. | **Jobs not pixels** (focus, URL-state, i18n) inside [`ux-archaeology`](../skills/ux-archaeology/SKILL.md). **Refused** React 40-rule pack — Axiom DNA is the design law; Vercel is a vendor. |
| [trailofbits/skills](https://github.com/trailofbits/skills) | Real audit procedures. **CC-BY-SA 4.0** — do not paste. | **Stance only** (assume a flaw, false-positive gate, second opinion). No Solidity/YARA/DWARF in this repo. |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | Marketplace that reviews skills for malice | **Hygiene reminder.** Random GitHub skill packs can be hostile. We write our own. |
| [github/awesome-copilot](https://github.com/github/awesome-copilot), [wshobson/agents](https://github.com/wshobson/agents) | Hundreds of skills/agents | **Catalogue, not install.** Mining only. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | Harness: memory, hooks, evals | Already mined: [`harness-hardening`](../skills/harness-hardening/SKILL.md). Study, don't clone the home directory. |
| Karpathy / `multica-ai/andrej-karpathy-skills` | Think before coding, surgical diffs | Already vendored. |
| Andrew Ng + Anthropic (DeepLearning.AI Claude Code course) | `CLAUDE.md` as constitution, parallel subagents, Playwright on UI | Already: [`agent-memory`](../skills/agent-memory/SKILL.md), [`subagent-routing`](../skills/subagent-routing/SKILL.md), now [`browser-as-t`](../skills/browser-as-t/SKILL.md). |

Andrew Ng's public point matches this studio: **specific instructions beat vibe**; the course design is a workflow, not a prompt dump.

---

## What we added this pass

Seven behavioural skills, original prose, ideas credited in frontmatter:

| Skill | Stolen idea | Civic calibration |
|---|---|---|
| [`skill-writing`](../skills/skill-writing/SKILL.md) | Anthropic format + Superpowers "it must change behaviour" | A new folder needs a production receipt |
| [`systematic-debugging`](../skills/systematic-debugging/SKILL.md) | Superpowers / Compound four phases | No shotgun on a live map |
| [`browser-as-t`](../skills/browser-as-t/SKILL.md) | gstack `/qa`; Vercel "it's a UI" | Screenshot ≠ T; 1280/768/375 |
| [`lesson-residue`](../skills/lesson-residue/SKILL.md) | Compound `/ce-compound` | Our `docs/lessons/` template, mandatory close-out |
| [`adversarial-review`](../skills/adversarial-review/SKILL.md) | Osmani review gate; ToB stance; gstack `/review` | Civic axes; no CC-BY-SA paste |
| [`wrong-green`](../skills/wrong-green/SKILL.md) | Our war stories | Manufactured confidence as one law |
| [`ux-archaeology`](../skills/ux-archaeology/SKILL.md) | "Rebuild from the idea" | Never scrape the running building |

---

## Explicit refusals (do not re-propose)

- Wholesale Superpowers / Compound / gstack / Osmani / Vercel / Copilot installs
- TDD-always as a religion (life-safety and money paths can still demand tests; a 45-minute civic prototype must still *ship*)
- Default git worktree for every edit
- Smart-contract, YARA, DWARF, Firebase APK scanners
- Vercel "claimable deploy" as our ship path — we prove bytes on our CDN
- Anthropic document-creation internals (source-available, not our product)
- Any skill whose pitch is "clean this up / modernize / best practices template"

If a future pack looks essential, add **one** behavioural skill with a receipt, or a paragraph on an existing skill. See [`skill-writing`](../skills/skill-writing/SKILL.md).
