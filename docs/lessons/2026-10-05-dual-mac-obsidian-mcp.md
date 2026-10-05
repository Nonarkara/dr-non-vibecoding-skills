---
type: lesson
date: 2026-10-05
tags: [obsidian, mcp, memory, dual-mac, hygiene]
---

# Dual-Mac audit — the coding MCP stays the filesystem forge

*2026-10-05 — the user said: "Update the Obsidian MCP forge skill … so it matches the live forge-first design and the 2026-10-05 dual-Mac audit lessons."*

## What the user asked for

The 2026-09-11 skill still told forks to wire `$VAULT/.mcp` and to cull every bridge. A two-machine audit the same week showed that layout and that cull are how the desk actually fails.

## What landed

### `skills/obsidian-mcp-forge/SKILL.md` — five caveats, still a procedure

The coding MCP is filesystem `obsidian-bridge`. REST is optional. The plugin can read as up with no window and a dead port (`27123` / `27124`).

Codex can leak one bridge process per thread. The daily cull age-filters. It leaves a live Cursor or Claude bridge alone.

Bridge and brain CLI resolve from the shipped `mcp/` tree, or from `OBSIDIAN_BRAIN_CLI`. They do not assume `$VAULT/.mcp` copies. The public kit as of 2026-09-10 still joins `.mcp/obsidian-memory/brain.py` onto the vault; a fork treats that join as the bug.

Two machines: one nightly writer. Absolute `/Users/<name>` paths stay out of git. The second machine can drift onto a different vault and a different REST setup.

Forks reconstruct from [Nonarkara/second-brain-os](https://github.com/Nonarkara/second-brain-os).

## Patterns borrowed

| Source | Pattern | Where it landed |
|---|---|---|
| `second-brain-os` `docs/obsidian-mcp-setup.md` | Forge first, REST second, prove with smoke and eval | Skill procedure |
| 2026-10-05 dual-Mac audit | Age-filtered cull, one writer, no home paths in git, CLI beside the bridge | Skill caveats |
| Private scar paths and vault hostnames | Looked like evidence | **Refused** — the lesson names the failure, not the path |

## Honest limits

- **The public kit's `index.js` and `smoke-test.mjs` still join `.mcp/` onto the vault.** This lesson records the rule. It does not patch `second-brain-os`.
- **No orphan-age number is invented here.** The audit required an age filter. It did not publish a minute threshold. The operator picks the window on the machine.
- **REST ports `27123` / `27124` are the public kit's listen ports**, checked with `lsof`. A plugin toggle is not that check.

## What didn't make this cut

- **Rewriting `second-brain-os` in this PR** — the ask was the skill and the README pointers, PR only.
- **A kill script** — the last cull script is what took down live bridges. The skill states the filter. It does not ship another `pkill`.

## One line for the next agent

> Wire `<kit>/mcp/obsidian-bridge` and `OBSIDIAN_BRAIN_CLI`, age-filter the cull, and let one machine write tonight.
