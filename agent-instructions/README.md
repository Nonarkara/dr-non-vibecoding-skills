# agent-instructions

One master contract for every coding agent Dr Non uses, plus a per-repo template.

- `MASTER.md` — global rules (identity, hard rules, done + evidence, agentic loop, git etiquette,
  machines, stack, design, security/cost, Thai/English, reporting). ≤ 250 lines on purpose.
- `REPO-TEMPLATE.md` — copy to `<repo>/AGENTS.md` and fill in repo facts. Don't repeat global rules.

## Install (one source, many names)
```bash
SRC="$HOME/Projects/dr-non-vibecoding-skills/agent-instructions/MASTER.md"
mkdir -p ~/.claude ~/.codex ~/.gemini ~/.config/opencode
ln -sf "$SRC" ~/.claude/CLAUDE.md          # Claude Code, MiniMax Code
ln -sf "$SRC" ~/.codex/AGENTS.md           # Codex
ln -sf "$SRC" ~/.gemini/GEMINI.md          # Gemini CLI
ln -sf "$SRC" ~/.config/opencode/AGENTS.md # opencode
# OpenClaw / Hermes: point their system-prompt / workspace AGENTS.md at the same file.
```
Back up any existing file first (`cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.bak`) and merge anything
still valid into the repo file or MASTER via PR.

Per repo:
```bash
cp REPO-TEMPLATE.md <repo>/AGENTS.md && ln -s AGENTS.md <repo>/CLAUDE.md
mkdir -p <repo>/.cursor/rules && ln -s ../../AGENTS.md <repo>/.cursor/rules/project.mdc
```
`.cursorrules` is legacy; don't create it. Cursor user rules: paste MASTER.md into Settings → Rules.

## Changing the rules
PR only. A new rule needs a dated reason (an incident or lesson). Keep MASTER under 250 lines;
move detail into a skill and link it.
