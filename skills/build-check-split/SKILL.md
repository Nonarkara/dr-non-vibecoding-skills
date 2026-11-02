---
name: build-check-split
description: >-
  Let a different agent decide whether work is shippable. Use before merge on
  UI, games, or 3D. Do not treat the author's own review as the gate.
license: MIT
---

# Build / check split

> One agent builds. A different agent checks. The author does not call it shippable.

A same-chat "review" by the model that wrote the change is a reread. Start a fresh session, hand it the diff and the spec, and do not include a speech about why the change is fine. [`adversarial-review`](../adversarial-review/SKILL.md) is that stance. This skill is which gates must be that person.

## Who ticks the box

| Gate | Who | When |
|---|---|---|
| [`adversarial-review`](../adversarial-review/SKILL.md) | A different agent | Any merge that changes behavior |
| [`msh-gate`](../msh-gate/SKILL.md) | A different agent | Any UI, HUD, map chrome, or flyover frame |
| [`animated-games`](../animated-games/SKILL.md) playtest or recorded hash | A different agent | An animated game or sim |
| Phone budget in [`3d-flyover-walkthrough`](../3d-flyover-walkthrough/SKILL.md) | A different agent | A flyover, city twin, or GLB walk |
| [`human-walkthrough`](../human-walkthrough/SKILL.md) | A real older nontechnical user, then the three personas | A major release |

A different agent is not a substitute for the Mama Rule on a major release. The author may write the checklist. The author may not tick it.

## The procedure

1. Builder stops at "ready for check" and lists what was not run.
2. Checker gets the plan, the diff, and the commands. Not the builder's conclusion.
3. Checker pastes evidence: a failing case, a hash, a `map` measurement, a screenshot with widths, or an honest unverified bucket ([`result-honesty`](../result-honesty/SKILL.md)).
4. Merge waits until the required rows above have a name that is not the builder.

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| "I looked at it again" | That is the builder. |
| Skipping Mama Rule because a second model clicked through | The major-release gate is a person. |
| One reviewer for the hash and the prose who also wrote both | Split the check. |

## The test

```
□ The ship note names a checker who did not build the change?
□ UI went through msh-gate, games through the playtest or hash, 3D through the phone budget?
□ A major release names the human walkthrough, or says it was not done?
```
