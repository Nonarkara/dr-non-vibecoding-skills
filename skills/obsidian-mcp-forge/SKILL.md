---
name: obsidian-mcp-forge
description: >-
  Forge a tiny self-sustaining MCP server backed by an Obsidian vault. Use when
  agents need shared recall, capture, and feed tools without a hosted backend.
license: MIT
---

# Obsidian MCP Forge

> The vault is the database. The MCP server is a thin tool-shim over Markdown. Nothing else to operate.

[`shared-memory-hub`](../shared-memory-hub/SKILL.md) says *what* the memory ritual is (`recall_lessons` → `capture_lesson`, max 3, verified-only). This skill is *how to build the server that serves it* — so a forked practice gets its own self-sustaining memory MCP in an afternoon, with no SaaS, no vector DB, and no second system to keep alive.

Influences: [`shared-memory-hub`](../shared-memory-hub/SKILL.md) (ritual + governance), [`mcp-cli-first`](../mcp-cli-first/SKILL.md) (tool beats dashboard), [`always-on-services`](../always-on-services/SKILL.md) (supervise it), [`simple-rag`](../simple-rag/SKILL.md) (FTS5 index).

---

## The rule

Three tools earn the server. Everything else is a file read.

- `recall_lessons(query)` → top-3 verified notes with paths
- `capture_lesson(note)` → writes a dated Markdown file, refuses secrets + unverified claims
- `list_inbox()` → what the [`improvement-radar`](../improvement-radar/SKILL.md) watchdog filed this week

If a proposed fourth tool does not serve recall → capture → inbox, it lives in the project, not the server.

---

## The procedure

### 1. Vault layout (convention over config)

```
~/Documents/SecondBrain/     # or <workspace>/_memory/ for a portable fork
  Scars/                     # verified fixes — symptom/cause/fix/evidence
  Knowledge/                 # adapters, APIs, design decisions
  Clones/                    # improvement-radar inbox (see that skill)
  _index.db                  # FTS5 rebuild artifact — gitignored
```

No frontmatter schema beyond `type / updated / tags`. The [`shared-memory-hub`](../shared-memory-hub/SKILL.md) six-field lesson body is the contract.

### 2. Minimal server — one file, stdio, zero framework

Python stdlib + `mcp` package is the shortest path that stays debuggable. Node works identically — pick the runtime the project already runs.

```python
# server.py — sketch; the contract is the tool list, not the framework
# tools:
#   recall_lessons(query: str, k=3) -> [{path, excerpt}]
#     SQL: SELECT path, snippet FROM fts WHERE fts MATCH ? ORDER BY rank LIMIT k
#   capture_lesson(title, symptom, cause, fix, evidence) -> {path}
#     REFUSE if: secret pattern (sk-|ghp_|AIza|-----BEGIN) in any field
#     REFUSE if: evidence empty ("verified" without proof is scratch, not memory)
#     WRITE Scars/YYYY-MM-DD-<slug>.md with the six-field body
#   list_inbox() -> [{path, title}] from Clones/ sorted newest-first
```

FTS5 index rebuilds from Markdown on start + on `capture_lesson` + nightly (see §4). The `.db` is never the source — delete it and rebuild from `*.md` at any time.

### 3. Wire once per host (the part everyone skips)

```jsonc
// Claude Code: claude mcp add memory -- python3 /path/to/server.py
// .mcp.json (checked into the project so every agent gets it):
{ "mcpServers": { "memory": { "command": "python3", "args": ["tools/memory/server.py"] } } }
// Codex: same .mcp.json — Codex reads repository MCP config
// Cursor: Settings → MCP → add stdio server, same command
```

Then prove each tool fires: call `recall_lessons` with yesterday's bug, `capture_lesson` with a canary note, `list_inbox` after the radar runs. A tool that is configured but never invoked is [`harness-hardening`](../harness-hardening/SKILL.md)'s decorative hook all over again.

### 4. Self-sustaining loop (why it does not rot)

| Job | Cadence | Does |
|---|---|---|
| Rebuild FTS5 | on capture + nightly | `ingest.py` over `Scars/ Knowledge/ Clones/` |
| Radar file | weekly | [`improvement-radar`](../improvement-radar/SKILL.md) writes `Clones/YYYY-MM-DD-<repo>.md` verdicts |
| Promote | monthly | Move acted-on Clones → Knowledge detail or Scars fix; delete refused ones with reason |
| Audit | quarterly | `brain audit`-style: 10 random notes, still true? still cited? secrets leaked? |

Run under [`always-on-services`](../always-on-services/SKILL.md) supervision on the always-on machine, or as a `launchd StartInterval` job. The server must survive reboot without a human.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Vector DB + embeddings day one | FTS5 + 3-result cap answers real recall; vectors come after the [`simple-rag`](../simple-rag/SKILL.md) gate |
| 20 tools | Three tools get called; twenty get ignored — file reads cover the rest |
| Secrets in notes | The vault is read by every agent — Keychain/env names only, values never |
| Unverified capture | Hypothesis without live proof is scratch; it rots the index for everyone |
| Hosted memory SaaS | A second bill + second outage for what one SQLite file does locally |

---

## The test

Fresh agent, empty context: `recall_lessons("<last week's real bug>")` returns your fix in the top 3 with a path. `capture_lesson` with an empty evidence field is refused. `list_inbox` shows this week's radar verdicts. If any fails, the server is decoration.
