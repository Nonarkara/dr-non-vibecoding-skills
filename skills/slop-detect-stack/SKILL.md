---
name: slop-detect-stack
description: >-
  Orchestrator for the four-layer anti-slop stack — code (`code-slop-patterns`),
  PR (`pr-slop-patterns`), prose (`no-ai-tells`), UI (`no-design-tells` /
  `slop-detect`). Use before shipping any AI-assisted output, when setting up
  pre-commit / CI / PR gates for an AI-assisted workflow, or when auditing a
  codebase built primarily with AI. Picks the right layer for the surface;
  do NOT load this skill just to read the whole stack.
license: MIT
---

# Slop Detect — Stack

> Four layers, one orchestrator. The cheap deterministic layer catches ~80% of low-quality AI output. The semantic review catches the rest. Run the cheap layer first.

AI slop is not one problem. It is *four* problems wearing the same outfit: low-quality code, low-quality prose, low-quality UI, low-quality PRs. Each wears a recognizable fingerprint. Each has a cheap, deterministic detector. **None of them substitute for human review** — they are the gate *before* human review, not a replacement for it.

This skill is the router. The four layers are the work. The cheap deterministic layer catches the structural patterns; the semantic layer catches the conceptual ones. Run them in order; don't skip steps.

*The four layers: [`code-slop-patterns`](../code-slop-patterns/SKILL.md), [`pr-slop-patterns`](../pr-slop-patterns/SKILL.md), [`no-ai-tells`](../no-ai-tells/SKILL.md), [`slop-detect`](../slop-detect/SKILL.md) + [`no-design-tells`](../no-design-tells/SKILL.md).*

---

## The core claim

The cheap deterministic checks are the load-bearing layer. They catch the patterns a tired human would miss and a hurried reviewer would accept. They run without an LLM at runtime. They are fast enough to put in a pre-commit hook. They are *deterministic* — same input, same verdict — which makes them auditable.

The semantic checks are the load-bearing layer for everything else. They cannot be automated. They need a human (or a sufficiently expensive agent) to evaluate whether the algorithm is right, the abstraction is appropriate, the domain assumption is true, and the security model holds. The cheap layer tells you *what to look at*; the semantic layer tells you *whether it's good*.

**The mistake is doing only one.** A repo that runs only deterministic checks ships conceptually-wrong code that compiles cleanly. A repo that runs only human review ships a 2000-line PR that nobody reads.

---

## When to load

- You are shipping an AI-assisted change and want a pre-flight checklist.
- You are setting up pre-commit / CI / PR gates for a team that uses AI.
- You are auditing a codebase built primarily with AI and want a layered pass.
- You are a reviewer deciding which layer to apply to a PR.

---

## The four layers — what each catches, what each misses

```mermaid
flowchart LR
  subgraph Layer1["Layer 1 — Code (deterministic)"]
    C1["`as any`, swallowed exceptions,<br/>hallucinated imports, dead code,<br/>duplicates, TODO stubs"]
  end
  subgraph Layer2["Layer 2 — PR (deterministic)"]
    P1["title, description, commits,<br/>diff size, file scope,<br/>contributor signals"]
  end
  subgraph Layer3["Layer 3 — Prose (deterministic)"]
    W1["banned vocabulary, inflated verbs,<br/>formulaic contrasts,<br/>'In today's world' openers"]
  end
  subgraph Layer4["Layer 4 — UI (deterministic + tool)"]
    U1["generic layouts, gradients,<br/>predictable cards,<br/>ravidsrk/slop-detect score"]
  end
  subgraph Layer5["Layer 5 — Semantic (human)"]
    S1["algorithm right?<br/>abstraction appropriate?<br/>domain assumption true?<br/>security model hold?"]
  end
  Layer1 --> Layer2 --> Layer3 --> Layer4 --> Layer5
  style Layer1 fill:#0d2a1c,stroke:#00c896,color:#e8e8e8
  style Layer2 fill:#0d2a1c,stroke:#00c896,color:#e8e8e8
  style Layer3 fill:#0d2a1c,stroke:#00c896,color:#e8e8e8
  style Layer4 fill:#0d2a1c,stroke:#00c896,color:#e8e8e8
  style Layer5 fill:#2a1414,stroke:#ffd000,color:#e8e8e8
```

Layers 1–4 are deterministic and cheap. Layer 5 is human-only. Run 1–4 first; do not skip 5.

| Layer | Surface | Catches | Misses | Skill |
|---|---|---|---|---|
| **1. Code** | the diff | structural patterns (`as any`, swallowed errors, oversized functions) | wrong algorithm, wrong abstraction | [`code-slop-patterns`](../code-slop-patterns/SKILL.md) |
| **2. PR** | the PR metadata | vague titles, empty descriptions, fix-up diary commits, oversized diffs | whether the change is conceptually right | [`pr-slop-patterns`](../pr-slop-patterns/SKILL.md) |
| **3. Prose** | the prose | banned vocabulary, formulaic structure, inflated rhetoric | whether the argument is true | [`no-ai-tells`](../no-ai-tells/SKILL.md) |
| **4. UI** | the surface | generic layouts, gradients, predictable cards, AEO misses | whether the design is right for the user | [`slop-detect`](../slop-detect/SKILL.md) + [`no-design-tells`](../no-design-tells/SKILL.md) |
| **5. Semantic** | the whole thing | conceptual correctness, domain fit, security | — | (human review + [`adversarial-review`](../adversarial-review/SKILL.md)) |

---

## The orchestration — what to load when

### "I'm shipping an AI-assisted feature"

1. Run **Layer 1** — load [`code-slop-patterns`](../code-slop-patterns/SKILL.md) and apply the 12 rules to your diff.
2. Run **Layer 2** — load [`pr-slop-patterns`](../pr-slop-patterns/SKILL.md) and check title, description, commits, diff size.
3. Run **Layer 3** — load [`no-ai-tells`](../no-ai-tells/SKILL.md) and scan every prose surface (PR description, comments, docs).
4. If the surface is a UI change — run **Layer 4**, load [`slop-detect`](../slop-detect/SKILL.md) and the [`no-design-tells`](../no-design-tells/SKILL.md) discipline.
5. **Always** do **Layer 5** — human review, with [`adversarial-review`](../adversarial-review/SKILL.md) as the rubric.

### "I'm setting up CI gates for an AI-assisted team"

1. Pre-commit: Layer 1 (`code-slop-patterns` rules 1, 2, 4, 5, 6, 10 — the cheap ones).
2. CI: Layer 1 full + Layer 3 prose scan on PR description.
3. PR action: Layer 2 (`pr-slop-patterns`).
4. UI: Layer 4 (`slop-detect` scoring on landing pages).
5. Human review: required on every merge.

### "I'm auditing a repo built primarily with AI"

1. Run all four deterministic layers as a one-shot scan.
2. Categorize findings: structural (cheap to fix), conceptual (needs review), domain (needs expert).
3. Address structural findings in batches (cheap).
4. Address conceptual findings one-by-one with the right reviewer.
5. Address domain findings only after a domain expert signs off.

---

## The anti-pattern: skipping layers

The single biggest mistake is doing *only* Layer 5. A human reviewer with no checklist will catch 30% of AI slop because the human doesn't know what to look for — the AI fingerprints are subtle, and the reviewer has limited time. The deterministic layers *exist* so the human reviewer can spend their time on Layer 5, not on noticing that someone left `console.log` in the code.

The second biggest mistake is doing *only* Layers 1–4. A repo that runs only the deterministic gates ships conceptually-wrong code with clean lint. **The cheap layer tells you what to look at; the semantic layer tells you whether it's good.**

The third biggest mistake is doing the layers in the wrong order. If you do Layer 5 before Layer 1, the human reviewer spends 30% of their time on lint issues that a pre-commit hook should have caught. Always run the cheap layer first.

---

## The cost model

| Layer | Cost per run | Frequency | Catches |
|---|---|---|---|
| 1. Code (pre-commit) | <1s | every commit | ~30% of AI slop |
| 2. PR (GitHub Action) | 5–30s | every PR | ~25% of AI slop |
| 3. Prose (lint) | <1s | every commit / PR | ~15% of AI slop |
| 4. UI (slop-detect) | 2–10s | every UI change | ~10% of AI slop |
| 5. Semantic (human) | 10–60min | every PR | ~20% of AI slop |

The cheap layers catch ~80% of AI slop at <1% of the cost. The semantic layer catches the remaining 20% at ~99% of the cost. The math is obvious; the discipline is to *run all of them*.

---

## Connects to

- [`../code-slop-patterns/SKILL.md`](../code-slop-patterns/SKILL.md) — Layer 1, the deterministic code gate
- [`../pr-slop-patterns/SKILL.md`](../pr-slop-patterns/SKILL.md) — Layer 2, the PR metadata gate
- [`../no-ai-tells/SKILL.md`](../no-ai-tells/SKILL.md) — Layer 3, the prose gate
- [`../slop-detect/SKILL.md`](../slop-detect/SKILL.md) — Layer 4, the design slop tool bridge
- [`../no-design-tells/SKILL.md`](../no-design-tells/SKILL.md) — Layer 4, the design discipline
- [`../adversarial-review/SKILL.md`](../adversarial-review/SKILL.md) — Layer 5, the human review rubric
- [`../harness-hardening/SKILL.md`](../harness-hardening/SKILL.md) — make the rules actually run via hooks, not just exist in a doc
- [`../wrong-green/SKILL.md`](../wrong-green/SKILL.md) — the gate proves the *check ran*, not that the *check measured the right thing*

---

## For the full thing

This stack is a distillation of three open-source projects, all MIT-licensed and worth adopting as the operational form:

- [`scanaislop/aislop`](https://github.com/scanaislop/aislop) — 50+ deterministic rules for AI-generated code across 9 languages
- [`peakoss/anti-slop`](https://github.com/peakoss/anti-slop) — 34 checks, 57 options, GitHub Action for PR metadata
- [`hardikpandya/stop-slop`](https://github.com/hardikpandya/stop-slop) — review rubric for AI-generated prose (also a Claude Code skill)
- [`ravidsrk/slop-detect`](https://github.com/ravidsrk/slop-detect) — design slop scoring for landing pages

This skill is the agent-facing summary; the tools are the enforcement; the discipline is the practice. **Run all four layers, every time, in order, before merge.**
