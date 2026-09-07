---
name: anti-regression
description: >-
  Protect earned behavior and distinctive UI from destructive cleanup. Use before
  large rewrites or edits to maps, canvases, HUDs, and mature files.
license: MIT
---

# Anti-Regression

> Agents deleting each other's work is the #1 risk in a multi-agent practice. "Refactor" is not a licence. "Cleanup" is not a licence.

On 23 April 2026 an agent silently rewrote a live homepage from 1,338 lines to 345. The Leaflet map, the satellite HUD, the canvas animation, and the `[EVENT_ID]` protocol sections were replaced with a generic rounded-card template. A referenced file was deleted while CI still pointed at it. Deploys went green for days while production was a ghost of itself.

That is the **Codex Incident**. Every rule below exists because of it. Full receipt: [`playbooks/06-war-stories.md`](../../playbooks/06-war-stories.md).

This skill is the **Prime Directive** of the practice. `planning-discipline` is how you avoid cowboy edits *before* they start. This skill is what you do — and refuse to do — *while the file is open*.

---

## The eight prohibitions

Never do any of these without the human typing explicit approval, in the same session, for the specific file:

1. **Never collapse a file by more than 30%** in a single edit. If the diff removes more than 30% of lines, stop and ask. Dense "messy" files often carry domain personality and edge-case protection. Flattening them is vandalism dressed as hygiene.
2. **Never delete a live interactive element.** Maps, Deck.gl layers, canvas animations, SVG HUDs, rotating hero text, tickers, auto-tour loops, WebGL scenes, satellite overlays. These ARE the product. A static card replacing a live map is a regression, not a simplification.
3. **Never introduce template cliches** the project's design DNA forbids. In this practice: `border-radius > 0` (except a true circle), gradients, drop-shadows, pastel palettes, generic card grids. Your practice will have its own list — write it, then refuse to violate it.
4. **Never replace earned content with filler.** No Lorem Ipsum. No "Feature 1 / Feature 2 / Feature 3" cards. No mediocre stock dropped in to fill a slot. If you can't find a real asset, ask.
5. **Never delete a referenced file without updating every reference.** Grep CI workflows, imports, `<script>`/`<link>` tags, READMEs, and `package.json` scripts *before* the delete. A silent CI break is worse than the original bug because it hides the regression behind a green checkmark.
6. **Never commit a destructive rewrite under a mild message.** If the change removes a feature, the commit subject starts with `remove:` or `breaking:`. "refactor", "cleanup", "tidy", "update copy" are forbidden subjects for destructive diffs.
7. **Never treat a distinctive site as a generic landing page.** If the signature is rich-dashboard-as-marketing — live-data overlays, mono labels, tactical accents — flattening it into a SaaS template is the crime.
8. **Never re-theme a project to match a template you've seen elsewhere.** No Vercel-starter vibes. No shadcn defaults. If you catch yourself thinking "this would be cleaner as…" — stop. That thought is the regression.

---

## The recovery protocol

If you discover a previous agent has already done this:

1. **Do not rebuild from scratch.** You will invent a worse copy of what was lost.
2. Find the last good commit: `git log --oneline --stat`. Look for the big line-count drop — that is the crime scene.
3. `git show <hash>:<path>` to read the original file.
4. Restore surgically. Keep any legitimate fixes made *after* the regression (a real bug fix, a CI config update).
5. Verify the restore deploys cleanly. The Codex Incident was masked by silently-failing CI — a green checkmark on a dead site.

---

## Red-flag phrases — stop and show the diff

If the draft response contains any of these, you are about to repeat the incident. Show the human the diff. Wait.

- "Let me clean this up…"
- "I'll simplify the structure…"
- "A more modern approach would be…"
- "Replacing the custom X with a standard Y…"
- "Removing the decorative element…"
- "Consolidating into a single component…"
- "Using a template pattern…"
- "Streamlining the markup…"
- "Bringing this in line with best practices…"

---

## Two affirmative duties

1. **Before any edit that touches a design surface, state what you intend to preserve.** One sentence, in-line with the plan: "Keeping the Leaflet map, HUD, canvas, and `[EVENT_ID]` sections; only changing X." This forces you to look before you cut.
2. **If a file is >500 lines and looks chaotic, that is a signal that it is carrying personality — not a signal to flatten it.** Ask before reducing.

---

## Pre-flight: orphaned WIP

Agents in a multi-repo workspace leave completed work uncommitted — the session ends before the ship loop. The next agent then builds on invisible foundations, or buries them.

Before editing a shared repo: `git status` and `git log -5 --oneline`. If there is uncommitted work that isn't yours, stop. Surface it. Do not "clean it up." Do not continue on top of it as if the working tree were yours alone.

---

## The test

Every changed line traces to the request. If you cannot point at the sentence that asked for a deletion, the deletion does not ship.
