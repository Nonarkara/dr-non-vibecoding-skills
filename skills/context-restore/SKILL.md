---
name: context-restore
description: >-
  Resume work from a previous session's checkpoint, restoring git state,
  decisions, and remaining work. Use when picking up after a break, a
  handoff, or a context overflow.
license: MIT
---

# Context Restore

> A fresh session is a blank screen. The question is whether the screen shows what the previous session was doing, or whether the next session spends ten minutes re-deriving the context.

[`context-save`](../context-save/SKILL.md) writes the checkpoint; this skill reads it. The two are designed together: a file written by `context-save` is a file `context-restore` can read. The discipline is **to use both, every session, on principle**: the save at the end of the session, the restore at the start of the next. A team that saves but does not restore is writing notes nobody reads; a team that restores but does not save is reading notes nobody wrote.

The restore is not a full re-derivation. The restore is the **first 30 seconds of the next session**: read the checkpoint, check the git state, ask the operator "is this what you were doing?" If the answer is yes, continue. If the answer is no, the restore is wrong; the operator corrects and the session continues. The cost of the restore is one file read and one confirmation; the cost of *not* restoring is the ten minutes the next session spends figuring out where the previous one left off.

---

## The protocol

A context-restore is invoked at the start of a session, before any work begins. The protocol is four steps.

### 1. Find the checkpoint

The script looks for the most recent checkpoint in `.context/checkpoints/`. The most recent is the file with the latest timestamp in the filename. The script lists the candidates, in reverse-chronological order, and asks the operator which one to restore.

The default is "the most recent." The override is "a specific one," with a reason. A team that has multiple concurrent sessions (a solo builder with parallel projects) has multiple checkpoint streams; the script's listing is the disambiguation.

### 2. Read the file

The script reads the four sections in order: identity, what was happening, decisions made, remaining work. The reading is the input to the next three steps.

The reading is **fast** — one file, ~100 lines, sub-second. The reading is **complete** — the script does not summarise, does not skip, does not page. The four sections are the four pieces of context the next session needs; truncating any of them is the loss of one of the four.

### 3. Check the git state

The script reads the git state in the checkpoint (branch, SHA, dirty count) and compares to the current state. The comparison is the **verifiable substrate**: the narrative is in the checkpoint, the state is in git, and the two should agree.

A mismatch is **the first finding** of the session. Three cases:

| Case | What it means | What to do |
|---|---|---|
| Branch and SHA match, working tree clean | The checkpoint is accurate. The next session continues. | Proceed to step 4. |
| Branch matches, SHA ahead | The checkpoint is from an earlier commit; the working tree has progressed. | Read the diff, decide if the new commits are still relevant, update the checkpoint. |
| Branch does not match | The operator is on a different branch. The checkpoint is from a different line of work. | Ask the operator which line of work to continue. |

A mismatch is **not an error**; a mismatch is *information*. The restore is a check, not a gate. The next session can proceed on the new branch with a new checkpoint; the old checkpoint is archived.

### 4. Confirm with the operator

The script prints a one-screen summary: the file's identity, the one-paragraph "what was happening," the top three decisions, the top three remaining-work items. The operator confirms ("yes, continue") or corrects ("no, I was actually doing X"). The confirmation is logged.

The confirmation is the **human-in-the-loop guard**. The script does not auto-resume; the script asks. A team that auto-resumes has a script that can start a session on a wrong line of work; a team that confirms has a script that starts the right session, with the operator's blessing.

The cost of the confirmation is one screen. The cost of auto-resuming the wrong session is a session of work on the wrong line, and a `power-of-hindsight` reconstruction to recover. The ratio is in favour of the confirmation.

---

## The output: the resume

After the confirmation, the next session has a four-piece context:

1. **The git state** — branch, SHA, dirty count. The script has already checked it; the next session knows where it is in the tree.
2. **The narrative** — the one-paragraph "what was happening." The next session knows what the operator is doing, in plain English.
3. **The decisions** — the list of choices that were made and would not be obvious to re-derive. The next session does not re-litigate them.
4. **The remaining work** — the ordered list of what to do next. The next session does the first item, then the second, then writes a new checkpoint.

The four pieces are the **session's local context**, distinct from the project memory. The project memory (`CLAUDE.md`, `AGENTS.md`, `docs/lessons/`) is the long-lived knowledge; the session context is the short-lived state. The two are loaded at the start of the session; the session context is the resume, the project memory is the foundation.

A session that has only the project memory is a session that knows the project but not what it was doing yesterday. A session that has only the session context is a session that knows what it was doing but not the project. A session that has both is a session that knows what it was doing *in* the project.

---

## The protocol in three failure modes

The protocol is the same in three failure modes; only the entry point differs.

### Handoff — operator to operator

A new engineer joins; the previous engineer writes a `context-save` before leaving. The new engineer runs `context-restore`; the script reads the previous engineer's session, the new engineer confirms, the work continues. The handoff is the same protocol as a break; the operator is just a different person.

### Break — operator to self, overnight

The operator closes the laptop at 11pm; the operator opens it at 9am. The `context-save` ran at 11pm. The `context-restore` runs at 9am. The protocol is identical to a handoff; the operator is the same person, but the next session is a fresh agent, and the fresh agent does not remember.

### Overflow — operator to new session, mid-day

The agent session is at 80% of its context window. The operator says "save and restart." The `context-save` runs; the operator starts a new session; the new session runs `context-restore`. The protocol is identical to a break; the operator is the same, the project is the same, and the fresh session continues from where the old one was about to overflow.

The three failure modes are **the same protocol, three entry points**. A team that has the protocol in place for one mode has it for all three.

---

## What the context-restore is *not*

**It is not a git checkout.** A git checkout changes the working tree; a context-restore does not. The restore reads the checkpoint, verifies the git state, and asks the operator to confirm; it does not modify the tree. A team that uses restore as a checkout has the wrong tool.

**It is not a project memory load.** The project memory is the long-lived knowledge; the context-restore is the short-lived state. The two are loaded together at the start of the session, but they are different files. A team that loads only the context-save is missing the project memory; a team that loads only the project memory is missing the resume.

**It is not a substitute for the operator's thinking.** The restore is the input; the operator is the decision. The script does not auto-resume; the operator confirms. A team that auto-resumes is a team that has outsourced the "what am I doing" question to a script; the script is not the answer.

**It is not a substitute for [`agent-memory`](../agent-memory/SKILL.md).** The agent-memory is the project memory; the context-restore is the session resume. The two are different files, different lifetimes, different purposes. A team that uses only context-restore is missing the long-lived knowledge; a team that uses only agent-memory is missing the short-lived state.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The script | `scripts/context-restore.sh` (added by `setup.sh`) | The script is the implementation; the skill is the protocol. |
| The file | [`context-save`](../context-save/SKILL.md) | The file is written by save, read by restore. The two are the pair. |
| The git state check | `git log` / `git status` | The git state is the verifiable substrate; the checkpoint is the narrative. |
| The operator confirmation | The host agent's `AskUserQuestion` mechanism | The confirmation is a one-screen question; the mechanism is host-specific. |
| The session context | [`agent-memory`](../agent-memory/SKILL.md) | The two are loaded together; the project memory is the foundation, the session context is the resume. |
| The remaining-work list | [`planning-discipline`](../planning-discipline/SKILL.md) | The remaining work is the next plan; the planning discipline is how the next session picks it up. |

---

## The check

```
□ scripts/context-restore.sh is wired to a session-start hook
□ The script finds the most recent checkpoint in .context/checkpoints/
□ The script reads the four sections in order: identity, what was happening, decisions, remaining work
□ The script compares the git state in the checkpoint to the current state
□ A git-state mismatch is reported as the first finding of the session, not as an error
□ The operator confirms before the session continues
□ The session context and the project memory are both loaded at session start
□ A team that skips the restore has a reason, and the reason is logged
```

Pairs with [`context-save`](../context-save/SKILL.md) (the other half of the pair), [`agent-memory`](../agent-memory/SKILL.md) (the project memory the restore is *not*), [`planning-discipline`](../planning-discipline/SKILL.md) (the discipline the next session uses to pick up the remaining work), and [`power-of-hindsight`](../power-of-hindsight/SKILL.md) (the longitudinal analysis the checkpoint history is an input to).
