# Field guide — from Wada plate to production palette

This is the compact evidence and translation guide for `wada-colour-chords`.
It does not reproduce the book's 348 plates.

## What the source actually contributes

The scanned book is organized as a relational system:

- two-colour combinations begin first;
- three-colour combinations follow;
- four-colour combinations follow those;
- a closing index lists each named colour and the plates in which it appears;
- print-oriented CMYK information appears in the index.

Source-verified examples visible in the supplied scan:

| Plate | Chord |
|---|---|
| 001 | English Red · Cerulian Blue |
| 002 | Dark Tyrian Blue · Yellow Orange |
| 121 | Lincoln Green · Ochraceous Salmon · Brown |
| 122 | Benzol Green · Cream Yellow · Carmine |
| 241 | Red Orange · Dark Medici Blue · Pale Lemon Yellow · Isabella Color |

These matter as interval examples—warm against cool, quiet against vivid, dark
against luminous—not as values to sample from a scan. The historic spellings
above follow the English labels printed in this edition.

Publisher and independent digital indexes describe 159 colours and 348
combinations. The publisher dates the modern edition to 2010; the original
material comes from Wada's early twentieth-century colour work.

## Translation table

| Source evidence | Keep | Rebuild |
|---|---|---|
| Named colour | Identity and temperature | Device value |
| Two-colour plate | Primary tension | UI roles and contrast |
| Three-colour plate | Dominant/support/interruption potential | Proportions |
| Four-colour plate | Richer chord and adjacency | Semantic boundaries |
| CMYK listing | Print provenance | Screen gamut and OKLCH value |
| Colour index | Relationship graph | Token names |

## A practical search heuristic

1. State the needed atmosphere in concrete sensory terms: quiet paper, night
   instrument, civic daylight, archival cabinet. Avoid “premium” and “modern.”
2. Choose the ground and ink first.
3. Find a pair whose temperature and lightness interval fits that ground. Use
   the supplied book's plate/index, the verified examples above, or the linked
   searchable index; never invent a source plate.
4. Add a third colour only when it supplies a missing role.
5. Add a fourth only for a bounded illustration, data family, or seasonal field.
6. Reduce chroma before adding neutrals.
7. Run the role, contrast, colour-blind, grayscale, and subtraction tests.

## Worked Dr Non signature relationship

Start from warm near-black and paper as the carrier. Amber remains the only
pointer. Choose one muted cool companion from a source-verified chord only after
the surface's intent is known. Rebuild it in OKLCH and prove every allowed
foreground/background pair before encoding the token.

The companion may fill one editorial band or diagram region. It may not color
body text, links, buttons, focus rings, success, warning, or danger. No universal
companion value ships in the scaffold because the correct value depends on the
ground, neighbouring colours, and permitted foregrounds.

## Provenance record

Store this beside production tokens:

```markdown
Palette lineage: Dr Non production method inspired by Sanzo Wada's collection
Source inspiration: [book plate or named relationship, if used]
Reconstruction: [date, designer/agent, light/dark target]
Roles: [token → one job]
Contrast evidence: [pair → ratio]
Colour-blind evidence: [tool/manual result]
Rejected variants: [value + reason]
```

The provenance prevents a future agent from treating a deliberate companion
colour as accidental drift—or treating a sampled scan value as sacred.

## Sources

- Sanzo Wada, *A Dictionary of Color Combinations, Vol. 1*, Seigensha, ISBN
  978-4-86152-247-5.
- Seigensha's publication page documents the edition, Wada's background, and
  the 348 combinations: <https://en.seigensha.com/books/978-4-86152-247-5/>.
- Wada Sanzo Colors provides a searchable contemporary index of the 159 colours
  and 348 combinations: <https://www.wadacolors.com/>.

The operational rules in the parent skill are an original synthesis for this
repository. They should be tested against the product, not attributed verbatim
to Wada.
