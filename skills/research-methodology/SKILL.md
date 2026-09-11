---
name: research-methodology
description: Use when a research project must be done — gather, evaluate, synthesize, cite. The 7 moves for research that survives the test of time. Pairs with data-catalog.
license: MIT
---

# Research Methodology

> Research is the discipline of *knowing what you know* and *knowing what you don't*. The discipline below is the path of doing research that survives the test of time — research where the claim is *true*, the claim is *cited*, and the research is *reproducible*.

This skill is the *decision logic* for doing research — gathering, evaluating, and synthesizing evidence. The trigger is the moment an agent or operator needs to:

- Answer a question that is not directly available (no API, no doc, no person to ask).
- Verify a claim that has been made (in a brief, in a paper, in a message).
- Synthesize a body of work (a literature, a corpus, a set of docs).
- Build a knowledge base that survives the test of time (a `data-catalog`, a `playbook`, a `reference`).

The discipline is the same whether the research is for a market analysis, a technical decision, a scientific question, or a legal brief. The medium differs; the *path* is universal.

**Provenance:** distilled from three converging practices — the K-Dense Scientific Agent Skills library (165 research skills, the largest open collection), the Anthropic Cybersecurity Skills library (818 skills with evidence-bounded hypothesis generation), and the repo's own [`data-catalog`](../data-catalog/SKILL.md) (the data side), [`qualitative-reasoning`](../qualitative-reasoning/SKILL.md) (the judgment side), and [`power-of-hindsight`](../power-of-hindsight/SKILL.md) (the retrospective side). The skill is the *path* distilled from the 165 + 818 skills' discipline, not the vendored content.

---

## The 7 moves in order

When the agent is about to do research, the first move is *not* to search. The first move is to **name the question**.

### 1. Name the question before the search

> "What is the question?"

The question is the *contract*. The agent's job is to answer the question, not to "do research" in general. A research project without a question is a *search*; a research project with a question is *research*.

The discipline of naming the question:

- The question is *specific* (not "tell me about X" but "what is the X of Y in Z context").
- The question is *falsifiable* (the answer can be wrong; the research can be wrong).
- The question is *answerable from evidence* (the answer is in the data, not in the questioner's preference).

If the agent cannot name the question in one sentence, the research is not yet ready.

### 2. Name the sources before the search

Before the agent searches, the agent names the *sources* that are likely to answer the question:

- **Primary sources**: the original publication, the original dataset, the original measurement.
- **Secondary sources**: the citation graph of the primary source, the review article, the textbook.
- **Tertiary sources**: the summary, the Wikipedia article, the blog post.

A research project that does not name the sources is a research project that accepts whatever Google returns. The discipline is *the agent names the sources it expects to find, then verifies the search returned the sources it expected*.

### 3. Evaluate the source on lineage and age

When the agent finds a source, the source is evaluated on two axes:

- **Lineage**: where did the source come from? Is it a primary source (the original measurement) or a secondary source (a citation)? Is the citation chain intact? Is the author credible?
- **Age**: when was the source published? Is the source *current* (relevant to the question today) or *historical* (relevant to the question as it was)?

A source that is *recent* but has *no lineage* (e.g., a blog post with no citation) is suspect. A source that has *lineage* but is *old* (e.g., a 2010 paper on a fast-moving field) is also suspect. The discipline is *the source has both*.

The skill analogue: [`honest-envelope`](../honest-envelope/SKILL.md) — the same lineage + age discipline applied to *displayed numbers*. The source has a lineage and an age; the displayed number has a lineage and an age. The same honesty.

### 4. Triangulate the claim

A single source is a *claim*; multiple independent sources are a *finding*. The discipline of *triangulation*:

- Find the *primary* source (the original measurement).
- Find the *independent confirmation* (a different author, a different method, a different time).
- Find the *disconfirmation* (a source that contradicts the claim). The disconfirmation is the *most valuable* source; it tells the agent where the claim's limits are.

A claim that survives triangulation is a finding. A claim that does not survive triangulation is a hypothesis. The agent's job is to *report* the difference, not to *smooth* it.

### 5. Cite the source, not the claim

A claim without a citation is a *belief*. A claim with a citation is a *finding*. The discipline of citation:

- Cite the *primary* source, not the secondary source. (If the agent cites the Wikipedia article, the agent has not read the original paper.)
- Cite the *specific page* or *specific section*, not the whole document. (If the agent cites the whole book, the agent has not found the specific passage.)
- Cite the *date accessed*, not just the publication date. (The agent's research is current; the publication is historical.)

A citation that does not let the reader find the source is a *broken* citation. The discipline is *the citation is a path, not a name*.

### 6. Separate fact from inference

A *fact* is something the source says. An *inference* is something the agent concludes from the source. The discipline of separation:

- **Facts** are quoted verbatim, with the citation.
- **Inferences** are labeled as the agent's, with the reasoning.

A research report that *blends* facts and inferences is a research report that *misleads* the reader. The reader cannot tell which is which. The discipline is *the fact is in quotes, the inference is the agent's*.

The skill analogue: [`result-honesty`](../result-honesty/SKILL.md) — succeeded / failed / skipped / unverified. The research report is *succeeded* (the source is cited) only if the fact-inference separation is honored.

### 7. Reproduce the result before shipping it

A research result that is not reproducible is a *belief*. The discipline:

- The agent's research should be *re-runnable* (the same search, with the same query, should return the same sources).
- The agent's research should be *re-checkable* (a different agent, with the same sources, should reach the same conclusion).
- The agent's research should be *time-stamped* (the search happened on date X; the source existed on date X; the source may have changed since).

A research result that is reproducible is a research result that survives the test of time. A research result that is not reproducible is a research result that *vanishes* the moment the agent's session ends.

The skill analogue: [`restore-drill`](../restore-drill/SKILL.md) — a dated restore, not a green backup. A dated research result is *reproducible*; a research result without a date is a *green backup* (the agent thinks it has the result, but cannot prove it).

---

## The corollary disciplines

### 1. The "is the question the right question" check

When the research is finished, the agent runs the *question check*: *was the question the right question?*

- Did the question *emerge* from a real need, or was the question *imposed* by the brief?
- Did the question *evolve* during the research, or did the question stay the same?
- Did the question *yield* a useful answer, or did the question yield a *yes* / *no* / *it depends*?

A research project whose question did not yield a useful answer is a research project that should be *re-asked*, not *extended*. The discipline is *the question is the first deliverable, and the question is re-asked if the answer is not useful*.

### 2. The "what would change my mind" check

When the research is finished, the agent runs the *change-of-mind* check: *what would change the agent's mind?*

- A new source that contradicts the finding?
- A new measurement that updates the data?
- A new framework that reframes the question?

A research project without a *change-of-mind criterion* is a research project that *cannot be wrong*. A research project that cannot be wrong is a *belief*, not a research project.

The skill analogue: [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) §1a *Reflexivity* — the observer is in the observation. The change-of-mind criterion is the reflexivity applied to research.

### 3. The "what is the agent's own bias" check

When the research is finished, the agent runs the *bias check*: *what is the agent's own bias in this research?*

- Did the agent *prefer* a particular outcome? (Confirmation bias.)
- Did the agent *avoid* sources that contradicted the claim? (Avoidance bias.)
- Did the agent *weight* the sources by the source's alignment with the agent's prior? (Motivated reasoning.)

A research project without a bias check is a research project that *inherits* the agent's priors. The discipline is *the agent's bias is named, the agent's bias is reported, the reader can correct for the bias*.

The skill analogue: [`design-anthropology`](../design-anthropology/SKILL.md) — bad-faith detection. The bias check is the bad-faith check applied to research.

### 4. The "is the source current" check

When the research is finished, the agent runs the *currency* check: *is the source still current?*

- The source may have been *retracted*.
- The source may have been *superseded* by a newer source.
- The source may have been *corrected* (the agent's citation may be to an older version).

A research project without a currency check is a research project that *freezes* the source at the moment of citation. The discipline is *the source is current at the moment of citation, and the source is re-checked before the research is published*.

### 5. The "is the synthesis faithful" check

When the research is finished, the agent runs the *synthesis-faithfulness* check: *is the synthesis a faithful representation of the sources?*

- Did the agent *emphasize* the parts of the sources that fit the claim?
- Did the agent *minimize* the parts of the sources that did not fit the claim?
- Did the agent *add* a conclusion that the sources did not support?

A research project without a synthesis-faithfulness check is a research project that *bends* the sources to fit the claim. The discipline is *the synthesis is the sources, not the agent's interpretation of the sources*.

---

## What this skill is *not*

- It is not a substitute for domain expertise. The skill is the *discipline*; the domain expertise is the *content*. The agent can follow the discipline and still produce a research result that is wrong, if the domain expertise is missing.
- It is not a substitute for the data. The skill is the *path*; the data is the *evidence*. The two stack: data first, research second.
- It is not a substitute for the human's judgment. The skill is the *discipline*; the human's judgment is the *wisdom*. The two stack: discipline first, judgment second.
- It is not a guarantee of correctness. A research project that follows all 7 moves can still be wrong. The discipline is the *path*; the correctness is the *result*. The path can be right; the result can still be wrong. The discipline is *the path is reproducible*; the *result* is what the path returns.

## Pairs with

- [`data-catalog`](../data-catalog/SKILL.md) — the data side. The research-methodology skill is the *path*; `data-catalog` is the *place* the research is recorded. The two stack: research produces the data, `data-catalog` records the data.
- [`qualitative-reasoning`](../qualitative-reasoning/SKILL.md) — the judgment side. The research-methodology skill is the *evidence* layer; `qualitative-reasoning` is the *judgment* layer. The two stack: research produces the evidence, `qualitative-reasoning` reasons about the evidence.
- [`power-of-hindsight`](../power-of-hindsight/SKILL.md) — the retrospective side. The research-methodology skill is *forward-looking* (the question, the source, the citation); `power-of-hindsight` is *backward-looking* (the data, the analysis, the reconstruction).
- [`argument-construction`](../argument-construction/SKILL.md) — the formal-fallacy layer. The research-methodology skill is the *evidence* layer; `argument-construction` is the *form* the evidence is presented in. The two stack: research produces the evidence, `argument-construction` ensures the form is sound.
- [`honest-envelope`](../honest-envelope/SKILL.md) — the displayed-numbers discipline. The same lineage + age discipline, applied to *displayed numbers*. A research result has a lineage and an age; a displayed number has a lineage and an age.
- [`result-honesty`](../result-honesty/SKILL.md) — succeeded / failed / skipped / unverified. The research result is *succeeded* (the source is cited, the fact-inference separation is honored) only if all 7 moves are run.
- [`narrative-companion-surfaces`](../narrative-companion-surfaces/SKILL.md) — the show-the-work discipline. The research result is a companion surface for the writing; the writing carries the prose, the research carries the evidence.

## Check

A "research" project is *ready* to ship when:

- The question is named in one sentence (specific, falsifiable, answerable from evidence).
- The sources are named before the search (primary, secondary, tertiary).
- Each source is evaluated on lineage and age.
- The claim is triangulated (primary + independent confirmation + disconfirmation).
- Each citation is the *primary* source, with the *specific page/section*, and the *date accessed*.
- Each fact is quoted verbatim, with the citation. Each inference is labeled as the agent's, with the reasoning.
- The research is reproducible (the same search returns the same sources).
- The question check was run: was the question the right question?
- The change-of-mind criterion is named: what would change the agent's mind?
- The bias check was run: what is the agent's own bias in this research?
- The currency check was run: is the source still current?
- The synthesis-faithfulness check was run: is the synthesis a faithful representation of the sources?
