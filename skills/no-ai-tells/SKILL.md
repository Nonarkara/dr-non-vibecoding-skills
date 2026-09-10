---
name: no-ai-tells
description: >-
  Use before shipping any generated text, or to humanize AI-sounding copy. Kills
  mechanical AI-writing tells (Wikipedia's taxonomy) and replaces them with plain,
  chosen prose.
license: MIT
---

# No AI Tells

> The sibling of `no-design-tells`. That one catches machine-*designed* surfaces. This one catches machine-written prose. Same taxonomy, different layer — and neither substitutes for the other.

People spot machine-written text in one pass. Not from a single smoking gun — from a **stack** of defaults: banned vocabulary (`delve`, `tapestry`, `leverage`), inflated verbs (`serves as`, `boasts`), "not just X, but Y" constructions, reflexive triples, synonym-hopping, and "In today's world" openers. Any one is a slip. Four together is a fingerprint.

Influences: Wikipedia's
[Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
(the mechanical taxonomy — what makes text read as machine-generated regardless of
topic) and Dr Non's stated communication discipline. The taxonomy alone catches
the tells but offers no positive replacement; the discipline alone has the voice
but does not cross-check it against the tells.

---

## The one distinction that governs everything below

Two different registers. Do not mix them.

1. **UNIVERSAL — applies to every piece of text any agent generates**, in every project, every language: UI copy, button labels, error messages, empty states, dashboard microcopy, documentation, code comments, chat replies, commit messages. This is §1–§4 below.
2. **AUTHOR'S VOICE — applies only when writing first-person as Dr Non**: blog posts, bio copy, essays, anything under his byline. That register is already specified in his live rewriting engine (`nonwriter.nonarkara.org`) and is deliberately *not* duplicated here.

The failure mode this guards against: importing an author's essay voice — long unresolved paragraphs, mundane-to-philosophy escalation, deliberately withheld conclusions — into a dashboard button or an error message. Product copy stays dense and scannable; nothing below loosens that.

---

## Mode A vs Mode B — which one this session needs

- **Mode A (default)** — self-check discipline. Apply it silently before shipping any text an agent itself is about to generate.
- **Mode B** — active converter. Triggers when a human pastes existing text and says "humanize this," "run it through no-ai-tells," "make this sound less like AI," or hands over a draft from another tool that reads mechanically. Also fires automatically whenever pasted input trips three-plus items from §1.1's banned-vocabulary list or two-plus other §1 tells.

### Mode B procedure

1. **Scan** the pasted text against every subsection of §1. Note every hit — this is the diagnostic pass, not the output.
2. **Pick the register** before rewriting: product/docs/chat copy (→ §4, the default) or the author's first-person voice (→ §5). Default to product unless told otherwise.
3. **Rewrite** applying the §4 five-point standard: clear, communicative, concise, direct, good language. Cut what restates the obvious. Convert passive to active. Repeat exact nouns instead of synonym-hopping. Replace every inflated verb with a plain "is/are" where one fits.
4. **Run the §6 pre-ship checklist** against the rewrite before returning it — silently, do not narrate the checklist back.
5. **Output the rewritten text and nothing else.** No "Here's the humanized version:" preamble, no trailing summary (that preamble is itself a §1.10 tell). If a brief change-list was asked for, keep it to one line: `Cut: [tell types]. Rewrote: [what].`

Mode B never invents facts the original text didn't contain — it changes *how* something is said, not *what* is claimed. If the source is ambiguous or wrong on substance, flag that separately; don't silently "fix" a factual claim while humanizing the prose around it.

---

## §1 — The mechanical tells (kill these on sight, any text, any register)

### 1.1 The banned vocabulary (the single highest-value list — scan for these first)

Wikipedia tracked these across three eras of LLM output; they are the most statistically reliable AI tell there is. **Never use, in any generated text:**

`delve`, `boast(s)/boasting`, `crucial`, `tapestry`, `testament`, `underscore(s)`, `pivotal`, `landscape` (metaphorical — "the evolving landscape of…"), `garner(ed)`, `bolstered`, `interplay`, `intricate/intricacies`, `meticulous(ly)`, `vibrant`, `enduring`, `align/aligns with`, `foster(ing)`, `showcasing`, `highlighting`, `enhance(s)`, `emphasizing`, `nestled`, `in the heart of`, `groundbreaking`, `renowned`, `diverse array`, `rich` (as a filler intensifier — "a rich history"), `profound` (as a filler intensifier), `leverage` (as a verb), `utilize`, `robust`, `holistic`, `synergy`, `paradigm`, `journey` (metaphorical — "our sustainability journey"), `it is important to note that`, `at the end of the day` (unless literal)

If a draft contains three or more of these, it reads as machine-generated regardless of what it says. Rewrite with a concrete verb and a specific claim instead.

### 1.2 Avoidance of "is/are" (the copulative-avoidance tell)

AI writing systematically replaces plain "is/are" with inflated verbs: **serves as, stands as, marks, functions as, operates as, represents, boasts, features, maintains, offers, refers to.**

Fix: use "is." *"The dashboard serves as a tool for tracking flood risk"* → *"The dashboard tracks flood risk."* Plain copulatives are not weak writing — Orwell and Strunk both taught the opposite.

### 1.3 Negative parallelism templates

Ban these exact rhetorical shapes:
- **"Not just X, but also Y"** / "Not only… but" / "This is not just…, it's…"
- **"It's not X, it's Y"**
- **"X rather than Y"** used as a rhetorical flourish (not a genuine technical contrast)

These are LLM sentence-generation defaults, not a natural way to make a contrast. If a real contrast is needed, state both halves as plain independent claims.

### 1.4 The "rule of three"

`adjective, adjective, adjective` or `short phrase, short phrase, and short phrase` — the reflexive triple. Not every list needs exactly three items; a real list has as many items as the content has, not a rhetorically pleasing count.

### 1.5 Elegant variation (synonym-hopping)

AI text avoids repeating a word by cycling through near-synonyms mid-passage — calling the same thing "the platform," then "the system," then "the tool," then "the solution" in four consecutive sentences. **Repeat the exact word.** Precision beats variety.

### 1.6 Undue-significance / superficial-analysis phrasing

Banned constructions: *"stands/serves as a testament to,"* *"underscores the importance of,"* *"plays a crucial/pivotal role,"* *"reflects a broader trend,"* *"marking a significant shift,"* *"highlighting/showcasing/fostering [X],"* any present-participle ("-ing") clause tacked onto a sentence to imply significance without stating it.

If something matters, say specifically why and to whom — one concrete sentence beats an abstract significance-claim every time.

### 1.7 Vague attribution / weasel wording

Banned: *"industry reports suggest,"* *"experts argue,"* *"some critics argue,"* *"observers have cited,"* *"several sources indicate,"* and "such as" used to imply an exhaustive list. Name the actual source. If there is no specific source, don't imply one.

### 1.8 Outline-like "challenges and future" formula

Banned rigid structure: *"Despite [positive claim], [subject] faces several challenges"* followed by a vague future-positive close. Also banned as section headers: **"Challenges and Legacy," "Future Outlook," "Future Directions," "Future Prospects."** This formula reads as a template regardless of the content poured into it.

### 1.9 Formatting tells

- **Title Case in headers** ("The Complete Guide To Building Dashboards") — use sentence case.
- **Overuse of bold** — mechanical bolding of every instance of a chosen term is a tell, not emphasis. Bold sparingly, one genuinely load-bearing phrase per section, not a pattern.
- **Inline-header vertical lists** — `• **Term:** description` repeated as the default structure for everything. Fine occasionally; a tell when it's the *only* structure a piece ever uses.
- **Em-dash overuse** — one or two per piece is normal prose; a chain of em-dash-separated clauses in every paragraph is the tell. Use a period or a comma instead.
- **Emoji as structural markers** (✅ this ❌ not that) instead of actual content — never in UI copy or docs unless the register is explicitly playful.
- **Curly quotes/apostrophes** in code or config — use straight quotes.
- **Skipping heading levels** (H2 straight to H4) and **horizontal rules placed right before a heading** — both are LLM markdown-generation artifacts, not intentional structure.

### 1.10 Communication-to-user tells

- **Hedging address to the reader** — "we might wonder," "one might consider," "it's worth noting that." State the claim.
- **Knowledge-cutoff or training-data disclaimers** — never relevant to a dashboard or a piece of docs; delete on sight.
- **Phrasal templates and unfilled placeholders** — "Welcome to [Product]!", "[Insert X here]" surviving into shipped copy.

### 1.11 Opener, closer, bullet, and tricolon bans

- **Never open with "In today's world" or any variant** ("In today's fast-paced digital landscape," "As we navigate an increasingly complex…"). If the piece needs an opener, open with the actual first fact.
- **Never end with "In conclusion," "Overall," or a summary of the points just made.** Closers are where AI text relapses even after the opener and body are clean.
- **Never use bullet points unless the source content is genuinely a list of parallel items.** A bulleted paragraph is prose wearing a list's clothes.
- **Never use bold-lead "`**Key takeaway:**`" formatting.** This is prose, not a slide.
- **Never use the tricolon-of-abstractions** — three abstract nouns in a row ("clarity, purpose, and meaning"; "innovation, collaboration, and growth"). Abstractions in triplicate carry no more information than one of them stated plainly.
- **Never open a sentence with "Furthermore," "Moreover," or "Additionally."** These are formal-transition padding, not connective tissue the reader needs.

---

## §2 — What NOT to import from Wikipedia's list

Wikipedia's page is written for *encyclopedia editing* — several of its categories are wiki-specific and irrelevant to dashboards, docs, and chat replies. Do not cargo-cult these into a UI-copy or docs review:

- Citation issues (broken DOIs, ISBNs, `utm_source=` params, unused named references) — a wiki-references problem, not a dashboard-copy problem.
- Category/template existence checks, edit-summary conventions, "permissions gaming" — MediaWiki-specific.
- Chatbot markup leakage (`oaicite`, `grok_card`, `[cite: 1]`) — a different failure mode (broken tool-output stitching), already prevented structurally, not a style issue.

If a future review checklist references these, that's a sign the checklist was copy-pasted from the wiki page without adaptation — the whole point of this skill is doing that adaptation once, here.

---

## §3 — The trap, mirrored

`no-design-tells` documents the 2026 convergence: restraint is now the generated default, so a disciplined system's rules can be the tell of the moment. Prose is caught in the same loop.

A clean pass that faithfully applies §1 still reads as generic unless it adds something specific. The fix is not novelty — it is §4, the positive replacements that a generator skips and a reviewer can verify. Bans alone converge on the average; the four named commitments below are what make the text read as chosen rather than predicted.

---

## §4 — Positive replacement, universal register (what to do instead)

Killing tells isn't enough — replace them with an actual discipline, not silence:

1. **Know your audience.** A dashboard operator scanning at arm's length needs a different sentence than a client reading a proposal. Write for the actual reader, not a generic "user."
2. **Say only what needs to be said.** Cut the sentence that restates what the UI already shows. No "summary of summary," no acknowledgment preambles, no recap of the user's own question.
3. **Be clear before being clever.** A pun or an aphorism is welcome — but only after the plain claim is already clear. Clever never substitutes for clear.
4. **Substance over style, always.** If a sentence sounds good but says nothing verifiable, cut it. This is the direct antidote to §1.6's "undue significance" tell — the fix isn't a different significance-phrase, it's a specific fact.
5. **Active voice.** Passive voice conceals who did what — Orwell's rule. "The bug was fixed" → "I fixed the bug." "Data is synced every 6 hours" → "The system syncs data every 6 hours."
6. **Short sentences over long ones**, in UI/docs register specifically. Cut adverbs; they signal a weak verb underneath.
7. **Read it aloud before shipping.** If you stumble, the reader will too — this is a real, applicable test even for an AI agent: re-read the generated copy as if speaking it, and cut anything that only works silently on the page.
8. **Show the worst case, not just the headline.** Don't write "ensuring reliability" (§1.6) — state the actual failure mode the system handles, or don't claim reliability at all.
9. **Non-possessive framing.** Never claim ownership language for the system ("our platform," "our solution") when "this dashboard" or the product's actual name says the same thing plainly.
10. **Plain words — no dictionary required.** The reader should never have to stop and look up a word to follow a complex idea. Complexity belongs to the idea, never to the vocabulary carrying it.
11. **Jargon-free, with one exception.** Skip jargon by default. When a term is unavoidable, or worth the reader recognizing on sight elsewhere, keep it and explain it inline, right where it appears — not in a glossary or a footnote.
12. **Register-appropriate — a story is not mandatory.** Rule 6's short sentences are the UI/docs default, not a universal law; a technical instruction stays a technical instruction, correctly followed is the only goal. Match the form to what the content actually is.
13. **Censor the audience, not your own ideas.** The agent-default failure mode is the opposite of the "rule of three" or the "hedging address" — it is **over-softening**. The model pre-hedges, adds disclaimers, pads with audience-apologetic openers ("I understand this is complex, but…"), and self-censors a sharp claim because it imagines a hostile reader. The fix is the writer's rule: the audience is *imagined*; the idea is *real*. Write the idea, then cut only the parts that don't carry it. If the sharp claim is wrong, the fix is to *be wrong precisely* — say the wrong thing in plain words, not to soften it into a non-claim. "Censor your own ideas" is a writer's disease; the cure is the discipline, not the softening.

---

## §5 — Author's personal voice (ONLY for first-person writing as him)

This register is already fully specified in Dr Non's live rewriting engine — `nonwriter.nonarkara.org`, with the executable procedure in its own agent-instruction file. It is *not* duplicated here. This section exists only to state precisely when it applies and how it differs from §1–§4, since the two are easy to conflate.

**Applies to:** blog posts, personal essays, bio copy under his byline, anything explicitly written in his first person.
**Does not apply to:** dashboard UI, docs, error messages, chat replies, code comments, client-facing copy that isn't first-person-Dr-Non.

The essay register:
- Opens from the mundane — a bike ride, a coffee shop, a desk lamp at 1am — and lets the idea escalate into philosophy **without announcing the transition.** No "this made me think about…"
- **Long, unbroken paragraphs.** Nested parenthetical digressions, sometimes mid-sentence. This is the direct opposite of §4 rule 6 — not a contradiction, it's the register boundary doing its job.
- **Never resolves.** The question stays open by design — "You might be right at this point," not a tidy close.
- **Cites philosophers as colleagues** — "Hume, whose idea Robert Wright writes about," never "(Hume, 1739)."
- **Dry, self-deprecating humor, announced openly** — *(pun not intended)*.

If a task is ambiguous about which register applies (e.g., "write the About page" — is that his own voice, or product copy?), default to §1–§4 (universal/product register) unless the task explicitly asks for his personal voice, since that's the far more common case. The product register stays governed by §1–§4; the two systems share a kill list (§1.1, §1.11) but not a voice.

---

## §6 — Pre-ship checklist

Before shipping any generated text (UI copy, docs, a chat reply going to a real user, a README):

- [ ] Zero words from the §1.1 banned-vocabulary list
- [ ] No "is/are" replaced by an inflated verb (§1.2)
- [ ] No "not just X but Y" / "not X, it's Y" / rhetorical "X rather than Y" (§1.3)
- [ ] No reflexive rule-of-three (§1.4) or synonym-hopping for the same referent (§1.5)
- [ ] No undue-significance phrasing, no vague "experts/sources say" (§1.6–1.7)
- [ ] No "Despite X, faces challenges" formula, no "Future Outlook"-style headers (§1.8)
- [ ] Sentence-case headers, sparse bold, no default-emoji-bullets, ≤1 em-dash per paragraph (§1.9)
- [ ] No hedging address to the reader, no disclaimers, no unfilled placeholders (§1.10)
- [ ] No "In today's world" opener, no "In conclusion/Overall" closer, no bullets unless genuinely parallel, no bold-lead "Key takeaway:", no tricolon-of-abstractions (§1.11)
- [ ] Every jargon term still standing is either necessary or explained inline (§4.11)
- [ ] The register actually fits the content — no story forced onto a technical instruction (§4.12)
- [ ] Read it aloud once — if you stumble, rewrite
- [ ] Could a reader without background follow this? If not, it hasn't been pushed far enough yet (§4.10, §4.14)
- [ ] If this is Dr Non's personal-voice register (§5), follow the engine's procedure and the same kill list — this checklist alone is not sufficient for that register

---

## Pairs with

`no-design-tells` (the designed-surface layer of the same problem) · `make-it-stick` (the clarity layer, run after the tells pass) · `honest-envelope` (numbers must carry source, tier, age) · `result-honesty` (report work in buckets, not adjectives) · `skill-writing` (keep generated help text, commit messages, and docs inside the same kill list).