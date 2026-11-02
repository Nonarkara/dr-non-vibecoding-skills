---
name: shared-memory-hub
description: >-
  Persist lessons in the SecondBrain vault through obsidian-bridge. Use when
  capturing cross-session decisions. Do not edit Kit, Soul, Bible, or Vitals.
license: MIT
---

# Shared Memory Hub

> One verified lesson is stored once, recalled only when relevant, and shared across every agent in the fleet.

Shared coding memory is the SecondBrain vault through `obsidian-bridge` v2 (14 tools), the same server on every Mac. The Obsidian app can stay closed. There is no Obsidian CLI on this path.

The machine is [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md). The session note is [`session-secondbrain-handoff`](../session-secondbrain-handoff/SKILL.md). Which Mac is [`machine-fleet`](../machine-fleet/SKILL.md). The git repo is [Nonarkara/second-brain-vault](https://github.com/Nonarkara/second-brain-vault). [second-brain-os](https://github.com/Nonarkara/second-brain-os) is the older kit; the live bridge wins when they disagree.

## Caveat

Kit notes exist on the cloud-agent box through commit `82dcd473`. They are not on the Pro vault and not on GitHub. The Pro vault is mid-rebase. The box is 131 commits ahead and unpushed. Read `Kit/` when this checkout has it. Do not claim Kit is live on every Mac. This workspace did not contain the vault, so that commit was not re-checked here.

Intended roots, also in `Kit/Machines.md` once that note is present: Pro `/Users/nonarkara/Documents/SecondBrain`, Air `/Users/axiom/SecondBrain`, box `/workspace/SecondBrain`, Studio TBD. Local `mcp.json` only. Do not commit those paths into a project repo.

## Authority

`Current AGENTS.md` → project instructions → `Kit/` → verified Scars and Knowledge → raw sessions.

A recalled session never outranks a Kit note, and a Kit note never outranks the current project instructions or `AGENTS.md`. Raw `Memory/Sessions/` notes are evidence, not rules.

## The ritual

### Start

Read `Kit/` before planning when the files are there (`Kit/Project-Types.md`, `Kit/Anti-MSH.md`, `Kit/Map-API-Recycling.md`, `Kit/Machines.md`). Do not edit `Kit/`, `Soul/`, `Bible/`, or `Vitals/`.

`get_context(project=<exact repo name>, query=<task>)`

Use at most 3 lessons. Do not dump the vault into the window.

### End

`capture_coding_session` with `project`, `summary`, `decisions`, `changes`, `tests`, `blockers`, `next_steps`.

That note lives under `Memory/Sessions/`. Questions for Non go in `blockers`.

A verified production fix, once you have evidence, is a `log_decision` or a `write_note` in the vault's Scars region. Confirm the path with `search_vault` before writing. The older `/Scars/Debug-Logs/` path is the previous hub default; the live vault may have moved it. The six fields:

```markdown
---
type: scar
updated: YYYY-MM-DD
drafted_by: <client>/<model>
reviewed: false
tags: [stack, subsystem, bug-type]
---

# [Symptom / What Broke]

## Symptom
Exact error message, status code, or visual glitch.

## Failed Attempt
What was tried, and why it failed.

## Root Cause
The mechanism.

## Verified Fix
The smallest change that held.

## Verification Evidence
The command output, test, hash, or live URL.
```

`reviewed` stays false until a person or a different agent has reviewed the note. `capture_lesson` / `recall_lessons` are the older kit. Call them only if this server still lists them.

## Laws

1. **Authority** is the order above. A newer project rule beats a scar.
2. **No unverified idea filed as a scar.** Hypotheses stay in the session note.
3. **No secrets in markdown.** Keychain names and env names only.
4. **No edits** to `Kit/`, `Soul/`, `Bible/`, or `Vitals/`.
5. **Agent notes** carry `updated`, `drafted_by: <client>/<model>`, and `reviewed: false`.

## The test

If you fixed something real, `get_context` on the next session with the exact repo name returns that fix in the top 3. If it returns a generic note, the capture was skipped or filed under the wrong project name.
