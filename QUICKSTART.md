# Quickstart — after you are the Builder

The one-liner is in the README:

```bash
git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
cd dr-non-vibecoding-skills && ./setup.sh --become-builder
```

That installs every skill on every agent this machine has and prints **You are Dr Non the Builder**. The four steps below are what to do *next*, on a real project. Each is independently useful; together they compound.

Plugin, Makefile, and copy-by-hand paths: README [Other ways to install](README.md#other-ways-to-install). Agent-driven project scaffold: [`BLUEPRINT.md`](BLUEPRINT.md).

---

## 1. Confirm the skills landed (30 sec)

```bash
ls ~/.claude/skills | wc -l   # expect 103
# also: ls ~/.agents/skills | wc -l
```

`AGENTS.md` is project memory; skills are reusable workflows. Keep those roles separate.
`.cursorrules` is legacy. There is no runtime dependency.

---

## 2. Write one project contract for your most-active repository (5 min)

Copy [`templates/AGENTS.md.template`](templates/AGENTS.md.template) to `AGENTS.md`, or
[`templates/CLAUDE.md.template`](templates/CLAUDE.md.template) to `CLAUDE.md`, and fill it in.
Do not write an essay. The five things that pay for themselves immediately:

```markdown
# <Project> — one sentence about what it is

- Live URL: <the real one>
- Run: <the exact command>
- Deploy: <the exact command>
- Health check: <a curl that proves it's alive>

## Anti-regression — do not touch
1. <thing an agent will "helpfully" break>
2. <another>
```

That "anti-regression" section is the highest-leverage paragraph in this whole repo. Agents don't break things you documented as load-bearing; they break things that *looked* like tidy-up opportunities.

Shortcut: `./setup.sh --init-project ~/Projects/my-app --yes` writes the contract, deploy script, and `docs/lessons/` from the same templates.

---

## 3. Make "done" mean the live URL (1 min)

Add this line to the project contract — verbatim:

> Localhost is never a deliverable. Work is done when the deployed URL serves it and a `curl` proves it. If you cannot verify, say "unverified" — do not say "done".

This single sentence eliminated most of the "it works!" / "no it doesn't" round-trips I used to have.

---

## 4. Steal the deploy script (5 min)

If you deploy static assets behind any CDN, copy [`templates/deploy-pages.sh`](templates/deploy-pages.sh). It deploys, then **proves the bytes arrived** by md5-checking real assets through throwaway cache keys.

The version of this script that only checked the HTML version string let a patched XSS fix sit un-served in production for hours. See [war stories](playbooks/06-war-stories.md#the-poisoned-edge-2026-08-09).

---

## 5. Start a lessons folder — then close the loop (2 min)

```bash
mkdir -p docs/lessons
```

After any session that took more than an hour or hurt, write one file: `docs/lessons/YYYY-MM-DD-what-this-was.md`, using [`templates/lesson.md.template`](templates/lesson.md.template). End it with **one line for the next agent**. That is [`lesson-residue`](skills/lesson-residue/SKILL.md).

Two more skills close the year, not the hour:

- Before a major release, walk the live URL as three personas — [`human-walkthrough`](skills/human-walkthrough/SKILL.md) — and file a Now/Next/Later/**Never** roadmap.
- When the patches have become Frankenstein, Collect → Analyze → Reconstruct — [`power-of-hindsight`](skills/power-of-hindsight/SKILL.md).

Six months from now that folder is worth more than the code. Mine is the reason I can pick up a project I haven't touched in five weeks and be productive in ten minutes.

---

## What to read next

- If you're building something new → [`skills/dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md)
- If your agent overcomplicates → [`skills/karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md)
- If "improve X" has no spec → [`skills/ninja-innovation`](skills/ninja-innovation/SKILL.md) (simplest path, not cleanest refactor)
- If your UI or copy looks agent-built → [`skills/no-design-tells`](skills/no-design-tells/SKILL.md) + [`skills/no-ai-tells`](skills/no-ai-tells/SKILL.md)
- If your agent keeps flattening distinctive UI → [`skills/anti-regression`](skills/anti-regression/SKILL.md)
- If defaults/copy/incentives feel wrong → [`skills/cognition-first`](skills/cognition-first/SKILL.md)
- If you want durable memory across agents → [`skills/shared-memory-hub`](skills/shared-memory-hub/SKILL.md) (Obsidian second brain via `obsidian-bridge` MCP + `brain` CLI)
- If you want the daily rhythm → [playbook 01](playbooks/01-how-i-actually-code.md)
- If you want to know how far to push → [playbook 05](playbooks/05-taking-risk-like-dr-non.md)
- If you want your UI to stop looking generic → [`skills/axiom-design-core`](skills/axiom-design-core/SKILL.md)
- If you want a product dashboard that looks shipped, not templated → [`skills/dashboard-discipline`](skills/dashboard-discipline/SKILL.md) (glowing status dot, monospace on labels, metric-card-grid, all 10 litmus tests) + [`skills/no-design-tells`](skills/no-design-tells/SKILL.md) (§6 Hard Gates) + [`skills/design-registers`](skills/design-registers/SKILL.md) (floor before ceiling)
- If a screenshot is the only "test" → [`skills/browser-as-t`](skills/browser-as-t/SKILL.md); before a major release, [`skills/human-walkthrough`](skills/human-walkthrough/SKILL.md)
- If the year of patches needs an end → [`skills/power-of-hindsight`](skills/power-of-hindsight/SKILL.md)
- If you want local answers with citations and no vector-DB ops → [`skills/simple-rag`](skills/simple-rag/SKILL.md) (SQLite FTS5 first, embeddings only after the gate) backed by [`skills/local-llm-ollama`](skills/local-llm-ollama/SKILL.md) (one-machine Ollama, context fixed at the daemon)
- If you want shared memory plus a watchdog that keeps you excellent → [`skills/obsidian-mcp-forge`](skills/obsidian-mcp-forge/SKILL.md) (your own recall/capture/inbox MCP over Obsidian) + [`skills/improvement-radar`](skills/improvement-radar/SKILL.md) (weekly Steal / Feedstock / Refuse verdicts, one promotion a month)
- If answers must reach a phone → [`skills/messaging-gateway`](skills/messaging-gateway/SKILL.md) (Telegram first, Line for Thailand, WhatsApp last — RAG with citations)
- If cameras or satellites are the product → [`skills/home-cctv-grid`](skills/home-cctv-grid/SKILL.md) + [`skills/satellite-change-watch`](skills/satellite-change-watch/SKILL.md) + [playbook 13](playbooks/13-the-digital-twin.md) (the whole twin, front to backend to security)
- If one job needs many hands → [`skills/staff-swarm`](skills/staff-swarm/SKILL.md) (researcher + field + orchestrator; cheap models for paraphrase, frontier for assembly)
- If you want the whole method in one paste, for an agent with no repo → [`HANDSHAKE.md`](HANDSHAKE.md)
- If a brief is terse, compound, or names a person as the spec → [`skills/prompt-like-dr-non`](skills/prompt-like-dr-non/SKILL.md) + [playbook 15](playbooks/15-how-dr-non-prompts.md)
- If the surface is public and must be operable by everyone → [`skills/accessible-by-default`](skills/accessible-by-default/SKILL.md) (unplug the mouse; 200% zoom)
- If a map layer is too big, in the wrong projection, or has no recorded source → [`skills/geospatial-core`](skills/geospatial-core/SKILL.md)
- If the data only exists as a web page → [`skills/deep-scraping`](skills/deep-scraping/SKILL.md) (store raw, parse from raw)
- If cameras, bots, logins, or sensors touch personal data → [`skills/data-protection-pdpa`](skills/data-protection-pdpa/SKILL.md) (Thai PDPA + GDPR)
- If you are picking up commits another agent left behind → [`skills/agent-relay`](skills/agent-relay/SKILL.md) (baton, ledger, a verdict on the last leg before you add anything) + [playbook 14](playbooks/14-the-relay.md); tooling is `scripts/relay.sh`
- If you want an agent to ask four questions and scaffold the rest → [`BLUEPRINT.md`](BLUEPRINT.md)
