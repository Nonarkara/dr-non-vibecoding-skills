---
name: messaging-gateway
description: >-
  Put a cited local or cloud assistant behind Telegram, LINE, Discord, or
  WhatsApp. Use when answers or approved automations must reach chat.
license: MIT
---

# Messaging Gateway

> The folder is the brain, the chat app is the mouth. One webhook, one RAG query, one cited answer — on the phone the user already holds.

[`simple-rag`](../simple-rag/SKILL.md) answers from local docs. This skill puts those answers behind **Telegram** (simplest start), **LINE** (the Thai audience), **Discord** (communities and slash commands), or **WhatsApp** (Meta Cloud API). The core loop is shared; authentication, acknowledgement deadlines, payloads, and reply limits are not.

Influences: [`simple-rag`](../simple-rag/SKILL.md) (retrieval), [`local-llm-ollama`](../local-llm-ollama/SKILL.md) (drafts + embeddings), [`dual-write-resilience`](../dual-write-resilience/SKILL.md) (two-tier write), [`always-on-services`](../always-on-services/SKILL.md) (webhook target), [`security-hygiene`](../../reference/security-hygiene.md) (tokens).

---

## The rule

Every chat answer carries its source. A messenger assistant that cannot cite the file is a rumour service with good UX.

---

## The procedure

### 1. Pick the app (one, then expand)

| App | Setup | Webhook | Cost / note |
|---|---|---|---|
| **Telegram** | [@BotFather](https://t.me/BotFather) → `/newbot` → token | `setWebhook` or poll `getUpdates`; the two modes are mutually exclusive | Simplest prototype; start here |
| **LINE** | [Developers Console](https://developers.line.biz) → Official Account → Messaging API | Verify `x-line-signature` against the untouched raw body | Default when the audience already lives in LINE |
| **Discord** | [Developer Portal](https://discord.com/developers/applications) → app + command | Gateway or HTTP interactions; HTTP requires signature validation and a fast acknowledgement | Best for slash commands and communities |
| **WhatsApp** | [Meta Cloud API](https://developers.facebook.com) → phone-number ID + token | Webhook with verify-token handshake and signed events | Most setup friction; add only for a real audience |

Tokens and signing secrets live in Keychain, a secret manager, or environment variables (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `LINE_CHANNEL_TOKEN`, `LINE_CHANNEL_SECRET`, `DISCORD_BOT_TOKEN`, `DISCORD_PUBLIC_KEY`, `WHATSAPP_TOKEN`) — never in the repo or vault. See [`security-hygiene`](../../reference/security-hygiene.md).

For Telegram, finish setup before writing the assistant:

1. Send `/newbot` to BotFather and store the token outside the repository.
2. Use `/setcommands` so the bot's capabilities are visible. Change `/setprivacy` only if a group bot genuinely needs ordinary messages.
3. Prove the token with `getMe`.
4. Prototype with `getUpdates`, advancing the offset so updates are not repeated. Delete polling before calling `setWebhook`.
5. For webhooks, set a random `secret_token` and verify Telegram's `X-Telegram-Bot-Api-Secret-Token` header before parsing or queueing the update.

### 2. The loop

```
provider update → verify signature/secret on raw request → dedupe event ID
  → acknowledge quickly → enqueue work → apply user/chat allowlist
  → rag/query.py "<q>" → top-3 chunks → local Ollama or approved cloud route
  → reply with citations → log {provider, chat_id, event_id, action, cited paths, ts}
```

Polling works for Telegram prototypes with zero public URL. Anything real uses a webhook behind the [`always-on-services`](../always-on-services/SKILL.md) tunnel. Verify the provider before JSON parsing: LINE signs the exact raw body with HMAC-SHA256; Discord signs it with the application public key; Telegram can send the configured secret-token header. Discord interactions require the initial response or deferral within three seconds, so queue local-model work after acknowledging. Sources: [Telegram Bot API](https://core.telegram.org/bots/api), [LINE signature verification](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/), and [Discord interactions](https://docs.discord.com/developers/interactions/receiving-and-responding), checked 2026-09-14.

### 3. Answer shape (the discipline)

- Max 3 cited chunks; name `file + heading`, never a bare snippet.
- If RAG top-5 precision fails (no chunk above threshold): say so + offer the closest file — never invent. This is [`honest-envelope`](../honest-envelope/SKILL.md) for chat.
- Thai users get Thai answers when asked in Thai; retrieval stays cross-language per [`simple-rag`](../simple-rag/SKILL.md).
- Log every turn per [`local-ai-fabric`](../local-ai-fabric/SKILL.md)'s `turns(chat_id, role, content, ts)` — continuity without a vector DB.

### 4. Separate answers from actions

Treat “answer from my notes” and “do something on my behalf” as different trust levels.

- Read-only commands may query cited RAG after the sender/chat allowlist passes.
- Side effects (publish, delete, pay, message another person, unlock a door) require an explicit command, validated arguments, an idempotency key, and a confirmation step proportional to blast radius.
- The model proposes a structured action; deterministic code validates and executes it. Never let free-form model text become a shell command.
- Deny unknown users and chats by default. Do not use “knows the bot username” as authorization.
- Redact secrets and personal message content from logs; record action metadata and cited paths.

Every accepted message writes a durable event record before work begins. If the primary store fails, use the [`dual-write-resilience`](../dual-write-resilience/SKILL.md) fallback or return “temporarily unavailable”; never silently execute without an audit record. Rate-limit by provider + user/chat, not IP alone.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Four apps on day one | Telegram polling first; LINE or Discord second only when the audience requires it |
| Answering without citations | Chat removes the dashboard's source column — put the source *in* the message |
| Tokens in `.env` committed "temporarily" | There is no temporary in git history — Keychain/env names only |
| Cloud LLM for every reply | Drafts + classification go local (free); depth goes cloud — see [`local-llm-ollama`](../local-llm-ollama/SKILL.md) routing |
| Webhook with no health check | `/api/health` per `always-on-services`; the watchdog polls it, not your phone |
| Letting the model run arbitrary tools | The model proposes; deterministic policy checks identity, arguments, confirmation, and idempotency |
| Parsing before signature verification | LINE and Discord signatures cover raw bytes; parsing changes the evidence |

---

## The test

From a phone on mobile data, run five checks: one known cited question, one unknown question, one duplicate event, one unauthorized sender, and one side-effect command that requires confirmation. The known answer cites its source; the unknown answer abstains; the duplicate executes once; the stranger is denied; the action does nothing before confirmation. The event log proves all five. For Discord, the initial acknowledgement also lands inside the three-second deadline.
