# 11 — CLOSE THE LOOP

> **Ship is not the end. A screenshot is not a user test.** Walk > Learn > Reconstruct. The system has to survive three people with three different goals.

The page is two horizontal flows. The top is the **walk** — three personas run the same scenario through the same four-question protocol. The bottom is the **learn** + **reconstruct** — power of hindsight, in three phases. The two flows meet at the same output: a system that knows what it is.

![CLOSE THE LOOP — human walkthrough + power of hindsight](../../infographics/pages/page-11.png)

---

## The walk — three personas, four questions

The skill [`human-walkthrough`](../../skills/human-walkthrough/SKILL.md) replaces a usability test that has no humans. The agent opens the system through a real browser and walks it as three different users, one after another.

The three personas are not made up. Each represents a real segment of the user base. The point is to surface different bugs from different expectations, not to roleplay.

| Persona | Mental model at start | What they find that the team did not |
|---|---|---|
| **FIRST-TIME** — no prior model | "I have a goal, the system is a black box, I'll click until something happens." | The onboarding that is missing, the link that should be there, the empty state the team forgot to design. |
| **SECOND-TIME** — returning with a model | "I came back for X, the path I took last time should still work." | The broken feature, the slow path, the missing shortcut, the missing history, the missing export. |
| **EXTREME** — adversarial or power | "What happens if I do this, then this, then this." | Every error state, every validation gap, every perf cliff, every accessibility issue, every security hole, every "what if the input is in Thai" moment. |

The three are **complementary**. The first-time finds the missing onboarding. The second-time finds the missing power features. The extreme finds the missing error states. A walkthrough that uses only one persona finds only one class of bug.

The four questions come from Wharton's cognitive walkthrough (Wharton, Rieman, Lewis, Polson, 1994), applied at every step of the journey:

1. **Will they try to achieve this result?** — do they understand *this* action is needed?
2. **Will they notice the correct action is available?** — is the control visible, findable, in the place they would look?
3. **Will they associate the correct action with the result they want?** — do they understand the label?
4. **After the action, will they see that progress was made?** — does the system respond?

A "no" or "maybe" on any of the four is a **failure point** for the persona. The findings are filed with the persona, the step, the question that broke down, the severity, the effort to fix, and the recommended fix.

## The output — Now / Next / Later / Never

The "Output" box on the page is the discipline that makes the walkthrough not a wish list. Every finding lands in one of four buckets, with a reason.

- **NOW** — small effort, severity ≥ 2. The fixes that are cheap and address catastrophe-level issues. Ship this week.
- **NEXT** — medium effort, severity ≥ 1. The fixes that take a sprint. Ship this quarter.
- **LATER** — large effort, severity ≥ 0. The improvements that take longer. Schedule.
- **NEVER** — severity 0, but interesting. The findings the team will not fix, with a reason. Filing as "Never" is more useful than silently dropping.

The "Never" section is load-bearing. A walkthrough surfaces more findings than any team can fix in a quarter. The roadmap's job is to be honest about which ones will and will not be addressed.

## The learn — three personas × the four questions × the three phases of hindsight

The bottom row is the **learn** part of the loop. After the walkthrough, the data enters the hindsight skill.

The skill [`power-of-hindsight`](../../skills/power-of-hindsight/SKILL.md) is the data-driven retrospective. Three phases:

### COLLECT — every signal

Every dashboard is a data-collection window. Every user action, every error, every deploy, every config change, every operator note. The "no data left behind" rule is load-bearing: if a log line might be useful in six months and costs nothing to keep, keep it.

The data contract is written down at the project root. The "what we never log" section (plaintext secrets, plaintext PII) is non-optional — that's what makes the data discipline sustainable in a regulated environment.

### ANALYZE — signal vs noise

The statistical methods are standard; the discipline is using them on your own product:

- **Did this change actually move the metric?** — control chart (Shewhart), pre/post with confidence interval. The single most important question in hindsight.
- **What was the counterfactual?** — causal inference from observational data, propensity matching, A/B holdout. "What would have happened if we hadn't shipped X."
- **Which users were affected and how?** — cohort analysis, funnel analysis, segmentation.
- **What pattern of errors preceded the outage?** — time-series clustering, anomaly detection on error rates.
- **Where did the system surprise us?** — surprise metrics: actual − predicted, signed and bucketed.
- **How did the system change?** — drift detection on distributions, version-pair diffs.

The methods are not the hard part. The hard part is **asking the question in the first place**. Put a quarterly "what does the data say we should rebuild" review on the calendar before the system stabilises, not after.

### RECONSTRUCT — from what works

The third phase is the one most teams skip. The data shows you which parts of the system carry weight, which parts are vestigial, and which parts were never right. The next step is to **rebuild the parts that carry weight from first principles, with the rationale now known**.

The reconstruction is not a rewrite. It is targeted:

- A module is touched by 80% of incidents and is the densest patch → rewrite it from first principles, with the incidents as the test cases.
- A pattern was imported from three different repos and the seams leak → replace the three with one internal package.
- A feature was built under deadline and the data shows nobody uses it → remove it.
- A dashboard is always open during incidents → promote it to a Tier-2 surface.
- A config was set in week one and never re-examined → audit it.

The criterion for a good reconstruction: a new engineer can read the codebase and find a coherent story for why each major piece exists. That is what hindsight gives you. The original patchwork did not have it.

## The loop

The two flows close:

```
walk → learn → reconstruct → (back to the original system, with a clean version)
```

The walk surfaces findings. The learn turns the findings into data. The reconstruct turns the data into a system whose rationale is known. The next walk starts on the clean version, and finds different findings, and the loop continues.

The Frankenstein phase (page 01's "taste + memory out of your head") is the **absence** of this loop. The loop is what ends the Frankenstein phase. A system that walks itself, learns from what it finds, and reconstructs the parts that carry weight is a system whose operator is no longer re-deriving the architecture from memory.

## What to do with this

- **Before every major release, run the walk.** Three personas, four questions, four buckets. Output: a blueprint and a roadmap.
- **Every quarter, run the learn.** Pick the retrospective questions the data can answer. Schedule them before the data is needed.
- **When the learn shows a module is the densest patch, run the reconstruct.** The reconstruction log (`docs/reconstructions/...`) is the artefact that prevents the next Frankenstein.
- **When the "Never" list grows, the design system is failing.** A long "Never" means the team is finding the same tells again and again. The fix is upstream, in the design DNA, not in the walkthrough.

## Pairs with

- **Before → [08 — DESIGN DNA](08-dna.md).** The DNA is the brief. The walk is the test of the brief.
- **After → [12 — SHIP](12-ship.md).** The close is the system. The ship is the sentence.
- **Skills:** [`human-walkthrough`](../../skills/human-walkthrough/SKILL.md) (the walk), [`power-of-hindsight`](../../skills/power-of-hindsight/SKILL.md) (the learn + reconstruct), [`production-spine`](../../skills/production-spine/SKILL.md) (the maturity label the public deploy earns), [`wrong-green`](../../skills/wrong-green/SKILL.md) (the discipline that the walk re-checks at every release).
- **Reference:** the `docs/data-contract.md` template is in [`skills/power-of-hindsight/SKILL.md`](../../skills/power-of-hindsight/SKILL.md). The reconstruction-log template is in the same file.

**Source.** The two flows are [`skills/human-walkthrough/SKILL.md`](../../skills/human-walkthrough/SKILL.md) and [`skills/power-of-hindsight/SKILL.md`](../../skills/power-of-hindsight/SKILL.md), with the Wharton et al. (1994) cognitive-walkthrough origin noted inside both.
