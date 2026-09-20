---
name: couple-dont-silo
description: >-
  Layer unrelated public datasets against each other for insight, instead of
  inventing from scratch. Use before building anything from a blank page.
license: MIT
---

# Couple, Don't Silo

> "Data is available. It is just that the person understands how to layer different datasets that sometimes look like they're not remotely related to each other, and then realizes that there are insights that you can see from there. That is usually the reason why and how a lot of people came up with interesting projects, ideas, and products, rather than just trying to invent things from scratch."

The author's own words, kept verbatim because it is the operational core — the
same standing brief [`godmode-cook-and-couple`](../godmode-cook-and-couple/SKILL.md)
already lives by for one product line: *"The only way these data would make
sense is when you bring them together and look at the relationships between
factors... Otherwise, it's just a bunch of scientific data that would mean
nothing to anyone."* This skill is that principle, generalized past Thailand
city dashboards to anything being built from public or already-catalogued data.

[`improvement-radar`](../improvement-radar/SKILL.md) is this same instinct
pointed at *code and technique* — study a repo, decide fit. This skill is the
instinct pointed at *data* — study what's already public, decide what it means
when read against something else.

---

## The rule

Before building anything from a blank page, ask what already-available data,
possibly from an unrelated domain, shares a join key with the problem — and what
one sentence a reader could act on if the two were read together.

---

## The procedure

### 1. Inventory before inventing

List what public or already-catalogued data touches this domain, even
tangentially — see [`data-catalog`](../data-catalog/SKILL.md) for what's already
recorded, [`reference/free-apis.md`](../../reference/free-apis.md) for what's
free, and [`deep-scraping`](../deep-scraping/SKILL.md) /
[`improvement-radar`](../improvement-radar/SKILL.md)'s "same technique, applied
to data" branch for what has to be found first. A single dataset in isolation is
a fact: today's river level, this district's AQI. Facts are cheap and everywhere.

### 2. Find the join key, not the topic

The pairing that produces insight is rarely the one that shares a *subject* —
two air-quality feeds tell you nothing new read together. It is the one that
shares a **join key**: place, time, or entity. Rainfall and reservoir level join
on place and time. A public transit feed and a hospital ER-admission count join
on district and week. A satellite burn-scar layer and a health-ministry
respiratory-complaint feed join on the same two axes and were never built by the
same team, in the same department, or with each other in mind.

The unrelated-looking pairs are where the insight actually is. Two datasets from
the same source, the same team, the same domain were probably already coupled by
whoever built them. The pair nobody thought to join is the one worth trying.

### 3. State the coupled claim as one sentence a reader can act on

A dashboard with three subsystem cards — a gauge, a chart, a number — is three
facts, not an insight. The coupling is finished when it collapses to a sentence
someone can act on: *"reservoir X is filling faster than rainfall alone
explains — check upstream release records"*, not *"reservoir level: 62%,
rainfall: 40mm."* If the sentence cannot be stated without hedging into three
separate ideas, the coupling has not actually happened yet — go back to step 2
and check the join key is real, not just plausible.

### 4. Carry the provenance of both sources through the coupling

Coupling two datasets does not average their trustworthiness — it inherits the
weaker one. Every coupled number still needs `{source, tier, age}` per
[`honest-envelope`](../honest-envelope/SKILL.md), for **both** inputs, not a
single blended label on the output. A live sensor coupled with a stale satellite
pass is a claim whose honest age is the *older* of the two, not the newer.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Three subsystem cards with no coupling sentence | That is a dashboard of facts, not an insight — the reader does the coupling work you were supposed to do |
| Coupling by topic instead of by join key | Two air-quality feeds read together tell you nothing new; the value is in the unrelated pair that shares place/time/entity |
| Inventing a correlation with no real shared key | A chart that visually lines two series up without a join key is decoration, not a coupling — state the key or don't claim the reading |
| A blended provenance label on a coupled number | The coupling inherits the weaker source's honesty, not an average of both |
| Building a new data pipeline before checking what already exists | The instinct this skill exists to correct — inventory first, per [`data-catalog`](../data-catalog/SKILL.md) |
| Coupling once and calling the dashboard finished | New public data appears constantly; a coupling worth building is worth re-checking for a better pairing later |

---

## The test

Point at the one join key — place, time, or entity — that lets two specific,
named datasets be read together, and state the one sentence that results. If you
cannot name the key, you have two facts side by side, not a coupling. If you
cannot state the sentence, the coupling has not produced an insight yet, only a
juxtaposition.
