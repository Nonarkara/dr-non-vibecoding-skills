# AGENTS.md — entry point for non-Claude agents

> This file is the **mirror**, not the source. The canonical agent instructions for this repo live in the per-skill `SKILL.md` files inside `skills/` and the per-project `CLAUDE.md` style content inside each skill's body. This file exists so that any agent — Codex, Aider, OpenCode, Cursor, Gemini CLI, Devin, the OpenAI family — can land in this repo, read one file, and know what to do next.

If you are a Claude-based agent reading this repo, your entry point is the workspace's own `CLAUDE.md` (Tier 1), the project's `CLAUDE.md` (Tier 2), and the lesson docs in `docs/lessons/` (Tier 3). See `skills/agent-memory/SKILL.md` for the ladder.

If you are **any other agent**, this file is yours.

---

## What this repo is

Dr Non's practice, packaged as a fork-and-use system. Four shapes:

- **51 skills** in `skills/` — plain markdown with YAML frontmatter, agent-agnostic, no runtime.
- **12 playbooks** in `playbooks/` — narrative walkthroughs of how the system is actually used.
- **4 references** in `reference/` — APIs, stack picks, commit style, security hygiene.
- **6 templates** in `templates/` — drop-in files (`CLAUDE.md`, `AGENTS.md`, deploy script, launchd plist, tunnel config, lesson doc).

There is nothing to compile, nothing to configure, and nothing that can go out of date except the advice itself.

---

## How to use this repo

### 1. Read the spine first

Start with `README.md` (the public face) and `BLUEPRINT.md` (the one-pass setup). The README lists the skills and links to each. The blueprint is the four-question bootstrap that sets up a new project with the full scaffolding in one paste.

### 2. Install the skills

The `SKILL.md` files are plain markdown. Prefer the plugin for the complete bundle,
or copy skills into the native discovery path for the agent that will use them:

```bash
# Codex / ChatGPT desktop plugin
codex plugin marketplace add Nonarkara/dr-non-vibecoding-skills
codex plugin add dr-non-vibecoding-skills@dr-non

# Codex user skills
mkdir -p "$HOME/.agents/skills"
cp -R skills/* "$HOME/.agents/skills/"

# Claude Code / MiniMax Code
mkdir -p "$HOME/.claude/skills"
cp -R skills/* "$HOME/.claude/skills/"

# Cursor — same SKILL.md files, project-level Agent Skills + AGENTS.md
#   mkdir -p .cursor/skills && cp -r skills/* .cursor/skills/
#   cp AGENTS.md /path/to/your-project/AGENTS.md
#   (.cursorrules is legacy — do not generate it)
# Gemini / Aider / OpenCode / Devin — copy only relevant instructions into
# the rules file that host actually reads; do not load all 51 on every task.
```

There is no runtime dependency on Claude Code. The skills will load in any agent that reads files.

### 3. Use the templates

The `templates/` folder has drop-in files for the load-bearing pieces:

- `AGENTS.md.template` — the Tier 2 project contract for non-Claude agents. Fill in, save as `<project>/AGENTS.md`.
- `CLAUDE.md.template` — the Tier 2 project contract for Claude agents. Fill in, save as `<project>/CLAUDE.md`.
- `deploy-pages.sh` — the poison-proof CDN deploy script. Copy to `<project>/scripts/deploy.sh`.
- `service.plist.template` — the launchd plist for a Mac supervised service. Three jobs (server / tunnel / watchdog).
- `tunnel.yml.template` — the Cloudflare Tunnel config, with the deliberately-inert shared fallback.
- `lesson.md.template` — the structure for a post-session lesson doc.

### 4. Apply the practice

Pick the skill that matches your problem:

| If the problem is… | Read |
|---|---|
| Agent keeps re-explaining the project | `skills/agent-memory/SKILL.md` |
| A rule the agent ignores, or a named agent that was never installed | `skills/harness-hardening/SKILL.md` |
| Agent makes cowboy edits without a plan | `skills/planning-discipline/SKILL.md` |
| Agent "cleans up" a live map into a template | `skills/anti-regression/SKILL.md` |
| About to ask the human to pick a library | `skills/director-not-typer/SKILL.md` |
| Dashboard number has no source / age | `skills/honest-envelope/SKILL.md` |
| Impulse is `ls -R` on a multi-project tree | `skills/route-dont-scan/SKILL.md` |
| Public dashboard or bot 500s when DB hiccups | `skills/dual-write-resilience/SKILL.md` |
| Agents in fleet repeat each other's mistakes | `skills/shared-memory-hub/SKILL.md` |
| Agent says "done" without verifying | `skills/ship-discipline/SKILL.md` |
| Deploy "succeeded" but old version is served | `skills/deploy-verification/SKILL.md` |
| Side project dies when the laptop closes | `skills/always-on-services/SKILL.md` |
| Design keeps regressing | `skills/axiom-design-core/SKILL.md` + `skills/design-dna/SKILL.md` |
| UI looks agent-built | `skills/no-design-tells/SKILL.md` + `skills/no-ai-tells/SKILL.md` |
| Copy reads like AI | `skills/no-ai-tells/SKILL.md` + `skills/make-it-stick/SKILL.md` |
| Rebuilding the same API adapter | `skills/data-catalog/SKILL.md` |
| Don't know how much risk is "too much" | `skills/risk-posture/SKILL.md` |
| Code is bloated / over-abstracted | `skills/karpathy-guidelines/SKILL.md` |
| Asked to "improve X" with no spec | `skills/ninja-innovation/SKILL.md` |
| Workspace has 90 worktrees and you're afraid to delete | `skills/workspace-lean/SKILL.md` |
| 3D city map has glitchy overlapping buildings | `skills/map-3d-city/SKILL.md` |
| Navigation feels like a maze | `skills/legible-systems/SKILL.md` |
| Dep keeps needing "one more patch" | `skills/know-when-to-wait/SKILL.md` |
| Don't know whether to build first or wait | `skills/dr-non-golden-rules/SKILL.md` |
| Approach is unclear, first idea stuck | `skills/design-method/SKILL.md` |
| Default/copy/incentive feels wrong | `skills/cognition-first/SKILL.md` |
| Same decision keeps recurring | `skills/written-principles/SKILL.md` |
| (Claude agents) deciding whether to dispatch a child | `skills/subagent-routing/SKILL.md` |
| (Claude agents) about to describe a dashboard | `skills/mcp-cli-first/SKILL.md` |
| (All agents) response is getting long without earning it | `skills/context-economy/SKILL.md` |
| (All agents) reporting work as "done" | `skills/result-honesty/SKILL.md` |
| Impulse to patch the first plausible line | `skills/systematic-debugging/SKILL.md` |
| UI "verified" with a screenshot | `skills/browser-as-t/SKILL.md` |
| Painful session, no lesson written | `skills/lesson-residue/SKILL.md` |
| Same model about to LGTM its own diff | `skills/adversarial-review/SKILL.md` |
| Watchdog/CI/deploy said OK and it wasn't | `skills/wrong-green/SKILL.md` |
| Rebuild from prior art by scraping the live app | `skills/ux-archaeology/SKILL.md` |
| Tempted to vendor a 100-skill pack | `skills/skill-writing/SKILL.md` |
| Starting a new project and don't know the approach | `skills/design-thinking-vibecoding/SKILL.md` |

The full list and the reasoning are in `README.md`.

---

## The contract underneath the skills

Every skill in this repo assumes the same project-level discipline:

1. **A Tier 2 project contract at the project root** (`CLAUDE.md` for Claude agents, `AGENTS.md` for everyone else) with the anti-regression list, the exact commands, and the gotchas-with-dates. See `templates/CLAUDE.md.template`.
2. **A deploy script that proves the bytes arrived** — see `templates/deploy-pages.sh` and `skills/deploy-verification/SKILL.md`.
3. **A design lineage** if the project has a UI — see `skills/axiom-design-core/SKILL.md` and `skills/design-dna/SKILL.md`.
4. **A `docs/lessons/` folder** for post-session hard-won knowledge — see `templates/lesson.md.template`.

The skills are reference material. The contract is the *executable* part. Without the contract, the skills are essays. With the contract, they are decisions that only had to be made once.

---

## The multi-agent ecosystem & extension layers

This repo spans the full lifecycle of Dr Non's practice:
- **The Antigravity Origin:** The foundational layer (`planning-discipline`, `dual-write-resilience`, `shared-memory-hub`, design invariants) forged with Dr Non's first AI agent, designed to be universal across all agents.
- **The Cursor Desk:** Four skills (`anti-regression`, `director-not-typer`, `route-dont-scan`, `honest-envelope`) and Playbook 10 — the IDE-resident layer. Codex Incident as prime directive, intent/mechanics split, monorepo routing, honest numbers.
- **The Mavis/Claude Extension:** Four skills (`subagent-routing`, `mcp-cli-first`, `context-economy`, `result-honesty`) and Playbook 08 cover child agent routing, tool-first execution, and result honesty.
- **The 2026 steal map:** Seven behavioural skills (`systematic-debugging`, `browser-as-t`, `lesson-residue`, `adversarial-review`, `wrong-green`, `ux-archaeology`, `skill-writing`) and Playbook 11 — methods stolen from Superpowers, Compound, gstack, Osmani, Vercel, Anthropic format; packs refused.

Four skills emerged from the Mavis/Claude layer. Their principles generalise, while
their exact tool vocabulary may need translation for another host:

- `subagent-routing` — the `task` / `explore` / `worker` / `verifier` vocabulary is host-specific. Claude, Codex, and other multi-agent runtimes expose different primitives; the cost test and six-field brief are universal.
- `mcp-cli-first` — the MCP / CLI / API / GUI tier list. **Most useful to Claude Code, but the principle generalises** to any agent with connected tools. The "after setup, write to `context.md`" rule is universal.
- `context-economy` — the five response shapes, the anti-pattern list, the four-bucket status report. **Universal.** The M5 Max hardware rule is Claude-specific, but the principle — "don't downsize based on assumptions about the machine" — applies anywhere.
- `result-honesty` — succeeded / failed / skipped / unverified reporting. **Universal.** Every agent benefits from the four-bucket format; it is a vocabulary upgrade, not an agent primitive.

`playbooks/08-the-mavis-side.md`, `playbooks/09-the-antigravity-origin.md`, and `playbooks/10-the-cursor-desk.md` walk through the agent-side perspectives end to end.

---

## Mirroring `CLAUDE.md` for non-Claude readers

If a project uses `CLAUDE.md` (because Mavis is the primary agent), generate the other agents' files from the canonical, don't author them in parallel:

```bash
# Codex, Aider, OpenCode, generic readers
sed -e '/^## Mavis-only/d' \
    -e '/^## Hardware/d' \
    CLAUDE.md > AGENTS.md

# Gemini CLI
sed -e '/^## Mavis-only/d' \
    -e '/^## Hardware/d' \
    -e 's/CLAUDE\.md/AGENTS.md/g' \
    CLAUDE.md > GEMINI.md

# Cursor — project skills + AGENTS.md (preferred). .cursorrules is legacy.
# mkdir -p .cursor/skills && cp -r skills/* .cursor/skills/
```

`diff` the mirrors against the canonical every quarter. Path renames are the single biggest drift source — one project's mirror said `demos/` for six months after the canonical moved to `examples/`.

---

## What does *not* live in this repo

- The actual project code. This is the *meta* layer — the system for shipping, not the ships.
- Live URLs. Those live in the per-project contract files, not here.
- Secrets. Never in this repo, never in any agent-readable file. The repo's `reference/security-hygiene.md` is the discipline.

---

## License

MIT. Fork it, strip Dr Non's name off it, make it yours. The `karpathy-guidelines` skill is MIT from `multica-ai/andrej-karpathy-skills` and keeps its upstream attribution.

If you build something with this, the author would genuinely like to see it.
