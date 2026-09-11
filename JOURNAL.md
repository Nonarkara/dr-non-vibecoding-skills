# Build Journal — Flight Recorder

> The narrative of the work. Every meaningful change to this stack is recorded here. The journal is maintained by the agent on the user's behalf — the *narrative*, not the *log*. A new builder reads the journal to understand what was built, what was added, what was discussed, and *why*.

This is the *black box* of the stack. It is always on.

---

## How the journal works

- **Append-only.** New entries are added at the bottom; old entries are not edited (corrections go in a new entry).
- **AI-maintained.** The agent maintains the journal on the user's behalf. The user is the operator; the agent is the data entry clerk.
- **The 5-line format.** Every entry is 5 lines: date, what, why, diff, tags. Anything more than 5 lines is moved to a separate doc.
- **A meaningful change is one of:** a new skill, a new playbook, a new reference, a new template; a deletion or rename; a breaking change to the install path; a security incident; a rename or rebranding; a milestone (100 skills, 1000 commits); a decision that closes a future option.
- **The discipline skill is `build-journal`.** See `skills/build-journal/SKILL.md` for the full procedure.

---

## 2015-09 → 2025-11 — The writing practice (the corpus)

**Date:** 2015-09-14 → 2025-11-30
**What:** 127 posts / 1.6 MB / 258,389 words / 197 comments / 63 inline images, on [nonharvard.wordpress.com](https://nonharvard.wordpress.com).
**Why:** The author's daily writing practice. 100 days in 2015, then kept going. The corpus is the *source code* of every skill in this stack.
**Diff:** External to the repo. The distillation into skills happened in Stage 4 below.
**Tags:** `corpus · origin · 10-years`

---

## 2025-07 — The first skill

**Date:** 2025-07 (approximate)
**What:** `design-by-writing-100-day-reflection-engine` — the first skill distilled from the corpus. Five core moves: vivid user story, problem-not-solution, listen-do-not-ask, 5-minute reflection, closing-in countermeasure. Seven patterns.
**Why:** The first attempt to package a daily practice as a *reusable instruction* for an agent. The proof that the distillation discipline (sample chapters → extract moves → strip personal content) could produce a load-bearing skill.
**Diff:** `skills/design-by-writing-100-day-reflection-engine/SKILL.md`
**Tags:** `first-skill · milestone · writing-as-design`

---

## 2026-09-03 — The first ecosystem survey (50+ repos)

**Date:** 2026-09-03
**What:** A survey of 50+ GitHub repositories across 7 themes (full-stack templates, dashboards, chatbots, databases, auth, maps, CCTV) + 7 additional themes (anti-slop aesthetics, cybersec, reverse-engineering, deep research, qualitative reasoning, anthropological studies, free LLM APIs).
**Why:** To identify which disciplines the stack was missing, which were covered, and which were net new. The survey was a discipline check, not a vendoring exercise.
**Diff:** `reference/stack-ecosystem.md` (the audit) + 3 follow-up skills (aesthetics-and-economy, free-api-keys, browser-use)
**Tags:** `ecosystem-survey · discipline-check · not-vendoring`

---

## 2026-09-08 — Corpus extraction round 1: the nonism bundle

**Date:** 2026-09-08
**What:** Four candidate skills were distilled from the corpus in one sitting via an LLM call. Of the four, only `design-by-writing-100-day-reflection-engine` was strong enough to ship; `self-managed-project-mastery` and the bulk of `reasoning-argument-logic` + `storytelling-the-writing-craft` were rejected as personal-philosophy cheatsheet cards. Three rules were cherry-picked into existing skills (1 into `karpathy-guidelines` §1a *Reflexivity*, 2 into `make-it-stick` §7, 1 into `no-ai-tells` §4.13).
**Why:** First attempt at *systematic* distillation. Lesson learned: *the discipline travels, the implementation is one of many*; sample 2-4 chapters, extract paths not content, cap at 3 skills per round.
**Diff:** `skills/design-by-writing-100-day-reflection-engine/SKILL.md` (curated) + cherry-picks into 3 existing skills
**Tags:** `corpus-extraction · round-1 · nonism-bundle`

---

## 2026-09-09 — Corpus extraction round 2: 3 more paths

**Date:** 2026-09-09
**What:** Three new skills distilled from the corpus, one per the 5 themes the user named (logic/argument, moral, aesthetics/economy): `argument-construction`, `moral-reasoning`, `aesthetics-and-economy`. Each is a *path* (decision logic), not a vendored blog argument.
**Why:** The corpus had more load-bearing ideas than the round 1 bundle captured. The 5 themes mapped to 5 decision types a builder faces. Three of the five themes were net new; two (design thinking, meaning of life) were covered or weak.
**Diff:** `skills/argument-construction/SKILL.md`, `skills/moral-reasoning/SKILL.md`, `skills/aesthetics-and-economy/SKILL.md`
**Tags:** `corpus-extraction · round-2 · 100-skill-milestone`

---

## 2026-09-09 — Corpus extraction round 3: 3 more paths

**Date:** 2026-09-09
**What:** Three more skills from the same 5-theme map: `systems-thinking`, `qualitative-reasoning`, `design-anthropology`. The three stack as layers — SOURCE (where the counter-example comes from), JUDGMENT (how to reason in fuzzy territory), DECISION (the path when no right answer). `design-anthropology` is the SOURCE layer; `qualitative-reasoning` is the JUDGMENT layer; `moral-reasoning` is the DECISION layer.
**Why:** The remaining two themes (systems thinking, qualitative reasoning) were net new. The 5-layer map was the *minimum* needed to make the system robust.
**Diff:** `skills/systems-thinking/SKILL.md`, `skills/qualitative-reasoning/SKILL.md`, `skills/design-anthropology/SKILL.md`
**Tags:** `corpus-extraction · round-3 · layered-discipline`

---

## 2026-09-09 → 2026-09-10 — Agent community skills (Ponytail, Caveman, design-extract, gstack T1)

**Date:** 2026-09-09 → 2026-09-10
**What:** Eight community skills added: `ponytail` (YAGNI ladder, MIT-credited to DietrichGebert), `caveman` (output compression, MIT-credited to JuliusBrussee), `design-extract` (orchestrator for design-extraction tools), and 8 Tier-1 gstack skills (cso, canary, health, devex-review, careful, context-save, context-restore, learn).
**Why:** Each skill filled a real gap identified in the ecosystem survey. The community skills were attributed to their original authors; the Tier-1 gstack skills were distilled from the Gary Tan gstack (Tier 1 only; Tier 2/3 deferred).
**Diff:** `skills/ponytail/`, `skills/caveman/`, `skills/design-extract/`, `skills/cso/`, `skills/canary/`, `skills/health/`, `skills/devex-review/`, `skills/careful/`, `skills/context-save/`, `skills/context-restore/`, `skills/learn/`
**Tags:** `community-skills · attribution · gstack`

---

## 2026-09-10 — LLM stack refresh (free-api-keys, local-llm-ollama)

**Date:** 2026-09-10
**What:** Two changes to the LLM access path. (1) `free-api-keys` — a new skill with 13 no-card providers (Groq, Google AI Studio, Cerebras, OpenRouter, Cloudflare Workers AI, AI Horde, LLM7.io, Puter.js, Cohere, Mistral, NVIDIA NIM, Hugging Face, SambaNova) ranked by use case. (2) `local-llm-ollama` — refreshed with Gemma 4 e2b (8 GB slot), DeepSeek-R1 8B/14B/32B (reasoning), Qwen3 4B/8B/14B/30B (all-rounder), 5-row hardware profile (8/16/32/64/128 GB), and opencode CLI use with Muse Spark 1.6 free as the default no-card chat. (3) `reference/free-apis.md` expanded from 4 to 15 providers.
**Why:** The 2026 LLM access path needs both *offline* (local Ollama, for embeddings and drafts) and *free cloud* (for reasoning the small model can't do). The discipline: pick by *what the call is for*, not by cost.
**Diff:** `skills/free-api-keys/SKILL.md`, `skills/local-llm-ollama/SKILL.md`, `reference/free-apis.md`
**Tags:** `llm-stack · 2026-refresh · offline-and-cloud`

---

## 2026-09-10 — Adrian Martinez Curated Web Design Skills

**Date:** 2026-09-10
**What:** `adrian-martinez-curated-web-design-skills-2026` — a new skill distilled from Adrian Martinez's *55 Award-Winning Websites and Why They Work (2026)*. The 5 axes: perception, mechanism, intent, contrast, time. The two-part form: "Why it works" + "Business lesson". 14 tells to refuse.
**Why:** The user forwarded the article with a note: "It's so beautiful - how the descriptions transcend our perception of what visual designs can do to meaning of words and vice versa." The skill captures the *descriptive practice* — the discipline of writing *about* design with the same craft as the design.
**Diff:** `skills/adrian-martinez-curated-web-design-skills-2026/SKILL.md`
**Tags:** `aesthetics · design-description · sourced`

---

## 2026-09-10 — Cyber-hygiene + off-grid + the philosophical spine (playbook 16)

**Date:** 2026-09-10
**What:** Three changes. (1) `playbooks/16-the-philosophical-spine.md` — the *why* of the 100 skills, in one document. 5 layers (Moral & Judgment, Human-Centered Subject, Aesthetic & Economic, Systemic & Long-Term Invariants, Epistemic Humility & Truth Gates), 5 moves for the agent, 8 rules of cyber-hygiene, 6 rules of off-grid operation. (2) The 8 cyber-hygiene rules added: no secrets in repo, no proprietary code shipped as original, no public API without auth, no third-party library without SBOM, no backup without restore drill, no local data without backup/deletion plan, no production access without watch list, no deploy without verification. (3) The 6 off-grid rules added: plain Markdown is the source of truth, no JSX/MDX in source, complete book in `docs/`, local LLM is the fallback, validator is the gate, operator's memory is local.
**Why:** The user asked for the 4 operational requirements: cyber-hygienic, tight in operationalities, machine-readable, off-grid usable. The 5+5+8+6 rules codify all four.
**Diff:** `playbooks/16-the-philosophical-spine.md`
**Tags:** `philosophical-spine · cyber-hygiene · off-grid · 100-skill-anchor`

---

## 2026-09-10 — Ecosystem survey 2 (3 net new skills + 4 declined)

**Date:** 2026-09-10
**What:** The user asked about 7 ecosystem skills: browser use, agentmemory, scientical agent skills (K-Dense 165), diagram design, anthropic cybersecurity (mukul975 818), awesome harness engineering (walkinglabs), OpenViking. 3 net new: `browser-use` (the INTERACTION layer, pairs with browser-as-t the VERIFICATION layer), `diagram-design` (the 7 rules for diagrams that survive being looked at), `research-methodology` (the 7 moves for research that survives the test of time). 3 declined: agentmemory (covered), anthropic-cyber (vendor pack anti-pattern), awesome-harness-eng (the repo IS the answer). 1 deferred: OpenViking (parallel implementation of obsidian-mcp-forge; reference not skill).
**Why:** Each of the 3 net new skills filled a real gap. The vendor-pack candidates were declined to preserve the *path* discipline (not the content).
**Diff:** `skills/browser-use/SKILL.md`, `skills/diagram-design/SKILL.md`, `skills/research-methodology/SKILL.md`
**Tags:** `ecosystem-survey-2 · 103-skill-milestone · discipline-extraction`

---

## 2026-09-11 — The Tesla framing (Antigravity)

**Date:** 2026-09-11
**What:** A new section in `README.md` ("The Shift: From Stick-Shift Driving to the Autonomous Tesla") and a new section in `QUICKSTART.md` ("0. The 60-Second Autonomous Tesla Bootstrap"). The framing introduces the "Passenger-Director" mental model and the 4-decision framework (Destination, Speed, Superchargers, In-Cabin Experience).
**Why:** The user requested a beginner on-ramp and a "Passenger-Director" / "autonomous" framing for non-technical users. The change is documented as 4fab67c by Antigravity (Google's agent).
**Caveat:** The "Passenger-Director" framing overlaps with the existing `director-not-typer` skill (which carries the same thesis: "Keep human intent and taste separate from agent implementation mechanics"). The 4-decision framework is the load-bearing part; the metaphor is the wrapper.
**Diff:** `README.md`, `QUICKSTART.md`
**Tags:** `on-ramp · parallel-agent · mental-model`

---

## 2026-09-11 — About + Journal + build-journal (this entry)

**Date:** 2026-09-11
**What:** Three additions. (1) `ABOUT.md` — the author + research + origin story, with the 7 core components from the corpus and the 3-arc lineage. (2) `JOURNAL.md` (this file) — the flight recorder. (3) `skills/build-journal/SKILL.md` — the discipline of maintaining the journal.
**Why:** The user said "I always have an About button where I talk about myself and provide research to go with that particular work. Also build that in, because I think it's always good to have a black box, like a flight record, with you at all times. That way, people know what has been built, what has been added, and what has been discussed. You can do this by prompting AI to keep a recording of all this information on your behalf. Your About section and research section should include the core components of the work you started off with there first, before it later on became the system."

The iPhone-unboxing principle: the new builder should not need to ask the author for any step. The About is the device; the Journal is the full battery; the QUICKSTART is the first boot.
**Diff:** `ABOUT.md`, `JOURNAL.md`, `skills/build-journal/SKILL.md`, `README.md` (trim Tesla), `QUICKSTART.md` (trim metaphor)
**Tags:** `about · journal · iPhone-unboxing · user-experience`
