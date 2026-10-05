---
type: lesson
date: 2026-09-11
tags: [obsidian, mcp, memory, tokens, hygiene]
---

# Obsidian coding MCP — what the tokens bought

Layout note (2026-10-05): the coding MCP resolves from the shipped `mcp/` tree in `second-brain-os` (or `OBSIDIAN_BRAIN_CLI`), not from a `$VAULT/.mcp` copy. Cull by age. See [`2026-10-05-dual-mac-obsidian-mcp.md`](2026-10-05-dual-mac-obsidian-mcp.md).

## Wrong turns
- Treating Official Local REST API + MCP as the only 2026 default while the daily coding path was already a filesystem forge
- Pointing README at a third-party `npx obsidian-bridge` instead of the filesystem forge (the vault-local `.mcp/` copy named here was itself the next miss)
- Leaving Claude/Cursor bridge zombies running (teen numbers overnight)
- Letting eval/smoke fixtures drift when newer scars steal generic queries

## Right shape
Filesystem stdio forge + disposable hybrid index (FTS5 + optional Ollama embeds) + nightly cull/index/eval/doctor + unique scar queries.

## Where it lives now
- Skill: `skills/obsidian-mcp-forge/SKILL.md`
- Ritual: `skills/shared-memory-hub/SKILL.md`
- Public method: https://github.com/Nonarkara/second-brain-os
