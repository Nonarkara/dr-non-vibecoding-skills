---
name: route-dont-scan
description: >-
  Identify the target project first; never recursive-scan a multi-project workspace.
  Use at the start of any task in a monorepo, when the impulse is ls -R or grep **,
  when one clarifying question would beat a wrong scan, or when a 65-repo tree is
  sitting in the working directory.
license: MIT
---

# Route, Don't Scan

> Blind recursion burns tokens and produces generic answers. One clarifying question beats a wrong scan.

This practice lives in a multi-project workspace — dozens of repos, version chains, shared libraries, a secrets folder that must never be echoed. An agent that `ls -R`s from the root will spend the session describing the furniture and miss the room.

`context-economy` is about **what you write back**. This skill is about **what you open**. They compose. Neither substitutes for the other.

---

## The routing protocol

On every task, in this order:

1. **Identify the target project** from the message. If it is unclear, ask one targeted question before touching the filesystem.
2. **Go directly to that folder.** Do not tour the siblings.
3. **Read only what the task needs**, in this order:
   - The project's own `README.md` / `context.md` / `CLAUDE.md` / `AGENTS.md`
   - The specific files named or implied
   - `package.json` / config only if the task requires it
4. **Do not** run `ls -R`, broad `Glob **/*`, or recursive `Grep` across the whole tree unless the human explicitly asked for a cross-project operation.

---

## Version chains

When a project has `v1` / `v2` / `v3` folders, default to the **active** version. Do not open the archives unless asked. An agent that "helpfully" patches v1 while the live site is v3 has not been thorough. It has been lost.

Write the active path into the workspace index (Tier 1) so this is a lookup, not a guess. See `agent-memory`.

---

## The secrets exception

If a path looks like `.secrets-backup/`, `.env`, `credentials.json`, or a vault folder that holds keys: **do not echo values**, even truncated. Point at the Keychain / env var name. `reference/security-hygiene.md` is the discipline. Routing into a secrets directory is not curiosity. It is a leak.

---

## Match the tool to the question

| Question shape | Tool |
|---|---|
| "Where is `ClientError` defined?" | Grep in the target project. Not a subagent. Not a tree walk. |
| "How does this project's deploy work?" | Read that project's `CLAUDE.md` / `scripts/`. |
| "What is live?" | The workspace index table, then the project's health curl. |
| "Audit every repo for X" | Now a cross-project operation. Say so. Then fan out with a brief, not a blind recursive grep from root. |

A needle query dispatched as a workspace-wide explore is the same waste as scanning for a one-file question. `subagent-routing` decides *whether* to dispatch. This skill decides *where the work is*.

---

## Model tier is a routing decision too

Mechanical git, file search, applying an already-agreed fix — cheap/fast model. Architecture, security, anything in anti-regression territory — the model that can hold the whole chain. Defaulting to the top-tier model for `git status` is the same token-economy violation as scanning the whole tree for a one-file question.

---

## The test

Before the first filesystem call, you can name the project and the two files you actually need. If you cannot, you do not scan to find out. You ask.
