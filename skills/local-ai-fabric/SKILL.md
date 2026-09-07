---
name: local-ai-fabric
description: Run an Apple-Silicon local-LLM fabric with gateway, memory, failover, and rate limits. Use for multi-Mac inference or unexplained local-model truncation.
license: MIT
---

# Local AI Fabric

Two machines, one gateway, zero cloud LLM bill for anything that doesn't need frontier quality. This is the actual architecture behind `axiom-ops`, not a description of Ollama in general.

## The topology

```
M5 Max (128GB, "the beast")          M3 Air (16GB, always-on)
- Big models: qwen3.8:27b,           - Small model: gemma3n:e4b
  gemma4:12b-it-qat                  - Operator gateway :8484 (always up)
- Claude Code sessions                - ops-reporter (06:00 briefing)
- Sleeps/closes lid — not 24/7        - podcast pipeline launchd jobs
        │                                     │
        └──── LAN (<hostname>.local) ─────────┘
              or Tailscale MagicDNS (remote)
```
The small always-on machine holds the gateway; the big sometimes-on machine holds the capable model. Any bot or dashboard talks to the gateway, never to Ollama directly — the gateway is what stays reachable.

## The operator gateway — `_toolkit/axiom-ops/operator/server.mjs`

Zero npm dependencies, Node 22.5+ (`node:sqlite`), OpenAI-compatible: `POST /v1/chat/completions`, `GET /health`.

- **Auth**: `Authorization: Bearer <OPERATOR_KEY>`, a self-issued secret (`openssl rand -hex 24`) — never a paid-API key, so a leaked one spends nothing.
- **Upstream failover**: `UPSTREAMS` env is an ordered `"url|model,url|model,..."` chain, probed in order (`GET {url}/api/version`, 1.5s timeout), first-alive cached for 30s. Default: try the M5 over LAN first, fall back to the M3's own local model, else 503.
- **Memory**: SQLite (`node:sqlite`), table `turns(chat_id, role, content, ts)` — the last `MEMORY_TURNS` (default 12) re-injected per request. This is what makes a Telegram bot or dashboard chat feel continuous across requests without a vector DB.
- **Rate limit**: 20 req/min per `chat_id`, sliding window, in-memory.
- Security posture: bound to home-LAN + Tailscale only, never port-forwarded; the key spends nothing even if it leaks; conversation content never logged outside the local SQLite file.

## Setup, in order

```bash
# Once, on the big machine (M5):
bash _toolkit/axiom-ops/setup-m5.sh
# binds Ollama to 0.0.0.0 (LAN-only warning included), restarts Ollama.app,
# opens Tailscale sign-in, prints the ssh-copy-id line for M3 trust

# Once, on the always-on machine (M3):
bash _toolkit/axiom-ops/bootstrap-m3.sh
# installs Homebrew/Node 22+, installs Ollama + pulls the small model,
# copies operator/server.mjs into place, generates .env with a fresh
# OPERATOR_KEY and an UPSTREAMS chain (M5 first, localhost fallback),
# installs the launchd plist
```
Wiring an existing bot or dashboard to it: swap the LLM client's `baseURL` to `http://<m3-host>.local:8484/v1`, set the key, pass a `chat_id`. That's the whole integration — it speaks the OpenAI chat-completions shape.

## The lesson every agentic coding tool on Ollama needs

**Ollama defaults every model to 4096 context regardless of what the model card claims — and client-side config cannot override it.** Setting `contextLength` in OpenCode/Continue/Cline's own config asks for more; the daemon serves 4096 anyway. Fix at the daemon:
```bash
launchctl setenv OLLAMA_CONTEXT_LENGTH 65536
```
Then **quit and relaunch Ollama.app** — a running instance does not pick up the new env. Verify: `launchctl getenv OLLAMA_CONTEXT_LENGTH` should echo `65536`. This is a machine-level setting that silently reverts on Ollama updates or a fresh install — if a local-model coding tool starts truncating or losing context mid-task with no error, check this first before assuming the model regressed.

Per-request calls that set their own `options.num_ctx` (like the operator gateway and the podcast pipeline, both at 8192) aren't affected by this — the daemon default only matters for callers that don't specify it themselves, which is most agentic coding tools out of the box.

The gateway itself should run under [`always-on-services`](../always-on-services/SKILL.md)'s four-job pattern on the M3 (server/tunnel/watchdog/backup), not as a bare process — a self-issued key that spends nothing if leaked is exactly the kind of low-stakes secret [`risk-posture`](../risk-posture/SKILL.md)'s hard-line-4 doesn't need to apply to as strictly as a paid API key, but the gateway going down silently still needs the same watchdog discipline as anything else that stays up 24/7.

## What this buys, and what it doesn't

Zero marginal cost for anything the small local models can handle competently — bot chat memory, quick classification, draft generation feeding a human review step. It is explicitly **not** frontier quality (see `data-catalog`'s local-vs-cloud default) — the job this fabric does is availability and cost, not capability. Route anything that needs real reasoning depth to a cloud model; route anything that needs to survive a plane ride or an API outage through here.
