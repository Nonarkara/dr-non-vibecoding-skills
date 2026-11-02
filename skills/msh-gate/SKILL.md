---
name: msh-gate
description: >-
  Fail a UI merge until a different agent runs the MSH review. Use before
  shipping a page, HUD, or flyover chrome. Do not rewrite the Non-Slop spatial law.
license: MIT
---

# MSH gate

> Massacre spatial hallucination. If a region invents a reason to take space, delete it. A different agent decides whether any survived.

MSH is the root of design AI slop: an interface that occupies space it did not earn. MoMA is how a kept element is drawn (line weight, grid, compact spacing, one thing that wins). See [`no-design-tells`](../no-design-tells/SKILL.md) §3 and [`reference/named-aesthetics.md`](../../reference/named-aesthetics.md). Passing MoMA on a useless box still fails.

The seven rules stay in [`anti-slop-design`](../anti-slop-design/SKILL.md). The long composition guide stays in [`ANTI-SPATIAL-HALLUCINATION.md`](../../ANTI-SPATIAL-HALLUCINATION.md) and [`ANTI-SLOP.md`](../../ANTI-SLOP.md). This skill is the merge gate. It does not restate them.

## Where the law lives

Checked 2026-11-02: [Non-Slop](https://github.com/Nonarkara/Non-Slop) has no file named `MSH.md`. The massacre line is in that repo's README ("When you find SH, massacre") and the review gate is [`skills/review`](https://github.com/Nonarkara/Non-Slop/blob/main/skills/review/SKILL.md). The full spatial law is [`ANTI-SPATIAL-HALLUCINATION.md`](https://github.com/Nonarkara/Non-Slop/blob/main/ANTI-SPATIAL-HALLUCINATION.md) there, and the same guide at this repo's root.

`Kit/Anti-MSH.md` is the vault note for maps. Read it when the checkout actually has it. Do not edit it. It is not on every Mac yet ([`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md)).

If the reviewer is Grok Bot and `msh-auditor` is installed, run that checklist. This repo does not vendor it.

## The rule

1. **Compact first.** The task fits one screen at 390×844 and 1440×900. Scroll is for a detail the person opened, or for a reading surface whose text is the product. A dashboard, HUD, or tool that scrolls to reveal chrome has failed.
2. **Symbols over prose when the symbol is already clear** (close, play, pause, locate) and it has an accessible name. If a stranger cannot say what the symbol does, use the words and drop the symbol.
3. **Boxes fit their content.** [`anti-slop-design`](../anti-slop-design/SKILL.md) rule 1. A box much larger than its label fails.
4. **Logos are never boxed.** A logo sits on the surface. A card, tile, circle, or padded frame around it goes, unless that frame is itself the control.
5. **A different agent runs the gate.** The builder may collect screenshots and the render output. The builder does not tick the merge box. Fresh reviewer, the diff, no speech about why it is fine. [`build-check-split`](../build-check-split/SKILL.md).

## What the reviewer pastes

- Who reviewed (not the builder).
- Widths looked at: 390, 1024, and 1440.
- What was deleted, or the reason a region stayed.
- The command output when a URL exists:

```bash
node tools/slop-lint.mjs <url>
npx -y github:Nonarkara/Non-Slop render <url>
```

A green source scan is not this gate. Non-Slop's review item 3b (space) is the checklist. Map products also keep the map as the thing that wins; the unmerged numbers in draft PR #21 (`map-first-dashboard`) are not law in this tree until that PR lands.

## The test

```
□ One screen holds the task at 390 and 1440, or the scroll is a detail the person opened?
□ Every box is about the size of its label, and the logo has no frame?
□ A different agent pasted the review, the widths, and what was deleted?
□ Kit/Anti-MSH.md was read if this machine actually has it, and left unedited?
```
