---
name: skill-writing
description: >-
  How to add a skill to this practice — and when not to. Use when writing a new
  SKILL.md, expanding this repo, or tempted to install a 100-skill pack because
  it is trending. The description field is the trigger; a skill that does not
  change behaviour is an essay wearing YAML.
license: MIT
inspired-by:
  - https://github.com/anthropics/skills
  - https://github.com/obra/superpowers
---

# Skill Writing

> Awesome lists give an agent more knowledge. Good skills give the agent better behaviour.

Anthropic's Agent Skills format is the reference: a folder, a `SKILL.md`, YAML `name` + `description`, instructions below. Superpowers adds the missing law: **the skill must fire on context and change what the agent does next**, not sit in a catalogue.

This repo is a curated synthesis, not a marketplace. A new skill has to earn its folder.

---

## The bar

A skill ships here when all four are true:

1. **It has already failed in production** — a war story, a dated gotcha, a session that hurt. Wisdom with no receipt stays a playbook paragraph.
2. **It changes behaviour**, not knowledge. "Here are 40 React rules" is a handbook. "Do not declare UI done without exercising the flow" is a skill.
3. **It is not already covered.** Grep `skills/*/SKILL.md` for the job. If an existing skill would fire, extend it. Do not fork a synonym.
4. **It is loadable.** Frontmatter `description` states *what* and *when* in one breath, so an agent can match it without reading the body.

If you cannot write the `description` without listing ten unrelated verbs, you are stuffing a pack into one file. Split or refuse.

---

## Format (Anthropic, not a dialect)

```markdown
---
name: kebab-case-id
description: >-
  What it does. Use when [trigger]. Do not use when [anti-trigger].
license: MIT
---

# Title

> One line that is the whole skill if the rest is skipped.

## The rule
## The procedure
## Anti-patterns
## The test
```

- `name`: lowercase, hyphens, matches the folder.
- `description`: the trigger. Agents load skills from this field. Vague descriptions never fire; encyclopedic ones fire on everything and burn context.
- Body: procedure, not theory. Commands the agent can run. A test the human can use to see if the skill worked.
- Optional `inspired-by` / `source` URLs. Credit the idea. Do not paste upstream SKILL.md text — especially not CC-BY-SA or source-available document skills.

---

## When not to add one

| Temptation | Refuse because |
|---|---|
| Install Superpowers / Compound / gstack / Awesome Copilot wholesale | Conflicting loops, TDD-always vs 45-minute civic ships, slash-command sprawl, context burn |
| A 40-rule React/Next checklist | `axiom-design-core` + `design-dna` are the design law; vendor performance handbooks are optional reading |
| Domain dump (another CCTV, another IPTV, another chart) | Tactics live in the project that shipped them; this repo is behaviour |
| "Best practices" / "clean up" / "modernize" | That *is* the Codex Incident |
| A skill whose only job is to restate another skill | Merge the paragraph into the original |

**Ten excellent behavioural skills beat five hundred domain prompts.** This collection is allowed to grow; it is not allowed to become a second `wshobson/agents`.

---

## The test

After you write the skill, answer in one sentence each:

- When does an agent load this without being told the filename?
- What does it *stop* doing?
- Which existing skill did you check for overlap?
- What would we delete if this folder had to go?

If any answer is mush, it is not a skill yet.
