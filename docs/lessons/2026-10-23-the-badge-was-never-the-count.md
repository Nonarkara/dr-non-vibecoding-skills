# The badge was never the count

The repo states the size of its collection in prose in more places than the
validator read. `scripts/validate_repo.py` checked the badge fragments, the
bolded `**N skills**` phrase in the README and AGENTS, the mermaid label, the
QUICKSTART `expect` count and the BLUEPRINT `wc -l` number. Everything else was
a number in a sentence, and no check ever looked at a sentence.

Two generations of drift are still in the tree as evidence. Commit `5e2f4c2`
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

The deck's own line made the gap explicit and false at the same time:
"The counts are deliberate. The validator enforces them." They were deliberate
and the validator did not enforce them. A gate that reads only the badge
cannot see a sentence, and a claim that a gate enforces something it cannot
read is a claim, not a check.

The fix has two halves, and the second matters more than the first. The
numbers were corrected — but a corrected number is a snapshot that drifts
again. So the gate now reads them: `COUNT_CLAIM_PATTERNS` in
`scripts/validate_repo.py` defines what a count claim is, `validate_prose_counts`
checks every live surface against the filesystem, and `validate_playbook_index`
proves the README's list holds every playbook. `scripts/sync-counts.py` imports
the same pattern table, so the writer and the checker cannot disagree about
what a count is.

A count claim is a bare number immediately followed by a word that names a
shape of this collection, with nothing before it and no comparison word in
front of it. The four shape words take two digits or more, because a one-digit
number in that form is a threshold ("load more than 3 skills"); every other
form names the collection outright, so a single digit is still a count. That
rule is the whole reason the gate is not a nuisance: "past ~20 skills",
"1-2 skills", "35+ book-derived skills" and "more than 33 skills" are all
thresholds, and none of them fail.

Dated records are excluded on purpose. `docs/lessons/` and `docs/relay/` record
what the repo held on the day they were written, so a stale number there is a
receipt, not a lie. A gate that rewrote history would be its own kind of
dishonest.

The gate was proved by mutation, not by assertion. Six mutations that should
fail do fail: a wrong count in the deck, a wrong `N narratives` in the README,
a wrong `load all N` in AGENTS, playbook 17 dropped from the list, a skill
added, a playbook added. Five that should pass do pass: `more than 3 skills`,
`past ~20 skills`, `1-2 skills`, `35+ book-derived skills`, and a dated lesson
keeping its old count. A guard nobody has tried to break is a claim.

One more thing the drift was hiding. `AGENTS.md:17` ran the skills bullet and
the ABOUT.md bullet together on one line, so the second item rendered as
trailing text inside the first — in the file every non-Claude agent reads.
`validate_markdown_lists` now fails on a list item that runs into the next one.
It found one such line in 796 markdown files.

The rule that generalises: **a number written in prose is a claim, and a claim
nobody checks is a promise.** Put it where a gate can read it, or write it so
that nothing has to be checked.
