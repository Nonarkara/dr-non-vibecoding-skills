# Codex Portability v2 — Additive Upgrade

## Outcome

Make this repository installable and useful in Codex and ChatGPT without weakening its Claude, Cursor, Gemini, or agent-neutral paths. Preserve every existing skill, playbook, template, infographic, and earned incident rule.

The conservation law is:

> Existing practice stays intact; the upgrade adds missing execution surfaces and enforcement.

## Sacred Items

- Do not delete, replace, or rewrite any existing skill or playbook wholesale.
- Do not modify the 19-page infographic deck or its rendered pages.
- Do not collapse any existing file by more than 30%.
- Keep Antigravity, Cursor, Mavis/MiniMax, sibling-practice, and upstream Karpathy attribution.
- Keep `skills/` as the single canonical skill source; do not duplicate the skill tree under another path.

## Approaches Considered

1. **Documentation-only correction.** Fix Codex install commands and stale counts. Smallest diff, but the bundle would still lack installable plugin packaging and mechanical validation.
2. **Additive v2 layer — selected.** Keep the current tree, add Codex-native packaging, three focused skills, one playbook, one new template, and validation. This closes real gaps without disturbing the existing system.
3. **Full v2 rewrite.** Reorganize every skill around a platform-neutral taxonomy. Rejected because it creates a large regression surface and erases the repo's historical layers.

## Proposed Changes

### Codex packaging and installation

- Add a valid plugin manifest pointing at the canonical `skills/` directory so the multi-skill bundle can be installed as one package.
- Document Codex's real local skill path, `$HOME/.agents/skills`, and repository skill path, `.agents/skills`.
- Remove the inaccurate instruction to concatenate Codex skills into `AGENTS.md`. `AGENTS.md` carries durable repository guidance; `SKILL.md` carries reusable workflows.
- Add `templates/AGENTS.md.template` as a first-class project contract instead of treating it as a generated Claude mirror.

### New Codex extension layer

- Add `codex-workbench`: route durable behavior to the smallest correct Codex surface — prompt, `AGENTS.md`, skill, plugin, MCP/app, automation, hook, or subagent.
- Add `production-spine`: encode the five current production gates for tests, paid-key endpoints, honest data envelopes, secret rotation, and external-boundary validation, plus honest Demo/Pilot/Production/Contract labels.
- Add `design-registers`: choose Console, Index, Civic, Editorial, or Institutional before styling while preserving the shared invariants.
- Add playbook 11 explaining what Codex contributes to the practice and how it differs from the existing agent layers.

### Repository enforcement

- Add a zero-dependency validator for skill frontmatter, folder/name agreement, internal Markdown links, plugin skill paths, and declared README counts.
- Run the validator in GitHub Actions on pushes and pull requests.
- Update README, QUICKSTART, BLUEPRINT, AGENTS, and INFOGRAPHICS only where counts, install paths, or extension-layer descriptions need correction.

## Error and Safety Handling

- The validator reports exact file paths and exits non-zero; it does not rewrite files.
- Plugin packaging remains instruction-only and declares no connector, network, or secret dependency.
- Installation instructions create destination directories before copying and never overwrite project `AGENTS.md` implicitly.
- Persistent services, DNS, credentials, and live applications remain outside this change.

## Verification

- Run the official skill validator against all skill folders.
- Run the repository validator locally.
- Confirm every Markdown link and image source resolves.
- Confirm README and AGENTS counts match the filesystem.
- Confirm the plugin manifest resolves to all skills and contains no missing paths.
- Review `git diff --stat` and file shrinkage for anti-regression.
- Commit with `Agent: codex`, push `main`, and verify the files and commit on GitHub.

## Explicit Non-Goals

- No visual redesign or regenerated infographic deck.
- No connector or MCP server.
- No wholesale metadata files for every existing skill; optional per-skill UI metadata would add 32 low-value files.
- No migration of `skills/` into a product-specific directory.
- No changes to live deployments or local machine configuration.
