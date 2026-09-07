---
name: narrative-companion-surfaces
description: Pair writing with honest computed companion surfaces. Use when essays need interactive views or a dashboard's computed or live claim needs verification.
license: MIT
---

# Narrative Companion Surfaces

The pattern behind `100daysofnon`'s "warm book, dark machine" architecture — a first-person narrative corpus (99 blog posts, 239,110 words) paired with computed companion surfaces (a portrait, a question set, an atlas, a "workshop" showing the extraction process itself). The reusable part is the honesty discipline underneath it, not the specific surfaces.

## The real architecture — and the honest gap between claim and mechanism

The site's own colophon says a surface's content is "computed fresh each visit." What that actually means, verified against the code: a human (or an agent, source-checking against `corpus.json`) pre-extracts and verifies a fixed pool of verbatim quotes — 38 sentences for the portrait, 18 questions for the question set, each carrying its source essay — and hardcodes that pool as literal string constants in the page. **"Fresh each visit" means the client re-shuffles and samples from that fixed, pre-verified pool — it is not live computation against the source corpus on every load.** The "Workshop" surface's live-looking compute console (eight named "workers" — Archivist, Witness, Scribe, Fact-Checker...) is the same shape one level up: a pre-written, timed log-line playback synced to highlighting real passages in an embedded reader, not a running pipeline.

This is not a criticism of the build — it's the correct, honest version of the pattern, and worth stating explicitly because the alternative (a live LLM regenerating "verbatim" quotes from the corpus on each request) would be strictly worse: slower, costs tokens, and reintroduces exactly the fabrication risk the whole system exists to avoid. **Pre-verify once, shuffle forever** is the right shape for "grounded in a fixed corpus" content. Say so plainly rather than letting "computed fresh" imply more than it does — this is [`result-honesty`](../result-honesty/SKILL.md)'s replacement-vocabulary discipline applied to a content system instead of a status report: "computed fresh" is the content-pattern equivalent of "done," and "pre-verified, shuffled at render" is its honest replacement.

## The enforcement mechanism — structural, not procedural

There is no runtime validator diffing the companion surfaces against the source corpus for drift. The guarantee is structural: because the content is literal string constants with a `source` field, not a generation step, **there is no code path where a model could invent a sentence** — the "computation" is selection and permutation over a closed, pre-audited set. Compare this to a system enforcing "no fabrication" via an LLM system prompt (a `NEVER` list, a hard-constraint sentence) — that's inherently softer, since it depends on a model obeying an instruction. A closed, hand-verified pool with no generation step is a harder guarantee than any prompt can be. When building a "grounded in real source material" surface, prefer the structural version: extract and verify once, then only ever select/shuffle/reorder at runtime — never regenerate.

## When to reach for this pattern

Any project pairing a real personal or organizational narrative with an interactive or "computed-looking" presentation layer — a company's history page with a data-driven timeline, a memoir site with a searchable theme index, any "here's what the data says about this story" surface. The test before shipping: can you point to the exact pool of pre-verified content backing every visible item, or is something being generated at request time? If generation is happening, either accept the softer (prompt-level) guarantee explicitly and label it as such, or move the verification step earlier so the runtime path is pure selection.

## Where this connects

`_toolkit/the-non-writer` draws on an overlapping but larger corpus snapshot and is a *separate* tool — it re-voices arbitrary text or answers questions in-voice via a live LLM call grounded by search, which is the softer prompt-level guarantee described above. It is not wired into the companion-surface pipeline and serves a different job (writing assistance, not corpus-grounded display). The general design principle behind reflection surfaces — "dashboards with an annotation/why-does-this-matter layer outperform pure-data ones" — is stated workspace-wide; `100daysofnon` is currently the only place it has been built out as a full multi-surface system.
