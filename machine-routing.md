# Machine routing

Recorded 2026-10-13. Use this when a job could run in more than one place. The picture of the stack is [`now-stack.md`](now-stack.md). The M3 gate is the same on every row that touches that machine: swap under 6 GB, and free disk on `/System/Volumes/Data` above 25 GB. If the gate fails, the job does not move to the M3 "for a minute." It waits, or it goes to the M5 or to Cloudflare.

```bash
sysctl vm.swapusage
df -h /System/Volumes/Data
```

## Decision table

| The job | Send it to | Why | Example |
|---|---|---|---|
| Feature work, a test suite, a production build, video, a large dependency install | M5 Max | 128 GB, and it is the build machine. The M3 swaps and has a 256 GB disk. | `pnpm install` and the test run for a Next.js app happen on the M5, or in Actions if the budget allows. They do not happen on the M3. |
| A new or larger local model, or a model download | M5 Max | The M3's Ollama is already Non Writer and Non Meet. A second model pushes it into swap. | Pulling a coding model. Do it on the M5. Leave the M3's existing model alone. |
| FloodDash health, an existing launchd service, a tunnel that is already up | M3, read-only, and only inside the gate | Those processes live there. Restarting them is a separate decision, with health before and after and a rollback. | `curl` the health URL. Do not `launchctl kickstart` `com.flooddash.*` because a bot is curious. |
| Non Writer or Non Meet, using the model they already have | M3, the existing process | That is the service. It is not a licence to load another model. | A rewrite that calls the local model already bound for Non Writer. |
| OpenClaw or Hermes, a short backup reply | M3, inside the gate | They are the backup assistants on the always-on machine. | The main coding agent is down and the question is a short one. A build still waits for the M5. |
| "Is the M3 swapping? Is the disk filling?" | Space bot, or a person at the terminal | Read-only. btop, if used, runs while someone watches. It is not a new launchd job. | `sysctl vm.swapusage` and `df` on the data volume. If swap is not under 6 GB, add nothing else. |
| Click-through of a page that is already deployed | Play/Crash | Testing the live URL. A browser install and a heavy local build stay off the M3. | Open the live URL, do the task, record what broke. Playwright's install stays on the M5 or in CI. |
| A page with no API | Scrape bot, on the M5 or a cloud agent | Scraping needs a browser or a fetcher. That is new load. | Save the raw page, then parse it. A selector change should not require another crawl. |
| A voice turn | Voice bot | Use a model that is already running, or a free cloud key. Do not download a speech model onto the M3. | A short spoken reply from the stack that is already up. |
| Git history, open pull requests, what landed | Git bot | Read first. | `git log` and the open PR list. The write, if there is one, is the next row. |
| Any edit to a repository | Cloud coding agent | Writes go out as a branch and a pull request. Merge waits for the owner. | This documentation change. The agent does not merge it. |
| A morning or ad-hoc briefing from Calendar and GitHub | Otto | Read-only. A briefing that commits has crossed the line. | "What is on today, and which PRs are open." No push. |
| A public static site, or a small edge API | Cloudflare Pages or Workers | The page should stay up when the laptop sleeps. Live data from the M3 is allowed to go stale if it is labeled. | The frontend on Pages, `/api/*` proxied to the tunnel, as in [`always-on-services`](skills/always-on-services/SKILL.md). |
| A small scheduled fetch written in JavaScript | Cloudflare Workers cron | Actions schedules slip, and the M3 should not grow another poller. The Worker still needs the runaway-cost guards. | A cron with a cap, a kill switch, and no fetch of its own URL. A heavy Python ingest does not fit here. |
| A private admin URL, a bot console, a client preview | Cloudflare Access, in front of the existing host | Login without writing a new auth system. Free for up to 50 users (toolbox, checked 9 Oct 2026). | Email login on the admin path. FloodDash's public citizen pages stay public. Ask before changing a tunnel route. |
| A container that must exist when the Mac is off, and is not a static site | Google Cloud Run, free tier, no card | Scale to zero. A card, or `min-instances` above 0, is a stop. | A small API whose idle bill has to be zero. If the console asks for a billing account, do not continue. |
| A long lesson after a painful session | Obsidian brain, and `docs/lessons/` when it is safe to publish | The vault is the long-term memory. One nightly writer. | `capture_lesson` with the evidence. No secrets, no home-directory paths. |
| Installing a scanner, a Python lockfile, a self-hosted app, or anything from [`stack-gaps.md`](stack-gaps.md) | M5, or a cloud agent | The toolbox forbids new tools on the M3. | Trivy report-only in CI. Not a brew install on the M3 during a FloodDash incident. |

## Worked examples

**A cloud agent is asked to fix a FloodDash bug and deploy it.** The edit is a branch and a pull request from the agent. The build and the tests run on the M5 or in Actions. The deploy waits for the owner. Nobody restarts the M3 service from the agent "to see if it works" unless the owner has asked, the swap and disk gate passes, and health is checked before and after.

**Otto says three pull requests are open and the calendar is full.** That is the briefing. It does not rebase those branches, stash local edits, or merge the low-risk one.

**Space reports the M3 is swapping.** Stop. Do not clear swap by killing FloodDash, Non Writer, or Ollama. Do not install a monitor to get a better graph. Read `sysctl vm.swapusage` and `df` on the data volume, tell the owner the numbers, and move any new work to the M5.

**Play/Crash is asked to test a page that is only on localhost.** Localhost is not the deliverable. Test the live URL. If there is no live URL yet, say the check is unverified. Do not start a dev server on the M3 to manufacture one.

**A cron every five minutes is falling behind because it runs on the Mac.** If the job is small JavaScript and the data is not trapped on the M3's disk, move it to a Worker cron with the cost guards. If the job is heavy Python, it stays off both the Worker and the M3: run it on the M5 or accept that it is not a five-minute job. Do not "fix" it by adding another launchd agent on the M3.
