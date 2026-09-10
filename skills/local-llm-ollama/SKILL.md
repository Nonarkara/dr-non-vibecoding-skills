---
name: local-llm-ollama
description: >-
  Run single-machine Ollama with sane models, context, and health checks. Use
  when starting local inference, working offline, or backing embeddings and drafts locally.
license: MIT
---

# Local LLM via Ollama

> One machine, three models max, context set at the daemon — then stop tuning and start building.

This is the single-machine companion to [`local-ai-fabric`](../local-ai-fabric/SKILL.md) (which covers the M5 + M3 gateway). Most projects never need the fabric. They need Ollama installed correctly once, with the context bug fixed and the model list kept short.

Influences: [`local-ai-fabric`](../local-ai-fabric/SKILL.md) (context lesson, gateway shape), [`voice-clone-podcast`](../voice-clone-podcast/SKILL.md) (Ollama as script backend), [`risk-posture`](../risk-posture/SKILL.md) (cheap-to-undo defaults).

---

## The rule

Local models do availability and cost, not capability. Drafts, classification, embeddings, offline fallback — yes. Frontier reasoning — no, route that to cloud.

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

### 2. Fix the context default (the bug every setup misses)

**Ollama serves every model at 4096 context unless the daemon says otherwise — client `num_ctx` is ignored by most agentic tools.** From [`local-ai-fabric`](../local-ai-fabric/SKILL.md), verified the hard way:

```bash
# macOS (persists across reboot, reverts on Ollama reinstall — recheck then)
launchctl setenv OLLAMA_CONTEXT_LENGTH 65536
# quit + relaunch Ollama.app — a running daemon ignores the new env
launchctl getenv OLLAMA_CONTEXT_LENGTH  # must echo 65536

# Linux systemd
sudo systemctl edit ollama  # add: [Service] Environment="OLLAMA_CONTEXT_LENGTH=65536"
sudo systemctl restart ollama
```

Symptom this fixes: local coding assistant truncates mid-file with no error. Check this before blaming the model.

### 3. Pull three models, no more

| Slot | Pick (2026) | Job |
|---|---|---|
| Chat / draft | `qwen3:8b` (or `gemma4:e2b` for small machines) | Summaries, classification, script drafts for human review |
| Reasoning (128 GB+ machines) | `deepseek-r1:8b` (or `qwen3:8b` for general chat) | Local reasoning when frontier calls are not an option |
| Embeddings | `nomic-embed-text` | [`simple-rag`](../simple-rag/SKILL.md) vectors — only after the FTS5 gate passes |
| Fallback | whatever fits the smallest machine | Offline survival, plane-ride mode |

```bash
ollama pull qwen3:8b && ollama pull nomic-embed-text
ollama list  # three rows max — a fourth model is procrastination
```

Keep it to three. The practice that pulled nine models used two and paid disk + confusion for seven.

### 3a. Hardware profiles — pick what your machine can actually run

The 2026 model list is a moving target; the *category* is the durable part. Pick the smallest model that does the job, then move up only when the work is not getting done.

| RAM | Chat / draft | Reasoning (if needed) | Embeddings | Notes |
|---|---|---|---|---|
| 8 GB | `gemma4:e2b` (or `qwen3:4b`) | skip — call the cloud | `nomic-embed-text` | Tight; the embeddings model + OS leaves little headroom. |
| 16 GB | `qwen3:8b` | `deepseek-r1:8b` (slow) | `nomic-embed-text` | The workhorse tier. 32k context. |
| 32 GB | `qwen3:14b` or `gemma4:e2b` | `deepseek-r1:14b` | `nomic-embed-text` | The comfortable tier. 65k context. |
| 64 GB | `qwen3:30b` (3-bit) | `deepseek-r1:32b` | `nomic-embed-text` | Approaching frontier quality locally. |
| 128 GB | `qwen3:8b` (default) + `qwen3:30b` (deep work) | `deepseek-r1:8b` (or route to `qwen3:30b`) | `nomic-embed-text` | Enough RAM to run *and* iterate. Hold two chat models — fast default + slow deep work. |

**Gemma 4 e2b** is the 2026 pick for the small-machine slot (8–16 GB). It is fast, has a permissive license, and survives on integrated graphics. **DeepSeek-R1** (8B / 14B / 32B) is the 2026 pick for local reasoning when the cloud is not an option — distilled from the R1 line, it keeps the chain-of-thought at usable token counts. **Qwen3** (4B / 8B / 14B / 30B) is the all-rounder: chat, draft, classification.

**Disk:** a 30B Q4 quant is ~18 GB. A 32B DeepSeek Q4 is ~20 GB. Plan for one chat + one reasoning + embeddings = ~40 GB on the 128 GB machine. The rest is the OS, the project, and headroom.

### 4. Prove it with curl before wiring anything

```bash
# chat (OpenAI-compatible path also exists at /v1/chat/completions)
curl -s http://localhost:11434/api/generate -d '{"model":"qwen3:8b","prompt":"Say OK","stream":false}' | head -c 200
# embeddings
curl -s http://localhost:11434/api/embeddings -d '{"model":"nomic-embed-text","prompt":"hello"}' | head -c 200
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

### 6. CLI use — opencode + any model, including free ones

`opencode` ([opencode.ai](https://opencode.ai)) is a terminal-first agent that talks to any OpenAI-compatible endpoint, including Ollama and the free cloud providers in [`free-api-keys`](../free-api-keys/SKILL.md). It is the lowest-friction way to use the local + free stack without leaving the terminal.

```bash
# Install
brew install opencode   # or: npm i -g opencode-ai

# Point at local Ollama (no key, no rate limit)
opencode --provider ollama --model qwen3:8b
opencode --provider ollama --model deepseek-r1:8b
opencode --provider ollama --model gemma4:e2b
```

#### Free cloud models through opencode

`opencode` reads the same `.env` keys as any other caller. Point it at the free providers in [`free-api-keys`](../free-api-keys/SKILL.md):

```bash
# Groq (fastest free inference)
export GROQ_API_KEY=...
opencode --provider openai --model llama-3.3-70b-versatile \
         --base-url https://api.groq.com/openai/v1

# Google AI Studio (long context, 1M tokens)
export GOOGLE_AI_API_KEY=...
opencode --provider google --model gemini-2.5-flash

# Cerebras (1M tokens/day)
export CEREBRAS_API_KEY=...
opencode --provider openai --model llama-3.3-70b \
         --base-url https://api.cerebras.ai/v1

# OpenRouter (200+ models, one key)
export OPENROUTER_API_KEY=...
opencode --provider openrouter --model meta-llama/llama-3.3-70b-instruct:free
```

#### Muse Spark 1.6 free (the no-card chat model)

[Muse Spark 1.6](https://opencode.ai) is the opencode project's reference chat model — fast, capable, free via the opencode hosted endpoint. No card, no signup beyond the opencode account. For a session that needs *fast chat, not local*, this is the default:

```bash
# Default to Muse Spark 1.6 free — no model flag needed
opencode

# Or pin to a specific free model
opencode --model muse-spark-1.6-free
```

**The rule of thumb:** local Ollama for *embeddings, drafts, offline*; opencode + Muse Spark 1.6 free for *default chat*; Groq / Google / Cerebras for *reasoning when local is not enough*. Rotate by the task, not by the cost.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Nine models "to compare" | Two get used; seven cost disk and decision fatigue |
| Setting `num_ctx` in the client only | Daemon serves 4096 anyway — fix `OLLAMA_CONTEXT_LENGTH` at the daemon |
| Local for frontier reasoning | Small models draft and classify; they do not architect — route depth to cloud |
| Exposing Ollama to the internet | Bind LAN-only; no auth on the daemon — Tailscale if remote, never port-forward |
| Tuning prompts for a week | Ship the FTS5 + draft loop first; tune against the 20-question eval in [`simple-rag`](../simple-rag/SKILL.md) |

---

## The test

`curl /api/version` returns JSON, `curl /api/generate` returns text, `curl /api/embeddings` returns a vector — all on localhost, all with no key. If any fails, nothing downstream is allowed to blame the model.
