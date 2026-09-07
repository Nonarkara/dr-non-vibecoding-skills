# Quickstart — 15 minutes to a better setup

Do these five things in order. Each is independently useful; together they compound.

---

## 1. Install the skills (2 min)

```bash
git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
```

Install the bundle as a plugin in Codex:

```bash
codex plugin marketplace add Nonarkara/dr-non-vibecoding-skills
codex plugin add dr-non-vibecoding-skills@dr-non
```

Or copy the plain `SKILL.md` folders into the host's discovery path:

```bash
# Codex user skills
mkdir -p "$HOME/.agents/skills"
cp -R dr-non-vibecoding-skills/skills/* "$HOME/.agents/skills/"

# Claude Code user skills
mkdir -p "$HOME/.claude/skills"
cp -R dr-non-vibecoding-skills/skills/* "$HOME/.claude/skills/"

# Cursor
mkdir -p .cursor/skills
cp -R dr-non-vibecoding-skills/skills/* .cursor/skills/
cp dr-non-vibecoding-skills/AGENTS.md ./AGENTS.md
```

`AGENTS.md` is project memory; skills are reusable workflows. Keep those roles separate.
For Gemini or another rules-only host, copy only the relevant skill instructions into its
native rules file. `.cursorrules` is legacy. There is no runtime dependency.

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

## 5. Start a lessons folder (2 min)

```bash
mkdir -p docs/lessons
```

After any session that took more than an hour or hurt, write one file: `docs/lessons/YYYY-MM-DD-what-this-was.md`, using [`templates/lesson.md.template`](templates/lesson.md.template). End it with **one line for the next agent**.

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
- If you want a product dashboard that looks shipped, not templated → [`skills/no-design-tells`](skills/no-design-tells/SKILL.md) (§6 Hard Gates) + [`skills/design-registers`](skills/design-registers/SKILL.md) (floor before ceiling)
- If you want all five steps above done for you, on a blank folder → [`BLUEPRINT.md`](BLUEPRINT.md)
