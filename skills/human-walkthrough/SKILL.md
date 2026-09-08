---
name: human-walkthrough
description: >-
  Multi-persona user test via a real browser — first-time, second-time, and
  extreme user. Use to find missing links, edge cases, and produce a roadmap
  for recreating the system.
license: MIT
---

# Human Walkthrough

> A screenshot is appearance. A test from a single persona is a single point. The system has to survive three people with three different goals, and the gaps between what they find and what was intended are the blueprint for what to rebuild.

This is the structured, multi-persona, browser-driven user test. It is the missing layer between [`browser-as-t`](../browser-as-t/SKILL.md) (verification — "did the change ship?") and `ux-archaeology` (pattern extraction — "what did the prior art do?"). It assumes a working build and a real URL, opens the system through a browser tool, walks it as three different users, and produces a **blueprint** for what to rebuild and a **roadmap** for the order to do it in.

It is the human-in-the-loop substitute for a usability test that has no humans. The personas do not exist, but the walkthrough is rigorous: every action passes the four-question cognitive-walkthrough test (Wharton, Rieman, Lewis, Polson), and the gaps are filed by severity.

Influences: Nielsen's heuristic evaluation, Wharton's cognitive walkthrough, Bias's pluralistic walkthrough, Krug's "don't make me think" / rocket surgery, Cooper's personas, the GOV.UK service standard.

---

## The three personas

The walkthrough is run **three times in series**, each time as a different persona. The personas are not made up — pick a real segment of your actual user base. The point is to surface different bugs from different expectations, not to roleplay.

### Persona 1 — the first-time user

A real newcomer. No mental model. Reads everything because nothing is obvious. Will hit every empty state, every error, every "where do I go next" moment.

**Mental model at start:** "I have a goal, the system is a black box, and I have to find the path by clicking things."

**What they will find that the team did not:** the onboarding that is missing, the link that should be there, the "I don't know what to do here" state that the team forgot to design.

### Persona 2 — the second-time user

A returning user with a working mental model. Knows where the main features live. Is here for a specific task, not exploration. Has expectations about speed, history, and shortcuts.

**Mental model at start:** "I came back for X, the path I took last time should still work, and there should be a way to do it faster."

**What they will find that the team did not:** the feature that broke since last time, the slow path that could be a shortcut, the lack of history, the export that does not exist, the keyboard shortcut the team forgot to add.

### Persona 3 — the extreme user

A user who is either adversarial, an edge-case data type, or a power user trying to do something the system was not designed for. Deliberately pokes inputs, abuses boundaries, and looks for the way the system breaks.

**Mental model at start:** "What happens if I do this, then this, then this."

**What they will find that the team did not:** every error state, every validation gap, every performance cliff, every accessibility issue, every security hole, every "what if the input is in Thai" moment.

The three personas, in this order, surface **complementary** findings. The first-time user finds the missing onboarding. The second-time finds the missing power features. The extreme user finds the missing error states. A walkthrough that uses only one persona finds only one class of bug.

---

## The protocol

Each persona runs the same protocol. The protocol is the cognitive walkthrough's four questions, applied at every step of the journey.

### 1. Define the scenario

A written scenario: who the user is, what they came to do, the starting state, the goal state. One paragraph. Pick a scenario that exercises a critical path — the things the system *has* to do well, not the things it does incidentally.

Example: "A new resident opens the flood dashboard on their phone, in portrait, on a slow connection. They want to know if their district is at risk in the next 6 hours. They have not used the dashboard before."

### 2. Open the system

Open the URL in a real browser, not a screenshot. Use the browser tool. Take a snapshot of the starting state. Confirm the screen the persona actually sees, not the screen the design file claims they see.

### 3. Walk the journey one action at a time

For each action, ask the four questions, in order, for the persona:

1. **Will they try to achieve this result?** Do they understand that *this* action is needed to reach their larger goal, or are we assuming a goal they have not formed?
2. **Will they notice the correct action is available?** Is the control visible, findable, in the place they would look?
3. **Will they associate the correct action with the result they want?** Even if they see it, do they understand the label — will they know to engage with it?
4. **After the action, will they see that progress was made?** Does the system respond, or does it stay silent and leave them guessing?

If any answer is "no" or "maybe," the step is a **failure point** for the persona. Log it.

### 4. File every failure point

For each failure point, record:

- **Persona** (1 / 2 / 3)
- **Step** in the journey
- **Which of the four questions broke down** (1, 2, 3, 4)
- **What the persona saw** (screenshot or quote)
- **Severity**: 0 cosmetic, 1 minor, 2 major, 3 catastrophe (Nielsen's scale)
- **Effort to fix**: S / M / L
- **Recommended fix**: the smallest change that would make the answer "yes"

### 5. End with a verdict and a one-sentence summary

Per persona, per scenario:

- **Did the persona complete the goal?** (yes / gave up / succeeded-but-misled)
- **The single biggest failure** in this run
- **One thing the system does well** (so the next walkthrough balances its framing)

---

## The web-browsing workflow

The walkthrough runs through a browser tool. The exact tool is host-specific (Playwright, the Mavis browser, a headless Chrome driver), but the discipline is the same:

1. **Use a clean profile.** No logged-in state from a previous session. No cookies. No extension cookies. The persona is a first-time user; treat the browser as theirs.
2. **Throttle to a realistic connection.** A 4G profile or a slow-WiFi profile. The first-time persona will not be on your office fibre; the system must work on their connection.
3. **Take a snapshot at every step.** Not for the screenshot — for the *diff* between what the persona saw and what the design file claims they should see. A snapshot at the wrong screen is a failure point.
4. **Capture the console.** Errors, warnings, deprecations. The extreme persona will surface these; the first-time persona will not notice them, but they affect everyone.
5. **Capture the network.** Slow endpoints, failed requests, redirect chains, CSP violations. The second-time persona will notice the slow page; the first-time persona will not.
6. **Do not auto-correct.** If the persona hits a missing link, do not click the next likely target. The finding is the missing link. The system has to ship the fix, not the agent.

The browser tool's job is to be the *eyes* and *hands* of the persona, not the *judgement* of the agent. The judgement is the four questions, applied honestly.

---

## The output — blueprint and roadmap

After the three runs, write two documents.

### The blueprint: `docs/walkthroughs/YYYY-MM-DD-blueprint.md`

```markdown
# <system name> — walkthrough blueprint

## Scope
- The three scenarios walked
- The browser profiles used (clean + 4G throttle + console capture)
- The date and the build/commit walked

## Findings by persona
### Persona 1 (first-time)
- <failure points, severity, fix>

### Persona 2 (second-time)
- <failure points, severity, fix>

### Persona 3 (extreme)
- <failure points, severity, fix>

## Patterns across personas
- The 3–5 themes that came up under all three walks
- The issues that affect one persona but not the others
```

### The roadmap: `docs/walkthroughs/YYYY-MM-DD-roadmap.md`

```markdown
# <system name> — walkthrough roadmap

## Now (S effort, severity ≥ 2)
- The fixes that are cheap and address catastrophe-level issues

## Next (M effort, severity ≥ 1)
- The fixes that take a sprint and address major issues

## Later (L effort, severity ≥ 0)
- The improvements that take longer and address cosmetic issues

## Never (severity 0, but interesting)
- The findings that the team will not fix but should know about
```

The "Never" section is important. The walkthrough surfaces more findings than any team can fix. The roadmap's job is to be honest about which ones will and will not be addressed. Filing a finding as "Never" with a reason is more useful than silently dropping it.

---

## What this skill is not

**It is not a substitute for real user testing.** The personas are imagined. The findings are real, but the priorities are the team's, not a sample of users'. Run a real test (5 users, 30 minutes each, per the GOV.UK service standard) when the question is "will real users use this."

**It is not a security audit.** The extreme persona finds *some* security issues, but a walkthrough is not adversarial testing. For that, use a real pen test or `appsec-stack`.

**It is not a one-time event.** The walkthrough is most valuable run on a *recurring* schedule — before each major release, after each significant refactor, and as part of the "is the system actually doing what we think" quarterly check. Schedule it before the team thinks they need it, not after.

---

## Pairing with the rest of the stack

| This skill | Pairs with | Why |
|---|---|---|
| The walkthrough itself | [`browser-as-t`](../browser-as-t/SKILL.md) | `browser-as-t` verifies a change; this skill explores the system as a whole |
| The failure points | [`wrong-green`](../wrong-green/SKILL.md) | A "looks fine on the screenshot" finding is a `wrong-green` finding until tested |
| The blueprint | [`data-display`](../data-display/SKILL.md) | The walkthrough findings charted honestly, with severity × frequency, not as a feel-good list |
| The roadmap | [`planning-discipline`](../planning-discipline/SKILL.md) | The roadmap is a `planning-discipline` artefact with a defined scope, evidence, and acceptance |
| The recurring schedule | [`full-stack-bootstrap`](../full-stack-bootstrap/SKILL.md) | The walkthrough can be a step in the bootstrap flow for a brand-new project |
| The "what the persona saw" | [`ux-archaeology`](../ux-archaeology/SKILL.md) | When the walkthrough surfaces a known pattern, `ux-archaeology` finds the source |
| After the year of patches | [`power-of-hindsight`](../power-of-hindsight/SKILL.md) | Walkthrough findings are a Collect signal; hindsight is when the patches become a reconstruct |
| Closing the session | [`result-honesty`](../result-honesty/SKILL.md) + [`lesson-residue`](../lesson-residue/SKILL.md) | Four buckets and one lesson for *this* walk; hindsight is the year of them |

---

## The check

```
□ A clean browser profile was used (no logged-in state from prior sessions)
□ The network was throttled to a realistic connection profile
□ The console and the network were captured on every step
□ Every step passed (or failed) the four cognitive-walkthrough questions
□ Failure points are filed with persona, step, question, severity, effort, and fix
□ The blueprint lists patterns that came up under all three walks
□ The roadmap explicitly says "Never" for findings the team will not address
□ The walkthrough is on a recurring schedule (before each major release, not "when we get to it")
```

Pairs with [`browser-as-t`](../browser-as-t/SKILL.md) (the verification counterpart — `browser-as-t` checks that a change shipped, this skill checks that the system *as a whole* still works), [`no-design-tells`](../no-design-tells/SKILL.md) (the design discipline the walkthrough enforces), [`dashboard-discipline`](../dashboard-discipline/SKILL.md) (the product-UI floor the walkthrough holds the system to), and [`planning-discipline`](../planning-discipline/SKILL.md) (the spec-first protocol the roadmap follows).
