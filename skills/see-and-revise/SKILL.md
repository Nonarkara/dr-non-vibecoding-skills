---
name: see-and-revise
description: >-
  Screenshot a real UI change and critique it with vision against the design
  system, then revise. Use after any layout, spacing, type, color, or motion change.
license: MIT
---

# See and Revise

> The fastest design review is the one that never leaves the machine. A human's eyes are the most expensive QA tool in this practice — spend them on taste calls, not on catching the same eleven tells every time.

[`browser-as-t`](../browser-as-t/SKILL.md) verifies **behaviour** — did the click work, did the route load. It says plainly: *"A single render screenshot of the happy path is not this list."* [`human-walkthrough`](../human-walkthrough/SKILL.md) tests **usability** — can a real first-time user complete the task, once, before a major release. Neither one looks at a screenshot and asks *does this look right*. This skill is that missing pass: **appearance**, checked with the agent's own vision, on every user-visible change, without waiting for a human to notice.

---

## The rule

After any change that touches layout, spacing, type, color, or motion, capture it, actually look at it, critique it against the constraint ladder, fix the highest-severity finding, and re-check — capped at three rounds. A critique written from the code without opening the image is not this skill; it is a guess wearing this skill's name.

---

## The procedure

### 1. Capture

Use [`browser-use`](../browser-use/SKILL.md)'s screenshot discipline against the real deployed or dev URL — not a mockup, not a component in isolation. Match [`browser-as-t`](../browser-as-t/SKILL.md)'s standard widths so findings are comparable across sessions:

```bash
# Playwright, one command per width — this repo's design-extract tooling is
# already Playwright-based; the same runtime covers this.
npx playwright screenshot --viewport-size=1280,900 "$URL" /tmp/see-1280.png
npx playwright screenshot --viewport-size=768,1024  "$URL" /tmp/see-768.png
npx playwright screenshot --viewport-size=375,812   "$URL" /tmp/see-375.png
```

Capture every state the change touches — loaded, empty, error, loading — not just the happy path. A surface that looks impeccable full and ugly empty has only been half-reviewed.

### 2. Look — actually, not from memory of the code

Open the image. This is the step the skill lives or dies on: an agent that reasons about the screenshot from the diff it just wrote is grading its own homework from memory, not looking at the artifact. View the rendered PNG before writing a single finding.

### 3. Critique, in the vocabulary this practice already uses

Run the same verbs [`no-design-tells`](../no-design-tells/SKILL.md)'s Delivery Gate and [`design-registers`](../design-registers/SKILL.md) already adopted from `pbakaus/impeccable` — **audit → critique → polish / bolder / quieter / distill** — so a finding here reads the same as a finding anywhere else in this practice:

| Check against | What you're looking for |
|---|---|
| [`axiom-design-core`](../axiom-design-core/SKILL.md)'s constraint ladder | Layer violations: an off-system color, a fifth type size, a shadow where a hairline belongs, motion with no state behind it |
| [`no-design-tells`](../no-design-tells/SKILL.md)'s Hard Gate | The mechanical tells: generic font stack, default Tailwind spacing untouched, a component that looks like every other generated app |
| [`design-registers`](../design-registers/SKILL.md)'s floor/ceiling | Is this surface's register consistent with its stated floor — a dashboard held to dashboard rules, not landing-page taste bleeding in |
| The Figma source, when one exists | Fidelity: did the build match the spec, not just "does it look fine on its own" — see step 3b |

Write findings the way [`claudex-loop`](https://github.com/chaseai-yt/claudex-loop) structures them, since the discipline already lives in this repo's [`agent-relay`](../agent-relay/SKILL.md): each finding gets a severity, a concrete location, and a fix — not a vibe.

### 3b. Fidelity check against a Figma source (when one exists)

If the surface has a Figma design file, use Figma's **Dev Mode MCP server** rather than eyeballing a static export — it reads the actual component structure, variables, and layout data, and is supported directly in Claude Code:

```
1. In the Figma desktop app: open the file, switch to Dev Mode (Shift+D),
   enable the desktop MCP server in the inspect panel — it runs locally at
   http://127.0.0.1:3845/mcp.
2. Point the MCP-connected agent at the frame in question; it returns
   components, variables, and layout data directly, not a screenshot to
   re-derive them from.
3. Compare: does the built surface's spacing/type/color match the design's
   variables, or did something drift during implementation?
```

The Figma file is ground truth for *this specific build's fidelity*, not a license to copy an unrelated design — the [`ux-archaeology`](../ux-archaeology/SKILL.md) "steal patterns, not pixels" discipline still governs any source that isn't your own team's spec. Treat this step as optional infrastructure: most changes have no Figma source, and the vision critique in step 3 runs with or without it.

### 4. Revise — smallest fix, highest severity first

Match [`design-registers`](../design-registers/SKILL.md)'s modernization order: typography, spacing, color calibration, motion, then composition. Full block replacement is last resort and needs explicit scope, same as that skill already states. Fix one finding at a time when findings compound — a spacing fix that also happens to fix a color problem is luck, not method.

### 5. Re-capture and re-check — capped at three rounds

Re-run step 1 for the changed surface, then step 3. Stop when either is true:

- **Clean pass.** No material finding at the current round. Ship it.
- **Three rounds reached.** Report the remaining findings and your position, same as [`agent-relay`](../agent-relay/SKILL.md)'s convergence rule — a fourth round on the same surface is preference churn, not a real defect hunt.
- **A taste call, not a defect.** If a finding is genuinely a judgment question — not "this violates the constraint ladder" but "which of two valid directions is better" — stop and ask. This skill closes the loop on *known* rules; it does not have taste of its own to substitute for the human's.

---

## What this does not replace

- **Not [`browser-as-t`](../browser-as-t/SKILL.md).** That skill still owns behaviour — does the click work, does the route load, do error states show. This skill owns appearance. Run both; neither substitutes for the other.
- **Not [`human-walkthrough`](../human-walkthrough/SKILL.md).** That is a pre-release, multi-persona usability pass with a real nontechnical human in the loop (the Mama Rule). This skill is per-change, and the entire point is that it runs *without* a human. It does not replace the Mama gate before a major release.
- **Not a substitute for the constraint ladder itself.** [`axiom-design-core`](../axiom-design-core/SKILL.md) is the source of truth for what good looks like; this skill is the loop that checks a specific build against it. Don't invent new rules mid-critique — cite the existing ones.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Critiquing from the diff instead of the rendered image | The whole value of this skill is vision on the actual artifact — a critique from memory of the code is a guess |
| Unbounded revision rounds | Three rounds and stop, per the convergence rule above — an agent asked to keep finding things always will |
| Treating a clean visual pass as proof of behaviour | This skill checks appearance only. Run `browser-as-t` too |
| Guessing at a taste call instead of stopping | Not every finding is a rule violation; some are legitimate judgment calls that belong to the human |
| Skipping the standard viewport widths | A fix that looks right at 1280 and breaks at 375 is not a fix, per `browser-as-t`'s own hit-testing widths |
| Using Figma MCP as a license to copy an unrelated design wholesale | The fidelity check is for your own team's spec; `ux-archaeology`'s pattern-not-pixel discipline still applies to anything else |
| Inventing new critique vocabulary instead of the adopted audit/polish/critique verbs | Consistency across this practice's design skills is the point — a finding here should read like a finding anywhere else |

---

## The test

Point at the screenshot, the specific finding in the shared audit vocabulary, the fix, and the re-screenshot that confirms it — and be able to say no human looked at any of those images before you shipped. If any step happened from reasoning about code rather than looking at a rendered image, the loop did not close; it only looked like it did.
