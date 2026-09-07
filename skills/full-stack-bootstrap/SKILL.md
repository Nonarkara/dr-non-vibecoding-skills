---
name: full-stack-bootstrap
description: >-
  One command from clone to operational project. Use setup.sh to install
  every skill into every agent, scaffold a new project, or audit an
  existing one. Pairs with the Blueprint.
license: MIT
---

# Full-Stack Bootstrap

> One command turns a clone into a project. The setup script is the entry point; the Blueprint is the spec; the four questions are the only friction.

This is the canonical "one click to vibecode like a pro" entry point for the whole stack. If an agent loads exactly one skill to get a project off the ground, this should be it. It is intentionally self-contained — an agent that has only this skill loaded (plus the files in `templates/`) can complete the bootstrap without also loading `BLUEPRINT.md` or the underlying scripts.

If `setup.sh` and `BLUEPRINT.md` are not present in this checkout, tell the user directly rather than improvising a replacement. The setup script's value is in its specificity — exact commands, exact file templates, exact host paths — and a paraphrase from memory will drift from what `scripts/install-skills.sh` and `scripts/new-project.sh` actually do.

---

## The one command

```bash
# From the repo root, with no arguments: an interactive menu
./setup.sh
```

That is the canonical "one click." The script detects which agents are installed, offers to install the skills, offers to scaffold a new project, and offers to audit an existing one. For non-interactive use, the four subcommands are the actual one-clicks:

```bash
./setup.sh --install-skills                  # install every skill to every detected host
./setup.sh --init-project ~/Projects/my-app  # scaffold a brand-new project
./setup.sh --audit ~/Projects/my-app         # audit an existing project against the stack invariants
./setup.sh --validate                        # run the repo validator (scripts/validate_repo.py)
```

The `Makefile` at the repo root is the developer-muscle-memory wrapper — `make install-skills`, `make init-project`, `make audit`, `make validate`, `make test`.

---

## The four setup.sh modes

### 1. `--install-skills` — install the stack into every agent

Idempotent. Detects which agent hosts exist on this machine and rsyncs the 59 `SKILL.md` folders into each host's discovery path:

| Agent | Target | Notes |
|---|---|---|
| **Claude Code** | `~/.claude/skills/` | Also `Mavis Code` (Mavis Code runs in the same discovery path) |
| **Codex / ChatGPT Desktop** | `~/.agents/skills/` | Codex also accepts a plugin install — see README |
| **Cursor** | `~/.cursor/skills/` | Project-level is `.cursor/skills/`; this is the global drop |
| **Hermes** | `~/.hermes/skills/` | Detected only if `~/.hermes` exists |
| **OpenCode** | `~/.config/opencode/skills/` | Detected only if `~/.config/opencode` exists |
| **Antigravity / Gemini CLI** | shares `~/.agents/skills/` | The same fabric as Codex |

Always run with `--dry-run` first to see the host list and the count.

```bash
./setup.sh --install-skills --dry-run
# would install 59 skills → /Users/<you>/.claude/skills  (claude)
# would install 59 skills → /Users/<you>/.agents/skills  (codex)
# would install 59 skills → /Users/<you>/.hermes/skills  (hermes)
# would install 59 skills → /Users/<you>/.config/opencode/skills  (opencode)
# dry-run: no files changed (expected 59 skills)
```

Post-install, the count is verified: if the destination does not contain 59 `SKILL.md` files, the script exits non-zero. The check is the safeguard against a partial rsync.

### 2. `--init-project <path>` — scaffold a new project

Generates a fully operational project codebase at `<path>` with **zero unfilled placeholder brackets**. The output is ready for the next agent session to read and the next human to ship.

What it creates, in order:

| File | Source | Purpose |
|---|---|---|
| `CLAUDE.md` | `templates/CLAUDE.md.template` | Tier-2 project contract for Claude agents, with the real project name, stack, live URL, dev port, and an Anti-Regression section (prefilled with three real entries, not a TODO) |
| `AGENTS.md` | `templates/AGENTS.md.template` | Universal Tier-2 contract mirror for Codex, Cursor, Gemini CLI, Antigravity, Aider, OpenCode, Devin, Hermes |
| `.gitignore` | `templates/gitignore.template` | Hardened against secrets (`.env*`, `*.pem`, `*.key`), OS junk (`.DS_Store`), AI agent artifacts (`.gemini/`, `.claude/`, `scratch/`), and the standard Node/Python/Next.js noise |
| `.env.example` | `templates/env.example.template` | Empty-value environment variables with signup URLs and a one-line secret-hygiene note |
| `docs/lessons/` | (directory, with `.gitkeep`) | Pre-seeded with a `YYYY-MM-DD-bootstrap.md` lesson doc establishing the load-bearing invariants for future sessions |
| `scripts/deploy.sh` | `templates/deploy-pages.sh` | Poison-proof CDN deploy script with cache-bust probing |
| `scripts/verify.sh` | (generated) | Pre-flight invariant check: contract presence, secret-leak scan on staged diff, the 30% collapse rule, type/test execution |
| `design/tokens.css` | (generated) | Axiom Design Core CSS custom properties — 0px border-radius, hairlines, three type sizes, one numeric mono, `#f59e0b` amber accent, named single-purpose palette roles |
| `git init` + first commit | (generated) | Initial commit follows `<type>(<scope>): <sentence>` from `reference/commit-conventions.md` |

Non-interactive example (the "one click"):

```bash
./setup.sh --init-project ~/Projects/civic-pulse \
  --name "Civic Pulse" \
  --desc "Real-time traffic and civic monitor" \
  --stack "Next.js + TypeScript" \
  --port 3000 \
  --url "https://civic-pulse.depa.or.th" \
  --axiom-design \
  --no-services \
  -y
```

The four flags that need real values, in order of importance: `--name`, `--desc`, `--stack`, `--url`. Everything else has a sensible default. **If `--url` is not the real public URL, the deploy discipline does not apply and a `curl localhost:3000` is not a deliverable** — see `ship-discipline`.

### 3. `--audit <path>` — audit an existing project

Runs the same invariant checks the new-project generator runs at create time, but against an existing codebase. Reports which Dr Non invariants are present and which are missing, with line-number references for the missing ones.

Useful after pulling an old project out of storage, or when an agent session drifted and you want a one-shot baseline.

### 4. `--validate` — run the repo validator

`scripts/validate_repo.py` — the same gate GitHub Actions runs. Checks skill frontmatter (name, description ≤180, MIT, "Use" trigger), playbook numbering, the 59/12/5/10 count claims in README and AGENTS, the CODEOWNERS template, plugin packaging, broken local links, OS metadata in the tree, and the AGENTS.md 32 KiB Codex budget.

The validator is fast (sub-second on a warm checkout). Run it after any change to a skill, a playbook, or the count badges.

---

## The four pre-flight questions

Every bootstrap — interactive or scripted — answers these four. State assumptions for everything else; these four change the output.

1. **Primary language and stack?** Next.js + TypeScript · Vite + React · Python + FastAPI · other. Determines the project scaffold, the deploy script's expectations, and which language-specific AppSec tools (Bandit, Brakeman, gosec) get wired into CI.
2. **One project or many in this workspace?** Determines whether a Tier-1 workspace index (`CLAUDE.md` at the workspace root) is needed now or can wait.
3. **Anything here run as an always-on service?** Backend, bot, cron. If yes and this is a Mac, the launchd + Cloudflare Tunnel layer is wired in (see `always-on-services`). If Linux, the pattern is `systemd` units; the shape (server / watchdog / backup as separate supervised jobs) still applies.
4. **Axiom Design Core as the visual default?** Hairlines, 0px border-radius, three type sizes, amber `#f59e0b` accent, named single-purpose palette roles — or do you have your own design language already? If you have your own, write the Anti-Regression entries for it into the project's `CLAUDE.md` from step 4; the value is in writing it down, not in which system you picked.

After the four answers, infer the rest the way `dr-non-golden-rules` says: state the assumption, do not stall on it.

---

## The nine steps, in order

What `--init-project` does, named the same way `BLUEPRINT.md` names them so the conversational and the scripted paths agree.

| # | Step | Skill that owns it | Conditional on |
|---|---|---|---|
| 1 | Ask the four questions | (this skill) | always |
| 2 | Install the skills | `scripts/install-skills.sh` | always |
| 3 | Workspace index | `agent-memory` Tier 1 | only if "many projects" |
| 4 | Project scaffold | `templates/*.template` | always |
| 5 | Deploy discipline | `deploy-verification` + `templates/deploy-pages.sh` | only if a CDN host applies |
| 6 | Always-on services | `always-on-services` | only if Mac + service |
| 7 | Data catalog | `data-catalog` + `reference/free-apis.md` | only if external APIs |
| 8 | Design defaults | `axiom-design-core` + `design-dna` | only if Axiom in step 1 |
| 9 | Report back | (this skill) | always |

Each step says what it did in one sentence before moving on, per `dr-non-golden-rules`. Do not wait for approval between steps unless a step explicitly says to ask.

---

## What the project has when it is done

A workspace that knows what's in it, even after a five-week break. A project an agent cannot accidentally vandalise, because the load-bearing decisions are written down with their reasons. A deploy path that proves bytes reached a human instead of trusting a green checkmark. Infrastructure that survives the laptop restarting, if you asked for it. A design system with a reason behind every rule, not just a rule.

None of this is exotic. It is an afternoon of setup, once, that removes the same twenty minutes of re-explaining from every session after it.

---

## When **not** to use this

- **An existing, already-configured project.** Point the agent at the individual skill that matches what is missing instead. A project missing a deploy script needs `deploy-verification`, not a full re-bootstrap.
- **A five-minute script with no deploy target and no multi-session lifespan.** The whole point of the ladder is amortising setup cost across many future sessions; for a one-off, the setup costs more than it saves.
- **A pure-documentation repo** (this repo, for example, is docs-only with scripts). The contracts are still useful; the deploy script and the launchd layer are not.

---

## Gotchas (with dates)

- **`scripts/bootstrap.sh` is a thin wrapper.** It calls `setup.sh` and is kept for backward compatibility. New work should call `setup.sh` directly.
- **The Makefile wraps `setup.sh` for muscle memory** (`make install-skills`, `make validate`, `make test`). The Makefile does not duplicate the logic; if a flag changes in `setup.sh`, the Makefile picks it up automatically.
- **`scripts/new-project.sh` is a sibling of `--init-project`.** They produce the same output; the flag is preferred for new work. `new-project.sh` remains the path-mode entry for shells that don't like long flags.
- **The 4-question pre-flight is the only friction by design.** Adding a fifth question is a breaking change for any script that wraps the bootstrap. State an assumption and move on.
- **The validator's `description_chars` budget is 151 per skill × 59 skills = 8,909.** Adding a new skill pushes the budget up automatically. Adding a skill with a description that exceeds 180 characters fails the gate outright.
- **The AGENTS.md mirror must stay under 32 KiB** (Codex's default budget). The validator enforces it. If a routing table grows past it, split the table into a per-domain file.

---

## The check

```
□ ./setup.sh --install-skills --dry-run shows 59 skills to 4+ hosts
□ ./setup.sh --install-skills (no dry-run) installs to ~/.claude/skills, ~/.agents/skills, etc.
□ ./setup.sh --validate passes (OK 59/12/5/10, no errors)
□ ./setup.sh --init-project <test-path> generates a project with no unfilled placeholder brackets
□ ./setup.sh --audit <test-path> reports the same invariants the new-project generator created
□ The project's CLAUDE.md has an Anti-Regression section that is not empty
□ The project's .env.example has empty values, not real secrets
□ The project's scripts/deploy.sh is executable and the md5 probe actually works
□ The project's design/tokens.css has 0px border-radius and a #f59e0b amber accent (if Axiom)
□ The project's docs/lessons/ has at least the bootstrap lesson file
```

Pairs with [`agent-memory`](../../skills/agent-memory/SKILL.md) (the memory ladder this skill sits on top of), [`dr-non-golden-rules`](../../skills/dr-non-golden-rules/SKILL.md) (the practical defaults the four questions defer to), [`ship-discipline`](../../skills/ship-discipline/SKILL.md) (the CPDT loop the report-back step is held to), and [`karpathy-guidelines`](../../skills/karpathy-guidelines/SKILL.md) (the surgical-edit baseline that keeps the bootstrap from sprawling).
