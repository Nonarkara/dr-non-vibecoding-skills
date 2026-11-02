---
name: session-secondbrain-handoff
description: >-
  Open with get_context and write the handoff via capture_coding_session. Use
  at coding session start and stop. Do not use the Obsidian app or its CLI.
license: MIT
---

# Session handoff into SecondBrain

> Start from the vault. End in `Memory/Sessions/`. Git state is a different note.

[`context-save`](../context-save/SKILL.md) and [`context-restore`](../context-restore/SKILL.md) are the git checkpoint. This skill is the vault note. Wiring is [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md). The ritual's authority order is [`shared-memory-hub`](../shared-memory-hub/SKILL.md).

The Obsidian app can stay closed. Do not shell out to an Obsidian CLI. Do not use the Local REST API as the coding path.

## Caveat

`Kit/` is the working canon when this machine has it. On 2026-11-02 those notes were on the box through commit `82dcd473`, not on Pro and not on GitHub (Pro mid-rebase, box 131 ahead unpushed). If `Kit/` is missing, say so and follow this skill. Do not create Kit files to fill the hole, and do not claim every Mac has them.

## Start

Read `Kit/` before planning when the files are there. Then:

`get_context(project=<exact repo name>, query=<task>)`

`project` is the repository name, not a nickname and not a path. Keep at most the lessons the hub allows. Do not dump the vault.

## End

`capture_coding_session` with:

- `project` — the same exact repo name
- `summary`, `decisions`, `changes`, `tests`, `blockers`, `next_steps`

A Stop/handoff hook may already have written the note. Read it. Fill gaps. Do not write a second copy.

The scratch pad is that handoff under `Memory/Sessions/` (`next_steps` and `blockers`). Do not also leave a parallel scratch file.

Questions for Non go in `blockers`. They do not go into `Kit/`.

Notes the agent writes (sessions, decisions, inbox) carry:

```yaml
updated: YYYY-MM-DD
drafted_by: <client>/<model>
reviewed: false
```

`reviewed` stays false until a person or a different agent has reviewed the note.

## Do not edit

`Kit/`, `Soul/`, `Bible/` (`Knowledge/Bible/`), `Vitals/`. Read them. Leave them.

## The test

```
□ get_context was called with the exact repo name before planning?
□ The handoff is one Memory/Sessions note, not a second scratch file?
□ Questions for Non are in blockers, and Kit/Soul/Bible/Vitals were not edited?
□ If Kit/ was absent, the reply says so instead of pretending it was read?
```
