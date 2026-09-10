---
name: caveman
description: >-
  Caveman output: 65% fewer tokens, byte-exact code and errors. Use when
  agent output is bloated. Pairs with ponytail for code brevity.
license: MIT
---

# Caveman

> Why use many token when few token do trick.

Cuts **65% of the agent's output tokens** by enforcing a terse, no-fluff register. Code, error messages, and file paths stay **byte-for-byte exact** — the bytes that have meaning are not paraphrased, summarised, or "fixed." The prose around them — the explanations, the headings, the "I'd be happy to help with that" — gets compressed.

This is the **output-compression** skill, distinct from [`ponytail`](../ponytail/SKILL.md) (which is **code-compression**: "don't write the function, use the one that exists") and from [`context-economy`](../context-economy/SKILL.md) (which is **status-reporting economy**: "match the response shape to the task"). The three pair together: ponytail cuts the code, caveman cuts the prose around the code, context-economy cuts the status report. A team that uses all three ships a tight change with a tight receipt.

The agent-facing form of [JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman) v2.6+, MIT-licensed, with credit. The skill is the small rock (the rule file); the upstream also ships a "big rock" proxy (BSL-1.1) that does runtime compression between the agent and the AI provider. This skill is the small rock only; the proxy is a separate install (`npm install -g @caveman-ai/cli`).

Influence: [JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman) (the rule), [`ponytail`](../ponytail/SKILL.md) (the code-compression pair), [`context-economy`](../context-economy/SKILL.md) (the status-reporting economy pair), [`result-honesty`](../result-honesty/SKILL.md) (the four-bucket status format the economy applies to).

---

## The four rules

The output is terse. Four rules, in priority order.

### 1. Compress the prose, keep the code

The agent's output is a mix of prose and code. The prose is compressible; the code is not. The rule: **every word in the prose is load-bearing; every byte in the code is load-bearing.** A line of TypeScript is not a candidate for "this could be shorter" — the line is what the runtime will execute. A paragraph of explanation is a candidate for "this could be one sentence" — the paragraph is what the human will skim.

The test: delete a sentence from the prose. Did anything load-bearing disappear? If no, the sentence is deleted. If yes, the sentence is kept. The test is run on the prose only; the code is exempt.

### 2. Code, errors, file paths, and identifiers stay byte-exact

The output of the agent includes code blocks, error messages, file paths, command names, package names, and identifier references. These are not paraphrased, summarised, "fixed," or "modernised." A `TypeError: Cannot read property 'x' of undefined` is reproduced exactly; it is not rewritten to `TypeError: cannot read x of undefined`. A `git push --force-with-lease` is reproduced exactly; it is not rewritten to `git push --force-with-lease` with a different flag spelling.

The rule: **the agent is a copy-paste rig, not a paraphraser.** A human reading the output will paste the code into a file; if the agent's output has changed a byte, the human pastes broken code. The cost of a paraphrased error is the same as the cost of a paraphrased command: the human's next 10 minutes are spent debugging the agent's "improvement," not the original problem.

The byte-exact discipline is what makes caveman different from a generic "be terse" prompt. "Be terse" lets the agent shorten the code; caveman forbids it. The agent has one tool to shorten — the prose — and one tool it may not touch — the code, errors, paths, and identifiers.

### 3. No meta-conversation, no preamble, no "happy to help"

The output does not start with "Sure!" or "I'd be happy to help with that" or "Let me explain how this works." The output starts with the answer. The agent has been asked a question; the question expects an answer, not a courtesy.

The rule: **the first sentence of the output is the answer to the question the operator asked, not a meta-acknowledgement of the question.** A test is the difference: delete the first sentence; is anything load-bearing gone? If the first sentence was the answer, deleting it removes the answer. If the first sentence was "Sure!", deleting it removes nothing. The "Sure!" is dead weight.

The same rule applies to closings: no "Let me know if you have any questions," no "Hope this helps," no "Feel free to ask for more." The output ends when the answer is delivered. A test is the same: the closing is the first thing deleted, and the answer survives.

### 4. Numbers and lists are exact, prose is compressed

The output may include measurements ("65% fewer tokens"), lists ("the four rules are..."), or code references ("see `ponytail/SKILL.md`"). The numbers, the list items, and the references stay exact. The prose that introduces them is compressed.

A "I noticed three things; let me walk through them" is compressed to "three things." A "The output was about 65% fewer tokens, give or take" is compressed to "65% fewer tokens." The compression targets the connective tissue, not the load-bearing claims.

---

## The byte-exact test

The load-bearing claim of this skill is that the **code, errors, paths, and identifiers are not paraphrased**. The agent has a test it can run on every output: pick one block of code and one error message from the output; ask "is this byte-exact the same as the source?" If yes, the output passes. If no, the output fails.

The test is **the agent's responsibility, not the human's.** The human is not going to diff the output against the source for every line. The agent is. The cost of running the test is one mental check; the cost of skipping it is a human's afternoon.

A team that adopts caveman and finds the agent paraphrasing code has not adopted caveman; the team has adopted "be terse" and is shipping broken code. The byte-exact rule is the test that distinguishes.

---

## What caveman is *not*

**It is not a summariser.** The agent does not summarise a 50-line function to a 5-line bullet list. The 50-line function is what the human needs to paste into their editor; the 5-line bullet list is what the human needs to read once. Caveman chooses the former.

**It is not an editor.** The agent does not "improve" the code while reproducing it. A `git status` output is reproduced with the same whitespace, the same branch name, the same order. The agent is a copy-paste rig; the agent's taste applies to the prose, not the code.

**It is not ponytail.** [`ponytail`](../ponytail/SKILL.md) decides *whether* to write the code; caveman decides *how* to write the prose around the code. A team that has a 5-line function and wants it terser uses ponytail ("can it be one line?"). A team that has a 5-line function and a 50-line explanation and wants the explanation terser uses caveman. The two pair: ponytail makes the code minimal, caveman makes the prose around it minimal.

**It is not context-economy.** [`context-economy`](../context-economy/SKILL.md) is the discipline of *matching the response shape to the task* — a one-line answer for a one-line question, a status report for a status request, a 30-line analysis for a 30-line decision. Caveman is the discipline of *compressing whatever the response shape is* — whatever the shape, the prose inside it is terse. A one-line response can be terser; a 30-line analysis can be terser. The byte-exact rule applies to both.

**It is not the upstream proxy.** The upstream ships a "big rock" proxy that runs between the agent and the AI provider and does runtime compression. That proxy is BSL-1.1 and is not what this skill is. This skill is the small rock — the rule file the agent reads. A team that wants the proxy too installs it separately; a team that wants only the rule installs only this skill.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The byte-exact rule | All code-bearing outputs | Every output that includes code includes a copy-paste rig. The rule is the test. |
| The prose compression | [`ponytail`](../ponytail/SKILL.md) | Ponytail is code-compression ("can it be one line?"); caveman is prose-compression ("can it be one sentence?"). Apply both. |
| The "first sentence is the answer" rule | [`result-honesty`](../result-honesty/SKILL.md) | The result-honesty four-bucket status report is already terse; the rule is the meta-discipline that makes every other report equally terse. |
| The "no meta-conversation" rule | [`context-economy`](../context-economy/SKILL.md) | Context-economy picks the response *shape*; caveman makes whatever shape was picked *terse*. |
| The "byte-exact" guarantee | [`browser-as-t`](../browser-as-t/SKILL.md), [`deploy-verification`](../deploy-verification/SKILL.md), [`canary`](../canary/SKILL.md) | These skills produce status reports that include code, errors, and command output. The byte-exact rule applies to every one. |
| The number-and-list rule | [`health`](../health/SKILL.md), [`learn`](../learn/SKILL.md) | These skills produce numbers and lists. The number-and-list rule applies to every one. |

---

## When not to use this skill

**A pedagogy.** A teacher explaining a concept to a learner is *not* the place for "first sentence is the answer." The compression that makes a status report readable makes a tutorial unreadable. A team that uses caveman for a teaching assistant has over-fit the rule.

**A first contact.** A user meeting a system for the first time benefits from the warmth, the orientation, the "here is what this does" preamble. Caveman on a first contact produces a one-line "the function is broken" with no orientation, and the user has to ask the orientation question. The byte-exact rule still applies; the prose-compression rule does not.

**A safety-critical explanation.** A doctor explaining a side effect, a pilot reading a checklist, a security incident post-mortem — these are the places where the cost of a missed word is the cost of a real failure. The prose-compression rule still applies to the routine parts; the load-bearing parts get the verbose treatment. A team that uses caveman on a safety-critical report must mark the load-bearing parts explicitly.

**A decision that needs the operator's buy-in.** A status report and a decision request are different. A status report is the result of a decision the agent already made; a decision request is a decision the agent wants the operator to make. The decision request needs the framing — what the agent considered, what it rejected, what it chose, what the trade-offs are. Caveman is right for the report; caveman is wrong for the request.

---

## The check

```
□ The first sentence of the output is the answer, not a meta-acknowledgement
□ No "Sure!", "I'd be happy to help", "Let me know if you have questions"
□ Code blocks are byte-exact the same as the source — agent ran the test
□ Error messages are byte-exact the same as the source — agent ran the test
□ File paths, command names, and identifiers are byte-exact
□ Numbers and lists stay exact; only the connective prose is compressed
□ A 50-line explanation is compressed by removing sentences; load-bearing claims survive
□ A 5-line explanation is left as 5 lines; the rule is "terser", not "tersest"
```

Pairs with [`ponytail`](../ponytail/SKILL.md) (code-compression), [`context-economy`](../context-economy/SKILL.md) (response-shape economy), [`result-honesty`](../result-honesty/SKILL.md) (the four-bucket status format), and the upstream [JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman) (the rule file and the proxy, MIT for the skill / BSL-1.1 for the engine).
