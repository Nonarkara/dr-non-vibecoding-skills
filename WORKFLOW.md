# Brief to pull request

Give your agent the lines below in the project you want to change. For a fresh
clone, run `make rehearse` first. It exercises skill installation in temporary
folders, scaffolding without Git identity, and a data comparison using local
fixtures. It runs with Bash, Git, Python 3 and Make.

> Help [person] do [task]. Read the project contract and preserve [working behavior].
> Propose the smallest working change and name how we will know it succeeded.
> Implement it, exercise the task and one meaningful failure, and prepare a review
> that includes the commands and outcomes. Ask before public deployment.

| Step | Start here | Carry forward |
|---|---|---|
| Frame | [Design thinking](skills/design-thinking-vibecoding/SKILL.md) | Person, decision and a concrete acceptance case |
| Build | [Build paths](BUILD_PATHS.md), [plan and execute](skills/plan-and-execute/SKILL.md) | Working slice, preserved behavior, safe route when blocked |
| Review | [Independent review](skills/adversarial-review/SKILL.md) | Confirmed findings with evidence and fixes |
| Exercise | [Browser verification](skills/browser-as-t/SKILL.md) or direct API/CLI test | Real task outcome and a failure case, with test environment |
| Ship | [Ship discipline](skills/ship-discipline/SKILL.md) and [release evidence](playbooks/17-security-from-source-to-edge.md) | Commit, test receipts, release scope and unchecked items |

Start review-only for an audit request. Fix and retest when the user asks for
changes. Keep sanitized evidence in the PR or project execution notes with the
revision tested. A provider restriction, missing credential, or failed check
leaves the affected operation blocked. Local fixtures can still prove local behavior.

## Benchmark against gstack

Checked 25 November 2026. This comparison covers documented workflows and
locally runnable checks. Comparative model performance and host certification
would require equivalent tasks run on both stacks.

| What gstack makes easy | What this stack now gives a builder |
|---|---|
| `/office-hours` hands a design brief to later stages | One host-neutral prompt and decision-based routing across existing skills |
| `/review`, `/qa` and `/qa-only` separate review, execution and remediation | Same distinction with a direct browser/API/CLI route and reproducible failure cases |
| `/ship` puts verification evidence in a PR | Test receipts, human-controlled release and an executable Pages evidence gate |
| Host tiers distinguish installation from certification | Isolated installation checks and an explicit activation check for the actual agent |

gstack documents a dedicated browser runtime and host-enforced controls for
some harnesses. Our workflow uses an available browser, CLI or connector and
relies on the host for enforcement. Our specialist routes cover Thai and English
civic interfaces, task geometry, traceable maps and offline cooked data. Use
the rehearsal and the actual task evidence to judge whether those choices
help your project. [gstack upstream README](https://github.com/garrytan/gstack#readme)

## Pages deployment

The starter opens locally as one HTML file. To publish through the Pages
template, prepare an asset-only output directory and adapt the versioned
asset probes to your build. Set `PAGES_PROJECT`, `PAGES_CANONICAL`, `PAGES_CUSTOM`
and `PAGES_ROOT` explicitly. Record the final source commit and generate its
release evidence in the project outside the upload directory. Do this after
committing the source so the evidence can refer to that exact commit.
Review the build output and evidence before approving the upload.
