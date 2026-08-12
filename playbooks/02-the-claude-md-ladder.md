# The CLAUDE.md Ladder

Three tiers of written memory. Each answers a different question. Put content at the wrong tier and it stops being read.

The skill version is [`agent-memory`](../skills/agent-memory/SKILL.md); this is the longer walkthrough with real examples.

---

## Tier 1 — the workspace index

**File:** `~/Projects/CLAUDE.md` (and a mirrored `AGENTS.md` for non-Claude agents)
**Question:** *Where does anything live, and what's actually running?*

Mine opens with the layout convention, then a table of every project. The columns that earn their space:

| Project | What it is | Stack | Status |
|---|---|---|---|

Plus, and this is the part people skip, a section headed **"Deliberately outside this folder — do not move"**:

| Path | Why it stays |
|---|---|
| `~/Brain` | Obsidian vault — has its own MCP, git, and backup stack |
| `~/voice-clone-env` | The venv is wired into a launchd plist; venvs break when moved |
| `~/.openclaw` | Agent runtime: gateway, skills, credentials |

An agent tidying your home directory is a genuinely destructive event. This table prevents it.

### Two habits that make the index survive

**Reorg ledgers.** When you move things, write down old → new, and what you patched:

> `~/FloodDash` → `Projects/FloodDash` (launchd plists patched + reloaded, verified on :8340)

Six weeks later, when something references the old path, that line is the whole answer.

**Correct rather than fix.** My dashboards were scaffolded from each other and several READMEs still say the wrong city. Fixing eleven READMEs is a chore that never happens. So the index says:

> Several dashboard READMEs still carry copy-pasted titles from their scaffold origin. Trust this table, not those READMEs.

Twenty seconds, permanent fix for a class of confident-wrong answers.

---

## Tier 2 — the project contract

**File:** `<project>/CLAUDE.md`
**Question:** *How do I work in here without breaking something?*

Ordered by value, highest first.

### 1. Anti-regression — do not touch

The highest-leverage paragraph in the whole system. Real example:

```markdown
1. Zero border-radius — enforced in globals.css. Do not remove the
   `border-radius: 0 !important` reset. It is load-bearing.
2. Three font sizes only — Display/Body/Micro. Do not introduce a
   fourth (`1.1rem`, `0.82rem`, or any other).
5. Mock data in src/lib/api/mock.ts — the app must render fully with
   no API keys. Never remove mock fallbacks.
6. Correlation disclaimer — the EventTimeline component carries a note
   that events correlate but do not cause market moves. Do not remove.
```

Agents don't vandalise, they tidy. Every one of those items looks like cruft to a fresh reader. Each has a reason. Writing the reason is what makes the rule hold.

### 2. Exact commands

```markdown
Restart: launchctl kickstart -k gui/$(id -u)/com.flooddash.server
Deploy:  npx wrangler pages deploy public --project-name flood
Health:  curl -sS https://flood.example.org/api/health | python3 -m json.tool
```

An agent will confidently guess a wrong `launchctl` invocation. Give it the right one.

### 3. Live URLs — with disambiguation

```markdown
| Public dashboard | https://flood.example.org  (NOT kmitl.example.org —
  that's a different product, the campus-ops dashboard in dashboards/kmitl/) |
```

That parenthetical exists because two agents conflated the two. Write the negative.

### 4. Dated gotchas

> **Fix:** `server/sources/waterQuality.js` — hoisted `newCount` out of the `db.tx` closure; every ingest had been throwing after committing (data saved, ingest marked failed).

Specific, dated, and it says what the *symptom* looked like. Symptoms are how the next debugging session will find it.

### 5. The keys table

`localStorage` keys, ports, feature flags, thresholds. All of mine are versioned (`fd_go_bag_v1`) so a schema change never hands a returning user a corrupt object.

### 6. Reverted experiments

```markdown
### Hero-font exception — TRIALED THEN REVERTED (2026-07-22 to 2026-07-24)
Wired into nine components, then fully reverted. This note is retained
so the exception is not silently reintroduced, nor mistaken for an
accidental deletion.
```

Without this, half-remembered good ideas come back every few weeks.

---

## Tier 3 — lesson docs

**File:** `docs/lessons/YYYY-MM-DD-the-<something>-pass.md`
**Question:** *Why is it like this, and what did we already try?*

Written after any session that was hard. Full structure in [`templates/lesson.md.template`](../templates/lesson.md.template). The two sections that do the most work:

**"What didn't make this cut" — and why.** This stops the next agent (or the next you) re-proposing an idea you already rejected for good reasons:

> **News-tape per-pick overlay** — the classifier already exists and tying a pick to a recent story is doable, but it pulls attention from "what to trade" toward "what's in the news", which is the opposite of what this page is for.

**"One line for the next agent."** The compressed lesson. If you write nothing else, write this:

> "Look across the globe" is a curation discipline, not a feature flag. Eight instruments, read the same way, ranked the same way. Anything more is a screen; a screen is what the user is leaving.

---

## Keeping the ladder honest

**Update the tier that was wrong, not the one you're in.** If an agent broke something because Tier 2 didn't say it was load-bearing, fix Tier 2. Fixing only the code guarantees a repeat.

**Date things that will age.** "Status 2026-07" beats "Status", because a reader can weigh it.

**Say what you don't know.** *"Several dashboards haven't been cross-referenced into this index yet — do it next time either project is touched."* An honest gap is useful. A silent one is a trap.

**Mirror for other agents.** Codex reads `AGENTS.md`, Cursor reads `.cursorrules`, Gemini reads `GEMINI.md`. Same content, different filename. Keep one canonical and copy — but check the copies: mine drifted, and one still refers to a folder by an old name.
