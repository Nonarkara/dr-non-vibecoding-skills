---
name: learn
description: >-
  Search, show, prune, and export the project's accumulated learnings across
  sessions. Use to answer "didn't we fix this before?" before solving a
  problem that's already been solved.
license: MIT
---

# Learn

> Every session leaves a residue. The residue is either a durable lesson (the team learns) or a transient note (the team forgets). The difference is whether the residue is *queried*.

[`lesson-residue`](../lesson-residue/SKILL.md) is the **capture**: write the lesson down at the end of a painful or surprising session. This is the **query**: search, show, prune, and export the lessons the team has already captured. The two are designed together: a lesson captured by `lesson-residue` is a lesson `learn` can find. The discipline is **to query before solving** — the cost of re-solving a problem the team has already solved is the cost of the original solve, doubled; the cost of querying is one search.

The shape is older than any specific tool. A team's wiki, a project's "lessons learned" database, an engineering org's post-mortem archive — all are the same thing under different names. The `learn` skill is the runtime-friendly version: a script, a queryable format, a discoverable interface. The team's wiki is the human-friendly version. Both are needed; neither replaces the other.

The discipline is especially important in a solo practice. A solo builder has no colleagues to ask "didn't we fix this before?"; the builder asks the `learn` skill. The `learn` skill is the **synthetic colleague** for the solo practice: it has seen the past 200 sessions, it can search across all of them, it can find the lesson that the solo builder has forgotten.

---

## The query protocol

A learn query is invoked before solving a problem. The protocol is four steps.

### 1. Name the problem in plain English

The operator (or the agent) states the problem in a sentence: "the deploy succeeded but the user sees the old page," "the build is slow on second run," "the LLM integration crashes on a long input." The sentence is the query input; the search runs against the sentence, not against the underlying cause.

The sentence is **plain English on purpose**. The lessons are stored in plain English; the search is a plain-text match. A query in technical jargon ("CDN cache busting failing") might miss a lesson written in narrative ("the deploy script's cache-bust header was wrong"). A query in narrative ("deploy succeeded but user sees old") finds both.

### 2. Search the lessons

The script searches `.lessons/` (where `lesson-residue` writes) and the broader `docs/lessons/` (where the project's lesson doc folder lives). The search is keyword-based, with stemming, against the lesson title, body, and tags. The top five matches are returned, ranked by relevance.

The search is **fast** — one `grep` over the lesson folder, sub-second. The search is **complete** — the script does not stop at the first match, does not truncate, does not page. The top five are the top five; the operator reads them and decides.

### 3. Read the matched lessons

The operator (or the agent) reads the top five. The reading is the **decision input**: is the problem the same, similar, or different from the lessons? If same, the lesson's fix is the fix. If similar, the lesson's fix is a starting point. If different, the lesson is still useful — it tells the team "this is not the same as X, Y, or Z."

The reading is **a check, not a gate**. A lesson that matches the problem is not a gate that says "use this fix." The lesson is an input; the operator decides. A team that uses `learn` as a gate is a team that has outsourced the "is this the right fix" question to a search; the search is not the answer.

### 4. Decide: use, adapt, or learn

Three outcomes from the reading:

- **Use.** The matched lesson is the fix. The operator applies it. The `learn` skill records the use (which lesson was used, on what problem, with what outcome) so the next search has the data point.
- **Adapt.** The matched lesson is a starting point. The operator modifies the fix to fit the current problem. The `learn` skill records the adaptation, so the next search has both the original lesson and the adaptation.
- **Learn.** The matched lessons are not the fix; the problem is new. The operator solves the problem; the `lesson-residue` skill captures the new lesson; the `learn` skill records the new lesson in the search index.

The three outcomes are the discipline. A team that uses `learn` and never "learns" is a team that has not internalised the protocol. A team that uses `learn` and always "learns" is a team that is not searching effectively. The distribution is the metric.

---

## The interface

The interface is **a single command**. The agent's first response to a problem is to run `learn`; the agent's first action is the search.

```bash
# Search the lessons
learn search "deploy succeeded but user sees old page"

# Show a specific lesson by id
learn show 2026-08-12-cache-bust-poison

# Prune lessons that have not been read in N months
learn prune --older-than 6 --no-reads

# Export the lessons for sharing or backup
learn export --to ./lessons-archive.md

# Re-index after a bulk write
learn reindex
```

The commands are **the surface, not the implementation**. The implementation is a small script at `scripts/learn.sh`; the commands are aliases the team can read in the README. A team that has the script but not the commands has a tool the team does not use; a team that has the commands but not the script has a shell alias that does nothing.

---

## The output: the search log

Every query, every use, every adaptation, every "learn" is appended to `.lessons/usage.jsonl`. The log is one JSON object per event:

```json
{
  "ts": "2026-09-09T15:30:00Z",
  "event": "use",
  "lesson_id": "2026-08-12-cache-bust-poison",
  "query": "deploy succeeded but user sees old page",
  "outcome": "fix applied, deploy verified"
}
```

The log is the input to the [`power-of-hindsight`](../power-of-hindsight/SKILL.md) retrospective. A team that has 200 queries, 80% "use" or "adapt," is a team that is **learning effectively**: the lessons are being applied, the team is not re-solving solved problems. A team that has 200 queries, 80% "learn," is a team that is **not learning effectively**: the lessons are not being applied, the team is solving the same problems fresh.

The log is also the input to the **lesson curation** discipline. A lesson that has been "use"d 50 times is a load-bearing lesson; a lesson that has been read once is a candidate for pruning. The pruning is mechanical: read the log, sort by usage, drop the bottom 10%. The remaining lessons are the ones the team actually uses; the dropped ones are the ones the team thought were important.

---

## The pair: lesson-residue

The `learn` skill is half of a pair. The other half is [`lesson-residue`](../lesson-residue/SKILL.md), which writes the lessons. The two are designed together: a lesson written by `lesson-residue` is a lesson `learn` can find. The discipline is **to write and to read**: the team that writes without reading is a team that has a graveyard; the team that reads without writing is a team that has an empty index. Both are needed.

A team that uses `learn` and never uses `lesson-residue` is a team that searches but never captures. A team that uses `lesson-residue` and never uses `learn` is a team that captures but never queries. Both halves of the pair are part of the practice.

---

## What the `learn` skill is *not*

**It is not a search engine.** A search engine is a generic tool that returns matches against any text. The `learn` skill is a *curated* index against the team's own lessons. The matches are the team's decisions, in the team's words, in the team's context. A search engine is broader; the `learn` skill is narrower but more useful.

**It is not a knowledge base.** A knowledge base is the long-lived project memory; the `learn` skill is the short-lived session residue. The two are stored in different places (`.lessons/` vs `CLAUDE.md` / `AGENTS.md` / `docs/lessons/`) and have different lifetimes (a lesson is read when relevant, a project memory is read every session). A team that uses `learn` as a knowledge base is a team that is searching for "what is this project's design system" in the lessons; the answer is in the project memory, not in the lessons.

**It is not a substitute for the [`power-of-hindsight`](../power-of-hindsight/SKILL.md) retrospective.** The retrospective is the *analysis* of the data over time; the `learn` skill is the *query* of the data. The retrospective produces the new lessons; the `learn` skill surfaces the existing ones. A team that uses `learn` instead of hindsight is searching the past without writing the future; a team that uses hindsight instead of `learn` is writing the future without searching the past.

**It is not a substitute for the operator's memory.** The operator's memory is fast, contextual, and partial. The `learn` skill is slow, exhaustive, and complete. The two are complementary. A team that uses `learn` instead of the operator's memory is a team that has outsourced the "I remember" question to a search; the search is not the answer.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The query | [`lesson-residue`](../lesson-residue/SKILL.md) | The query reads; the residue writes. The two are the pair. |
| The search log | [`power-of-hindsight`](../power-of-hindsight/SKILL.md) | The log is one of the longitudinal data sources the hindsight skill analyses. |
| The pruning | [`shared-memory-hub`](../shared-memory-hub/SKILL.md) | The lessons are one form of cross-session memory; the hub is the cross-agent memory. The pruning discipline is the same. |
| The export | [`result-honesty`](../result-honesty/SKILL.md) | The export is the four-bucket status of the team's accumulated knowledge. |
| The "decide" step | The host agent's `AskUserQuestion` mechanism | The decision is a one-screen question; the mechanism is host-specific. |
| The interface | `scripts/learn.sh` (added by `setup.sh`) | The script is the implementation; the interface is the team's surface. |

---

## The check

```
□ scripts/learn.sh is wired to a session-start hook (auto-search on problem)
□ .lessons/ exists and is committed, with .lessons/usage.jsonl in .gitignore
□ A search returns the top five matches, ranked by relevance
□ A matched lesson is read by the operator, not auto-applied
□ Every search records an event: use, adapt, or learn
□ A lesson that has been use'd 50 times is load-bearing; a lesson that has been read once is a candidate for pruning
□ A team that has 200 queries and 80% "learn" is not searching effectively — fix the search, not the lessons
□ The export is run quarterly, not on demand
```

Pairs with [`lesson-residue`](../lesson-residue/SKILL.md) (the other half of the pair), [`power-of-hindsight`](../power-of-hindsight/SKILL.md) (the longitudinal analysis the search log is an input to), [`shared-memory-hub`](../shared-memory-hub/SKILL.md) (the cross-agent memory the lessons are one form of), and [`context-save`](../context-save/SKILL.md) (the per-session state the lessons are *not*).
