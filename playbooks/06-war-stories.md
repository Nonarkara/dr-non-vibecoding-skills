# War Stories

Every rule in this repo exists because something broke first. These are the incidents that changed how I work, with what they actually cost.

Read this one if you read nothing else. Principles are cheap; these are the receipts.

---

## The Codex Incident — a live site collapsed into a template (2026-04-23)

**What happened.** An agent silently rewrote a live homepage from **1,338 lines to 345**. The Leaflet map, the satellite HUD, the canvas animation, and the `[EVENT_ID]` protocol sections were replaced with a generic rounded-card Tailwind template. It also deleted a referenced file while CI still pointed at it. Every subsequent deploy went green. Production was a ghost of itself, for days.

The agent thought it was cleaning up. The file looked chaotic. The chaos was the product.

**Cost.** A live interactive site flattened into a template nobody asked for. A silent CI break that hid the regression behind a green checkmark. Hours of "it deployed fine" while the map, the HUD, and the canvas were gone.

**What changed.** The anti-regression laws: never collapse a file by more than 30% in one edit; never delete a live interactive element; never commit a destructive rewrite under a mild message ("refactor", "cleanup", "tidy"); never delete a referenced file without grepping every CI workflow and import first. Recovery is `git log --stat` to find the line-count drop, then `git show <hash>:<path>` — restore surgically, do not rebuild from scratch.

**The lesson.** *If a file is >500 lines and looks messy, that is a signal it is carrying personality — not a signal to flatten it.* "This would be cleaner as a template" is the crime arriving. → [anti-regression](../skills/anti-regression/SKILL.md)

---

## The poisoned edge (2026-08-09)

**What happened.** I patched an XSS hole in an emergency-alert layer, bumped the asset version, deployed, and verified: the custom domain was serving the new `index.html` with the new `?v=` string. Green.

It wasn't live. An edge node still held **old bytes for the JavaScript file**, and the first request for the *new* version key cached those old bytes under it. The new key was now permanently pinned to unpatched code. New HTML, old JS, a just-fixed XSS back in production, and every check I had said fine.

Worse: **my own verification caused it.** Curling the custom domain early is what pinned the stale bytes.

**Cost.** Hours of a security fix not being live while believing it was. Then a version-bump cascade — `3.8.15 → 3.8.20 → 3.8.21 → 3.8.22 → 3.8.23 → 3.8.25` in one session — to force the edge to let go.

**What changed.** The deploy script now proves *content*, not version strings: md5 of one JS and one CSS file, fetched through **throwaway `&probe=N` cache keys** so a stale response can only poison a key nobody will request again. Three consecutive matches required. Canonical alias verified before the custom domain is touched at all. Distinct exit codes so the failure modes are distinguishable.

**The lesson.** *A deploy is not an upload. A deploy is a human receiving new bytes.* → [deploy-verification](../skills/deploy-verification/SKILL.md)

---

## Two tunnels ate each other (2026-07-04)

**What happened.** `cloudflared tunnel run <name>` with no `--config` flag falls back to `~/.cloudflared/config.yml`. Two unrelated tunnels both fell back to it and **silently overwrote each other's ingress routing**. Two products went down together. No error anywhere — the tunnels were healthy, they were just routing to the wrong places.

**What changed.** The default config file is now deliberately inert, with a comment explaining why:

```yaml
# Every tunnel has its own config, loaded via an explicit --config flag in its
# plist. Running with no flag falls back HERE, which is exactly what caused two
# unrelated tunnels to silently overwrite each other's routing on 2026-07-04.
# Don't add ingress here — give any new tunnel its own file.
ingress:
  - service: http_status:404
```

**The lesson.** When a tool has a silent global fallback, **poison the fallback**. Make the wrong path fail loudly instead of working incorrectly. → [always-on-services](../skills/always-on-services/SKILL.md)

---

## The watchdog watching the wrong disk

**What happened.** A disk watchdog checked `/` and reported healthy for weeks while a service crash-looped on a full volume. On modern macOS, `/` is a read-only system snapshot that is *never* full; the data volume is `/System/Volumes/Data`.

The watchdog wasn't broken. It was answering a question nobody had asked, confidently, and masking a real outage the whole time.

**Cost.** Weeks of a dead ingest loop believed healthy. In a related incident, a flood collection loop was dead for **36 days** while an archive grew quadratically underneath it.

**What changed.** Watchdogs check the thing that actually fails. Every health endpoint reports **last successful ingest per source**, not just "server responding" — a process can be perfectly alive and doing nothing.

**The lesson.** *A watchdog that checks the wrong thing is worse than no watchdog, because it manufactures confidence.*

---

## ENOSPC takes everything down at once

**What happened.** A SQLite database growing 10–30 MB/day filled the volume. Then **every** service on the machine ENOSPC-crash-looped simultaneously — including the ones that would have told me. The only trace was a crash message in a log file the server could no longer write to.

**What changed.** Nightly backups as their own launchd job. Long-term archives on external storage with configurable paths (`APP_DB_PATH`). Log rotation everywhere. A disk watchdog that alerts at 85%, not 99%.

Biggest safe reclaims on a dev Mac, in order: `~/.npm/_cacache`, `~/Library/Caches/`, Playwright and Chrome browser caches. Easily several GB.

**The lesson.** *Disk is a shared dependency of every service you run. It fails all of them at once, and it takes out your monitoring first.*

---

## Live API keys in my notes vault (redacted 2026-07-03)

**What happened.** An automated email-ingest pipeline wrote incoming mail into my Obsidian vault. In 2026-05, several live API keys arrived by email and landed in a folder that agents read freely over MCP. They sat there for weeks.

**Cost.** Every affected key had to be treated as compromised and rotated. The redaction markers are still in those notes on purpose, so nobody tries to reconstruct a dead key.

**What changed.** An explicit, written security model at the top of the vault:

> Nothing in this vault is hidden from you. `.mcpignore` exists but the filesystem server does **not** enforce it — it documents *intent* only. Therefore: never write secrets, API keys, tokens, or passwords into any note. Point to the Keychain instead.

Plus a `vault-doctor.py` scanner run after bulk writes, and a dedicated folder that holds *pointers* to secrets, never values.

**The lesson.** *Assume every agent reads everything you've given it a path to.* Ingestion pipelines don't know what's sensitive. Ambient exposure beats deliberate leaks as a threat model, every time. → [security hygiene](../reference/security-hygiene.md)

---

## The unreachable button

**What happened.** A "locate me" floating button overlapped the map legend at every viewport size and was unclickable behind it. It shipped. Nobody reported it — people just quietly failed to use the feature.

**What changed.** A UX audit pass that **hit-tests every interactive element at 1280 / 768 / 375** rather than eyeballing a screenshot. It found the FAB, plus a batch of touch targets under 44px on iPhone: the language toggle, the hotline link, picker rows, the TTS control.

**The lesson.** *Nobody files a bug for "I couldn't press it."* They just stop using it. Visual review does not catch geometry; only hit-testing does. → [design-dna](../skills/design-dna/SKILL.md)

---

## The ingest that saved data and reported failure

**What happened.** A variable was declared inside a transaction closure and referenced after it. Every ingest threw `newCount is not defined` — *after* successfully committing. So the data was saved and the run was marked failed. Dashboards showed failures; the database was fine. Debugging went in exactly the wrong direction.

**What changed.** The fix took a line. The *note* took ten, and it's in the project's `CLAUDE.md` with the date and the symptom, because the symptom is how the next person will find it.

**The lesson.** *Write down what the failure looked like, not just what it was.* Future you searches by symptom.

---

## The podcast that invented a senator

**What happened.** A generated audio pipeline shipped its first real episode — and it had fabricated a quote from a person who does not exist. It was published, in a synthetic voice, as news.

**What changed.** A fact guard between generation and publication. Plus related guards from the same family of bug: numbers spoken with their decimals dropped, and an episode announcing "TODAY" when the latest one wasn't from today.

**The lesson.** *Generative output that reaches the public needs a verification stage that is not itself generative.* The pipeline was excellent at sounding right. Sounding right is the failure mode, not the goal.

---

## The pattern behind all of them

Look at the list. Almost none are logic bugs.

They're **verification failures**: something reported success while failing. The edge said deployed. The tunnel said healthy. The watchdog said green. The ingest said failed while succeeding. The podcast said confident while inventing.

Which is why nearly every technique in this repo is about proof rather than construction — probe the bytes, check the right disk, report last-successful-ingest, hit-test the geometry, guard the facts, and never let "done" mean anything but *verified on the live URL*.

Writing code is the easy half. Knowing whether it's actually running is the job.
