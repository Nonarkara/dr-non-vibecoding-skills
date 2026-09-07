---
name: staff-swarm
description: >-
  Run researcher, field, and orchestrator agents with token-tier routing. Use
  when a job needs parallel collection plus one mind assembling results.
license: MIT
---

# Staff Swarm

> Imagine staff, not prompts. One finds data, one goes to the field, one assembles — and the cheap seats do the cheap work.

The user's mental model, kept verbatim because it is operational: *"If I want a document, I imagine the staff that would produce it — one to find data, one to the field for more, one to orchestrate what they bring back."* This skill is that imagination as procedure: three roles, token tiers, one assembler, acceptance before merge. Computation is not Harry Potter — it is payroll.

Influences: [`subagent-routing`](../subagent-routing/SKILL.md) (dispatch + six-field brief), [`context-economy`](../context-economy/SKILL.md) (response shapes), [`local-llm-ollama`](../local-llm-ollama/SKILL.md) (cheap tier), [`result-honesty`](../result-honesty/SKILL.md) (four buckets).

---

## The rule

One orchestrator owns the answer. Researchers and field agents own evidence. Nobody merges their own work unwitnessed.

---

## The procedure

### 1. The three roles (fixed, named per job)

| Role | Does | Never does |
|---|---|---|
| **Researcher** (×1–3, parallel) | Finds data: docs, APIs, feeds, prior art — returns links + excerpts + source names | Judges, assembles, or writes the final doc |
| **Field** (×1–2) | Goes to the field: runs probes, scrapes the permitted endpoint, screenshots the flow, records the quirk | Decides what the data means |
| **Orchestrator** (×1, the parent) | Assembles: resolves conflicts, cuts what does not earn its place, writes the result with citations | Collects — the moment the orchestrator fetches, there is no reviewer left |

Brief each agent with [`subagent-routing`](../subagent-routing/SKILL.md)'s six fields (objective, known facts, exact scope, deliverable, acceptance, output shape). A swarm without briefs is a crowd.

### 2. Token tiers (economy is the point)

| Tier | Model class | Jobs |
|---|---|---|
| Cheap / free | Local Ollama, haiku-class | Translation, paraphrase, rearrange, dedupe, first-pass summaries |
| Mid | Sonnet-class | Collection with judgment, adapter code, review passes |
| Frontier | Opus-class | Architecture, security judgment, final assembly of contested evidence |

Rule: a job that a cheaper tier can verify moves down a tier next time. Translation and paraphrase never leave the cheap tier — that is the token-economy win the user named. The orchestrator is the only role allowed to spend frontier tokens without asking, and only on assembly.

### 3. Assemble with gates

1. Researchers return evidence with sources; field returns observations with timestamps.
2. Orchestrator runs [`adversarial-review`](../adversarial-review/SKILL.md) stance on conflicts — two sources disagreeing is a finding, not a tie to break silently.
3. Merge only what passes acceptance from the brief; the rest goes to the lesson doc's "didn't make the cut" per [`lesson-residue`](../lesson-residue/SKILL.md).
4. Report in [`result-honesty`](../result-honesty/SKILL.md) buckets: succeeded / failed / skipped / unverified — per role, so the next swarm knows which seat failed.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Five researchers, no orchestrator | Collection without assembly is a pile — one mind owns the answer |
| Frontier model for paraphrase | Token arson; cheap tier does it free and equally well |
| Orchestrator also collecting | No reviewer left — the assembly inherits the collector's blind spots |
| Swarm for a one-file fix | Dispatch costs context; route small jobs to one agent per `subagent-routing` cost test |
| Merging without acceptance | The brief's acceptance line is the contract — unaccepted evidence is scratch |

---

## The test

After the run: each role's output is a separate artifact with its name on it, the final doc cites which seat produced each fact, and the token spend shows cheap-tier work on cheap models. If the orchestrator cannot say who found what, it was not a swarm — it was parallel guessing.
