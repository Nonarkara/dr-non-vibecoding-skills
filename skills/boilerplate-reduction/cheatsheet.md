# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## process

- If a sentence appears more than three times, treat it as filler.
- If a token appears, ensure its meaning is documented nearby.

## writing

- Keep only the first instance of any repeated line.

## code

- Replace bulk filler with a clear token like {{TOKEN}}.
- Use a comment block to document every automated replacement.
- Run a regex search for '^(.+)$' and count matches to find repeats.

## design

- Never delete a repeated line if it serves as a heading.

## life

- After cleanup, read the whole document aloud to catch flow breaks.
- If you are unsure about a repeated line, ask the author before deleting.

## general

- When automating, back up the original file first.
