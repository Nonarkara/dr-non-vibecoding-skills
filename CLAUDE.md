> **Read [ANTI-SLOP.md](ANTI-SLOP.md) before any design or frontend work.** These are Dr Non's hard rules against AI design slop: empty space is a decision, subtract before you add, and the map comes first. The shared core is [Non-Slop](https://github.com/Nonarkara/Non-Slop). Run `tools/slop-lint.mjs` and `npx -y github:Nonarkara/Non-Slop render <url>` on any page you ship.

# CLAUDE.md — entry point for Claude-based agents

This repo's canonical instructions are [`AGENTS.md`](AGENTS.md). This file exists
because `AGENTS.md` names `CLAUDE.md` as the Claude entry point, and a contract
that names a file which does not exist is the exact failure
[`skills/harness-hardening`](skills/harness-hardening/SKILL.md) was written for.

It is a pointer, not a parallel contract. Do not author rules here that belong in
`AGENTS.md` — mirrors drift, and the drift is always discovered late.

## Before your first edit

**Check whether you are a relay leg, not a fresh author:**

```bash
scripts/relay.sh status        # who held the baton last, and whether the chain converged
```

If a leg is closed and unruled, you are the next leg. Read
[`skills/agent-relay/SKILL.md`](skills/agent-relay/SKILL.md) first. The short form:
read the **diff** of the previous leg before its summary, rule on it (`confirm` /
`correct` / `reject`, with a file:line), then add your own work. Two consecutive
legs with zero corrections and the chain is done.

The standing constraints for the current chain are in the header of
[`docs/relay/RELAY.md`](docs/relay/RELAY.md). Read that block before touching
anything — it carries the constraints that a handoff would otherwise lose.

## What this repo is

The meta layer: skills, playbooks, references, and templates for shipping with
agents. No runtime, nothing to compile. Counts live on eleven surfaces and
`make validate` is the only authority — never hand-edit one of them.

## Anti-regression

This repository's distinctive parts are load-bearing and get flattened by
well-meaning cleanup. Before removing or "simplifying" any of these, say out loud
what replaces them:

- **Named incidents.** Every rule is paired with something that actually happened.
  Do not add a rule without one, and do not invent one to fill the slot. An
  invented statistic has already been shipped here once and reverted — see leg 02
  in [`docs/relay/RELAY.md`](docs/relay/RELAY.md).
- **The four shapes.** `skills/` (standing instructions), `playbooks/` (the
  reasoning), `reference/` (stable recipes), `templates/` (drop-in files). Content
  that belongs in one does not get duplicated into another.
- **The voice.** Production-tested, plain, humble, bilingual Thai–English. The
  repo ships [`no-ai-tells`](skills/no-ai-tells/SKILL.md); prose that violates it
  in this repo is a defect, not a style preference.
- **Count surfaces.** Eleven files carry the skill / playbook / reference /
  template counts. `make validate` is the authority.

## Before you claim done

```bash
make validate                  # counts, links, plugin packaging, description budget
scripts/relay.sh check         # every leg ruled on the one before it
```

Then report in [`skills/result-honesty`](skills/result-honesty/SKILL.md) buckets:
succeeded / failed / skipped / unverified.

## Anti-slop design rules (hard rules)

These are known AI design-slop patterns. Never re-create them. Check every page before shipping; fix any hit. They sit on top of Palette and any map-first rule.

1. **Boxes fit their content.** No text box, card, button or panel much wider or taller than its text. Padding follows type size (~0.5–1.5× line height). No fixed/min heights that leave empty space under short text.
2. **Balanced composition.** Deliberate grid; visual weight balanced. No heavy side with an empty side, no orphan block. Squint-test at desktop, tablet and phone.
3. **Readable line length (A4/A5).** Body ~45–75 characters (ideally 60–70); CSS `max-width: 65ch`. Thai/Chinese keep the same physical measure (~30–45 Chinese chars). Wide screens get columns or margins, never full-width paragraphs.
4. **No AI-slop fonts.** Banned as primary: Inter, Poppins, Montserrat, Roboto, Open Sans, Lato, DM Sans, Space Grotesk, Geist, Plus Jakarta Sans, Manrope, Nunito, system-ui-as-design-font. Prefer Bauhaus/Bayer Universal lookalikes: **Jost** first, Josefin Sans or League Spartan for display, Prompt or Kanit for Thai; matching geometric sans for Chinese. At most two families per product.
5. **No lazy ornaments.** No decorative boxes, borders, cards, dividers, blobs, gradients, glows or icon tiles only to fill or "balance". Every container groups things that belong together; if removing it loses no meaning, remove it. No emoji-as-icons, decorative stock icons, or generic gradient heroes.
6. **Clear hierarchy: something must win.** One obvious first look (hero number, map, headline), then second and third. Real contrast in size (≥1.5–2× type step), weight, colour and space. No equal-weight card grids. Squint-test must show a focal point.
7. **More slop to kill.** Centre-everything / symmetric card grids by default; fake depth (stacked shadows, glassmorphism, same radius everywhere); vague slogan heroes; filler copy ("Unlock the power…", "Seamless", "Revolutionize") and fake stats; too many colours (one meaningful accent); thick chrome that shrinks content; icons/badges on every line; dense same-size grey text.

**Pre-ship:** screenshot at 1440 / 1024 / 390; list hits against 1–7; fix; re-screenshot; different agent/person reviews — never self-review.
