# Quickstart — after you are the Builder

**Never coded before?** Start at [`START_HERE.md`](START_HERE.md) — clone, handshake or become-builder, then scaffold under [`projects/`](projects/README.md).

The one-liner is in the README:

```bash
git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
cd dr-non-vibecoding-skills && ./setup.sh --become-builder
```

That installs every skill on every agent this machine has and prints **You are Dr Non the Builder**. The four steps below are what to do *next*, on a real project. Each is independently useful; together they compound.

Plugin, Makefile, and copy-by-hand paths: README [Other ways to install](README.md#other-ways-to-install). Agent-driven project scaffold: [`BLUEPRINT.md`](BLUEPRINT.md). FAAFO / Kim-Yegge bridge: [`playbooks/17-kim-yegge-faafo-bridge.md`](playbooks/17-kim-yegge-faafo-bridge.md).

---

## 1. Confirm the skills landed (30 sec)

```bash
ls ~/.claude/skills | wc -l   # expect 101
# also: ls ~/.agents/skills | wc -l
```

`AGENTS.md` is project memory; skills are reusable workflows. Keep those roles separate.
`.cursorrules` is legacy. There is no runtime dependency.

---

## 2. Write one project contract (5 min)

Prefer scaffolding under this clone:

```bash
scripts/new-project.sh projects/my-first-app --stack next --workspace
```

Or copy [`templates/AGENTS.md.template`](templates/AGENTS.md.template) to `AGENTS.md` / [`templates/CLAUDE.md.template`](templates/CLAUDE.md.template) to `CLAUDE.md` in any project folder. Do not write an essay. The five things that pay for themselves immediately:

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

That "anti-regression" section is the highest-leverage paragraph in this whole repo.

Shortcut: `./setup.sh --init-project projects/my-app --yes` writes the contract, deploy script, and `docs/lessons/` from the same templates.

---

## 3. Make "done" mean the live URL (1 min)

Add this line to the project contract — verbatim:

> Localhost is never a deliverable. Work is done when the deployed URL serves it and a `curl` proves it. If you cannot verify, say "unverified" — do not say "done".

---

## 4. Steal the deploy script (5 min)

If you deploy static assets behind any CDN, copy [`templates/deploy-pages.sh`](templates/deploy-pages.sh). It deploys, then **proves the bytes arrived** by md5-checking real assets through throwaway cache keys.

See [war stories](playbooks/06-war-stories.md).

---

## 5. Start a lessons folder — then close the loop (2 min)

```bash
mkdir -p docs/lessons
```

After any session that took more than an hour or hurt, write one file using [`templates/lesson.md.template`](templates/lesson.md.template). End it with **one line for the next agent**. That is [`lesson-residue`](skills/lesson-residue/SKILL.md).

Before a major release: [`human-walkthrough`](skills/human-walkthrough/SKILL.md). When patches become Frankenstein: [`power-of-hindsight`](skills/power-of-hindsight/SKILL.md).

---

## What to read next

- First twelve skills: [`START_HERE.md`](START_HERE.md)
- FAAFO before code: [`skills/vibe-coding-faafo`](skills/vibe-coding-faafo/SKILL.md)
- If you're building something new: [`skills/dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md)
- If your agent overcomplicates: [`skills/karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md)
- Daily rhythm: [playbook 01](playbooks/01-how-i-actually-code.md)
- Whole method in one paste: [`HANDSHAKE.md`](HANDSHAKE.md)
- Agent scaffold paste: [`BLUEPRINT.md`](BLUEPRINT.md)
