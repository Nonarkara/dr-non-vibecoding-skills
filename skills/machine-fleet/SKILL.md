---
name: machine-fleet
description: >-
  Route work across the live Pro, the Air, and the future Studio hub. Use when
  a job could run on more than one Mac. Do not invent a Studio path or SKU.
license: MIT
---

# Machine fleet

> Two Macs are live. The Studio is the future hub. The vault is git, and each machine keeps its own absolute path.

Hardware already written down in [`local-ai-fabric`](../local-ai-fabric/SKILL.md): an M5 Max MacBook Pro with 128 GB (heavy models, the lid closes, not 24/7) and an M3 Air with 16 GB (the small always-on gateway, and it swaps). Do not add a SKU, a RAM figure, or a hostname this repo does not already contain.

Draft PR #20 (`now-stack.md`, `machine-routing.md`, `stack-gaps.md`) is not merged. This skill is the in-tree routing. Do not create those three files here.

## Caveat

Kit notes, including `Kit/Machines.md`, exist on the cloud-agent box through commit `82dcd473`. They are not on the Pro vault and not on GitHub. The Pro vault is mid-rebase. The box is 131 commits ahead and unpushed. This page documents the intended shape. Do not claim Kit is live on every Mac until that rebase finishes and the box is pushed. This workspace did not contain the vault, so that commit was not re-checked here.

## Intended roots

These are the owner's machine map, the contents `Kit/Machines.md` is meant to hold. Read that file when this machine actually has it. Do not invent a substitute, and do not copy a root into a committed `mcp.json` or into a project repo. Local `mcp.json` only. Forks set their own `OBSIDIAN_VAULT`.

| Machine | Role | Intended vault root |
|---|---|---|
| Pro (M5 Max, 128 GB) | Heavy builds, tests, video, new or larger local models | `/Users/nonarkara/Documents/SecondBrain` |
| Air (M3, 16 GB) | Light tasks, and the gateway that is already up. No heavy builds, no new models, no install sprees | `/Users/axiom/SecondBrain` |
| Box | Cloud-agent checkout of the same git vault | `/workspace/SecondBrain` |
| Studio | Not here yet. No hostname and no path. After cutover and replication: the always-on hub and the single nightly vault writer | TBD. Do not invent it. |

Sync is git only ([`Nonarkara/second-brain-vault`](https://github.com/Nonarkara/second-brain-vault)). No Syncthing, no Obsidian Sync, no iCloud. A separate non-coding Brain vault is out of scope for this MCP.

Before adding load on the Air, read swap and `df` on `/System/Volumes/Data`. If it is already swapping, add nothing. The numeric gate in draft #20 is not repeated here as merged law.

## Where a job goes

| Job | Send it to |
|---|---|
| Feature work, tests, a production build, video, a new model | Pro |
| A short reply, a health read, the existing gateway | Air, and only while it is healthy |
| Nightly vault write | One writer. Studio, after cutover. Until then, do not stand up a second writer. |
| A repository edit | A cloud agent, on a branch, as a pull request. Do not merge it. |
| Anything that needs `Kit/Machines.md` | The checkout that actually has the file. Today that is the box, not GitHub. |

Age-cull orphan `obsidian-bridge` processes. The procedure is [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md).

## The test

```
□ Heavy work is on the Pro, and the Air was not given a build or a new model?
□ Studio's path was left unset?
□ Vault roots were read from Kit/Machines.md only if this machine has it?
□ The reply does not say Kit is on every Mac?
```
