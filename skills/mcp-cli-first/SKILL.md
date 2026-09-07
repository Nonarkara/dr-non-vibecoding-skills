---
name: mcp-cli-first
description: >-
  Use the strongest operation surface: connector, CLI, API, then GUI. Use when a
  cloud or service action can be executed instead of described.
license: MIT
---

# MCP / CLI First

> If a tool can do it, do it. Never describe the dashboard. The user is looking at a different screen than you, and the dashboard's button names are not stable.

Choosing a stronger tool does not expand authority. Use connectors, CLIs, and APIs only for
in-scope actions; ask before spending, publishing, messaging people, deleting data, or changing
persistent infrastructure when the user has not authorized that class of mutation.

The single most expensive mistake a coding agent makes is describing a GUI flow instead of using the connected tool. The agent assumes the user can find the button it named. The user can't — the button moved, or doesn't exist, or is behind a permission the user doesn't have. The session dies in frustration, and the user's reason to use the agent is now in question.

This rule is the standing answer. It is not a "consider also"; it is the default. Every other rule in the repo assumes the agent has already checked the tool path before responding.

---

## The tier list — check in order, every time

### 1. Connected MCP tool

If the runtime exposes an MCP tool for the service (Cloudflare, Supabase, Vercel, calendar, Drive, GitHub, Notion, etc.), **use it immediately when the action is already authorized.** Do not mention the dashboard. Do not mention the alternative. Tool availability is capability, not permission; the call itself is the action.

```text
# Wrong
"You can configure the DNS record by going to the Cloudflare dashboard
and clicking on the DNS tab for nonarkara.org..."

# Right
[call mcp__cloudflare__update_dns_record with zone=nonarkara.org, type=CNAME, ...]
```

The user already saw the call happen in the tool result. They don't need a description of how to do it.

### 2. CLI tool

If there is a CLI in `PATH` (`wrangler`, `gh`, `gcloud`, `psql`, `npm`, `npx`, `wrangler`, `kubectl`, `terraform`, `aws`, `stripe`, `fly`, `railway`, `vercel`, `netlify`, anything), **use it.** Don't describe a dashboard.

```bash
# Wrong
"In the Cloudflare dashboard, navigate to Workers → KV and click Create namespace..."

# Right
wrangler kv:namespace create "VISITOR_ORIGINS"
```

The user runs the command. The output is the answer.

### 3. API + curl (or the SDK)

If the service has an API and a token is available, call it with `curl`, `httpie`, or the official SDK. **No dashboard description.**

```bash
# Wrong
"You can set up the webhook by going to the Stripe dashboard..."

# Right
curl -X POST https://api.stripe.com/v1/webhook_endpoints \
  -u "$STRIPE_SECRET_KEY:" \
  -d url=https://api.example.org/stripe/webhook \
  -d "enabled_events[]=charge.succeeded"
```

### 4. GUI — the last resort, named explicitly

Only when the action has no API, no CLI, and no MCP path — and that is a small set: OAuth consent screens, billing changes, MFA-protected account actions, the very first domain registration, anything behind a hardware key. When you must describe a GUI step, **say explicitly**:

> "No API/CLI path for this specific action — this one step needs to be done in the browser. The rest of the setup is already done via the tools above."

Hand off that one step only. Don't write a multi-step GUI flow as if it were the default.

---

## The red-flag phrases

If you are about to write any of these, stop and use the tool instead. These phrases are the test that the agent has not checked the tier list.

- "Go to [service] and…"
- "In the dashboard, find…"
- "Click the [button name]…"
- "Navigate to Settings → …"
- "You can find this under…"
- "Open [service] and look for…"

If the tool is connected, call it. If the tool isn't connected but exists, install the connection and call it. The only valid reason to write one of these phrases is the explicit "no API/CLI path" case above, and even then, only for that one step.

---

## After any setup that creates live values

Every CLI/MCP setup step produces values the user will need again — API keys, service account credentials, namespace IDs, ARNs, webhook URLs, tunnel tokens, OAuth client IDs. **Write them into the project's `context.md` immediately** — env var names, the literal values, the source, the date. The user should never have to re-derive a live value from scratch. If the project has no `context.md`, create one at the project root.

```markdown
# <Project> Context

> Last updated YYYY-MM-DD. Live values; never put secrets here that you would not put in
> a public repo. Use environment / Keychain / secret manager for actual secrets.

## Live infrastructure

| Resource | Identifier | Created | Source |
|----------|-----------|---------|--------|
| Cloudflare KV namespace (visitor origins) | `abcd1234` | 2026-08-25 | `wrangler kv:namespace create` |
| Cloudflare Tunnel | `tunnel-uuid-here` | 2026-08-25 | `cloudflared tunnel create` |
| Public hostname | `https://api.example.org` | 2026-08-25 | DNS CNAME → tunnel |
| OAuth client (Google) | `smart-city-thailand-cdp` | 2026-06-18 | console.cloud.google.com (one-time) |
| Slack webhook (alerts) | `https://hooks.slack.com/services/...` | 2026-08-25 | slack.com/api/apps (one-time) |

## Env vars the project expects

| Var | Where set | Notes |
|-----|-----------|-------|
| `AUTH_URL` | `var/.env.production` | Must match the deployed host. |
| `KV_NAMESPACE_ID` | `wrangler.toml` | Pulled from the row above. |
| `STRIPE_SECRET_KEY` | Keychain → `stripe-prod` | Never in `.env` files. |
```

`context.md` is *not* `.env`. It is a human-readable ledger of what exists, where, and why. Secrets stay in the environment / Keychain / the project's own secret manager. `context.md` says the names; the secret manager holds the values.

**Why a separate file from `CLAUDE.md`**: the project contract (`CLAUDE.md`) is for the agent. The context ledger (`context.md`) is for the operator. The agent reads both; the operator reads `context.md` without the agent's noise. They drift, and that's fine — `context.md` is the live state, `CLAUDE.md` is the load-bearing decisions.

---

## The install / setup reporting pattern

When the user asks to "set up X", the agent should:

1. Check the tier list. Use the tool. Do not describe a dashboard.
2. Capture the live values produced.
3. Write the values to `context.md`.
4. Tell the user what is now true, not what they should do. "Tunnel is up at `https://api.example.org` — verified with `curl`. The namespace ID is in `context.md`."

If the setup touches secrets, the agent should remind the user, once, that the values are now in the secret manager and the env var names are in `context.md`. No further narration needed.

---

## Why this rule exists

The incident that created it: the user asked to set up an email address (`non@nonarkara.org`). The agent described a Cloudflare dashboard flow with specific button names. The user opened Cloudflare and could not find any of them. The Cloudflare MCP and the `wrangler` token were both connected and could have done the work in 30 seconds via API. The session died in frustration, and the user had to file a separate ticket to get the email actually working.

That incident is the rule. The agent and the user are looking at different screens. The dashboard is not the source of truth. **The tool is.** The user is paying the agent to use the tool, not to describe the dashboard to them.

---

## The single test

If your output to the user describes more than one GUI click in a row, you have not checked the tier list. Go back. Use the tool. Write the result to `context.md`. Tell the user what is now true, not what they should do.

If the tool is not connected and you know the install command, install it. If the install command is not obvious, ask once — "I'll need the Cloudflare MCP to do this in-tool rather than via dashboard; want me to set that up?" — and then proceed. Asking once is fine. Asking three times is the failure mode.
