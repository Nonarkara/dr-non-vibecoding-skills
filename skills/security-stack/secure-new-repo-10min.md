# A new repo in ten minutes

Do this on the **M5**. The M3 does not compile the hook, run Docker, or host the scan. Copy the files from [`configs/`](configs/). The rules are in [`SKILL.md`](SKILL.md).

Paste every log into the pull request. A step you did not run is `unverified`, with the reason. Do not write "done" over a missing log.

Set both paths first. `SKILLS` is the root of a clone of this repo. `APP` is the new repo.

```bash
SKILLS="/absolute/path/dr-non-vibecoding-skills"
APP="/absolute/path/the-new-repo"
```

## 1. gitleaks, before the first push

```bash
brew install gitleaks pre-commit
cp "$SKILLS/skills/security-stack/configs/.pre-commit-config.yaml" "$APP/.pre-commit-config.yaml"
cd "$APP"
pre-commit install
gitleaks detect --source . --redact --no-banner --log-opts="--all"
```

The history scan is the command above. The hook blocks the next commit. The first `pre-commit run` builds the Go binary. That build stays on the M5.

If the log shows a real key, rotate it. Then keep going. Redact means the log names the file and the rule, not the value.

## 2. gitignore, and one home for secrets

Start from [`templates/gitignore.template`](../../templates/gitignore.template). Confirm these lines exist, and add any that do not:

```
.env
.env.*
!.env.example
.dev.vars
*.pem
*.key
```

`.env.example` has empty values. The live value is `wrangler secret put NAME` or a GitHub Actions secret. It is not in `wrangler.toml`.

## 3. Dependabot

```bash
mkdir -p "$APP/.github"
cp "$SKILLS/skills/security-stack/configs/dependabot.yml" "$APP/.github/dependabot.yml"
```

Weekly, grouped, no auto-merge. Add `pip` or `gomod` only if the repo has that manifest. The bot opens pull requests. You merge them.

## 4. The report-only workflow

```bash
mkdir -p "$APP/.github/workflows"
cp "$SKILLS/skills/security-stack/configs/security.yml" "$APP/.github/workflows/security.yml"
```

Before you commit it, check three things in the file:

- `permissions:` is `contents: read` and nothing else.
- Every `uses:` is a 40-character commit SHA, with the tag in a comment.
- Scans do not fail the job. Pre-commit is the block. CI is the report. Turn a scan red only after you have read the noise.

## 5. Dependencies, locally

```bash
osv-scanner scan source --recursive .
trivy fs .
```

Install both on the M5 if they are missing (`brew install osv-scanner trivy`). Commit the output's summary. Findings stay in the report until you triage them. They do not block this first pull request.

## 6. Semgrep, locally

```bash
unset SEMGREP_APP_TOKEN
semgrep scan --config auto --metrics=off --disable-version-check
```

No app token. Metrics off. Do not commit the rules the registry sent.

## 7. Headers

Copy [`configs/_headers`](configs/_headers) to the directory Cloudflare Pages publishes (`public/_headers`, or the project root if that is what the project publishes). Deploy, then:

```bash
curl -sI "$LIVE_URL" | tee headers.txt
```

The response includes `content-security-policy`, `strict-transport-security`, `x-content-type-options: nosniff`, and `x-frame-options: DENY`. A map tile or a font host that the policy blocks is a line you add on purpose, in the same pull request, with the host named.

## 8. Cloudflare money

On the Cloudflare account, for this project:

- a rate limit on each public route (429 and `Retry-After`; the shape is [`rate-limiting`](../rate-limiting/SKILL.md))
- a usage cap on anything that can bill (Workers AI, Queues, KV, D1, R2, cron, alarms)
- a spend alert

No card on the account. Write in the pull request the rule you set and the dollar amount of the alert. Also write this sentence: the alert email does not pause the account. The code guards are [`configs/wrangler-guards.md`](configs/wrangler-guards.md).

Google, if the repo uses it, stays on the free tier with no card. If the console asks for a card, stop.

## 9. ZAP, from the M5, against our URL

```bash
docker run --rm -t ghcr.io/zaproxy/zaproxy:2.17.0 zap-baseline.py -t "$LIVE_URL"
```

`$LIVE_URL` is a host we operate. It is not a third-party API. It is not run on the M3. Record the image digest (`docker image inspect --format '{{index .RepoDigests 0}}' ghcr.io/zaproxy/zaproxy:2.17.0`) next to the log.

If the M5 is already a self-hosted GitHub runner labelled `m5`, [`configs/zap-baseline.yml`](configs/zap-baseline.yml) is the dispatch form of the same scan. Do not change `runs-on` to `ubuntu-latest`.

## 10. Evidence in the pull request

Paste:

- the gitleaks history log
- the osv-scanner and Trivy logs
- the Semgrep log
- `headers.txt` from the curl
- the Cloudflare rate limit, cap, and alert you set
- the ZAP log and the image digest, or `unverified` if there is no live URL yet
- the Actions run URL for `security.yml`

If the Action did not run, say so. Billing blocks workflows on this account. Paste the local logs and leave the CI line as blocked. Do not write "CI passed".
