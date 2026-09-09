# 01 — STACK

> **A written operating system for AI-assisted software shipping.**
> Plain markdown · No runtime · Agent-agnostic

**The system's secret is not the model.** It is the four shapes — **80 skills**, **15 playbooks**, **7 references**, **13 templates** — wired into one routing loop, with the count being a real number and not a marketing claim.

![STACK — the package at a glance](../../infographics/pages/page-01.png)

---

## The four shapes, not the four products

A new contributor usually reads the README, sees the table, and concludes there are four things to learn: skills, playbooks, references, templates. They spend a week bouncing between them.

There is one product. The four shapes are **four views of the same practice**, not four separate products:

- **Skills** are the standing instructions an agent loads — 69 `SKILL.md` files in `skills/`. Each is a one-decision change, with a trigger word, a test, and a body.
- **Playbooks** are the incidents and reasoning — 15 narratives in `playbooks/`. Why the skill exists, what it was born from, what was refused.
- **References** are the stable implementation details — 7 docs in `reference/`. APIs, stack picks, commit style, named references, security hygiene, hosting, payments/voice.
- **Templates** are the drop-in files — 12 in `templates/`. CLAUDE.md, AGENTS.md, deploy script, launchd plist, tunnel config, lesson doc, plus the workspace indexes and the env / gitignore / design-tokens starters.

The counts are deliberate. The validator enforces them. Adding a 70th skill bumps the description-character budget automatically; the gate keeps every addition honest.

## Plain markdown, no runtime, agent-agnostic

Three claims, one sentence each:

- **Plain markdown.** The collection is `.md` files with YAML frontmatter. No build step. No transpiler. The text on disk is the text the agent reads.
- **No runtime.** Nothing in this repo is a service, a daemon, or a library. There is no `npm install`. The skills are loaded by the host agent's discovery path; the templates are copied by hand or by `setup.sh`; the references are read on demand.
- **Agent-agnostic.** The same `SKILL.md` file is read by Claude Code, Mavis Code, Codex, ChatGPT Desktop, Cursor, Antigravity, OpenCode, Aider, Devin, Hermes, and the Gemini CLI. The convention is `name` + `description` + `license: MIT` in the frontmatter, and the description must include the word `Use` to be a valid trigger. See [`skills/skill-writing/SKILL.md`](../../skills/skill-writing/SKILL.md) for the full shape.

The contradiction the design resolves: **the practice has to be portable across every agent that comes and goes, and the only common layer is markdown.** That is why the load-bearing content is markdown, not code.

## The routing loop

The diagram on the right is a habit, not a diagram. The four nodes are:

```
SKILLS → SHIP → WALKTHROUGH → HINDSIGHT → RECONSTRUCT → (back to SKILLS)
```

Read each as a verb a human and an agent do together:

- **SKILLS** — install the standing instructions on the agent (`./setup.sh --become-builder`). The skills are the vocabulary.
- **SHIP** — write the next change, prove it on the live URL ([`ship-discipline`](../../skills/ship-discipline/SKILL.md) + [`deploy-verification`](../../skills/deploy-verification/SKILL.md)). The skills are inert until something ships.
- **WALKTHROUGH** — before a major release, run the multi-persona user test ([`human-walkthrough`](../../skills/human-walkthrough/SKILL.md)). Three personas find three different classes of bug.
- **HINDSIGHT** — after a year of patching, collect every signal and reconstruct the parts that carry weight from first principles ([`power-of-hindsight`](../../skills/power-of-hindsight/SKILL.md)). The Frankenstein phase has an end date in writing.
- **RECONSTRUCT** — back to SKILLS, but with a cleaner version of the system whose rationale is now known.

The loop is what makes the four shapes a **stack**. A library of 69 unconnected skills is a search problem. A loop where the output of one stage feeds the input of the next is a system.

## Taste + memory out of your head. Repeated decisions = lookups

The two short captions on the page are the whole point of the deck:

- **Taste + memory out of your head.** The reason the practice has a 12th template, a 6th design principle, an Axiom Design Core at all, is that the load-bearing judgment — *what is good, what is the right shape for this surface, what the user notices first* — has to be written down. If it lives only in your head, it dies with your attention, and the next session is a re-derivation.
- **Repeated decisions = lookups.** The 80 skills are not 80 things to memorise. They are 80 lookups. The next time you face the decision "did the deploy actually reach the user," you do not solve the problem; you look up `deploy-verification` and read the recipe. The catalog is a router. The skill is the answer. The reference is the why.

The collection is a **written operating system** because the alternative — re-deriving the same answers from first principles every session — is what kills the throughput of working with agents.

## What to do with this

- **Read this page before you read the README.** The README is the inventory; this page is the argument. If you only read the README, you know what is in the box. If you only read this page, you know why the box is shaped that way. You need both.
- **Run `./setup.sh --become-builder` once per machine, then run `make validate` after every change to the skills or the playbooks.** The validator is the gate; the install is the activation.
- **When a session ends, ask: what part of the loop did we just do, and what is next?** If the answer is "we shipped," the next step is walkthrough. If the answer is "we walked through," the next step is hindsight. If you cannot answer, the loop has been forgotten.

## Pairs with

- **Next page → [03 — ROUTE](03-route.md).** The stack is what is on disk. The route is what to actually load for the decision you are in.
- **Skills:** [`dr-non-golden-rules`](../../skills/dr-non-golden-rules/SKILL.md) (the operating laws), [`full-stack-bootstrap`](../../skills/full-stack-bootstrap/SKILL.md) (the one-command path), [`agent-memory`](../../skills/agent-memory/SKILL.md) (the memory ladder).
- **Playbook:** [01 — How I actually code](../../playbooks/01-how-i-actually-code.md) (the daily rhythm that this stack enforces).
- **Template:** the `CLAUDE.md.template` and `AGENTS.md.template` are the load-bearing entry points — without them the loop has no anchor.

**Source.** The four-shape table is in [`README.md`](../../README.md). The counts are validated by [`scripts/validate_repo.py`](../../scripts/validate_repo.py). The loop diagram is a verb in disguise; the four skills cited above are the four verbs.
