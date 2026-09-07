---
name: design-method
description: Diverge, prototype, subtract. Use when the approach is unclear.
license: MIT
---

# Design Method

> Sources: Peter G. Rowe, *Design Thinking* (1987) · Tom Kelley, *The Art of Innovation* (2001) · Tom & David Kelley, *Creative Confidence* (2013) · John Maeda, *The Laws of Simplicity* / *Design By Numbers* (2001–2006).

Four books on how design actually proceeds — as opposed to how it is described afterwards.

---

## 1. Rowe — design reasoning is episodic, not linear

Rowe studied what designers *do*, and found it is not a pipeline. It is a series of episodes, each anchored by a governing idea, punctuated by the designer hitting a wall and restructuring the problem.

Two findings that change practice:

- **The first framing is a hypothesis, not a brief.** Designers routinely discover the real problem is adjacent to the stated one. A build that never reframes has skipped a step, not saved one.
- **Anchoring is powerful and dangerous.** An early governing idea organises everything that follows — including evidence against it. Rowe observed designers defending a first move long past its usefulness. **Name your governing idea explicitly, so it can be abandoned explicitly.**

The practical form: write the one-sentence idea driving the build. When something fights it three times, the idea is the suspect — not the implementation.

## 2. Diverge before you converge

Premature convergence is the most common failure mode in agent-assisted work, because the first plausible answer arrives in two seconds and looks finished.

**Generate three genuinely different candidates before choosing.** Not three variations of one idea — three different *governing ideas*. If the second and third are obviously worse, that took ninety seconds and the first is now a decision instead of a default.

Kelley's brainstorm rules, the ones that survive contact with reality:
- Defer judgment; a critique in the generative phase kills the next four ideas, not just this one.
- Build on others' ideas rather than replacing them.
- **Go for quantity** — volume is what breaks the grip of the first idea.
- One conversation at a time; stay on topic; be visual.

## 3. Prototype to think, not to demonstrate

The Kelleys' central operational claim: a prototype is a **thinking instrument**, and its value is inversely proportional to how finished it looks. A polished prototype invites approval; a rough one invites correction.

- **Fail small and early on purpose.** Less has been built, so less has to be undone.
- **Ship the smallest testable thing.** A live URL beats a local demo beats a spec beats a meeting.
- **Creative confidence is learnable**, and it is built by surviving small public failures — not by talent. The corollary for a solo practice: shipping imperfect things frequently is the training regime, not a compromise.

## 4. Maeda — the laws that actually bind

Maeda's simplicity work, reduced to what changes code:

- **Reduce.** The simplest way to achieve simplicity is thoughtful removal. Ask *what can I remove* before *what can I add* — and if the last edit only added, the pass is not finished.
- **Organise.** Organisation makes a system of many feel like fewer. This is why grouping and districts beat deletion when the content genuinely must stay.
- **Time.** Savings in time feel like simplicity. Latency is a design property, not an engineering detail.
- **Context.** What lies in the periphery is not peripheral. The surrounding space is doing work.
- **The tenth law:** simplicity is about subtracting the obvious and adding the meaningful. Subtraction alone produces something bare, not simple.

*Design By Numbers* adds the point underneath his whole career: **computation is a design medium with its own grain.** A design that could have been drawn by hand is not using it. Generated layout, real data shaping form, behaviour as material — that is what the medium offers, and it is also the honest answer to "why does this look like a template": templates ignore the grain.

## 5. The order these go in

```
1. State the governing idea in one sentence.          (Rowe)
2. Generate three different ones. Keep the best.      (Kelley)
3. Build the roughest thing that tests it.            (Kelley)
4. Ship it somewhere real and watch.                  (Kelley)
5. Remove until removing breaks it.                   (Maeda)
6. If the idea fought you three times, replace it.    (Rowe)
```

---

## The check

```
□ Is the governing idea written down where it can be abandoned?
□ Were three different ideas generated, or one idea three times?
□ Is the prototype rough enough to invite correction?
□ Is it live, or still local?
□ Did the last pass remove anything?
□ Does this use computation as a medium, or just render a layout?
```

Pairs with `design-thinking-vibecoding`, `planning-discipline`, `ninja-innovation`, `no-design-tells`.
