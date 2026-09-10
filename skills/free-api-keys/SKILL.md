---
name: free-api-keys
description: Use when an agent or operator needs LLM API keys without a credit card, or when provisioning a stack on $0/month. Pairs with local-llm-ollama, free-apis.md.
license: MIT
---

# Free API Keys — the $0/month LLM stack

> Get going without a credit card. The thirteen providers below have been verified as of late 2026 to offer permanent or recurring free tiers with no card required. Pick by *what the call is for*, not by alphabetical order.

This skill is the *companion* to [`local-llm-ollama`](../local-llm-ollama/SKILL.md) (offline) and [`reference/free-apis.md`](../../reference/free-apis.md) (the wider free-API catalog). The discipline: **use the right provider for the right job; never pay for what is free; rotate when a free tier is exhausted.**

---

## When to use this skill

- A new project needs LLM calls and the operator doesn't want to enter a credit card.
- An agent is bootstrapping a stack on a $0/month budget.
- A rate-limited provider is throttling the work and the operator needs a fallback.
- A specific model is needed (Llama, Qwen, Mistral, DeepSeek, etc.) and the cheapest path is a free hosted inference.

Do **not** use this skill for:

- Production workloads at scale (free tiers are not a substitute for a paid account at >100K requests/month).
- Models that are not on the free lists (frontier reasoning: GPT-5, Claude Sonnet 4+, Gemini Pro beyond the limit — route to a paid account or local).
- Tasks that need privacy guarantees (free hosted APIs may log requests; route to local Ollama instead).

---

## The thirteen providers, ranked by job-to-be-done

### 1. Groq — speed + open models (the default for free chat)

- **Signup:** https://cloud.groq.com
- **Free tier:** permanent, no card, ~30 RPM, up to 14,400 RPD depending on model
- **Models:** Llama 3.1/3.3, Qwen, GPT-OSS, Whisper
- **Why it's the default:** fastest inference on the free market, OpenAI-compatible API, commercial use allowed

```bash
curl -s https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"OK"}]}' | head -c 400
```

### 2. Google AI Studio (Gemini) — quality + 1M-token context

- **Signup:** https://ai.google.dev → Get API Key
- **Free tier:** 5–30 RPM, 15–1,500 RPD (model-dependent)
- **Models:** Gemini 2.5 Flash, Flash-Lite, Pro (limited), embeddings, TTS
- **Context:** up to 1M tokens (Flash)
- **Why:** Google account only, no phone verification, commercial use OK

### 3. Cerebras — the daily token allowance (best for iterative dev)

- **Signup:** https://cloud.cerebras.ai
- **Free tier:** 1M tokens/day (resets at UTC 00:00), ~30 RPM / 60K TPM
- **Why:** generous daily reset, no card, no waitlist
- **Use for:** long-running dev sessions where Groq's per-minute limit is the bottleneck

### 4. OpenRouter — model variety (one key, 200+ models)

- **Signup:** https://openrouter.ai
- **Free tier:** 50 RPD without balance; 1,000 RPD with $10+ lifetime credit
- **Models:** 25+ rotating free models including Llama, Mistral 7B, Gemma 2, Qwen 2.5
- **Why:** one key for many models; OpenAI-compatible; vision/tool calling on select models

```bash
curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"meta-llama/llama-3.3-70b-instruct:free","messages":[{"role":"user","content":"OK"}]}' | head -c 400
```

### 5. Cloudflare Workers AI — serverless + already in your stack

- **Signup:** https://dash.cloudflare.com
- **Free tier:** 10,000 Neurons/day
- **Why:** if the project is already on Cloudflare, no new auth model — the call is from a Worker
- **Use for:** low-volume inference inside a Cloudflare-deployed project

### 6. AI Horde — anonymous (zero signup, key is `0000000000`)

- **API key:** `0000000000` (no registration) or register to earn kudos for priority
- **Models:** crowdsourced text and image generation
- **Trade-off:** queue-based; anonymous requests get lowest priority
- **Use for:** testing, throwaway calls, when the model is not the point

```bash
curl -s https://stablehorde.net/api/v2/generate/text \
  -H "apikey: 0000000000" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"OK","params":{"n":1}}' | head -c 400
```

### 7. LLM7.io — no key required (the zero-friction tier)

- **Access:** works without a token for the base tier
- **Why:** verified via project docs; the lowest possible friction
- **Trade-off:** rate limits are tightest of all; do not rely on for production

### 8. Puter.js — no API key, client-side JavaScript

- **Access:** https://developer.puter.com — 400+ models without API keys or backend
- **Why:** client-side JS library; no backend infrastructure needed
- **Use for:** static sites, prototypes, demos where the user brings their own browser

```js
import puter from 'puter';
const resp = await puter.ai.chat("OK", { model: "gpt-4o-mini" });
```

### 9. Cohere — embeddings + classification

- **Free tier:** 1,000 API calls/month, resets monthly
- **Use for:** embeddings at small scale, classification, RAG prototyping
- **Caveat:** trial keys, eval/non-commercial use only

### 10. Mistral La Plateforme — Mistral's own hosted tier

- **Free tier:** available, no card
- **Signup:** https://console.mistral.ai
- **Use for:** when the project needs a Mistral model specifically

### 11. NVIDIA NIM — frontier open models, free tier

- **Signup:** https://build.nvidia.com
- **Use for:** Llama 3.1 Nemotron, Mistral, and other models that NVIDIA hosts
- **Why:** generous free inference, no card

### 12. Hugging Face Inference API — long tail of models

- **Free tier:** free inference for select models
- **Signup:** https://huggingface.co (free account, no card)
- **Caveat:** some models require Spaces deployment for free inference
- **Use for:** a specific model that no other provider hosts (a fine-tune, a niche research model)

### 13. SambaNova — $5 free + persistent tier

- **Free tier:** $5 free credits (~30 days validity) + a persistent free tier
- **Use for:** Llama, DeepSeek, Qwen on SambaNova's RDU chips (fast)

---

## Quick start by use case

| Use case | Default provider | Why |
|---|---|---|
| Daily development with a fast open model | **Groq** | fastest, most generous, OpenAI-compatible |
| Long-context summarization | **Google AI Studio** | 1M-token context on Flash |
| Long sessions burning through daily quota | **Cerebras** | 1M tokens/day |
| Model A/B testing without changing the key | **OpenRouter** | one key, 200+ models |
| Inside an existing Cloudflare Worker | **Cloudflare Workers AI** | no new auth model |
| Throwaway test, no signup | **AI Horde** (`0000000000`) | truly anonymous |
| Static site / prototype, no backend | **Puter.js** | client-side, no key |
| Embeddings at low volume | **Cohere** | 1K free/month, good embeddings API |
| A specific model only Mistral hosts | **Mistral La Plateforme** | first-party |
| Frontier open model from NVIDIA | **NVIDIA NIM** | free, no card |

---

## The discipline (the rules behind the table)

These are the cheatsheet rules — the kind of sentence an agent pastes above the API key list.

1. **Use the right provider for the right job.** Speed (Groq), long context (Google), daily volume (Cerebras), variety (OpenRouter), no signup (AI Horde), embeddings (Cohere). Do not let one provider become the only path.
2. **Never pay for what is free.** Before entering a card on any hosted LLM, check the free tier of Groq / Google / Cerebras / OpenRouter first. The free tier is the default; paid is the exception.
3. **Rotate when throttled.** A 429 from Groq is not a failure — it is a signal to fall through to Cerebras or OpenRouter. Implement the fall-through at the caller layer, not the prompt layer.
4. **Cache the response, not the key.** The key is free; the response is expensive. A `cached(60s, key=prompt_hash)` wrapper beats any provider switch.
5. **Local for embeddings and drafts; cloud for reasoning.** Ollama + `nomic-embed-text` for embeddings and short drafts (no rate limit, no key, no egress). Cloud for tasks the small model can't do well.
6. **No-key providers for the demo, not the production.** AI Horde and LLM7.io are zero-friction but the lowest priority and the tightest limits. Use them to prove a concept; switch before shipping.
7. **Commercial use requires the right tier.** Groq and Google AI Studio allow commercial use on the free tier; Cohere trial keys do not. Check the provider's terms before shipping a paid product on a free key.

---

## The .env layout (one place, many keys)

```env
# Primary (fast default)
GROQ_API_KEY=
# Long-context fallback
GOOGLE_AI_API_KEY=
# Daily-volume fallback
CEREBRAS_API_KEY=
# Model-variety fallback
OPENROUTER_API_KEY=
# Optional: serverless, embeddings, long-tail
CLOUDFLARE_API_TOKEN=
COHERE_API_KEY=
MISTRAL_API_KEY=
HUGGINGFACE_TOKEN=
```

The provider a call routes to is a function of the task, not the order of the file. The caller is the [`mcp-cli-first`](../mcp-cli-first/SKILL.md) / `with-api-guards` style — pick by need, log which key was used, fall through on 429.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Storing the same key on three machines | Use the operator's password manager or a single shared `.env`; rotating three places is the bug that turns into a security incident |
| Building a custom router layer | The fall-through is a 10-line wrapper around the OpenAI-compatible call — three providers, not a router framework |
| Calling the free tier for production at scale | The free tier is the *bootstrap*; the paid tier is the *production*; confusing them is how accounts get banned |
| Treating "no credit card" as "no governance" | The free tier is still an account; the same hygiene (no secrets in code, no commits of `.env`, rate limit at the caller) applies |
| Believing the model is "free" because the key is | Tokens are free; compute is paid by the provider. A 1M-token/day run on Cerebras is not zero-cost, it's someone else's cost — use it deliberately |

---

## Pairs with

- [`local-llm-ollama`](../local-llm-ollama/SKILL.md) — the offline path. Use Ollama for embeddings and short drafts; free cloud for the rest.
- [`reference/free-apis.md`](../../reference/free-apis.md) — the wider free-API catalog (weather, air quality, geodata, news). This skill is the *LLM* slice; the reference is the *data* slice.
- [`mcp-cli-first`](../mcp-cli-first/SKILL.md) — the "use the strongest operation surface" rule. CLI > custom router framework.
- [`risk-posture`](../risk-posture/SKILL.md) — calibrate blast radius. Free tiers are *low blast radius* by design; do not run production on them.
- [`appsec-stack`](../appsec-stack/SKILL.md) — the seven layers. API keys are a secrets-management problem first; a tier problem second.

## Check

A "free stack" is *ready* to ship when:

- At least two providers are wired with fall-through, not just one — single-key stacks fail at 2 AM.
- The embeddings + short-draft path is on local Ollama, not on a free cloud tier.
- The `.env` is in `.gitignore`, the secrets are in the operator's password manager, and the production environment reads from a secret store.
- Each call site logs the *provider* (not the key) so fall-through behaviour is auditable.
- A 429 response triggers fall-through within the caller, not a "retry the same key" loop.
- Commercial-use eligibility is checked for every provider the production app uses, not just the dev one.
