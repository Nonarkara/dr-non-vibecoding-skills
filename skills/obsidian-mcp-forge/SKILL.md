---
name: obsidian-mcp-forge
description: >-
  Wire obsidian-bridge v2 to the SecondBrain git vault. Use when agents need
  shared coding memory with the app closed. Do not use the Obsidian CLI or Local REST.
license: MIT
---

# Obsidian MCP Forge

> Markdown is truth. The coding MCP is `obsidian-bridge` v2, one server, stdio, app closed. Cull orphan bridges by age. One nightly writer.

[`shared-memory-hub`](../shared-memory-hub/SKILL.md) is the ritual. [`session-secondbrain-handoff`](../session-secondbrain-handoff/SKILL.md) is the session note. [`machine-fleet`](../machine-fleet/SKILL.md) is which Mac. This skill is the machine.

The live vault is the git repo [Nonarkara/second-brain-vault](https://github.com/Nonarkara/second-brain-vault). Sync is git only: no Syncthing, no Obsidian Sync, no iCloud. [second-brain-os](https://github.com/Nonarkara/second-brain-os) is the older public reconstruct kit. Where its tool names and this bridge disagree, the live bridge wins.

The Obsidian app can stay closed. There is no Obsidian CLI on this path. Official Local REST stays optional, and a dead port is a down server. Coding does not wait for it.

Two receipts still stand: the 2026-09-11 forge-vs-REST burn, and the 2026-10-05 dual-Mac audit ([lesson](../../docs/lessons/2026-10-05-dual-mac-obsidian-mcp.md)).

## Caveat

Kit notes exist on the cloud-agent box through commit `82dcd473`. They are not on the Pro vault and not on GitHub. The Pro vault is mid-rebase. The box is 131 commits ahead and unpushed. The shape below is the intended shape. Do not claim `Kit/` is live on every Mac until that rebase finishes and the box is pushed. This workspace did not contain the vault, so `82dcd473` was not re-checked here.

## Why this path

| Temptation | What actually happened | Keep |
|---|---|---|
| Official Local REST API, or an Obsidian CLI, as the coding path | The plugin can read as up with no window and a dead port (`27123` / `27124`). Coding still needed the vault. | Filesystem `obsidian-bridge` v2. App off. No CLI. |
| Bridge and `brain.py` copied under `$VAULT/.mcp/` | A second machine does not have those copies. The public kit (2026-09-10) still joins `.mcp/obsidian-memory/brain.py` onto the vault. | The live bridge's `index.js`. `brain.py` only if this host's server still exposes it. |
| Nightly `pkill` of every `obsidian-bridge` | That takes down live Cursor and Claude bridges along with Codex leaks. | Age-filter. Spare a bridge whose client is still alive. |
| Home paths committed into project git | The second machine cannot use them. | All four roots live in `Kit/Machines.md` once that note has landed. Until then, see [`machine-fleet`](../machine-fleet/SKILL.md). Local `mcp.json` only. |
| `npx` a random `obsidian-bridge` | Wrong tool surface. | The bridge checkout named below. |
| `recall_lessons` as the only call | The live server's session pair is `get_context` / `capture_coding_session`. | Those two. Call `recall_lessons` only when the server still lists it. |

## The production shape

```
second-brain-vault/                  # git vault, one remote
  Kit/                               # human-owned working canon. Read. Do not edit.
  Knowledge/Bible/                   # long-form. Do not edit.
  Soul/  Vitals/                     # Do not edit.
  Memory/Sessions/                   # session handoff notes
  .mcp/obsidian-bridge/              # Mac mirror of the bridge
  .mcp/cache/                        # disposable index, if present

obsidian-bridge/                     # the server. v2, 14 tools.
  index.js                           # stdio MCP
```

On the box the bridge checkout is the source of truth, next to the vault. Macs mirror that same tree at `<vault>/.mcp/obsidian-bridge`. Absolute paths are per machine ([`machine-fleet`](../machine-fleet/SKILL.md)).

Intended roots, which `Kit/Machines.md` holds when the note is present:

| Machine | Root |
|---|---|
| Pro | `/Users/nonarkara/Documents/SecondBrain` |
| Air | `/Users/axiom/SecondBrain` |
| Box | `/workspace/SecondBrain` |
| Studio | TBD. Future always-on hub and nightly writer. Do not invent the path. |

### Clients

The same server on every Mac: Cursor, Claude Code, Codex / VS Code, MiniMax, OpenCode, Antigravity, Grok Bot (`user-obsidian-bridge`). Each host wires it in local `mcp.json` only.

```jsonc
{
  "mcpServers": {
    "obsidian-bridge": {
      "command": "node",
      "args": ["<path-to>/index.js"],
      "env": {
        "OBSIDIAN_VAULT": "<this host's root>",
        "OBSIDIAN_TIME_ZONE": "Asia/Bangkok"
      }
    }
  }
}
```

Do not commit that file. `OBSIDIAN_BRAIN_CLI` is the older kit. Set it only when this host's bridge still requires `brain.py`.

### Kit, when the files are actually here

Read `Kit/` before planning. Do not edit `Kit/`, `Soul/`, `Bible/`, or `Vitals/`.

| Note | What it is for |
|---|---|
| `Kit/README.md` | Read it. The authority order in [`shared-memory-hub`](../shared-memory-hub/SKILL.md) holds if this file is still a stub. |
| `Kit/Project-Types.md` | Animated game/sim, 3D flyover/city twin, GLB walkthrough, maps. |
| `Kit/Anti-MSH.md` | Maps. Pair with this repo's `ANTI-SPATIAL-HALLUCINATION.md`. |
| `Kit/Map-API-Recycling.md` | Recycle map APIs. Pair with [`map-api-recycle`](../map-api-recycle/SKILL.md). |
| `Kit/Machines.md` | The roots in the table above. |
| `Kit/Conventions.md` | Folder ownership, and the frontmatter below. |
| `Kit/Workflow.md` | Current priorities, in Non's words, when written. |

If a file is missing, say it is missing. Do not write it.

Agent-authored notes (not those folders) carry:

```yaml
updated: YYYY-MM-DD
drafted_by: <client>/<model>
reviewed: false
```

Questions for Non go in the handoff `blockers`.

## Tools

The owner describes the live server as **v2 with 14 tools**. Eleven names were given. Do not invent the other three. If the client lists tools, that list wins. Skip a name it does not advertise, and say so.

| Tool | When |
|---|---|
| `get_context(project, query)` | Session start. `project` is the exact repo name. |
| `capture_coding_session` | Session end. `summary`, `decisions`, `changes`, `tests`, `blockers`, `next_steps`, plus `project`. |
| `search_vault` | When context is too narrow |
| `search_tasks` | Open work |
| `log_decision` | A decision that should outlive the session |
| `write_inbox` | Capture that is not yet a note |
| `append_to_daily` | The daily note |
| `read_note` / `write_note` / `edit_note` | A note outside Kit, Soul, Bible, and Vitals |
| `vault_status` | Is this checkout the one you think it is |

`recall_lessons`, `capture_lesson`, and `brain.py` belong to the older kit. Use them only when this server still lists them.

## Hygiene

1. **Age-cull orphans once a day.** Match `obsidian-bridge/index.js` (and a leftover `<vault>/.mcp/obsidian-bridge/index.js`). Spare a bridge whose parent is still alive. Do not `pkill` every bridge.
2. **One nightly writer.** After Studio cutover and replication, Studio is that writer. Until then, do not add a second one, and do not invent the Studio path.
3. **Index and eval.** If `brain.py` is still on this host, the old `index` / `eval` / smoke bar still applies. If it is not, `vault_status` plus a real `get_context` is the check. Do not report a 20/20 eval you did not run.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| "The app is open, so memory works" | The server is the bridge. The app can stay closed. |
| An Obsidian CLI command | This path has no CLI. |
| Editing `Kit/` to record a session | Sessions go to `Memory/Sessions/`. |
| Claiming Kit is on the Pro because this skill mentions it | The note is on the box, unpushed. |
| Two nightly writers | The vault forks. |

## The test

On the machine you are about to code on:

1. The MCP command is `node` on this host's `index.js`, with `OBSIDIAN_VAULT` and `OBSIDIAN_TIME_ZONE=Asia/Bangkok`.
2. `vault_status` answers, and `get_context` runs for the exact repo name.
3. The tool list has 14 names, or you wrote down how many the server actually advertised. You did not invent the missing ones.
4. The Obsidian app may be closed. Coding still works. No CLI was required.
5. A cull dry-run spares a bridge started this session and lists orphans old enough to reap.
6. `Kit/`, `Soul/`, `Bible/`, and `Vitals/` were not edited.
7. You did not say Kit is on every Mac.

Any miss means the brain is decoration.

## Related

- Ritual: [`shared-memory-hub`](../shared-memory-hub/SKILL.md)
- Handoff: [`session-secondbrain-handoff`](../session-secondbrain-handoff/SKILL.md)
- Machines: [`machine-fleet`](../machine-fleet/SKILL.md)
- Older kit: [second-brain-os](https://github.com/Nonarkara/second-brain-os)
- Dual-Mac audit: [`docs/lessons/2026-10-05-dual-mac-obsidian-mcp.md`](../../docs/lessons/2026-10-05-dual-mac-obsidian-mcp.md)
