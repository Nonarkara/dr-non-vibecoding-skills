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

## Staff are you, amplified (why this works)

The staff is not a metaphor for parallelism. It is the user, multiplied: *"things I myself could do, or could have hired someone to do — but AI does faster and more accurately."* A job that would take months of laborious fieldwork collapses to an afternoon on fast hardware. That speed advantage is the whole premise — never apologize for using it, never waste it on work no human would have commissioned.

Two consequences follow, and both are load-bearing:

**Solve it the human way.** Products are delivered to humans, so human sensibility is part of the product. Think about how a human would solve it — the researcher who reads before writing, the field worker who checks the ground truth, the orchestrator who cuts with taste — and the solution comes out humane: it works *with* humans rather than *at* them. That is the difference between a designer and a mechanical engineer who understands the machine but not the human the machine must serve. A swarm that optimizes only for machine efficiency produces machine-shaped answers.

**Reciprocity, not symbiosis.** Symbiosis is coexistence; this practice demands mutual return. The human brings intent, taste, and the willingness to experience the result first-hand. The staff brings speed, tirelessness, and fearless drafting. Each side does what the other cannot — and the orchestrator's assembly is where the two meet. A swarm where the human only watches is outsourcing; a swarm where agents only type is dictation. This skill is neither.

---

## The rule

One orchestrator owns the answer. Researchers and field agents own evidence. Nobody merges their own work unwitnessed.

---

## The procedure

### 1. The three roles (fixed, named per job)

| Role | Does | Never does |
|---|---|---|
| **Researcher** (×1–3, parallel) | Finds data: docs, APIs, feeds, prior art — returns links + excerpts + source names. **Searches GitHub first**: before anything is invented, finds repos to reverse-engineer or steal ways from, so invention spends only where no wheel exists | Judges, assembles, or writes the final doc |
| **Field** (×1–2) | Goes to the field: runs probes, scrapes the permitted endpoint, screenshots the flow, records the quirk | Decides what the data means |
| **Orchestrator** (×1, the parent) | Assembles: resolves conflicts, cuts what does not earn its place, writes the result with citations | Collects — the moment the orchestrator fetches, there is no reviewer left |

Brief each agent with [`subagent-routing`](../subagent-routing/SKILL.md)'s six fields (objective, known facts, exact scope, deliverable, acceptance, output shape). A swarm without briefs is a crowd.

### 2. Token tiers (economy is the point)

| Tier | Model class (Google / Anthropic / Local) | Jobs |
|---|---|---|
| Cheap / free | Gemini 1.5/2.0 Flash, Flash-Lite, Haiku-class, Local Ollama | Translation, paraphrase, rearrange, dedupe, first-pass bulk summaries |
| Mid | Gemini 1.5/2.5 Pro, Gemini 3.8 Flash, Sonnet-class, GPT-4o-mini | Collection with judgment, multimodal audit, adapter code, review passes |
| Frontier | Gemini 2.5/3.8 Pro, Claude Opus, GPT-4o | Architecture, security boundaries, final assembly of contested evidence |

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
