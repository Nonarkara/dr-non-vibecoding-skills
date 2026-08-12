---
name: agent-memory
description: >-
  Make agents start every session already knowing your project. Use when setting up a new
  repo, when you find yourself re-explaining context, when an agent breaks something it
  should have known was load-bearing, or when writing CLAUDE.md / AGENTS.md files.
license: MIT
---

# Agent Memory

> The agent's context window resets. Your project doesn't. Everything the next session needs must be written down, at the altitude where it will be read.

Three tiers. Each answers a different question, and putting content at the wrong tier is why most `CLAUDE.md` files stop being read.

---

## Tier 1 — Workspace index (`~/Projects/CLAUDE.md`)

**Question it answers:** *Where does anything live, and what's actually running?*

One table of every project: what it is, its stack, its status, its live URL. Plus layout conventions and a "deliberately outside this folder, do not move" list — things wired into launchd or virtualenvs break when relocated.

Two details that make it earn its keep:

**Mark status honestly.** Active / dormant. An agent that knows a project is dormant won't spend twenty minutes resurrecting `node_modules` to answer a question.

**Correct the README, don't fix it.** Half my dashboards were scaffolded from each other and their READMEs still carry the wrong city name. Rather than a doc-fixing sprint, the index says:

> Several dashboard READMEs still carry copy-pasted titles from their scaffold origin. Trust this table, not those READMEs.

Twenty seconds of writing. Permanently prevents a class of confident-wrong answers.

---

## Tier 2 — Project contract (`<project>/CLAUDE.md`)

**Question it answers:** *How do I work in here without breaking something?*

The sections that matter, in order of value:

### Anti-regression — do not touch

The highest-value paragraph you will ever write. Numbered, specific, with the reason:

```markdown
1. Zero border-radius — enforced in globals.css. Do not remove the
   `border-radius: 0 !important` reset. It is load-bearing.
2. Three font sizes only — Display/Body/Micro. Do not introduce a fourth.
5. Mock data in src/lib/api/mock.ts — the app must render fully with no
   API keys. Never remove mock fallbacks.
```

Agents don't vandalise. They tidy. Anything that looks like an oddity gets "cleaned up" unless you've said it's deliberate.

### Exact commands, not descriptions

```markdown
Restart:  launchctl kickstart -k gui/$(id -u)/com.myapp.server
Deploy:   npx wrangler pages deploy public --project-name myapp
Health:   curl -sS https://myapp.example.org/api/health | python3 -m json.tool
```

An agent will guess a wrong command with total confidence. Give it the right one.

### Reverted experiments, recorded

When you try something and back it out, say so — otherwise a future agent finds the half-remembered idea and reintroduces it:

```markdown
### Hero-font exception — TRIALED THEN REVERTED (2026-07-22 to 2026-07-24)
Wired into nine components, then fully reverted. This note exists so the
exception is not silently reintroduced, nor mistaken for accidental deletion.
```

### Gotchas with dates

*"Fix: hoisted `newCount` out of the `db.tx` closure — every ingest had been throwing after committing (data saved, ingest marked failed)."* Dated. Specific. Saves the next debugging session entirely.

### Keys and constants

`localStorage` keys, feature flags, port numbers, magic thresholds. Anything an agent would otherwise invent a new name for.

---

## Tier 3 — Lesson docs (`docs/lessons/YYYY-MM-DD-<slug>.md`)

**Question it answers:** *Why is it like this, and what did we already try?*

Written after any session that was hard. Template: [`templates/lesson.md.template`](../../templates/lesson.md.template).

The structure that works:

1. **What the user actually asked** — verbatim quote. Intent decays faster than code.
2. **What landed** — files, and what each does.
3. **Patterns borrowed** — a table of source, pattern, where it landed. *Steal patterns, not repos.*
4. **Honest limits** — what this genuinely can't do. In the doc, not buried in fine print.
5. **What didn't make the cut** — and why. The section that saves the most time; it stops the next agent re-proposing something you already rejected for good reasons.
6. **CPDT trace** — the actual commands, with output.
7. **One line for the next agent** — the compressed lesson.

That last line is the whole point. From a real one:

> "Look across the globe" is a curation discipline, not a feature flag. Eight instruments, read the same way, ranked the same way. Anything more is a screen; a screen is what the user is leaving.

---

## Tier 0 — A vault, if you're going long

Beyond three tiers, project-scoped memory stops being enough. Mine is an Obsidian vault of roughly 1,300 notes organised by brain anatomy — lessons and wins in one region, security incidents and red lines in another, the active todo queue in a third — exposed to agents over MCP as a filesystem server plus a content-search server.

Whether the metaphor is anatomy or plain folders matters far less than three properties:

- **Agents can read and write it.** Memory only humans update dies.
- **It has an entry-point note** telling agents how to navigate, what's stale, and what the search tool can and cannot do (filename-only search is a trap worth documenting).
- **It contains no secrets.** Assume every agent reads everything. Store pointers to Keychain entries, never values. I learned this the hard way — see [security hygiene](../../reference/security-hygiene.md).

---

## The failure mode this prevents

Without written memory, every session begins by re-deriving the project from source, and ends with a confident change that violates a constraint nobody wrote down. With it, a five-week-dormant project is productive in ten minutes.

Write the doc when the knowledge is fresh and hurts. That's the only time you'll write it accurately.
