---
name: framework-choice
description: >-
  Pick the right agent framework before writing glue. Use when greenfield
  agent work or choosing LangGraph vs CrewAI vs AutoGen vs Agno.
license: MIT
---

# Framework Choice

> Choose the framework that matches the **shape of the work**, not the one that won last quarter's hype cycle.

The five frameworks do different things. Picking the wrong one costs a week of rewrite. The right pick is decided by *what the agent has to do*, not by what the team already knows. Framework loyalty is a sunk cost; ship-discipline wins.

Source distillation: the framework comparison table in
[`ashishpatel26/500-AI-Agents-Projects`](https://github.com/ashishpatel26/500-AI-Agents-Projects)
(with attribute). Our `staff-swarm` skill handles the cheap tier locally; framework choice is
the *outer* decision about which framework to load onto it.

---

## The decision table

| Framework | Best for | Complexity | Multi-agent | Streaming | Local LLM |
|---|---|---|---|---|---|
| **LangGraph** | Stateful workflows, RAG pipelines, complex graphs | ⭐⭐⭐ | ✅ | ✅ | ✅ |
| **CrewAI** | Role-based teams, business automation, rapid prototyping | ⭐⭐ | ✅ | ✅ | ✅ |
| **AutoGen** | Code generation, research, self-healing workflows | ⭐⭐⭐ | ✅ | ✅ | ✅ |
| **Agno** | Lightweight single agents, tool integration, fast iteration | ⭐ | ✅ | ✅ | ✅ |
| **LlamaIndex** | Document Q&A, enterprise RAG, data pipelines | ⭐⭐ | ⚠️ | ✅ | ✅ |

**Decision guide — pick the row that matches your work:**

- *Just starting out, single agent, needs tools fast?* → **Agno**. Cheapest path to a runnable agent.
- *Role-based team of specialists that hand off work?* → **CrewAI**. Role primitives map cleanly to the work.
- *Stateful graph with cycles, branches, retries, and persistent memory?* → **LangGraph**. The state machine IS the product.
- *Agent writes code, runs it, debugs it, iterates?* → **AutoGen**. Code-execution as a first-class loop.
- *Heavy document / RAG work where retrieval is the bottleneck?* → **LlamaIndex**. Best-in-class retrievers.

---

## The five moves in order

### 1. Name the shape of the work

Before picking a framework, write one sentence: *"This agent must ____."*

- *"…answer questions over our internal docs"* → LlamaIndex candidate
- *"…plan a trip, book three services in sequence, retry on failure"* → LangGraph candidate
- *"…research a topic, then write a report, then revise based on critique"* → AutoGen candidate (or `reflection-loop`)
- *"…act as a sales coach that flags good/bad leads and emails the rep"* → CrewAI candidate (role model fits)
- *"…watch a GitHub repo, summarize new issues, post a Slack message"* → Agno candidate (single agent + tools)

If you cannot finish the sentence, you are not ready to pick a framework. Use `ninja-innovation` and `dr-non-golden-rules` first.

### 2. Refuse the default

The biggest framework mistake is letting yesterday's pick decide today's. The team used CrewAI last quarter does not mean CrewAI is right this quarter. State the shape; pick the framework that matches; defend the choice in one sentence to a peer.

### 3. Score on five axes, not one

| Axis | Why it matters |
|---|---|
| **State model** | Does the work have branches, retries, persistent memory? If yes, only LangGraph-style state machines fit cleanly. |
| **Role model** | Are the agents discrete specialists (researcher / writer / critic) or one agent with tools? Roles → CrewAI; tools → Agno. |
| **Retrieval depth** | Is retrieval a feature or the whole product? Heavy retrieval → LlamaIndex. Retrieval as one tool → any. |
| **Code execution** | Does the agent write + run code? Code loop → AutoGen. Otherwise → Agno or LangGraph. |
| **Iteration cost** | How many times will this be rewritten in the next six months? Pick the framework where rewrite cost is lowest — usually the simplest one that fits. |

### 4. Default to the smallest thing that ships

If the work fits Agno, ship Agno. Adding LangGraph complexity to a single-agent job is the
single most common cause of "agent that worked in week one, was unmaintainable by week four."
The `dr-non-golden-rules` rule "the smallest thing that ships" applies to framework choice.

### 5. Plan the exit

Every framework migration has a moment. Write down **what would make you migrate off this framework** — a feature you cannot ship, a perf cliff, a security incident. Put it in the project contract. When the trigger fires, you are not in a panic; you are in a plan.

---

## When NOT to use any framework

Three cases where the answer is "no framework":

1. **The job is one prompt with one tool call.** Use plain Claude / GPT / a local model. A framework here is overhead.
2. **The job is a known data pipeline.** Use `data-catalog` + a script + the `database-bootstrap.py.template` (in this repo). An LLM in the loop is the wrong tool.
3. **The job is a one-shot document.** Use `ninja-innovation`. No persistent agent state needed.

---

## Common failure modes

- **Framework gravity.** "We already have LangGraph; let's add this feature to it." If the new feature is a single tool call, write it without the framework. Compounding framework complexity is the #1 cause of agent graveyard projects.
- **Multi-agent for one job.** Most "multi-agent" projects are one agent with N tools in a loop. Multi-agent is a complexity tax; pay it only when one agent demonstrably cannot hold the state.
- **State in the wrong place.** LangGraph's state IS the product. CrewAI's tasks carry the state. Agno's state lives in the tools. Pick the framework whose state model matches how your work actually mutates.
- **Streaming everywhere.** Streaming is expensive and slow for some workloads. If the work is a 30-second batch job, disable streaming.
- **Local-LLM idealism.** "We'll run it all on a Mac M5." If the workload needs 70B+ parameters for quality, that is a non-starter. Pick the framework that supports both (`local-llm-ollama` + a hosted tier) and route per task.

---

## Pair with

- [`staff-swarm`](../staff-swarm/SKILL.md) — cheap-tier routing, multi-model fanout
- [`ninja-innovation`](../ninja-innovation/SKILL.md) — reframe before refactor, refuse the default
- [`dr-non-golden-rules`](../dr-non-golden-rules/SKILL.md) — smallest thing that ships
- [`local-llm-ollama`](../local-llm-ollama/SKILL.md) — when the chosen framework must run locally
- [`simple-rag`](../simple-rag/SKILL.md) — RAG-specific retrieval patterns
- [`plan-and-execute`](../plan-and-execute/SKILL.md) — when the framework's loop is plan-then-do
- [`reflection-loop`](../reflection-loop/SKILL.md) — when the framework's loop is critique-then-revise
