---
name: godmode-cook-and-couple
description: >-
  Build coupled, comparison-bearing verdicts from raw city data instead of
  independent readings. Use when a dashboard shows a number with no comparison,
  or two factors need coupling.
license: MIT
---

# Godmode Cook and Couple

> "The only way these data would make sense is when you bring them together
> and look at the relationships between factors... Otherwise, it's just a
> bunch of scientific data that would mean nothing to anyone."

This is the standing design brief behind `../../thailand-godmode/packages/core/src/cook.ts`, and
the reason this whole toolkit exists rather than being "another map with
some cards on it." A reservoir gauge next to a rainfall chart next to a
humidity number is three subsystems. A **coupling** is what happens when you
read them together and say one sentence a governor can act on.

## The rule

**A number without a comparison is not information.** Every cooked value
must answer "compared to what?" — an agency-published band (RID water
class, TMD rain class), a province-wide rank (this station vs. every other
station), or a physical formula relating it to another reading (vapour
pressure deficit, Ångström fire-weather index, Espy cloud-base height) —
before it reaches a UI.

## Building a new coupling

1. **Find the real relationship, not an invented one.** Is there a published
   formula (Tetens, Ångström, Espy — see `cook.ts`'s existing couplings for
   the pattern) or an agency-stated rule connecting the two factors? If
   neither exists, this isn't a coupling yet — it's two facts that happen to
   be near each other on a screen.
2. **State the verdict in one sentence a governor can act on**, in Thai
   first. Not "VPD: 1.4 kPa" — "ความต้องการน้ำของพืชสูงขึ้นขณะที่น้ำใช้การได้
   ในอ่างเหลือน้อย ควรวางแผนการส่งน้ำล่วงหน้า."
3. **Propagate the weakest tier and worst freshness of every leg** — a
   coupling built from one live gauge and one scenario fallback is itself
   scenario-tier. Use `weakestTier()` / `worstFreshness()`, never manually
   decide a coupling's tier.
4. **An observed event is never reasoned about as a future risk.** If a
   station is already overflowing, that dominates the verdict outright — it
   doesn't get averaged in with a forecast. See `coupleFlood`'s overflow
   branch for the pattern.
5. **A missing leg still renders, hedged, never hidden or silently
   promoted.** If one required input is null, say what's missing in the
   verdict sentence rather than omitting the coupling or pretending
   confidence you don't have.
6. **Cap and dedupe the action list with Thai-aware comparison.**
   Whitespace tokenizing is an English reflex — Thai has no word spaces.
   Use `saysTheSameThing()` (character-run/LCS-style), never `.split(" ")`,
   to catch near-duplicate action text.

## Testing a coupling

Every coupling needs, at minimum: a case where each leg individually
triggers the band, a case where both legs together escalate the band beyond
either alone (fire weather: dry weather alone is `watch`, dry weather AND
real hotspots is `critical`), a missing-leg case, and a tier-propagation
case. See `../../thailand-godmode/scripts/test-cook.mjs` for the generic
worked pattern, and the Lopburi reference build's own `scripts/test-cook.mjs`
(`Nonarkara/lopburi-dashboard`) for the fuller, city-specific version this
was distilled from (100+ assertions).

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| An invented threshold ("if water > 60% show orange") | Use the agency's own published band, or don't show a band |
| A coupling that upgrades tier on aggregation | Weakest tier wins, always — a coupling is never fresher than its worst input |
| Hiding a coupling with a missing leg | Render it hedged; a governor should know the input is missing, not see a gap |
| `.split(" ")` dedup on Thai text | Character-run comparison — see `saysTheSameThing()` |
| A coupling with no published formula behind it | It's not a coupling, it's a guess with two numbers next to it |
