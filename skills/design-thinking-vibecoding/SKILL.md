---
name: design-thinking-vibecoding
description: >-
  The full design-thinking-to-ship methodology: reverse-engineer problems from daily pain
  (not from client briefs), dump context for AI pattern-finding, set goals with
  Dieter-Rams-grade frontend discipline, ship MVP from commit one, orchestrate multiple
  AIs as triangulating collaborators, and run token economy across cheap and frontier
  models. Use at the start of any new project, when the approach to a problem is unclear,
  when orchestrating multiple AI agents, or when deciding which model to use for which
  task.
license: MIT
---

# Design Thinking + Vibecoding

> Don't build what the client asks for. Find the pain people have stopped noticing, and heal it.

This is the full methodology — from "why should this exist?" to "it's live and verified." Every other skill in this repo plugs into this spine.

---

## 1. Reverse-engineer the problem

**Don't look for answers from people who have money. Look for problems that hurt you as a designer.**

The client who writes the cheque usually doesn't know whether what they want built will actually be useful in the market. Why invest money on something that has no proof of demand? Design thinkers don't wait for contracts. They observe daily pain — the kind that people have gone through so long they've gone numb to it.

The pain is invisible to the person experiencing it because it has numbed. But to the designer who witnesses it, it's obvious. That pain, if healed, would make people happier and more efficient in what they do. That's the project.

**The test:** Would you use this yourself, without being paid? If no, don't build it. If yes, build it from commit one.

### How to find the pain

- Watch what people do, not what they say they want.
- Look for workarounds — when someone has built a manual process to work around a broken system, the broken system is the project.
- Look for numbness — the pain that's been accepted as "just how things are."
- Look for waste — time, attention, data that gets collected and never used.

---

## 2. Dump context — then let AI find patterns

Once you've found the problem, **flood the AI with everything you know.** Not just your instructions — all of it: transcripts, discussions, data, links, screenshots, prior work, adjacent domains.

### The context dump

Give the AI:
1. **All the raw material** — transcripts of discussions, meeting notes, data exports, website links, database schemas, prior code.
2. **Your instructions** — what to look for, what to emphasise, what matters.
3. **An open brief** — ask the AI to find patterns you didn't notice. Tell it to surface connections you missed. Trust it to notice things.

The AI should review all of this not only according to your instructions, but also according to its own pattern-matching ability. Some of the best insights come from the AI noticing a connection you never made.

### The rule

Never start designing before the context is loaded. The quality of the output is bounded by the quality of the input. Garbage in, garbage out — but also: richness in, richness out.

---

## 3. Set the goal — then work backwards

After context, state the goal clearly. Not "build a dashboard" — that's too vague. State what the system must do, who it serves, and what it looks like when it works.

### The goal framework

Every project gets these four things stated upfront:

1. **What it does** — the function. "A real-time flood watch for Bangkok." "A personal watch collection tracker." "A city-scale dust monitoring dashboard."
2. **Who it serves** — the reader. A mayor. A citizen on a phone. An operator at 2am. A collector.
3. **What it looks like** — the design register. Dieter Rams. Zero border-radius. One accent. Clean, minimalistic, communicative. See [`axiom-design-core`](../axiom-design-core/SKILL.md) and [`design-registers`](../design-registers/SKILL.md).
4. **How it connects** — the data path. Nothing that comes through the interface gets lost. Local systems store everything. The backend analyses. The frontend is the gateway.

### The frontend discipline

The frontend must be:
- **Clean** — no decoration, no gradients, no pastels. See [`design-dna`](../design-dna/SKILL.md).
- **Minimalistic** — maximum three text sizes per page. Mobile-first at 390px.
- **Communicative** — the interface teaches the user what to do without a manual.
- **Dieter Rams-grade** — every element has a reason. If you can't state the reason, remove it.

The frontend is the gateway to the data. Nothing that comes through it gets lost. Build local systems to store everything. Numbers and text don't take much space.

---

## 4. Ship from commit one — the MVP spine

**Every commit works.** Not "it'll work on day 90." It works from day one — even if it's stupid, even if it's a wireframe, even if it has no graphics on the first page.

### The rule

```
Day 1: A wireframe that shows a word. It works.
Day 2: AI-generated clone voice. It works better.
Day 7: Real data flowing. It works for real.
Day 30: Production-grade. It still works, and now it's beautiful.
```

The exponential growth of AI means that what takes you an hour today will take you ten minutes tomorrow and one minute next week. Start with the smallest thing that works, then iterate.

### What "works" means

- The deploy command runs and the URL serves something.
- A `curl` or browser load proves it.
- There is a conservation law — a one-line invariant the system always holds.
- Missing data renders as a reason code, never as a fake number.

See [`ship-discipline`](../ship-discipline/SKILL.md) for the CPDT loop. See [`production-spine`](../production-spine/SKILL.md) for the five gates.

---

## 5. Multi-AI orchestration — triangulate, don't delegate

**This is the secret.** One AI writes. Another critiques. A third judges. The triangulation between different AIs produces code that is more stable, more creative, and more thoroughly tested than any single model could produce.

### Why triangulation works

- Different AIs are trained on different data. They have different blind spots.
- AI #1 might miss a vulnerability that AI #2 catches.
- AI #3, reviewing both, can synthesise the best of each.
- The result is a system tested by multiple sources, multiple reasoning styles, multiple perspectives.

### The workflow

```
AI #1 (worker)     → builds the feature
AI #2 (critic)     → reviews for errors, gaps, anti-patterns
AI #3 (judge)      → picks the best approach, resolves disagreements
You (orchestrator) → make the final call, ship it
```

You are the orchestrator. You throw one AI's result to another. You don't run them in parallel on the same file — you run them sequentially, each building on or critiquing the last.

### AI personality awareness

Different AIs have different strengths. Know them:

| Model | Strength | Use for |
|-------|----------|---------|
| **Claude Opus 5.1** | Reasoning, long tasks, quality | Final polish before shipping, architecture decisions, complex refactors |
| **Claude Sonnet 4** | Speed + quality balance | General-purpose coding, daily driver |
| **Codex** | Reasoning, code generation | Building features, writing tests |
| **MiniMax** | Tedious tasks, patience | Translation, bulk edits, data cleaning, long repetitive work |
| **Kimi K3** | Thoroughness | Deep analysis, documentation |
| **Gemini 5.3** | Multimodal, fast | Quick iterations, visual review |
| **Grok 4.6** | Real-time data, speed | API integration, live data pipelines |

**Route by personality, not by brand.** If the task is tedious and repetitive, MiniMax will do it better and cheaper than Opus. If the task is architectural and needs deep reasoning, use the best model you have.

---

## 6. Token economy — spend wisely

Not every task needs a frontier model. The economics matter.

### The tier list

| Task tier | Model tier | Cost |
|-----------|-----------|------|
| **Quick fix, typo, config change** | Any free/cheap model | ~$0 |
| **Translation, bulk edit, data cleaning** | MiniMax, free-tier models | ~$0 |
| **Feature build, moderate complexity** | Sonnet 4, Codex | Low |
| **Architecture, final polish, pre-ship** | Opus 5.1, Grok 4.6, Kimi K3 | High |

### The rules

1. **Cheap models for tedious tasks.** Translation, formatting, renaming, simple refactors — use whatever's cheapest.
2. **Mid-tier for daily coding.** Sonnet 4 or equivalent for most feature work.
3. **Best model before shipping.** The last pass before deploy must use the best model available. There are always loose ends — CSS issues, composition problems, pipeline errors, amateur-looking layouts. The best model catches these.
4. **Free APIs first.** OpenAI, Anthropic, Google, and others give billions of free tokens per month if you put some money in. Use them. See [`reference/free-apis.md`](../../reference/free-apis.md).
5. **Never skip the final pass.** The difference between "it works" and "it ships" is the last model's pass.

---

## 7. Direct the AI — tell it what you don't like

Don't just say "build a dashboard." Tell the AI:
- **What you don't want** — templated design, generic layouts, placeholder content, AI-generated cliches.
- **What you value** — real data, honest labels, clean typography, decision-driven interfaces.
- **Where to find data** — specific URLs, API endpoints, government databases, open data portals.
- **What good looks like** — reference the design lineage, the tokens, the register.

The more specific your direction, the less the AI has to guess. And when the AI guesses, it hallucinates. Never leave room for hallucination. If you don't know where the data is, don't ask the AI to make it up — go find the source first, then hand it over.

---

## 8. Iterate in public — deploy, verify, repeat

The iteration loop is not "code for three days, then deploy." It is:

```
Commit → Push → Deploy → Test on live URL → Get feedback → Repeat
```

Every cycle is a complete, working system. Not a partial system. Not a staging environment. A live URL that serves real bytes to real users.

See [`ship-discipline`](../ship-discipline/SKILL.md) for the CPDT loop. See [`deploy-verification`](../deploy-verification/SKILL.md) for why CDNs lie.

---

## The summary

```
1. Find the pain people have stopped noticing.
2. Dump everything you know into the AI.
3. State the goal: function, reader, design, data path.
4. Ship from commit one — even if it's stupid.
5. Triangulate: AI writes, AI critiques, AI judges, you ship.
6. Token economy: cheap for tedious, best before shipping.
7. Direct hard: tell it what you don't want.
8. Deploy daily: commit, push, deploy, test, repeat.
```

That's the whole method. Every skill in this repo is a deep-dive into one of these eight steps. This skill is the spine.
