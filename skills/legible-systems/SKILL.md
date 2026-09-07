---
name: legible-systems
description: Paths, edges, districts, nodes, landmarks. Use for navigation, dashboards, patterns.
license: MIT
---

# Legible Systems

> Sources: Kevin Lynch, *The Image of the City* (1960) · Christopher Alexander, *A Pattern Language* (1977).

Two books about buildings that are really about interfaces. Lynch asks how a person builds a mental map of a place they are moving through. Alexander asks how to write down a solution so the next person can reuse it without cargo-culting it. Both answer questions that dashboards fail at constantly.

---

## 1. Lynch's five elements — the navigation audit

Lynch found people navigate cities using exactly five element types. Every one has a direct interface equivalent, and a missing one is a specific, diagnosable failure:

| Lynch | Interface | Failure when missing |
|---|---|---|
| **Paths** | The routes a user actually travels — nav, tab order, the click sequence to the answer | Users wander. Every task takes an exploratory detour. |
| **Edges** | Boundaries between regions — a rule, a ground change, a panel limit | Regions bleed. Nothing feels grouped. |
| **Districts** | Zones with shared character the user can name — "the map area," "the controls" | Every part looks like every other part. No sense of *where I am*. |
| **Nodes** | Decision points and junctions — a dashboard home, a filter bar, a detail entry | Users cannot tell where a choice gets made. |
| **Landmarks** | The one unmistakable object used for orientation — the hero metric, the map, the mark | Nothing anchors. Every screen reads interchangeable. |

**The audit:** name all five for the surface you are building. Any element you cannot name is the reason the interface feels confusing, and it names the fix.

**Imageability** is Lynch's term for how easily a place forms a strong mental image. It is the property most agent-built dashboards lack: perfectly uniform, therefore unmemorable. A surface where every card weighs the same has no landmarks — which is exactly why it reads as generated.

## 2. Legibility is not simplicity

Lynch's cities were not the simplest ones. They were the ones whose structure was **apprehensible** — you could hold the whole in your head while standing in a part. Density is fine. Complexity is fine. Illegibility is not.

This is the licence for dense dashboards: pack the data, but give it paths, edges, districts, nodes and a landmark, and it stays navigable at any density.

## 3. Alexander — a pattern is not a snippet

Alexander's pattern form is the reason his book outlived its field. Each pattern is:

1. **A name** you can say in a sentence.
2. **The context** where the problem occurs.
3. **The recurring problem** — with the forces that conflict.
4. **The solution** stated as a relationship, not a specific artifact.
5. **The links** to the patterns above and below it in scale.

That last part is the one everyone drops, and it is what makes a pattern language a *language*: patterns resolve into each other, large to small. A pile of components is not a pattern language. A component library with no stated context is a snippet folder.

**Write it down this way or do not claim it is a pattern.** "We use cards" is a snippet. "*When* a list has more than seven peers and the user is scanning for one, *then* rank them and give the active row a single left-edge marker, *because* scanning beats reading" — that is a pattern, and an agent can apply it to a case you never wrote down.

## 4. The quality without a name

Alexander's central and least-tractable claim: good structures share a quality that resists definition but is instantly recognisable, and it comes from resolving real forces rather than applying a style.

The operational version: **a layout earns its shape from the conflict it resolves.** A split that exists because the data genuinely has two audiences reads as inevitable. The same split applied because splits look professional reads as a template. Same pixels; different origin; and people can tell.

---

## How to use this

- Starting a navigation or dashboard design → run the five-element audit before any layout.
- A UI "feels confusing" but passes review → one of the five is missing. Find which.
- About to add a component to a library → write the pattern form, including context and links, or do not add it.
- Something looks generic despite following the rules → ask which forces this shape resolves. If the answer is "none," that is the diagnosis.

Pairs with `no-design-tells` (landmarks are the cure for uniformity), `design-dna`, `map-3d-city`.
