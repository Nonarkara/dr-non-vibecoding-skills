---
name: messaging-gateway
description: >-
  Put a RAG assistant behind Telegram, Line, or WhatsApp. Use when answers must
  reach a phone via chat instead of a dashboard.
license: MIT
---

# Messaging Gateway

> The folder is the brain, the chat app is the mouth. One webhook, one RAG query, one cited answer — on the phone the user already holds.

[`simple-rag`](../simple-rag/SKILL.md) answers from local docs. This skill puts those answers behind the three chat apps that matter here: **Telegram** (simplest API), **Line** (where Thailand lives — 54M users per [`dr-non-golden-rules`](../dr-non-golden-rules/SKILL.md)), **WhatsApp** (Meta Cloud API). Same shape for all three; only the webhook dialect differs.

Influences: [`simple-rag`](../simple-rag/SKILL.md) (retrieval), [`local-llm-ollama`](../local-llm-ollama/SKILL.md) (drafts + embeddings), [`dual-write-resilience`](../dual-write-resilience/SKILL.md) (two-tier write), [`always-on-services`](../always-on-services/SKILL.md) (webhook target), [`security-hygiene`](../../reference/security-hygiene.md) (tokens).

---

## The rule

Every chat answer carries its source. A messenger assistant that cannot cite the file is a rumour service with good UX.

---

## The procedure

### 1. Pick the app (one, then expand)

| App | Setup | Webhook | Cost / note |
|---|---|---|---|
| **Telegram** | [@BotFather](https://t.me/BotFather) → token | `setWebhook` to your tunnel URL, or poll `getUpdates` | Free, simplest; start here |
| **Line** | [Developers console](https://developers.line.biz) → channel + access token | Webhook to your tunnel URL, verify signature | Free tier generous; Thailand default |
| **WhatsApp** | [Meta Cloud API](https://developers.facebook.com) → phone-number ID + token | Webhook with verify-token handshake | Free tier; most setup friction |

Tokens live in Keychain / env (`TELEGRAM_BOT_TOKEN`, `LINE_CHANNEL_TOKEN`, `WHATSAPP_TOKEN`) — never in the repo, never in the vault. See [`security-hygiene`](../../reference/security-hygiene.md).

### 2. The loop (same for all three)

```
chat message → your /webhook route → rag/query.py "<q>" → top-3 chunks
  → local draft (Ollama) or cloud for depth → reply with citations
  → log {chat_id, q, cited paths, ts} to SQLite
```

Polling (`getUpdates` loop) works for Telegram prototypes with zero public URL. Anything real uses a webhook behind the [`always-on-services`](../always-on-services/SKILL.md) tunnel — the static frontend stays on the CDN, `/webhook` proxies to the laptop, stale-data degradation applies.

### 3. Answer shape (the discipline)

- Max 3 cited chunks; name `file + heading`, never a bare snippet.
- If RAG top-5 precision fails (no chunk above threshold): say so + offer the closest file — never invent. This is [`honest-envelope`](../honest-envelope/SKILL.md) for chat.
- Thai users get Thai answers when asked in Thai; retrieval stays cross-language per [`simple-rag`](../simple-rag/SKILL.md).
- Log every turn per [`local-ai-fabric`](../local-ai-fabric/SKILL.md)'s `turns(chat_id, role, content, ts)` — continuity without a vector DB.

### 4. Harden the write path

Every inbound message executes the [`dual-write-resilience`](../dual-write-resilience/SKILL.md) two-tier write (primary store + fallback mirror), so a DB hiccup degrades to "temporarily unavailable" instead of a 500 the user screenshots. Rate-limit per `chat_id` (the fabric's 20 req/min is the proven default).

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Three apps day one | Telegram polling first; Line second for Thai users; WhatsApp last — each webhook is a secret + route to maintain |
| Answering without citations | Chat removes the dashboard's source column — put the source *in* the message |
| Tokens in `.env` committed "temporarily" | There is no temporary in git history — Keychain/env names only |
| Cloud LLM for every reply | Drafts + classification go local (free); depth goes cloud — see [`local-llm-ollama`](../local-llm-ollama/SKILL.md) routing |
| Webhook with no health check | `/api/health` per `always-on-services`; the watchdog polls it, not your phone |

---

## The test

From a phone on mobile data: ask 3 questions with known answers. Each reply arrives < 10s, names its source file, and the log row exists in SQLite. One missing citation fails the test.
