---
name: no-design-tells
description: Stop shipping UI a stranger can spot as agent-built. Use before any visual work.
license: MIT
---

# No Design Tells

> The sibling of `no-ai-tells`. That one catches machine-written prose. This one catches machine-*designed* surfaces. Same taxonomy, different layer — and neither substitutes for the other.

People identify agent-built sites in about a second. Not from one smoking gun — from a **stack** of defaults: Inter, a purple gradient, three identical cards, "seamlessly transform your workflow," and a `border-radius: 12px`. Any one is a choice. Five together is a fingerprint.

This skill is the registry of those tells, the honest account of which ones a disciplined system now trips anyway, and the positive rules that close the gap.

---

## 1. The stack doctrine

**Score the stack, not the item.**

A surface can pass every individual ban and still be obviously generated, because the tells that remain are the ones no rule named. A surface can also break a rule deliberately and read as authored, because the break is load-bearing and everything around it is specific.

The ship question is never *did I violate a rule.* It is:

> **Would someone who has seen thirty agent-built sites place this one among them?**

---

## 2. The tell registry

### Typography — the strongest visual tell
Banned: **Inter, Roboto, Open Sans, Lato, Poppins, Montserrat, Geist, Space Grotesk, Manrope, DM Sans, Instrument Serif**, and `system-ui` as a primary face.

Inter is the worst offender precisely because it is good — which is why it is everywhere, and why it now signals *nobody chose this.*

### Colour
- **VibeCode purple** — any indigo/violet/purple gradient or accent (`#6366f1 #8b5cf6 #a855f7 #7c3aed`). The most-cited palette tell of the era.
- Tailwind default blue `#3b82f6`.
- Gradient text on headings (`bg-clip-text`).
- Neon accents on near-black; cyan-on-dark.

### Provenance — invisible in a screenshot, obvious in View-Source
The layer most checklists forget:
- `<meta name="generator">` naming the builder.
- Builder hosts: `lovable.app`, `bolt.new`, `v0.dev`, `.framer.app`.
- Client-side calls to `api.anthropic.com` / `api.openai.com` — which also leaks the key.
- API-key literals (`sk-ant-…`, `sk-…`, `AIza…`). A key that touched history is burned, not deleted.
- `localhost:5173` / `127.0.0.1` shipped to production.

Scan built output, not just source — this layer lives in the bundle.

### Layout reflexes
Three identical cards in a row · centred everything · equal-weight grids where every card is interchangeable · nested cards · `01/02/03` step rhythm · fake-precision stats (`99.9%`, `10k+`, `24/7`) with no source · sparkle and "Now in Beta" pills · bento grids · decorative glassmorphism.

**And the dashboard-specific one:** every screen a slight variation of the same card grid instead of a purpose-built flow. Multi-screen sameness is the tell a portfolio of dashboards is most exposed to.

### Copy
Defer to `no-ai-tells` for the full taxonomy. Worst offenders: *seamless, cutting-edge, transform your, unlock the power, elevate your, revolutionise, supercharge, delve, tapestry.*

---

## 3. The trap — restraint is now the default

Read this part twice.

The 2026 generated default is no longer purple gradients. It is **restraint**: warm off-white ground, a serif accent, hairline rules, tracked-out uppercase eyebrows, one muted accent, generous whitespace, near-black-and-one-colour dashboards.

That is a description of most well-disciplined design systems, including this practice's own.

The convergence is not anyone's fault — the models learned restraint from the same canon (Rams, Vignelli, Swiss grid) the good systems descend from. But the consequence is concrete: **compliance and distinction have come apart.** The tells a mature system bans are the ones the *previous* generation of generators had. The look it mandates is what the *current* generation produces.

| A disciplined system's rule | What it now shares with the default |
|---|---|
| Warm off-white ground | Cream/beige is the "tasteful" 2026 default |
| Hairline rules, no shadows | Broadsheet hairline layouts are a named tell |
| Tracked uppercase micro-labels | "Template chrome" |
| Middle-dot meta strings (`A · B · C`) | "Template chrome" |
| Near-black + one accent | The current dark-dashboard default |

**The response is not novelty.** Adding a gradient to prove a human made it is the same failure pointing the other way. The response is §4 — the craft a generator skips because nothing forces it to.

---

## 4. The positive half — bans alone converge on the average

A page defined only by what it avoids becomes the average of what remains. Commit to four things *before the first line of CSS*, written into the project's `context.md`.

**1. The Design Read — one sentence.**
> *"Quiet editorial. High-contrast ink on cream. Strong hierarchy, asymmetric, one dominant number per section."*

If it could describe any other surface you own, it is not specific enough yet.

**2. A named reference.** Not "clean and modern" — unenforceable. Name a real artifact: *the Braun ET66*, *the 1972 Vignelli subway diagram*, *moma.org*, *a Linear product page*, *a specific magazine spread*. An agent can reason about a named reference; it cannot reason about an adjective.

**3. The MoMA layout rules.**
1. Clean and visually stunning — minimal is the floor, not the goal.
2. **Lines carry different weights when they play different roles.** A structural divider is not a cell separator is not an emphasis rule. Uniform 1px hairlines everywhere is itself a flatness tell: it says nobody decided which line mattered.
3. Invisible grid — everything locks in, nothing left hanging, every edge resolves to another edge.
4. Spacing compact and beautiful. No lingering whitespace.
5. Simple mechanics, simple movements. Motion confirms, never performs.
6. Classy colour — restraint over range.
7. Consistency is the gold standard.

**4. Hierarchy and asymmetry.**
- One element dominates each section. A grid where everything weighs the same is a grid where nothing was decided.
- Never a 50/50 split. Golden section, or 2/3 + 1/3.
- Hero content off-centre — columns 2–8, not centred.
- Vary card sizes when importance genuinely differs. Equal cards are correct only for genuine peers.
- Every value from a token. No hard-coded hex, no raw pixel spacing.

---

## 5. Rejected advice, recorded

A widely-circulated anti-slop prompt advises *"prefer atmosphere — subtle texture, layered backgrounds, geometric patterns — over flat solid colours."*

**Rejected** in this practice. It contradicts the materials rule (surfaces do not pretend to be things they are not) and the ban on decorative texture behind text. Atmosphere comes from type, spacing and line weight — never applied texture. Recorded here so a later agent who has only read the prompt does not re-adopt it.

---

## 6. The gate

The detector ships with the Axiom and Rams × NYCTA design cores:

```bash
npx axiom-audit .            # source
npx axiom-audit dist         # built output — provenance tells live here
npx axiom-audit . --strict   # CI: exit 1 on errors
```

`error` = unambiguous violation, fails the build. `warn` = judgment call, a human decides.

Then answer in writing:

```
□ DESIGN READ    — one sentence in context.md, specific to this surface
□ REFERENCE      — a named real artifact, not an adjective
□ DOMINANCE      — which single element dominates? Name it.
□ ASYMMETRY      — where is the split that is not 50/50?
□ LINE WEIGHTS   — do rules differ by role, or is everything 1px?
□ THE STACK      — would a stranger place this among thirty generated sites?
□ AUDIT          — --strict exits 0, and dist is clean
```

An unchecked box is unfinished work, not a style opinion.

---

## Pairs with

`design-dna` (the enforceable token contract) · `design-registers` (which register this surface is) · `anti-regression` (do not let cleanup undo it) · `no-ai-tells` (the prose layer of the same problem).
