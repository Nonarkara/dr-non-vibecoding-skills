---
name: device-automation
description: Drive a real phone or emulator with vision instead of guessing. Use to test an app end to end, catch the defect a human eye misses, or prove a UI actually works on device.
license: MIT
---

# Device Automation

> A screenshot proves a screen renders. It does not prove the button works. The agent that says "I tapped login" without a screenshot either did it or hallucinated it — and you cannot tell which.

[`browser-as-t`](../browser-as-t/SKILL.md) verifies **web** behaviour. It says plainly that a render screenshot of the happy path is not a test. This skill is the same discipline for the other surface: a real device, where the app is actually installed, with a real screen, real touch latency, and real Logcat.

Today the reference implementation is **Google ARTEMIS** (Apache-2.0, `github.com/google/artemis`), which scores a company-reported 99%+ on AndroidWorld and ships a native MCP server. Treat that number as a vendor claim, not as a promise about your app. The *path* below is the skill. ARTEMIS is one way to walk it; Appium, Maestro, `adb`, or a hosted device lab are others.

---

## When to load this

| Signal | Load it |
|---|---|
| Shipping an Android app and nobody has run the real flow | Yes |
| "The layout looks fine but does login actually work?" | Yes |
| Bug is only reproducible on a physical device, not in unit tests | Yes |
| Reproducing a crash and you need the Logcat stack, not a description | Yes |
| Cross-app workflow (Maps → YouTube → Settings) | Yes |
| Writing tests that must survive a UI redesign | Yes — natural-language steps outlive selectors |
| Verifying a responsive breakpoint on a real viewport | Only if the emulator viewport differs from the browser's |
| Unit-testing a pure function | **No.** Wrong tool. |

If none of the above apply, you do not need a device. Do not open an emulator to prove `2+2 == 4`.

---

## The five moves

### 1. Explore before you code

Before writing a test, drive the app by hand through the flow and record what actually happens. You are looking for the things the design doc does not say:

- The splash screen delay that makes every first tap land wrong
- The permission dialog that appears only on Android 13+
- The keyboard that covers the submit button at 360dp width
- The back gesture that navigates out of the flow instead of dismissing the keyboard

This is the move that earns the most and gets skipped most. A test written from the design doc tests the design doc. A test written after exploration tests the app.

**Rule: never write a device test for a screen you have not seen on a device.**

### 2. Route Flash vs. Pro before you run

Not every device task needs a multi-agent graph with verification checkpoints. Two execution profiles, and picking wrong costs real time.

| | **Flash** (reactive) | **Pro** (planned + verified) |
|---|---|---|
| Shape | Observe → think → act, one screen at a time | Plan with milestones → act → verify each checkpoint |
| Latency | ~3–5s per step | ~15–40s per step |
| Good for | Known flow, deterministic taps, "does this button work" | Long horizons (100+ steps), exploratory testing, "walk the whole checkout and report" |
| Has | No plan, no safety net, no final report | Pre-execution safety check, checkpoint verification, written report |
| Fails by | Silently tapping the wrong thing | Taking 10 minutes and blocking on a stuck dialog |

**Rule: start Flash. Move to Pro the moment the task needs a claim you must defend** — "the whole flow works" is a claim; "this button navigates here" is an observation.

If you are using ARTEMIS: `--profile flash` vs `--profile pro`.

### 3. Locate dynamic-first, coordinate-fallback

The single highest-leverage technique. Targeting has three tiers, and you must go down them in order:

1. **Element index / accessibility id** — `content-desc="login-button"`, the resource id, the accessibility label. Stable across a redesign, survives a layout shift, testable in CI. **Always try this first.**
2. **Visual / OCR match** — find "Sign in" on the screenshot by reading it. Works when the app has no accessibility tree at all (custom Canvas, some Compose and Flutter surfaces).
3. **Raw coordinate tap** — tap `(540, 1180)`. **Last resort, and a liability.**

The liability is the point. Coordinates break the moment the device rotates, the font scales, or the OS adds an insets bar. A suite built on coordinates is a suite that rots.

**Rule: every coordinate tap you write down must carry a comment naming what it was in the previous layout.** If you cannot name it, the test is already broken and you just don't know it yet.

### 4. Prove it, or report it as unverified

Every claim a device run makes needs an artifact. Without one, it is a story.

| Claim | Evidence required |
|---|---|
| "The flow works" | Screenshot at the end state + the trace |
| "It crashed" | Logcat stack, not a paraphrase of one |
| "The button does nothing" | Two screenshots: before tap, after tap, same screen |
| "It's slow" | Timed trace with per-step latency, not "felt sluggish" |
| "There was a popup" | Screenshot of the popup, and a decision about whether it blocks the flow |

A blocked action is a **result**, not a failure. "Tap at step 7 hit a system permission dialog that the app does not handle" is a finding. Silently retrying until it passes is a fabrication.

Report in the four buckets of [`result-honesty`](../result-honesty/SKILL.md): succeeded / failed / skipped / unverified.

### 5. Keep the rules mounted, not remembered

The behaviour rules belong in the project contract, not in your head across a long session. ARTEMIS ships this as `mcp_server/rules.md` and mounts it to `~/.claude/rules/artemis.md`, `~/.codex/AGENTS.md`, `.cursor/rules/`, and others.

Copy [`templates/device-test-rules.md.template`](../../templates/device-test-rules.md.template) into the project's `AGENTS.md` or `CLAUDE.md` so every agent — this one, the next one, Codex, Cursor — inherits the same discipline.

**Install to exactly one location per agent.** Claude Code loads both `CLAUDE.md` and `~/.claude/rules/*.md`; duplicating wastes context for no gain.

---

## Setup, if you use ARTEMIS

Verified against `github.com/google/artemis` on 2026-10-20. Check the repo before trusting this block; versions move.

```bash
git clone https://github.com/google/artemis.git && cd artemis
./start.sh                    # macOS/Linux — installs adb, scrcpy, ffmpeg, uv
# Windows PowerShell: .\start.bat   (CMD: start.bat)
```

`start.sh` opens `http://localhost:8000` with a device wizard, live mirroring, and replays. You need a device with USB debugging on, or an emulator.

Mount MCP into every IDE it finds — this is the step that actually matters:

```bash
uv run artemis mcp --install all     # Antigravity, Cursor, Claude Code, Codex, Windsurf, VS Code, Cline/Roo, OpenClaw
uv run artemis mcp --install claude  # or one at a time
uv run artemis mcp --generate-config codex   # manual snippet if you prefer
```

Direct from the terminal, no IDE:

```bash
uv run artemis run "Open Settings, find Battery and report the level" --profile flash
uv run artemis ui         # web console
uv run artemis status     # lifecycle
```

The MCP surface is five tools: `mobile_run_task`, `mobile_manage_task`, `mobile_get_device_state`, `mobile_inspect_trace`, `mobile_diagnose`.

Then just ask in the chat:

> *"Build the APK, install it on the connected device, log in with a test account, verify no unexpected popups, return screenshots."*

**On-device helper.** ARTEMIS installs a small accessibility service on the phone on first task. It reads the screen layout, listens only on the device, and sends nothing off it. Pre-install with `uv run artemis helper install`; remove with `helper uninstall`. If it fails mid-task, ARTEMIS falls back to UIAutomator2 and says so in the timeline. Set `ARTEMIS_HELPER_AUTO_INSTALL=false` to refuse it.

---

## The honest limits

State these before you promise a device test to anyone.

- **Android only.** iOS is on the ARTEMIS roadmap, not shipped. For iOS you need XCUITest, or a different tool entirely.
- **The 99% is a vendor benchmark claim.** AndroidWorld is 100+ tasks across 20+ apps, chosen by Google. Your app's onboarding, your auth, your custom Canvas surface are not in that number.
- **Emulator is not device.** No real touch latency, no real thermal throttling, no real OEM skin, no real push-notification path. An emulator pass is necessary and not sufficient.
- **Flaky is a real failure mode.** Network, animations, clock, and random test data all make device tests flake. A suite that needs three retries to pass tells you nothing.
- **A device run costs minutes, not seconds.** Budget it like a human tester, because that is what it is.
- **Emulators are resource-hungry.** Two or more AVDs will fight your other work for RAM. One is the working number.

---

## Common failure modes

- **Testing from the design doc.** The test asserts the spec, not the app. Explore first.
- **Coordinates everywhere.** The suite passes today and dies on the next layout change. Dynamic-first, always.
- **"It works" with no screenshot.** A story. Proof or unverified.
- **Flashing the emulator for a logic bug.** Logcat and a unit test are cheaper and more reliable. Open the emulator when the question is genuinely about the screen or the device.
- **Running Pro for a two-tap check.** 40s per step to prove a button navigates is a waste; the observation does not need a verification graph.
- **Running Flash for a 100-step checkout.** No plan means no checkpoint; when step 60 diverges you have no idea where you are and no report. Long horizon wants Pro.
- **Silently retrying a blocked action.** A dialog you keep tapping past is a bug you just shipped.
- **Leaving the emulator running.** It eats battery and RAM, and the next run behaves differently. `uv run artemis stop` when done.

---

## Pair with

- [`browser-as-t`](../browser-as-t/SKILL.md) — the web equivalent; same proof discipline
- [`human-walkthrough`](../human-walkthrough/SKILL.md) — a real person, before a major release
- [`result-honesty`](../result-honesty/SKILL.md) — succeeded / failed / skipped / unverified
- [`wrong-green`](../wrong-green/SKILL.md) — test the failure users actually care about
- [`see-and-revise`](../see-and-revise/SKILL.md) — screenshot critique, for appearance
- [`plan-and-execute`](../plan-and-execute/SKILL.md) — the Pro profile is this, on a device
- [`agent-attack-surface`](../agent-attack-surface/SKILL.md) — a device agent with ADB is a privileged agent
- [`phone-first`](../phone-first/SKILL.md) — build the phone surface first
- [`templates/device-test-rules.md.template`](../../templates/device-test-rules.md.template) — the rules to mount in the project contract