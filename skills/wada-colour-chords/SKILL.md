---
name: wada-colour-chords
description: >-
  Apply Dr Non's production method inspired by Wada's 2–4 colour combinations. Use when a palette needs authorship, clear roles, contrast, and accessibility.
license: MIT
metadata:
  source: https://en.seigensha.com/books/978-4-86152-247-5/
  book: "Sanzo Wada — A Dictionary of Color Combinations, Vol. 1"
---

# Wada Colour Chords

> A colour is a note. The palette is the chord.

Sanzo Wada's collection is useful because its colours are shown in combinations,
not merely as independent swatches. Its 348 combinations arrange a finite
vocabulary into pairs, trios, and quartets. This repository turns that evidence
into a production method: choose a relationship with tension, then assign each
colour one job.

This skill is a design method distilled from the book, not a digital edition of
it. Printed ink, paper, scanning, and displays all change colour. Historical
names and plates are evidence of relationships; they are not production-ready
hex values.

## When to load

Load this skill when:

- a new surface needs a palette that does not look generated;
- an existing monochrome system needs warmth, tension, or an editorial season;
- several individually attractive colours refuse to behave as one system;
- a reference image or historical palette must become accessible UI tokens;
- `colour-and-type` has established the ground and now needs a colour chord.

Do not load it merely to decorate a finished interface. Colour must clarify
hierarchy, wayfinding, state, or atmosphere.

## The permanent Dr Non rule

> **Monochrome carries the work. Amber points. One companion colour sets the
> atmosphere. Status colours report facts. Never exchange their roles.**

This is the default signature chord for Dr Non surfaces. The synthesis adds
relational range without replacing the Rams/Braun spine:

| Channel | Job | Budget |
|---|---|---|
| Ground + ink | Carries reading, structure, and data | Most of the surface |
| Amber | Wayfinding, focus, the exceptional action | Sparse |
| Companion | A bounded field, section, illustration, or editorial season | One per surface |
| Status | Success, warning, danger, unknown | Only when the state is real |

The companion is not a second accent. It cannot mark buttons, links, focus,
selection, or status. If it starts pointing, amber stops meaning anything.

## The seven moves

### 1. Write the jobs before choosing the colours

List the required jobs: ground, ink, structure, action, atmosphere, and real
status. Delete jobs the surface does not need. Never invent a colour to fill an
empty slot.

### 2. Choose a chord, not a favourite

Choose two, three, or at most four related colours together. Judge the intervals:

- warm against cool;
- quiet against vivid;
- light against dark;
- earthy against clear;
- neighbouring hues against one deliberate interruption.

An unexpected interval is useful. Randomness is not. Describe the relationship
in one sentence before recording any value.

For a source-verified Wada chord, use one of the locally documented examples in
[`references/field-guide.md`](references/field-guide.md), consult the supplied
book's plate and closing colour index, or use the searchable Wada Colors index
linked there. Never invent a plate number. If neither source is reachable, label
the output **Wada-inspired, not source-verified**.

### 3. Assign unequal weight

Do not distribute the colours evenly. Start with an approximate visual budget:

- **70–90% carrier:** ground, paper, ink, or neutral structure;
- **8–20% support:** panels, diagrams, a bounded atmospheric field;
- **2–8% pointer:** amber wayfinding or the decisive action;
- **under 2% signal:** status colour, only when a state exists.

These are compositional budgets, not CSS coverage measurements. The point is
hierarchy. Equal shares make a flag, not an interface.

### 4. Rebuild in perceptual space

Do not sample the scan and call the result canonical. Reconstruct the relation
in OKLCH:

1. preserve relative lightness first;
2. preserve warm/cool direction second;
3. reduce chroma until text and data remain calm;
4. adjust values for the actual light or dark ground;
5. store the source name or plate as provenance, not as a colour guarantee.

### 5. Separate harmony from meaning

A harmonious red is still danger if the product teaches users that red means
danger. A beautiful green is still a false claim if nothing succeeded. Never
derive semantic state colours from the atmospheric chord.

### 6. Prove the chord in use

Test the real combinations, not a swatch page:

- normal text reaches WCAG AA contrast on its actual background;
- large text and non-text UI boundaries reach their required contrast;
- focus, links, errors, and charts survive protanopia and deuteranopia checks;
- meaning remains when colour is removed;
- screenshots work at 375, 768, and 1280 pixels;
- the Mama Rule tester can identify the next action without explanation.

### 7. Subtract one colour

Remove the companion. If nothing meaningful changes, it was decoration. Remove
the pointer. If navigation still works equally well, amber was overspent. Remove
a neutral. If the hierarchy improves, the ramp was bloated.

## Selection protocol

When asked to create or revise a palette, return this compact artefact before
writing CSS:

```markdown
Intent: [what the surface should feel and help the user do]
Relationship: [one sentence: warm/cool, quiet/vivid, light/dark]
Chord: [2–4 named colours together]
Roles: [ground / ink / structure / pointer / companion / true status]
Budget: [dominant / support / sparse / exceptional]
Risks: [contrast, cultural meaning, status collision, dark-mode shift]
Proof: [contrast pairs + colour-blind + grayscale + three viewport checks]
```

Only then encode named tokens. Never output `blue-500`, `purple-600`, or a loose
swatch list with no roles.

## Named regressions

- If the companion colour appears on a primary action, it has become a second
  accent. Return that action to amber.
- If all palette colours occupy similar area, reassign unequal weights.
- If a scanned pixel value is described as “Wada's exact colour,” remove the
  claim and record it as a reconstruction.
- If status colours are chosen for harmony rather than truth, restore semantic
  status tokens.
- If a historical combination fails contrast, change the production value. The
  relationship is the inheritance; the inaccessible value is not.
- If a palette cannot be described without mood adjectives, its jobs are not
  defined yet.
- If the palette grows beyond four authored colours before semantic states,
  subtract before adding.

## Source boundary

The source collection contains 159 named colours and 348 combinations in two-,
three-, and four-colour arrangements. Its index connects each named colour back
to every plate where it participates. That relational structure—not a copied
catalogue—is what this skill preserves.

The practical interpretation, role budgets, accessibility gates, and Dr Non
signature rule are this repository's synthesis. Read
[`references/field-guide.md`](references/field-guide.md) for the evidence map,
selection heuristics, and a worked token example.

## Connects to

- `colour-and-type` — chooses the ground and neutral ramp before this chord.
- `design-dna` — turns the roles into enforceable tokens and named regressions.
- `axiom-design-core` — keeps the chord subordinate to information and lineage.
- `accessible-by-default` — supplies the accessibility proof.
- `data-display` — prevents atmospheric colours from becoming dishonest data.
- `see-and-revise` — judges the rendered relationship, not the token list.

## The check

```text
□ Did I choose the colours together rather than one by one?
□ Can I describe their relationship in one sentence?
□ Does every colour have one job and an unequal visual weight?
□ Is amber still the only pointer?
□ Is the companion bounded and non-semantic?
□ Were scanned values rebuilt rather than copied as truth?
□ Do real text/background pairs pass contrast?
□ Does meaning survive colour-blind and grayscale views?
□ Can one colour be removed without loss? If yes, remove it.
```
