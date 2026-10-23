# The badge was never the count

The repo states the size of its collection in prose in more places than the
validator read. `scripts/validate_repo.py` checked the badge fragments, the
bolded `**N skills**` phrase in the README and AGENTS, the mermaid label, the
QUICKSTART `expect` count and the BLUEPRINT `wc -l` number. Everything else was
a number in a sentence, and no check ever looked at a sentence.

Two generations of drift were in the tree until this leg repaired them; the
evidence is in git history. Commit `5e2f4c2`
(the Seventh Harvest, leg 11) raised the collection to 169 skills and rewrote
every count it could see — the badge, the README tree, the four-shapes table,
the mermaid label, the deck's headline, pages 03, 05 and 12, the deck index and
the infographic companion. It left a second generation behind in the body of
`docs/deck/01-stack.md:17-20` (`69` files, `15` narratives, `7` docs, `12`
templates), and the same miss sits at `docs/deck/01-stack.md:50`,
`docs/deck/05-map.md:25` and `docs/deck/README.md:5`. Fifteen more skills
later, the headline said 169 while the tree held 184. The README's playbook
list was missing playbook 17, and `AGENTS.md:69` told agents not to load all
183 skills when there were 184.

Thirty-four count claims on the surfaces the first gate read disagreed with
the tree, and the first fix pass corrected all of them. Ten more were still
wrong where the gate could not see them, and stayed wrong until an independent
review went looking.

Counted afterwards, on the tree as it stood before this leg: the finished gate
finds **67** count claims that disagree with the tree, at **45** sites — 40
claims on the surfaces the first gate read, and 27 in ten files it never
opened (two references, two playbooks, ABOUT.md and five skill files) — plus
three structural defects and the missing playbook 17.

On the tree as it stood, the first gate read 49 claims and 34 of them were
wrong. Its commit message said 35, counting one more — the deck's elided `do
not scan all 71` — which the gate had not read as a claim at all. After that
pass the gate read 44 claims, and every one of them was right: 44 was the
count on the fixed tree, 34 the number of wrongs on the broken one. An independent review
counted 34, named the thirty-fifth, and was right to: a count that the gate
cannot see is not a count the gate checked.

The deck's own line made the gap explicit and false at the same time:
"The counts are deliberate. The validator enforces them." They were deliberate
and the validator did not enforce them. A gate that reads only the badge
cannot see a sentence, and a claim that a gate enforces something it cannot
read is a claim, not a check.

## The first fix was still a snapshot

The first gate read the prose on a named list of files — five, plus the deck —
and matched a bare number immediately followed by one of four shape words. It
passed. Then an independent reviewer read the diff cold and attacked it, and
the gate failed the attack on its own terms: ten stale counts survived on live
surfaces, **including the README's own tree map, far below the badge that says
184**. Replacing all ten with `999` left `make validate` printing `OK`. The
deck's sentence was still false; it had only moved.

Three things were wrong, and each is a rule now:

1. **A list of surfaces rots.** The gate read the files a list named, so a
   count in a file the list forgot was invisible forever. Three skill files
   carried stale numbers (five skill files held `30`, `100`, `165`, `167`,
   `169` and `818`) and one reference file held four, and no list would ever have named them. The gate now reads **every
   live file in the repo**, not a list.
2. **One shape of claim is not enough.** The repo writes the count as `184
   skills`, `184 \`SKILL.md\` files`, `17 narratives`, `14 docs`, `21 drop-ins`,
   `16 narrative war stories`, `184 modular agent capabilities`, and `load all
   169`. The first table matched one of those seven. The definition now names
   the repo's own vocabulary for its four shapes and reads a number with up to
   two adjectives in front of the shape word.
3. **The writer and the checker disagreed about the truth.** `sync-counts.py`
   counted `skills/*/SKILL.md`; the validator counted skill *directories*. Add
   a half-written skill folder and the writer was a no-op while the checker
   demanded a number the writer could not produce. Both now call
   `collection_counts()`.

The rule that generalises: **a gate that reads a list will miss everything the
list forgot, and a list of surfaces is a list that rots.** Read the tree, not
a list of it.

## What a count claim is

A count claim is a number next to the word that names a shape of this
collection: `184 skills`, `17 playbooks`, `14 references`, `21 templates`, and
the repo's variants (`184 \`SKILL.md\` files`, `17 narratives`, `14 docs`,
`21 drop-ins`). Two digits is the floor, because a one-digit number in that
shape is a local thing — `3 docs`, `2 drop-ins` — and never the size of a
collection that holds hundreds.

A bare claim in that shape states the size of *this* collection, so it must be
true.

A number inside quotation marks is somebody else's sentence. The gate does
not read it and the writer does not rewrite it: this repo does not get to
change what another author wrote, and a quoted collection's size rewritten
into this repo's size is a false statement the gate would then bless.

A number that belongs to something else has to be written so it cannot be
read that way, and there are exactly three ways out:

- a hyphenated compound — `a 91-skill collection`, `a 20-skill set`,
  `the 167-skill repo of that day`;
- a threshold — `past 160 skills`, `at most 20 skills`, `more than 33 skills`;
- a difference or a possessive — `47 more skills`, `its 25 skills`.

That is the whole escape hatch, and it is small on purpose. The first version
of this rule tried to be cleverer: it read a number followed by *any* word
followed by a shape word, which made `47 more skills` a claim about the
collection, and it read a number followed by a shape word with nothing between,
which missed `16 narrative war stories`. Both are wrong in the same direction —
one too eager, one too shy. The rule now names what the repo actually writes.

Dated records are excluded on purpose. `docs/lessons/`, `docs/relay/` and
`JOURNAL.md` record what the repo held on the day they were written, so a stale
number there is a receipt, not a lie. A gate that rewrote history would be its
own kind of dishonest.

## What the gate still cannot see

An elided count has no shape word near it: `the 30 that already work`, `169
things to memorise`. No pattern reads those, and the reviewer proved it by
writing them. The fix was not a better pattern — it was to stop writing them.
Every count in the tree now names its shape, so every count is either checked
or deliberately another collection's. The gate's remaining blind spot is a
number that is neither, and the only defence against that is the review this
repo already insists on: a different agent reads the diff.

## The gate was proved by mutation, not by assertion

Drift that must fail, does: a wrong count in the README tree map, the same
count in the adjective form the README used, a wrong count in a deck page, an
elided `scan all 71`, a stale count in a skill file outside the old surface
list, a bare claim about another collection, a subset count written bare, two
table rows merged into one line, a bullet merged into the next, and the whole
deck header at once.

Prose that must pass, passes: `more than 33 skills`, `past ~20 skills`,
`1-2 skills`, `35+ book-derived skills`, `a 91-skill collection`, `47 more
skills`, `the 20th skill`, a dated lesson keeping its old count, a fenced
sample output, and a shell pipe inside a fence. A guard nobody has tried to
break is a claim.

The writer was proved the same way, end to end: add a fifteenth reference to a
scratch copy and the gate fails, because a shape appeared and the prose did
not. Then `make sync-counts` writes the number everywhere it belongs — the
badge, the tree map, the four-shapes table, the AGENTS contract, the deck, the
ecosystem reference, the mermaid graph — and the gate passes with the new
shape. That test found two gaps the unit-level checks had missed: the mermaid
graph shortens the names (`R["14 refs"]`), so the writer left it stale, and
CONTRIBUTING.md quotes the count as a teaching example, so the writer could not
fix a file it did not own. The second is the general lesson: **a gate that
reads more files than the writer writes is a gate that fails in a way nobody
can repair with one command.** The writer's list and the gate's list are not
the same list, and they cannot be: the writer rewrites a bare count, and a bare
count in a skill file may be somebody else's collection. So the gate reads
every live file and the writer owns the surfaces, and the contract says so
instead of pretending otherwise.

A second review of the finished gate found the writer still writing a sentence
that held two generations of the same count — "The 185 skills are not 169 things
to memorise" became "The 184 skills are not 169 things to memorise" — because
the writer rewrote the number it could read and left the one it could not. The
writer now refuses a line that holds a count claim and another number the gate
cannot read, names the line it refused, and lets the gate fail on it. A writer
that cannot write the sentence should say so rather than write it wrong.

## Two more defects the drift was hiding

`AGENTS.md:17` ran the skills bullet and the ABOUT.md bullet together on one
line, so the second item rendered as trailing text inside the first — in the
file every non-Claude agent reads. `README.md:281` and `docs/deck/README.md:20`
did the same thing to *table rows*: two rows shared one physical line, so a
reader saw one row with nine cells instead of two rows of four. The first fix
pass edited both of those lines and left the defect standing. The structure
check now reads table rows as well as bullets, and skips fenced code — a shell
one-liner can hold `||` without being a table.

## The rule that generalises

**A number written in prose is a claim, and a claim nobody checks is a
promise.** Put it where a gate can read it, or write it so that nothing has to
be checked. And when a gate passes, ask what it was not looking at: the first
version of this gate passed, and it was still letting ten lies through.
