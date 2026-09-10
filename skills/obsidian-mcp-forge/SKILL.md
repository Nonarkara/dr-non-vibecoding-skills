---
name: obsidian-mcp-forge
description: Use when agents need cheap shared memory across Cursor, Claude, Codex, and Antigravity without SaaS. The A+ Obsidian coding brain — filesystem bridge + disposable recall.
license: MIT
---

# Obsidian MCP Forge (A+ coding brain)

> Markdown is truth. SQLite and embeddings are disposable. The MCP server is a thin stdio shim. Cull zombies. Prove recall with smoke + eval.

[`shared-memory-hub`](../shared-memory-hub/SKILL.md) is the **ritual** (`recall_lessons` → `capture_lesson`, max 3, verified-only). This skill is the **machine** that makes that ritual cheap enough to use on every coding session — the setup Dr Non actually runs after burning tokens on the wrong paths.

Reference implementation (method, not secrets): [`second-brain-os`](https://github.com/Nonarkara/second-brain-os). Live operator vault (private): `~/Documents/SecondBrain`.

Influences: [`shared-memory-hub`](../shared-memory-hub/SKILL.md), [`mcp-cli-first`](../mcp-cli-first/SKILL.md), [`context-economy`](../context-economy/SKILL.md), [`lesson-residue`](../lesson-residue/SKILL.md), [`always-on-services`](../always-on-services/SKILL.md), [`simple-rag`](../simple-rag/SKILL.md), [`harness-hardening`](../harness-hardening/SKILL.md).

---

## Why this path (paid for in tokens)

| Temptation | What actually happened | Keep instead |
|---|---|---|
| Official **Local REST API + MCP** as the only way | Plugin not installed; coding still needed vault while Obsidian habits varied; REST path never became the daily driver | **Filesystem `obsidian-bridge` (stdio)** as the production coding MCP |
| `npx` random `obsidian-bridge` package | Wrong tool surface; no local eval; no scar hygiene | Your vault’s `.mcp/obsidian-bridge` + `.mcp/obsidian-memory` |
| Vector DB day one | Cost + ops for what hybrid FTS5 + optional Ollama embeds already do locally | Disposable SQLite index; delete and rebuild from Markdown anytime |
| Trust “configured” without proof | Smoke drifted; eval 19/20; 15 zombie Node bridges eating RAM | Nightly **cull + index + eval**; smoke must stay green |
| Generic eval queries (“live map vanished”) | Newer scars steal the query; old fixture goes red | Queries must **uniquely** identify the scar; retarget fixtures when the corpus grows |

**Economics:** one verified scar recalled in top-3 beats re-deriving the fix in a fresh agent context. That is the whole ROI.

---

## The production shape (what “good” looks like)

```
~/Documents/SecondBrain/          # or forkable vault root
  .mcp/
    obsidian-bridge/              # stdio MCP (Cursor/Claude/Codex/Antigravity)
      index.js
      smoke-test.mjs              # must exit 0
    obsidian-memory/
      brain.py                    # index | recall | capture | audit | eval | context
      memory_core.py
      eval-cases.json             # fixed retrieval suite — keep at 20/20
    cache/                        # gitignored — brain-index.sqlite
  Scars/ Debug-Logs/ Anti-Regression/
  Knowledge/ Topics/ Bible/
  Memory/ Daily/ Sessions/
  Soul/ Will/ Bridges/ Senses/ Reflexes/ Vitals/
  Reflexes/Scripts/
    cull-orphan-mcp-bridges.sh    # kill leftover bridge processes
    vault-maintenance.mjs         # nightly: redact → cull → index → eval → doctor → ship
    secondbrain-doctor.mjs
```

### Wire once per host

```jsonc
// ~/.cursor/mcp.json  and/or  Claude mcpServers  and/or  project .mcp.json
{
  "mcpServers": {
    "obsidian-bridge": {
      "command": "/opt/homebrew/bin/node",
      "args": ["/Users/YOU/Documents/SecondBrain/.mcp/obsidian-bridge/index.js"],
      "env": { "OBSIDIAN_VAULT": "/Users/YOU/Documents/SecondBrain" }
    }
  }
}
```

No API keys in the vault. `OBSIDIAN_VAULT` is a path, not a secret.

Optional: Official Local REST API MCP when you want Obsidian-aware tags/open-note/`vault_patch` **and** Obsidian is open. It does **not** replace the filesystem forge for coding agents.

---

## Minimum tool contract

Earn the server with recall + capture + audit. Live forges may expose more (search, daily, templates) — extras must not replace the ritual.

| Tool / CLI | Job |
|---|---|
| `recall_lessons` / `brain recall` | Top‑k verified lessons with Markdown paths |
| `capture_lesson` / `brain capture` | Write a dated scar; refuse secrets + empty evidence |
| `get_brain_context` / `brain context` | Compact conservation-law startup (budget-capped) |
| `audit_super_mcp` / `brain audit` | Files, safety rails, index health, last eval |
| `search_vault` | Lexical/hybrid search when recall is too narrow |
| `brain index` | Rebuild disposable SQLite (+ embed missing via Ollama `nomic-embed-text` when up) |
| `brain eval` | Fixed case suite — gate accuracy + latency |

---

## Hygiene that keeps it A+

### 1. Cull orphan bridges

Claude Code, Cursor, and Antigravity spawn a stdio bridge per session and often leave zombies (double-digit Node processes overnight).

```bash
bash Reflexes/Scripts/cull-orphan-mcp-bridges.sh
# pattern: SecondBrain/.mcp/obsidian-bridge/index.js
# Safe: clients respawn a fresh bridge on the next tool call
```

Call this from nightly maintenance and whenever the laptop feels warm for no reason.

### 2. Keep the index honest

```bash
export OBSIDIAN_VAULT=~/Documents/SecondBrain
python3 .mcp/obsidian-memory/brain.py index --json   # prefer mode: hybrid, missing_embeddings: 0
python3 .mcp/obsidian-memory/brain.py eval --json    # target: 20/20, accuracy 1.0
cd .mcp/obsidian-bridge && node smoke-test.mjs       # must print status: pass
```

If Ollama is up with `nomic-embed-text`, fill missing embeddings. If embeds are down, lexical fallback still works — do not pretend hybrid is healthy when `missing_embeddings > 0` for days.

### 3. Fixture drift is a real failure mode

When `brain eval` drops a case because a **newer** scar matches the old query better, **retarget the query** (or add retrieval aliases on the canonical scar). Do not lower the bar. Do not delete the old scar.

### 4. Nightly loop

`vault-maintenance`: redact secrets outside `Vitals/Credentials/` → cull orphans → `brain index` + `brain eval` → doctor → commit/push private backup. Soft-fail index/eval into heartbeat; hard-fail only on exposed secrets.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Declare REST plugin “the 2026 default” and mark the forge superseded | Coding MCP must work when Obsidian is closed, headless, or plugin-less — forge is the durable path |
| 20 MCP tools, no smoke | Tools that are never proven are decorative harness |
| Dump the vault into context | [`context-economy`](../context-economy/SKILL.md) — max 3 lessons |
| Secrets in notes | Every agent reads the vault; Keychain/env names only |
| Unverified capture | Rot the index for the whole fleet |
| Skip cull | Zombie bridges waste RAM and make MCP flaky |
| Commit `brain-index.sqlite` or API keys | Index is disposable; keys are not method |

---

## The test (A+ scorecard)

Fresh machine or morning check:

1. Orphan bridge count is **0** (or one live client).
2. `node smoke-test.mjs` → **pass**.
3. `brain eval` → **20/20** (or your suite size) with gates green.
4. `brain audit` → index **ready**, `missing_embeddings` **0** when Ollama is up.
5. Fresh agent: `recall_lessons("<last week’s real bug>")` returns the fix in top‑3 with a path.
6. `capture_lesson` with empty evidence is refused.

If any fail, the brain is decoration — fix before the next coding session.

---

## Related

- Ritual: [`shared-memory-hub`](../shared-memory-hub/SKILL.md)
- Residue after pain: [`lesson-residue`](../lesson-residue/SKILL.md)
- Public method repo: [second-brain-os](https://github.com/Nonarkara/second-brain-os)
- Do not confuse with third-party `npx obsidian-bridge` packages — wire **your** vault’s forge path
