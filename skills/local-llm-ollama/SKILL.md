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
| Chat / draft | `qwen3:8b` (or `gemma3:12b` if RAM allows) | Summaries, classification, script drafts for human review |
| Embeddings | `nomic-embed-text` | [`simple-rag`](../simple-rag/SKILL.md) vectors — only after the FTS5 gate passes |
| Fallback | whatever fits the smallest machine | Offline survival, plane-ride mode |

```bash
ollama pull qwen3:8b && ollama pull nomic-embed-text
ollama list  # three rows max — a fourth model is procrastination
```

Keep it to three. The practice that pulled nine models used two and paid disk + confusion for seven.

### 4. Prove it with curl before wiring anything

```bash
# chat (OpenAI-compatible path also exists at /v1/chat/completions)
curl -s http://localhost:11434/api/generate -d '{"model":"qwen3:8b","prompt":"Say OK","stream":false}' | head -c 200
# embeddings
curl -s http://localhost:11434/api/embeddings -d '{"model":"nomic-embed-text","prompt":"hello"}' | head -c 200
```

Both must return JSON. If either hangs, `ollama ps` then `ollama stop <model>` — a wedged model looks like a network failure.

### 5. Wire one caller, document the baseURL

```bash
# .env (local only, never commit)
OLLAMA_HOST=http://localhost:11434
OLLAMA_CHAT_MODEL=qwen3:8b
OLLAMA_EMBED_MODEL=nomic-embed-text
```

Point the RAG embedder, the podcast script step, or the bot draft step at `OLLAMA_HOST`. Write the three vars into the project's `context.md` per [`mcp-cli-first`](../mcp-cli-first/SKILL.md) — names, not secrets (there are none; local needs no key).

When one machine stops being enough (always-on gateway, two-Mac failover, rate limits), graduate to [`local-ai-fabric`](../local-ai-fabric/SKILL.md). Not before.

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
