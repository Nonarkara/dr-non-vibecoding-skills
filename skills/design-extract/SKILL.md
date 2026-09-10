---
name: design-extract
description: >-
  Extract design tokens from a public URL using dembrandt, design-extract,
  or firecrawl. Use to study a public design for inspiration, then apply
  its patterns through ux-archaeology.
license: MIT
---

# Design Extract

> A public design is not a thing to copy. It is a thing to study. The right tool turns a URL into tokens + structure + a DESIGN.md, and the right discipline turns those into patterns you can rebuild — never pixels you can paste.

[`ux-archaeology`](../ux-archaeology/SKILL.md) is the *discipline* of borrowing patterns from prior art without copying pixels or secrets. This skill is the *operational step* of that discipline: given a URL and a question, run the right extraction tool, get the right output format, hand the result to `ux-archaeology` for the application.

The skill is **the orchestrator, not the runner**. dembrandt, design-extract, firecrawl are the runners; this skill says which one to use, in what order, with what guardrails. The catalog of tools is at [`reference/design-extractors.md`](../../reference/design-extractors.md). This skill is the workflow; the reference is the data.

---

## The decision tree

The first question is not "which tool" — the first question is "what am I trying to learn?" The answer to that question is the answer to the tool choice. Three questions cover most cases:

| I want to learn… | Tool | Output format | Time |
|---|---|---|---|
| The complete design system of a competitor (colors, type, spacing, components) | **dembrandt** | `DESIGN.md` + W3C tokens + Tailwind config | 60-90s |
| The design language + accessibility + responsive + interaction states | **design-extract** (designlang) | Tailwind + Figma + shadcn themes | 90-120s |
| The information architecture + content structure (not visual) | **firecrawl** | Clean markdown + structured data | 30-60s |
| Both the design system and the inferred data model from one URL | **deepclonewebsite** | DESIGN.md + data model sketch | 120-180s |
| A personal offline copy of the site for study | **HTTrack** | Mirrored directory | minutes (large sites) |

The first three are the high-frequency case. The fourth and fifth are the niche. The decision is **based on the next step in the workflow**, not the tool's feature list. If the next step is "feed this into axiom-design-core," use dembrandt for the `DESIGN.md`. If the next step is "feed this into a shadcn theme generator," use design-extract. If the next step is "feed this into data-catalog," use firecrawl.

---

## The protocol

Five steps. Skip none.

### 1. Verify the URL is fair game

Before any extraction, the operator or the agent must answer: **do I have the right to study this design?** Three tests, in order:

- **Is it my own site, or do I have explicit permission?** Run the tool freely. The output is internal study material.
- **Is it a public site with no ToS prohibition on study?** Run the tool, but the output is **personal study only** — never republish, never reskin wholesale, never paste a screenshot into a paid product.
- **Is it a competitor's site that is interesting but not mine?** Run the tool, but **strip every identifier** (logo, brand name, copyright, product copy) before applying any pattern. The pattern is what you take; the identity is not.

A fourth test — *is the design genuinely interesting and not a well-known template?* — saves time. A Bootstrap or Tailwind UI Kit site is not worth a study session; the design is documented elsewhere.

### 2. Choose the tool

Apply the decision tree. The most common case is "I want the design system" → dembrandt. The second most common is "I want the information architecture" → firecrawl. The other tools are for when those two fail.

When in doubt, **default to dembrandt**. It is the most balanced, the output is the most compatible with this repo's design skills, and the runtime is the shortest.

### 3. Run the tool

The exact command depends on the tool. All three of the high-frequency tools have a one-command CLI:

```bash
# dembrandt — outputs a DESIGN.md
npx dembrandt <url> --output ./extracted/<domain>

# design-extract (designlang) — outputs Tailwind + Figma + shadcn
npx designlang <url> --design-system --output ./extracted/<domain>

# firecrawl — outputs clean markdown + structured data
npx firecrawl <url> --markdown --output ./extracted/<domain>.md
```

The output directory is `./extracted/<domain>/` and the directory is **gitignored by default**. The output is study material, not source code. It is not committed unless the operator explicitly chooses to commit a specific design-language file (see step 5).

### 4. Read through `ux-archaeology`

The extracted file is the input to [`ux-archaeology`](../ux-archaeology/SKILL.md). The reading is the discipline: the file is *study material*, not a copy target. The agent reads the file, identifies the patterns worth borrowing (one typography decision, one spacing rhythm, one color-system choice), and writes a **design-language note** at `docs/design/influences/<domain>-<date>.md`. The note names the source, names the pattern, names the application. The note is what gets committed; the extraction is not.

If no patterns are worth borrowing — and this happens more often than expected — the file is deleted, the design-influence note is *not* written, and the extraction cost was the only cost.

### 5. Commit the note, not the extraction

The discipline is the difference between a study session and a copy. The committed artefact is the note (`docs/design/influences/...md`); the extracted file lives in `./extracted/` and is regenerated on demand. The repo contains the team's **judgment** about the design, not the design itself.

A team that commits the extracted file is a team that has confused study with stealing. A team that commits only the note is a team that is using the tool correctly. The check at the bottom of this skill is the gate.

---

## What the skill is *not*

**It is not `ux-archaeology`.** `ux-archaeology` is the *discipline*; this skill is the *operational step*. The discipline says "steal patterns, not pixels"; this skill says "use dembrandt for the design system, firecrawl for the data, design-extract when you need shadcn." They are designed together but they are not the same thing.

**It is not a license to copy.** Every tool in the catalog operates on the publicly rendered DOM. The output is the public frontend, not the proprietary backend. The output is study material under the law of fair use for personal study; it is not a license to republish or reskin wholesale. The legal and ethical frame is in [`ux-archaeology`](../ux-archaeology/SKILL.md) and in the license terms of each tool.

**It is not a substitute for the design system the team already has.** A team that runs `design-extract` on a competitor every week is a team that is borrowing instead of building. The team's design system ([`axiom-design-core`](../axiom-design-core/SKILL.md) + [`design-dna`](../design-dna/SKILL.md)) is the source of truth; the extracted file is a check on whether the team's choices are still defensible. The cadence is monthly, not weekly.

**It is not a tool installer.** This skill does not install dembrandt, design-extract, or firecrawl. The tools are `npx`-run; the first run downloads them. The skill describes the *workflow*; the tool installation is a side effect of the first `npx` call.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The protocol | [`ux-archaeology`](../ux-archaeology/SKILL.md) | The discipline says "steal patterns, not pixels"; this skill is the operational step that produces the input to the discipline. |
| The decision tree | [`axiom-design-core`](../axiom-design-core/SKILL.md) | The output of dembrandt is most useful when it can be compared to the team's existing constraint ladder. |
| The note output | [`design-dna`](../design-dna/SKILL.md) | The design-influence note is one row in the design-DNA log; the pattern is named, the source is named, the application is named. |
| The extract directory | `.gitignore` | The extraction is gitignored by default; the note is what gets committed. |
| The firecrawl path | [`data-catalog`](../data-catalog/SKILL.md) | When the next step is studying information architecture rather than visual design, the data-catalog is the right home for the structured output. |
| The catalog | [`reference/design-extractors.md`](../../reference/design-extractors.md) | The skill is the workflow; the reference is the data. The skill points at the reference, the reference points at the skill. |

---

## The check

```
□ The URL passed the three right-to-study tests before any extraction ran
□ The tool was chosen from the decision tree, not by guessing
□ The extraction output is in ./extracted/<domain>/, which is gitignored
□ The extraction is read through ux-archaeology, not pasted
□ A design-influence note was written to docs/design/influences/ — or the extraction was discarded
□ The note names the source, names the pattern, names the application
□ The extracted file is NOT committed
□ A team that commits the extracted file is using the skill wrong
```

Pairs with [`ux-archaeology`](../ux-archaeology/SKILL.md) (the discipline), [`axiom-design-core`](../axiom-design-core/SKILL.md) (the constraint ladder the note is checked against), [`design-dna`](../design-dna/SKILL.md) (the log the note is one row in), and [`reference/design-extractors.md`](../../reference/design-extractors.md) (the catalog of tools this skill orchestrates).
