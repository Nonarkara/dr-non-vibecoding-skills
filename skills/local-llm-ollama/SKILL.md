---
name: local-llm-ollama
description: >-
  Run single-machine Ollama with sane models, context, and health checks. Use
  when starting local inference, working offline, or backing embeddings and drafts locally.
license: MIT
---

# Local LLM via Ollama

> One machine, three jobs, a model that fits, and a measured context window — then stop tuning and start building.

This is the single-machine companion to [`local-ai-fabric`](../local-ai-fabric/SKILL.md) (which covers the M5 + M3 gateway). Most projects never need the fabric. They need Ollama installed correctly once, a context window their hardware can actually hold, and a short model list.

Influences: [`local-ai-fabric`](../local-ai-fabric/SKILL.md) (context lesson, gateway shape), [`voice-clone-podcast`](../voice-clone-podcast/SKILL.md) (Ollama as script backend), [`risk-posture`](../risk-posture/SKILL.md) (cheap-to-undo defaults).

---

## The rule

Local models buy privacy, availability, and zero marginal token cost. Small models can autocomplete, classify, retrieve, draft, and make bounded code edits. Route work beyond the measured local model's ability to a larger local machine or an online model; “offline” is an operating mode, not a claim of frontier equivalence.

---

## The procedure

### 1. Install and verify (5 min)

```bash
# macOS
brew install ollama
ollama serve &  # or launch Ollama.app
curl -s http://localhost:11434/api/version  # {"version":"..."} = alive

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Set context from measured headroom

Ollama's current default depends on available VRAM: below 24 GiB it starts at 4K, 24–48 GiB at 32K, and 48 GiB or more at 256K. Coding agents often want 64K, but a larger context consumes more memory and can force CPU offload. Set the smallest window that holds the repository slice and tool schemas, then verify the actual allocation with `ollama ps`.

```bash
# macOS example for a machine with enough measured headroom
launchctl setenv OLLAMA_CONTEXT_LENGTH 65536
# Quit and relaunch Ollama.app; a running daemon will not inherit the new env.
launchctl getenv OLLAMA_CONTEXT_LENGTH

# Linux systemd
sudo systemctl edit ollama  # add: [Service] Environment="OLLAMA_CONTEXT_LENGTH=65536"
sudo systemctl restart ollama

# The proof is the running allocation, not the configured number.
ollama ps
```

Per-request `options.num_ctx` can override the daemon default. Check both the client configuration and `ollama ps` when a coding assistant truncates prompts. Source: [Ollama context-length documentation](https://docs.ollama.com/context-length), checked 2026-09-14.

### 3. Pull three models, no more

| Slot | Pick (2026) | Job |
|---|---|---|
| Chat / bounded coding | `qwen3:4b` or `qwen3:8b` | Summaries, classification, drafts, small code edits |
| Deliberate reasoning | `deepseek-r1:8b` or a larger Qwen that fits | Local reasoning when an online model is unavailable |
| Embeddings | `nomic-embed-text` | [`simple-rag`](../simple-rag/SKILL.md) vectors — only after the FTS5 gate passes |
| Fallback | whatever fits the smallest machine | Offline survival, plane-ride mode |

```bash
ollama pull qwen3:8b
ollama pull nomic-embed-text
ollama list  # three rows max — a fourth model is procrastination
```

Keep it to three. The practice that pulled nine models used two and paid disk + confusion for seven.

### 3a. Hardware profiles — pick what your machine can actually run

The 2026 model list is a moving target; the *category* is the durable part. Pick the smallest model that does the job, then move up only when the work is not getting done.

| RAM | Chat / draft | Reasoning (if needed) | Embeddings | Notes |
|---|---|---|---|---|
| 8 GB | `qwen3:4b` (2.5 GB image) | skip or use the same 4B model | `nomic-embed-text` | Start at 8K context. Close memory-heavy apps. For autocomplete, Continue recommends `qwen2.5-coder:1.5b`. |
| 16 GB | `qwen3:8b` (5.2 GB) | `deepseek-r1:8b` if latency is acceptable | `nomic-embed-text` | Start at 16K; try 32K only after `ollama ps` shows headroom and no unwanted CPU offload. |
| 32 GB | `qwen3:14b` (9.3 GB) | `deepseek-r1:14b` | `nomic-embed-text` | 32K–64K is realistic depending on model, quantization, and concurrent apps. Measure. |
| 64 GB | `qwen3:30b` (19 GB) | `deepseek-r1:32b` | `nomic-embed-text` | Use 64K when the agent needs it; keep a smaller fast model for everyday edits. |
| 128 GB | `qwen3:8b` fast + `qwen3:30b` deep | `deepseek-r1:32b` or the 30B Qwen | `nomic-embed-text` | Two chat models are enough: fast default and deeper fallback. Increase context only for tasks that earn it. |

Model names and image sizes above are snapshots from the official [Qwen3](https://ollama.com/library/qwen3), [DeepSeek-R1](https://ollama.com/library/deepseek-r1), and [Gemma 4](https://ollama.com/library/gemma4) Ollama pages, checked 2026-09-14. “Fits on disk” is not “runs comfortably”: the OS, KV cache, IDE, and concurrent models need headroom. Licenses and acceptable-use terms belong to each model card; Ollama packaging does not replace them.

**Disk:** a 30B Q4 quant is ~18 GB. A 32B DeepSeek Q4 is ~20 GB. Plan for one chat + one reasoning + embeddings = ~40 GB on the 128 GB machine. The rest is the OS, the project, and headroom.

### 4. Prove it with curl before wiring anything

```bash
# chat (OpenAI-compatible path also exists at /v1/chat/completions)
curl -s http://localhost:11434/api/generate -d '{"model":"qwen3:8b","prompt":"Say OK","stream":false}' | head -c 200
# embeddings
curl -s http://localhost:11434/api/embed -d '{"model":"nomic-embed-text","input":"hello"}' | head -c 200
# reasoning
curl -s http://localhost:11434/api/generate -d '{"model":"deepseek-r1:8b","prompt":"What is 17*24?","stream":false}' | head -c 200
```

All must return JSON. If any hangs, `ollama ps` then `ollama stop <model>` — a wedged model looks like a network failure.

### 5. Wire one caller, document the baseURL

```bash
# .env (local only, never commit)
OLLAMA_HOST=http://localhost:11434
OLLAMA_CHAT_MODEL=qwen3:8b
OLLAMA_REASON_MODEL=deepseek-r1:8b
OLLAMA_EMBED_MODEL=nomic-embed-text
```

Point the RAG embedder, the podcast script step, or the bot draft step at `OLLAMA_HOST`. Write the four vars into the project's `context.md` per [`mcp-cli-first`](../mcp-cli-first/SKILL.md) — names, not secrets (there are none; local needs no key).

When one machine stops being enough (always-on gateway, two-Mac failover, rate limits), graduate to [`local-ai-fabric`](../local-ai-fabric/SKILL.md). Not before.

### 6. Choose one interface

| Interface | Best for | Local setup |
|---|---|---|
| Ollama app / CLI | First proof and simple chat | `ollama run qwen3:4b` |
| OpenCode | Terminal-first agentic coding | `ollama launch opencode` |
| Continue | VS Code autocomplete/chat | Configure Ollama; use a small non-thinking autocomplete model |
| Cline | VS Code agent flow | Select Ollama as the provider; keep approval on for tool calls |
| Open WebUI | Self-hosted browser chat/RAG | Connect to `http://localhost:11434`; persist its data volume |

```bash
ollama launch opencode
```

For a truly offline setup, download the model, editor extension or CLI installer, and any embedding/STT models before disconnecting; disable extension telemetry; and test once with the network off. Continue publishes an [offline setup guide](https://docs.continue.dev/guides/running-continue-without-internet). Open WebUI can run offline, but its slim image downloads embedding and speech models on first use unless they are preloaded or RAG is pointed at Ollama.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Nine models "to compare" | Two get used; seven cost disk and decision fatigue |
| Assuming the model-card maximum is allocated | Check `ollama ps`; server defaults and per-request `num_ctx` can differ, and context consumes memory |
| Local for frontier reasoning | Small models draft and classify; they do not architect — route depth to cloud |
| Exposing Ollama to the internet | Bind LAN-only; no auth on the daemon — Tailscale if remote, never port-forward |
| Tuning prompts for a week | Ship the FTS5 + draft loop first; tune against the 20-question eval in [`simple-rag`](../simple-rag/SKILL.md) |

---

## The test

`curl /api/version` returns JSON, `curl /api/generate` returns text, `curl /api/embed` returns a vector, and `ollama ps` shows the intended context/processor split — all on localhost, all with no key. Then disconnect the network and repeat the actual editor flow. If that fails, the system is local-capable but not offline-ready.
