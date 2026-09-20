---
name: route-dont-scan
description: >-
  Identify the target project before scanning. Use at the start of work in a
  monorepo or multi-project workspace.
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

## Build the map once (for repos routing can't shrink)

Routing decides *where* to go once you already know the shape of the tree. Some
trees are too big to hold that shape in your head — this practice's own skills
repository crossed that line: 167 skills, ~850 files. Reconstructing "what
changed, what overlaps" after a week away took a dozen `grep`/`find`/`git log`
calls in one session, each one a fresh scan the previous one should have made
unnecessary.

The fix is a persistent artifact, not a better memory: build a structural map
**once**, at zero LLM cost, and route off it instead of re-discovering the tree
every session.

```bash
scripts/repo-map.sh .              # writes REPO_MAP.md — ~10s on this repo, 850 files
```

It gives three things a blind scan cannot, without opening a single file's
contents: a pruned directory tree, a **god-files** list (which files everything
else assumes you've read — computed by counting cross-references, not by
guessing), and a **symbols index** (top-level declarations per file, grep-pattern
extraction — good enough to answer "which file defines X" before opening
anything). Regenerate after a structural change; it does not watch.

**This is the cheap version, and say so.** It is grep patterns matching
declaration keywords, not an AST — a match inside a string is a false positive,
a nested declaration is invisible, and it cannot trace what calls what. For a
real call graph, the honest upgrade is [graphify](https://github.com/Graphify-Labs/graphify)
(Apache-2.0): tree-sitter AST parsing, zero LLM tokens for code, Leiden community
detection for the god-nodes/wiki view. Its own worked examples, not the marketing
average, are the number worth citing: **71.5× fewer tokens on a 52-file corpus of
code + papers + images, 5.4× on 4 mixed files, ~1× on a 6-file plain Python
library** — the payoff scales with corpus size and how much of it is prose and
images, not code. A single-purpose app repo may see close to nothing; a 20-project
workspace or a repo like this one is exactly where it pays.

**Fork the method, not the pack**, per
[`playbooks/11-the-2026-steal-map.md`](../../playbooks/11-the-2026-steal-map.md):
`scripts/repo-map.sh` is the zero-dependency default, shipped and tested against
this repo. Reach for `graphify` as an optional CLI, invoked per
[`mcp-cli-first`](../mcp-cli-first/SKILL.md)'s tiering, when the map itself needs
to be the deliverable — not as a default dependency of this stack. Neither one
is a substitute for reading the diff: the map tells you where to look, never what
the code currently does. That check still happens per file, every time, per
[`agent-relay`](../agent-relay/SKILL.md)'s cold-read rule.

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
| "What does this 850-file repo look like" | Consult `REPO_MAP.md` if one exists; if not, build it once with `scripts/repo-map.sh`. Not a tree walk. |

A needle query dispatched as a workspace-wide explore is the same waste as scanning for a one-file question. `subagent-routing` decides *whether* to dispatch. This skill decides *where the work is*.

---

## Model tier is a routing decision too

Mechanical git, file search, applying an already-agreed fix — cheap/fast model. Architecture, security, anything in anti-regression territory — the model that can hold the whole chain. Defaulting to the top-tier model for `git status` is the same token-economy violation as scanning the whole tree for a one-file question.

---

## The test

Before the first filesystem call, you can name the project and the two files you actually need. If you cannot, you do not scan to find out. You ask.
