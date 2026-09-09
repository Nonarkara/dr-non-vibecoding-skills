---
name: context-save
description: >-
  Capture git state, decisions, and remaining work as a checkpoint any
  future session can resume. Use at session end, before risky changes,
  or when context is about to overflow.
license: MIT
---

# Context Save

> Every session ends. The question is not whether the next session starts fresh — it does — but whether the fresh session starts *informed*.

[`agent-memory`](../agent-memory/SKILL.md) is the **project memory**: the durable, long-lived record of what the project is, what the conventions are, what the gotchas are. The context-save is the **session memory**: the short-lived, transient record of what *this* session was doing, what was decided, and what is left. The two are different. The project memory is the same in every session; the session memory is the residue of the one that just ended.

The discipline is older than any tool: a developer closing a ticket writes a note for the developer who picks up the next day. The note has three fields — *what was I doing, what did I decide, what is next*. The next developer reads the note, knows the context, and continues. The context-save is the same note, automated: at the end of the session, a script captures the git state, the open files, the decisions, the remaining work, and writes a single file the next session can read.

The cost of not saving is **the ten minutes the next session spends re-deriving the context**. The cost of saving is **the ten seconds the current session spends running the script**. The ratio is 60:1 in favour of saving. Over a year, with one save per session, the savings are hours.

---

## The checkpoint file

A checkpoint is one file, at `.context/checkpoints/<session-id>.md`. The file is **written by the agent at the end of the session, not by the human, not by a cron job**. The agent knows what was decided; the agent knows what is left; the agent knows what the next agent will need to know. The script is the structure; the agent is the content.

The file has four sections, in this order:

### 1. Identity

```markdown
# Checkpoint — <short title>

- **Session ID:** <unique id, e.g., timestamp>
- **Date:** YYYY-MM-DD
- **Branch:** <git branch at save time>
- **Last commit:** <git SHA at save time>
- **Working tree:** clean / N files dirty
```

The identity is the git state at the moment of the save. The next session can `git checkout <branch>` and `git log <SHA>` to recover the tree.

### 2. What was happening

A short paragraph. What the session was working on, what the user asked for, what the agent was doing, where the agent stopped. The next session reads this first, and the rest of the file only if the paragraph does not give enough.

The paragraph is **for the human reading the file, not for the agent**. The next session will run `git log` and `git status`; the human will not. The human's question is "what was this session doing, in plain English." The paragraph is the answer.

### 3. Decisions made

A list, bullet by bullet. Every decision the session made that the next session will need to know about. The list is **the durable residue** of the session; the rest of the file is context that can be re-derived.

A decision is a choice that was made *and would not be obvious to re-derive*. The choice of "use SQLite for the local cache" is obvious; the choice of "the schema migration order is X, Y, Z" is not. The list is the non-obvious.

### 4. Remaining work

A list, bullet by bullet. What the next session should do first, what it should do second, what it should not do. The list is **the agenda** for the next session; the next session reads this last, and the agenda is the first thing the next session does.

The remaining work is **ordered, not prioritised**. The next session does the first item; if the first item unblocks the second, it does the second; if not, it stops at the first and writes a new checkpoint. A "prioritised" list implies the next session can do all of it; an ordered list respects the fact that the next session may stop at any item.

---

## The script

The script is `scripts/context-save.sh`, added by `setup.sh` on first run. The script:

1. Reads the git state (branch, SHA, dirty count).
2. Calls the agent to write the four sections.
3. Writes the file at `.context/checkpoints/<session-id>.md`.
4. Optionally commits the file (the default is no commit; the file is local until the next commit).

The "calls the agent" step is the load-bearing one. The script does not write the file itself; the script asks the agent to write the file. The agent is the one that knows what was happening, what was decided, what is left. The script is the structure; the agent is the content.

The script is **idempotent**: running it twice in a row produces the same file (modulo the timestamp). The script is **fast**: sub-second on a warm checkout. The script is **safe**: it does not modify the working tree, does not push, does not deploy. The script is a write, not a write-or-die.

---

## The protocol

A context-save is invoked at three moments:

1. **At the end of the session**, explicitly. The operator says "save context," or the script is wired to run on a session-end hook. The default is the end-of-session invocation.
2. **Before a risky change**, explicitly. The operator says "I'm about to do X, save first." The script runs; the file is the rollback point. If the risky change goes wrong, the next session reads the file and knows what the state was *before* the risk.
3. **When the context is about to overflow**, automatically. The agent session is getting close to its context window limit; the script runs; the file is the transfer to a new session. The next session reads the file and continues.

The three moments are **complementary**. The first is the discipline; the second is the safety; the third is the disaster recovery. A team that uses only the first is a team that loses risky changes; a team that uses only the third is a team that never saves deliberately. All three are part of the practice.

---

## The pair: context-restore

The context-save is half of a pair. The other half is [`context-restore`](../context-restore/SKILL.md), which reads a checkpoint file and recovers the state. The two are designed together: a file written by `context-save` is a file `context-restore` can read. The naming, the sections, the format are the same; the only difference is the direction (write vs read).

A team that uses `context-save` without `context-restore` is writing notes nobody reads. A team that uses `context-restore` without `context-save` is reading notes nobody wrote. Both are needed; the discipline is to use both, every session, on principle.

---

## What the context-save is *not*

**It is not a project memory.** The context-save is per-session; the project memory is per-project. The two are stored in different places (`.context/checkpoints/` vs `CLAUDE.md` / `AGENTS.md` / `docs/lessons/`) and have different lifetimes (a checkpoint is read once, then archived; a project memory is read every session). A team that confuses the two writes a session's transient decisions into the project memory, and the project memory becomes a graveyard of stale context.

**It is not a git commit.** The context-save is a file; the git commit is a state. The two are different. The context-save can be *committed* (the file is part of the working tree; the operator can `git add .context/checkpoints/` and commit it), but the act of saving is not the act of committing. A team that conflates "save context" with "commit" loses the uncommitted state; a team that conflates "commit" with "save context" writes the commit message as if it were the context.

**It is not a backup.** A backup is a copy of state in a different place. A context-save is a *narrative* of state in the same place. The backup is the bytes; the context-save is the meaning. A team that uses context-save instead of backups has the meaning but not the bytes; a team that uses backups instead of context-save has the bytes but not the meaning. Both are needed.

**It is not a substitute for the [`agent-memory`](../agent-memory/SKILL.md) discipline.** The agent-memory is the project memory that survives across sessions; the context-save is the session memory that survives one. A team that uses context-save without agent-memory has session continuity but not project continuity; a team that uses agent-memory without context-save has project continuity but not session continuity.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The script | `scripts/context-save.sh` (added by `setup.sh`) | The script is the implementation; the skill is the protocol. |
| The file | [`context-restore`](../context-restore/SKILL.md) | The file is written by save, read by restore. The two are the pair. |
| The identity section | `git log` / `git status` | The git state is the verifiable substrate; the checkpoint is the narrative. |
| The decisions section | [`lesson-residue`](../lesson-residue/SKILL.md) | A decision that the next session needs is a residue. The decisions section is the input to the residue. |
| The remaining-work section | [`planning-discipline`](../planning-discipline/SKILL.md) | The remaining work is the next plan; the planning discipline is how the next session picks it up. |
| The session-end hook | The host agent's session-end mechanism | The hook is host-specific; the skill describes the protocol. |

---

## The check

```
□ scripts/context-save.sh is wired to a session-end hook
□ .context/checkpoints/ exists, is in .gitignore, and is committed on demand
□ A checkpoint file has the four sections: identity, what was happening, decisions, remaining work
□ The remaining-work section is ordered, not prioritised
□ The checkpoint is written by the agent, not by a cron job
□ The checkpoint is read by [context-restore], not by the next session's first git log
□ A session that ended in a crash has a checkpoint from before the crash
□ A team that disables the context-save has a reason, and the reason is logged
```

Pairs with [`context-restore`](../context-restore/SKILL.md) (the other half of the pair), [`agent-memory`](../agent-memory/SKILL.md) (the project memory the context-save is *not*), [`lesson-residue`](../lesson-residue/SKILL.md) (the discipline that turns decisions into durable residue), and [`planning-discipline`](../planning-discipline/SKILL.md) (the discipline the next session uses to pick up the remaining work).
