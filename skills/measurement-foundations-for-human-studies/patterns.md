# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Determine scale type by transformation invariance

**When to use:** When evaluating a claimed scale (nominal, ordinal, interval, ratio).

**Recipe:**

1. Identify the purpose of the measurement (labeling, ranking, measuring differences, measuring ratios).
2. List the transformations that would leave that purpose unchanged (e.g., renaming, monotonic increase, linear shift, similarity shift).
3. Check whether the proposed numerical assignments admit only those transformations; if broader transformations are allowed, downgrade the scale type.
4. If the purpose is unclear, treat the scale as ordinal at best.

**Chapter:** ch02

---

## Test basic empirical operations before claiming interval or ratio

**When to use:** When a psychological or social scale is asserted to have equal intervals or a true zero.

**Recipe:**

1. Define what equality of intervals means for the attribute (e.g., equal differences in the underlying trait).
2. Gather data that allow judging whether two differences are equal (e.g., via pairwise comparisons, magnitude estimation, or experimental manipulations).
3. Check whether the observed judgments satisfy transitivity and consistency of equal‑difference judgments.
4. If they do, interval claim is warranted; if not, treat the scale as ordinal.
5. For ratio claims, additionally test equality of ratios (e.g., doubling, halving) and the existence of a zero origin.

**Chapter:** ch03

---

## Apply axiomatic extensive measurement checklist

**When to use:** When measuring an attribute that could be concatenated (length, mass, time, economic output).

**Recipe:**

1. Specify the empirical order relation (e.g., ‘longer than’, ‘heavier than’).
2. Define a concatenation operation (e.g., laying rods end to end, combining masses).
3. Formulate the six axioms: transitivity, associativity, monotonicity, compensability, positivity, Archimedean.
4. Collect data to test each axiom (direct observation or reliable proxies).
5. If all hold, invoke the representation theorem to assign numbers; use the uniqueness theorem to note that only similarity transformations are permissible.

**Chapter:** ch04

---

## Use conjoint measurement for derived attributes

**When to use:** When the attribute of interest is hypothesized to be a product or function of two fundamentals (e.g., density = mass/volume, utility = goods × probability).

**Recipe:**

1. Identify the two fundamental attributes and the product set (e.g., (volume, density) → mass).
2. Establish an order on the product set (e.g., ‘more massive than’).
3. Test double cancellation: if (a,y)≤(b,x) and (b,z)≤(c,y) then (a,z)≤(c,x) must hold.
4. Test solvability: for any three elements of the product set, find the fourth that makes two ordered pairs mutually ≤ each other.
5. Test the Archimedean condition on both factor sets (no infinitely large or infinitesimal steps).
6. If all pass, conclude that the derived attribute admits an additive or multiplicative representation, yielding interval or ratio scale.

**Chapter:** ch05

---

## Distinguish extensive from intensive attributes

**When to use:** When deciding whether to look for a concatenation operation or a lawful proxy.

**Recipe:**

1. Ask whether combining two instances yields an instance whose magnitude is the sum (concatenation test).
2. If yes, treat as extensive and apply axiomatic extensive measurement.
3. If no, treat as intensive and seek an extensive proxy that varies lawfully with the attribute (e.g., mercury length for temperature).
4. Verify the law (e.g., linear expansion) empirically before using the proxy.
5. If no proxy exists, consider the attribute ordinal or conventional unless other evidence of ratio structure appears.

**Chapter:** ch06

---

## Evaluate psychological scales with operational vs realist lenses

**When to use:** When reviewing a claim that a test or index measures a latent construct.

**Recipe:**

1. Identify whether the author adopts an operational definition (any consistent rule yields measurement) or a realist definition (requires pre‑existing empirical structure).
2. If operational, note that the claim rests on convention; check whether the numbers are used only for ranking or prediction within the study.
3. If realist, demand evidence of the relevant empirical operations (order, equal intervals, ratios) or axiomatic conditions.
4. If evidence is lacking, treat the claim as tentative and suggest further validation.
5. Consider whether the scale’s predictive success could compensate for weak measurement warrants.

**Chapter:** ch07

---

## Interpret numbers under conventional measurement

**When to use:** When a scale is acknowledged to be conventional but still used for inference.

**Recipe:**

1. State explicitly that the numbers are ordinal or merely labels unless further evidence is provided.
2. Use the numbers only for order‑preserving operations (e.g., ranking, non‑parametric tests).
3. Avoid interpreting differences as equal or ratios as meaningful.
4. If predictions are successful, treat the scale as a useful heuristic, not as a measurement of an interval‑level trait.
5. Remain open to revising the scale if new empirical data on basic operations emerge.

**Chapter:** ch08

---

## Assess approximation of axiomatic conditions

**When to use:** When data are noisy and exact axiom tests fail.

**Recipe:**

1. Quantify the degree of violation for each axiom (e.g., proportion of transitivity failures).
2. Determine whether violations are random and small relative to the scale of measurement.
3. If violations are negligible, approximate representation may still hold; report confidence intervals.
4. If violations are systematic or large, reject the measurement claim or lower the scale type.
5. Consider using measurement error models to account for imperfections.

**Chapter:** ch08

---
