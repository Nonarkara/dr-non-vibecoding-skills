# Quickstart — 15 minutes to a better setup

Do these five things in order. Each is independently useful; together they compound.

---

## 1. Install the skills (2 min)

```bash
git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
cp -r dr-non-vibecoding-skills/skills/* ~/.claude/skills/
```

Not on Claude Code? The `SKILL.md` files are plain markdown.

```bash
# Cursor
mkdir -p .cursor/skills
cp -r dr-non-vibecoding-skills/skills/* .cursor/skills/
cp dr-non-vibecoding-skills/AGENTS.md ./AGENTS.md
```

Codex / Gemini: concatenate the ones you want into `AGENTS.md` or `GEMINI.md`. `.cursorrules` is legacy. There is no runtime dependency.

---

## 2. Write one `CLAUDE.md` for your most-active project (5 min)

Copy [`templates/CLAUDE.md.template`](templates/CLAUDE.md.template) into the repo root and fill it in. Do not write an essay. The five things that pay for themselves immediately:

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

Add this line to your `CLAUDE.md` — verbatim:

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
- If your agent keeps flattening distinctive UI → [`skills/anti-regression`](skills/anti-regression/SKILL.md)
- If you want the daily rhythm → [playbook 01](playbooks/01-how-i-actually-code.md)
- If you want to know how far to push → [playbook 05](playbooks/05-taking-risk-like-dr-non.md)
- If you want your UI to stop looking generic → [`skills/axiom-design-core`](skills/axiom-design-core/SKILL.md)
- If you want all five steps above done for you, on a blank folder → [`BLUEPRINT.md`](BLUEPRINT.md)
