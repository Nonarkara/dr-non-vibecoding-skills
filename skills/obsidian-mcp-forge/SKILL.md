---
name: obsidian-mcp-forge
description: Use when agents need cheap shared memory across Cursor, Claude, Codex, and Antigravity without SaaS. The A+ Obsidian coding brain — filesystem bridge + disposable recall.
license: MIT
---

# Obsidian MCP Forge (A+ coding brain)

> Markdown is truth. SQLite and embeddings are disposable. The coding MCP is a filesystem stdio bridge. Cull by age. Prove recall with smoke + eval.

[`shared-memory-hub`](../shared-memory-hub/SKILL.md) is the **ritual** (`recall_lessons` → `capture_lesson`, max 3, verified-only). This skill is the **machine**.

Reconstruct from [`second-brain-os`](https://github.com/Nonarkara/second-brain-os). Fork the method. Leave the private vault private.

Two receipts: the 2026-09-11 forge-vs-REST burn, and the 2026-10-05 dual-Mac audit ([lesson](../../docs/lessons/2026-10-05-dual-mac-obsidian-mcp.md)).

Influences: [`shared-memory-hub`](../shared-memory-hub/SKILL.md), [`mcp-cli-first`](../mcp-cli-first/SKILL.md), [`context-economy`](../context-economy/SKILL.md), [`lesson-residue`](../lesson-residue/SKILL.md), [`always-on-services`](../always-on-services/SKILL.md), [`simple-rag`](../simple-rag/SKILL.md), [`harness-hardening`](../harness-hardening/SKILL.md).

---

## Why this path (paid for in tokens)

| Temptation | What actually happened | Keep |
|---|---|---|
| Official **Local REST API + MCP** as the coding path | The plugin can read as up inside Obsidian with no window and a dead port (`27123` / `27124`). Coding still needed the vault. | Filesystem `obsidian-bridge` (stdio). REST stays optional. |
| Bridge and `brain.py` copied under `$VAULT/.mcp/` | A fork, and a second Mac, do not have those copies. Recall then cannot find the CLI. The public kit (2026-09-10) still joins `.mcp/obsidian-memory/brain.py` onto the vault. | Resolve both from the shipped `mcp/` tree, or from `OBSIDIAN_BRAIN_CLI`. |
| Nightly `pkill` of every `obsidian-bridge` | Codex leaks one bridge process per thread. A once-a-day kill-all also takes down live Cursor and Claude bridges. | Age-filter. Spare a bridge whose client is still alive. |
| Both machines write, and git holds `/Users/<name>/...` | The second machine drifted onto a different vault and a different REST setup. Home paths do not travel. | One nightly writer. Absolute paths stay in the local `mcp.json`. |
| `npx` a random `obsidian-bridge` | Wrong tool surface, no local eval, no scar hygiene. | The kit in `second-brain-os`. |
| Vector DB on day one | Cost and ops for a job hybrid FTS5 plus optional Ollama embeds already do locally. | Disposable SQLite. Delete it and rebuild from Markdown. |
| Generic eval queries (“live map vanished”) | A newer scar steals the query and the old fixture goes red. | The query uniquely identifies the scar. Retarget the fixture when the corpus grows. |

**Economics:** one verified scar in the top 3 beats re-deriving the fix in a fresh context.

---

## The production shape

```
second-brain-os/                         # reconstruct kit
  mcp/obsidian-bridge/index.js           # stdio MCP — Cursor, Claude, Codex, Antigravity
  mcp/obsidian-bridge/smoke-test.mjs
  mcp/obsidian-memory/brain.py           # index | recall | capture | audit | eval | context
  mcp/config/.mcp.json.example
  scripts/cull-orphan-mcp-bridges.sh
  vault/                                 # empty regions for a new fork

<vault>/                                 # OBSIDIAN_VAULT — markdown only
  Scars/ Knowledge/ Memory/ ...
  .mcp/cache/                            # gitignored disposable index
```

`<vault>/.mcp/cache/` is the index. It is not a second copy of the bridge.

### Wire once per host

Local `mcp.json` only. Do not commit it.

```jsonc
{
  "mcpServers": {
    "obsidian-bridge": {
      "command": "node",
      "args": ["<kit>/mcp/obsidian-bridge/index.js"],
      "env": {
        "OBSIDIAN_VAULT": "<vault>",
        "OBSIDIAN_BRAIN_CLI": "<kit>/mcp/obsidian-memory/brain.py"
      }
    }
  }
}
```

`OBSIDIAN_VAULT` is a path on that machine. `OBSIDIAN_BRAIN_CLI` is the brain CLI when the process cwd is not the kit. No API keys.

If `index.js` still sets `BRAIN_CLI` to `path.join(VAULT, ".mcp/obsidian-memory/brain.py")`, change that join so it reads `OBSIDIAN_BRAIN_CLI` first, then the shipped `mcp/obsidian-memory/brain.py` next to the bridge. Smoke launches that same `index.js`.

Official Local REST API is for tags, open-note, and `vault_patch` when a window is actually up and `lsof` shows `27123` / `27124`. An enabled plugin with a dead port is a down server. Coding agents keep the filesystem forge either way.

### Two machines

One machine is the nightly writer (index, eval, private vault commit/push). The other reads. A second writer drifts the vault and can leave REST pointed at a different folder than `OBSIDIAN_VAULT`.

---

## Minimum tool contract

Earn the server with recall, capture, and audit. Extra tools (search, daily, templates) must not replace the ritual.

| Tool / CLI | Job |
|---|---|
| `recall_lessons` / `brain recall` | Top-k verified lessons with Markdown paths |
| `capture_lesson` / `brain capture` | Write a dated scar; refuse secrets and empty evidence |
| `get_brain_context` / `brain context` | Compact conservation-law startup (budget-capped) |
| `audit_super_mcp` / `brain audit` | Files, safety rails, index health, last eval |
| `search_vault` | Lexical or hybrid search when recall is too narrow |
| `brain index` | Rebuild disposable SQLite (embed missing via Ollama `nomic-embed-text` when it is up) |
| `brain eval` | Fixed case suite — gate accuracy and latency |

---

## Hygiene that keeps it A+

### 1. Cull by age, once a day

Codex can leak one `obsidian-bridge` process per thread. Cursor and Claude spawn one per session and sometimes leave it.

The daily job age-filters. It leaves a bridge whose parent is still Cursor or Claude. It reaps processes old enough to be abandoned (Codex threads that exited, clients that did not reap). Clients start a fresh bridge on the next tool call.

Match `mcp/obsidian-bridge/index.js` (and a leftover `SecondBrain/.mcp/obsidian-bridge/index.js` if one is still on disk). Do not match every `node` process with “obsidian” in the command line.

### 2. Keep the index honest

From the kit, with the vault and the CLI set:

```bash
export OBSIDIAN_VAULT="<vault>"
export OBSIDIAN_BRAIN_CLI="<kit>/mcp/obsidian-memory/brain.py"
python3 "$OBSIDIAN_BRAIN_CLI" index --json    # prefer mode: hybrid, missing_embeddings: 0
python3 "$OBSIDIAN_BRAIN_CLI" eval --json     # target: 20/20, accuracy 1.0
node mcp/obsidian-bridge/smoke-test.mjs       # status: pass, against the kit's index.js
```

If Ollama is up with `nomic-embed-text`, fill missing embeddings. If embeds are down, lexical fallback still works. Do not call the index hybrid-healthy while `missing_embeddings > 0` for days.

### 3. Fixture drift is a real failure mode

When `brain eval` drops a case because a newer scar matches the old query better, retarget the query (or add a retrieval alias on the canonical scar). Keep the bar. Keep the old scar.

### 4. Nightly loop, one writer

On the writer machine only: redact secrets outside `Vitals/Credentials/` → age-filtered cull → `brain index` + `brain eval` → doctor → commit/push the private backup. Soft-fail index/eval into the heartbeat. Hard-fail only on exposed secrets.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Treat “plugin enabled” as REST being up | The listener is the port. Coding MCP is the filesystem bridge. |
| Join the bridge or `brain.py` onto `$VAULT/.mcp/` | The kit ships them under `mcp/`. The vault holds Markdown and a disposable cache. |
| `pkill` every live bridge once a day | That kills working Cursor and Claude sessions to collect Codex leaks. Age-filter. |
| Commit `/Users/<name>/...` | The second machine cannot use that path, and the path names a home directory. |
| Two nightly writers | The second vault and the second REST config drift apart. |
| 20 MCP tools, no smoke | Unproven tools are decoration. |
| Dump the vault into context | [`context-economy`](../context-economy/SKILL.md) — max 3 lessons. |
| Secrets in notes | Every agent reads the vault. Keychain and env names only. |
| Unverified capture | Rots the index for the whole fleet. |
| Commit `brain-index.sqlite` or API keys | The index is disposable. Keys are not method. |

---

## The test (A+ scorecard)

On the machine you are about to code on:

1. The coding MCP command is `<kit>/mcp/obsidian-bridge/index.js`. `OBSIDIAN_BRAIN_CLI` (or the sibling `mcp/obsidian-memory/brain.py`) resolves, and a recall call runs.
2. `node mcp/obsidian-bridge/smoke-test.mjs` passes against that bridge.
3. `brain eval` is 20/20 (or your suite size) with the gates green.
4. `brain audit` shows the index ready, and `missing_embeddings` is 0 when Ollama is up.
5. If REST is configured, `lsof` shows `27123` or `27124`. An enabled plugin with neither port is a down server, and coding still works through the forge.
6. A cull dry-run spares a bridge started this session by Cursor or Claude, and lists Codex orphans old enough to reap.
7. `git grep` on the kit and the vault finds no `/Users/<name>/` path.
8. One machine is scheduled to write tonight.
9. A fresh agent’s `recall_lessons` on last week’s real bug returns the fix in the top 3, with a path.
10. `capture_lesson` with empty evidence is refused.

Any miss means the brain is decoration. Fix it before the next coding session.

---

## Related

- Ritual: [`shared-memory-hub`](../shared-memory-hub/SKILL.md)
- Residue after pain: [`lesson-residue`](../lesson-residue/SKILL.md)
- Reconstruct kit: [second-brain-os](https://github.com/Nonarkara/second-brain-os)
- Dual-Mac audit: [`docs/lessons/2026-10-05-dual-mac-obsidian-mcp.md`](../../docs/lessons/2026-10-05-dual-mac-obsidian-mcp.md)
