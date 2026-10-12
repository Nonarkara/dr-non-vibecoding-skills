# Credits

Ideas below were read, then written again in this repo's voice. Nothing here is a vendored pack. Where a licence does not allow copying, the source is linked and the text stayed there.

The tool list is the owner's vetted catalog (163 tools, refreshed 2026-10-08). A tool that is not in that catalog is not recommended by the foundation skills.

## Borrowed, and from where

| Source | Licence | What we used | What we left there |
| --- | --- | --- | --- |
| [anthropics/skills](https://github.com/anthropics/skills) and [skill authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Apache-2.0 for many skills. The document skills (`docx`, `pdf`, `pptx`, `xlsx`) are source-available, not Apache. | A folder, a `SKILL.md`, `name` and `description` as the trigger, a short procedure in the body. Already the house format in [`skill-writing`](skills/skill-writing/SKILL.md). | Their skill bodies. The source-available document skills. |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | MIT | A pre-send prose pass: state the fact, vary the rhythm, cut a sentence that adds no fact. | Their phrase lists and score table. Their bans on em dashes, all adverbs, and question-word openers. The catalog says those rules are opinionated and should meet your own style guide. This repo uses em dashes. |
| [Google eng-practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | CC BY 3.0 | Review questions, paraphrased in [`vibe-review`](skills/vibe-review/SKILL.md): design, behavior, complexity, tests that fail when the code breaks, names, comments that say why, read the lines you approve. | Their pages. |
| [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/), [Top 10](https://owasp.org/www-project-top-ten/), [Cheat Sheet Series](https://cheatsheetseries.owasp.org/) | CC BY-SA 4.0 | The idea that assurance rises with impact, and the habits secrets / input checks / server-side authorization / least privilege / dependency hygiene. | Every control statement and cheat-sheet paragraph. |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | MIT | A report-only audit, pinned to a commit, checker separate from finder, used before a public Cloudflare launch. The lookalike to refuse is `netresearch/security-audit-skill`. | Their skill text. It is not an auto-fix bot. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Apache-2.0 | A finding needs `file:line`. A deterministic scanner stays the gate. A model review is a second pass for a solo diff, not a required CI job. Install only `@alibaba-group/open-code-review`. | Their benchmark numbers. Other GitHub repos and npm scopes that reuse the name. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | Elastic License 2.0 (source-available, not OSI open source) | A credit in [`context-economy`](skills/context-economy/SKILL.md): long sessions can keep raw tool output out of the reply. | All of their text, code, hooks, and README claims. The licence does not allow offering it as a hosted service. Do not install the hooks without reading them. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Apache-2.0 | A credit in the same skill: local compression of logs and JSON is a real option. Measure your own session. If you run the proxy, bind localhost, turn the telemetry beacon off, and treat the cache as sensitive. | Their code, their headline savings figures, and `headroom wrap` (it rewrites agent config). |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | MIT | Already in [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md). [`definition-of-done`](skills/definition-of-done/SKILL.md) uses the "criteria, then verify" order. | A second copy of that skill. |
| [DietrichGebert/ponytail](https://github.com/dietrichgebert/ponytail) | MIT | Already in [`ponytail`](skills/ponytail/SKILL.md). Proportionality points at the ladder instead of rewriting it. | A second copy. |
| [Arena Alignment Index](https://arena.ai/blog/ai-alignment-index) (preview, preliminary) | Arena's published research, not a code licence | The three failure names and definitions (unauthorized action, false attribution, deceptive completion) and the headline rates quoted in [`non-bluff`](skills/non-bluff/SKILL.md), attributed. | Their judge, rubrics, data and scores. Non-Bluff does not reproduce their measurement. |
| [Claude Code hooks](https://code.claude.com/docs/en/hooks) and [Cursor hooks](https://cursor.com/docs/agent/hooks) docs | Vendor documentation | The event names and JSON formats the `non-bluff` guard reads and answers. | Their example scripts. |
| Owner's vetted catalog | The owner's notes, not republished | Which tools to name: Trivy, Semgrep, Dependabot, Sigstore, Playwright, k6, Ruff, uv, and the learning links in [`user-need`](skills/user-need/SKILL.md). | The catalog file itself. It is not in this repo. |

Learning links, used as links only:

- [Asabeneh/30-Days-Of-Python](https://github.com/Asabeneh/30-Days-Of-Python) has no licence file. Link, do not copy.
- [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) is MIT. Linked, not vendored.
- [afshinea/stanford-cs-229-machine-learning](https://github.com/afshinea/stanford-cs-229-machine-learning) is MIT. Linked, not pasted.

## Deliberately left out

- Vendoring Anthropic's skills, stop-slop, Superpowers, or any other pack. [`skill-writing`](skills/skill-writing/SKILL.md) already refuses that.
- Copying context-mode. Elastic License 2.0 is not a licence to drop their code into an MIT repo.
- Installing Headroom or context-mode into this repository. This tree is markdown. Those tools belong on a coding session that is drowning in logs, and only after you read what they change.
- Semgrep and Trivy as blocking jobs on this markdown repo. The template is report-only, for repos that have code. This repo's own Action lints the foundation pages and runs `scripts/validate_repo.py`.
- Sigstore on this repo. Nothing here is a binary other people install.
- k6 against any host we do not own, and never against a live life-safety system.
- Open Policy Agent. The catalog says to skip it until a shared policy language is actually needed.
- OWASP Juice Shop except as a localhost scanner drill on a machine with no secrets.
- Gitleaks as a second secret scanner beside Trivy in the new baseline. Older [`appsec-stack`](skills/appsec-stack/SKILL.md) pages still mention it. The day-one vetted scanner is Trivy.
- Rewriting the existing library. The new skills are a gate in front of it.
- A third-party agent firewall or policy engine for `non-bluff`. Two short standard-library scripts and one JSON policy were enough. Open Policy Agent stays out for the reason above.
