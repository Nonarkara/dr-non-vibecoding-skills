---
name: rag-patterns
description: >-
  Pick the right RAG variant — Naive, Adaptive, Agentic, CRAG, or
  Self-RAG. Use when simple-rag plateaus and the next move is unclear.
license: MIT
---

# RAG Patterns

> Five RAG variants. Each one pays a tax (latency, complexity, prompt tokens) for a specific kind of gain. Pick the cheapest that solves the failure mode you actually have.

A naive RAG pipeline (embed → retrieve top-K → stuff into prompt) is the default, and it fails in five distinct ways. The fix for each failure is one of the patterns below. **Match the pattern to the failure mode**, not the other way around.

This skill complements [`simple-rag`](../simple-rag/SKILL.md) (which is the *starting point* — SQLite FTS5 before vectors, one machine before a fabric). `rag-patterns` is the *next move* when simple-rag's accuracy plateaus.

---

## The five variants at a glance

| Pattern | When retrieval is the bottleneck | What it adds | Cost |
|---|---|---|---|
| **Naive RAG** | Default | Embed → top-K → stuff | Lowest |
| **Adaptive RAG** | Query complexity varies wildly | Router decides: skip RAG / single-shot / multi-step | One router call |
| **Agentic RAG** | Retrieval strategy depends on the question | The agent picks the tool (vector / SQL / web / docs) per query | Tool loop |
| **Corrective RAG (CRAG)** | Retrieved docs are often wrong | Evaluator scores retrieval; rewrites or falls back to web | Evaluator + fallback |
| **Self-RAG** | The model's own outputs hallucinate despite good retrieval | Generator emits reflection tokens; critic decides keep / revise | Reflection tokens in output |

---

## The decision tree

Start at **Naive RAG**. Move down the tree only when you have evidence the current variant cannot answer the question.

```
Does simple top-K retrieval get the right answer most of the time?
├── YES  → stay on Naive RAG. Do not add complexity.
└── NO
    ├── Is the failure "wrong docs retrieved"?
    │   ├── YES
    │   │   ├── Wrong docs because query was too vague → **Adaptive RAG** (route first)
    │   │   ├── Wrong docs because no single source has the answer → **Agentic RAG** (multi-tool)
    │   │   └── Wrong docs because the index is incomplete → **CRAG** (fall back to web)
    │   └── NO (right docs, wrong answer)
    │       └── The generator is hallucinating past the docs → **Self-RAG** (reflection tokens)
```

Each branch is a hypothesis. Test it with 10–20 examples before committing.

---

## The five moves in order

### 1. Naive RAG — the default, the floor

Embed the corpus, embed the query, retrieve top-K by cosine, stuff into the prompt. This is the baseline; every other pattern is a measured move away from it.

**Failure mode it cannot fix:** the corpus does not contain the answer. Adding retrieval to a missing-doc problem is a wrong-tool-for-the-job problem; the fix is to fix the corpus.

### 2. Adaptive RAG — route first, retrieve second

A small classifier decides, per query, whether retrieval is needed at all, and if so what kind.

Three routes, in order of cost:

- **No retrieval.** The model already knows. Skip the index. Saves latency and tokens.
- **Single-shot retrieval.** The query maps cleanly to one corpus. Standard top-K.
- **Multi-step retrieval.** The query needs sub-questions (decompose → retrieve per sub-question → merge).

The classifier is itself an LLM call (cheap). The cost is one extra call per query; the saving is fewer wasted retrievals.

**Trigger to add this:** you observe queries that *don't need* retrieval hitting the index and getting confidently-wrong answers (the top-K matches the wrong surface).

### 3. Agentic RAG — let the agent pick the tool

The agent has N tools (vector index, SQL, web search, calendar, internal docs API) and decides per query which to call and in what order. This is not a single retrieval; it is a small loop.

**Trigger to add this:** the answer requires combining structured data (SQL) with unstructured data (docs) with live data (web) and no single tool covers all three.

**Cost:** the agent loop is the most expensive variant. Only add it when the work demonstrably requires multi-tool fusion.

### 4. Corrective RAG (CRAG) — evaluate, fall back, rewrite

A second evaluator scores the retrieved docs on a simple rubric: relevant / ambiguous / irrelevant.

- **Relevant.** Use as-is.
- **Ambiguous.** Rewrite the query and retry retrieval.
- **Irrelevant.** Fall back to a web search with the original query.

The evaluator is a cheap classifier or a structured prompt. The fallback is the expensive path; it runs only when retrieval is bad.

**Trigger to add this:** you observe the retrieved docs *consistently* do not contain the answer even though the corpus theoretically has it (indexing gaps, stale docs, query reformulation problems).

### 5. Self-RAG — the model critiques its own output

The generator emits **reflection tokens** alongside its answer: `[Retrieve]`, `[IsRel]`, `[IsSup]`, `[IsUse]`. A critic reads the tokens and decides: keep, revise, or reject the answer.

This catches the failure mode that the other patterns cannot: the model hallucinates *past* the retrieved docs. The docs are right; the model is wrong.

**Trigger to add this:** you observe retrieved-context-faithful hallucinations. The doc says X; the model says "X, Y, and Z"; Y and Z are invented.

**Cost:** reflection tokens are output tokens, which are 4–5× more expensive than input. Self-RAG is the most expensive variant.

---

## The trade-off table

| Variant | Latency | Prompt tokens | Output tokens | Failure it catches |
|---|---|---|---|---|
| Naive | Lowest | Lowest | Standard | None — it's the floor |
| Adaptive | +1 call | +router | Standard | Wasted retrieval on trivial queries |
| Agentic | N tool calls | N queries | Standard | Single-tool blind spots |
| CRAG | +1 eval, possibly web | +fallback | Standard | Indexing gaps |
| Self-RAG | +critic | Standard | +reflection | Faithful-context hallucination |

Latency is listed in order of magnitude, not absolute.

---

## Common failure modes

- **The pattern that solves a problem you don't have.** Adaptive routing on a corpus of 100 documents is overhead. Self-RAG on a factoid dataset is overkill. Start naive; measure; move down the tree only on evidence.
- **The pattern that hides the corpus problem.** Corrective RAG with a web fallback can mask a broken index — the answer comes from the web, the index rots, no one notices. Audit the index health independently.
- **The pattern without a rubric.** Self-RAG reflection tokens are only useful if the critic has a rubric. "Is this faithful?" without "to which specific claim?" lets the model pass itself.
- **The pattern without evaluation.** Every variant above requires before/after measurement on a held-out set. If you cannot measure the failure rate, you cannot justify the next variant.
- **The pattern as architecture.** RAG is not a system architecture; it is a retrieval strategy inside one. Plan-and-execute the *whole job*; pick the retrieval variant per step.

---

## Pair with

- [`simple-rag`](../simple-rag/SKILL.md) — start here. SQLite FTS5 before vectors.
- [`plan-and-execute`](../plan-and-execute/SKILL.md) — when the RAG step is one of 3+ ordered steps
- [`reflection-loop`](../reflection-loop/SKILL.md) — critique the final answer; Self-RAG is the in-loop version
- [`framework-choice`](../framework-choice/SKILL.md) — LangGraph hosts the canonical implementations of all five
- [`honest-envelope`](../honest-envelope/SKILL.md) — every retrieved claim gets source, fallback tier, age
- [`public-api-integration`](../public-api-integration/SKILL.md) — when the corpus is a public API, not a doc set
