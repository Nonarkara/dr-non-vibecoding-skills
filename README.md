# Dr Non's Vibecoding Skills

> Six months. 1,691 commits. 110 always-on services on one MacBook. 24 live hostnames.
> Three public-safety dashboards that real Thai citizens open during floods and dust season.
> One person. No team. No staging environment.
>
> This repo is what I learned doing that, packaged so you can fork it and skip the expensive parts.

**Author:** Dr Non Arkaraprasertkul ([@Nonarkara](https://github.com/Nonarkara)) — architect, urban anthropologist, Senior Smart City Expert. I learned to code by shipping, not by studying. Everything here was proven in production, and several of these rules exist because production broke first.

**Inspired by** [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — whose `karpathy-guidelines` I use daily and have vendored here with credit. That repo tells your agent how to *think*. This one tells it how to *ship*.

---

## What "vibecoding" means here

Not "the AI writes it and I hope." It means:

**You hold the taste, the risk appetite, and the definition of done. The agent holds the typing, the recall, and the patience.**

Every technique in this repo exists to make that division of labour hold up at scale — when you have 20 projects, 110 background services, and a model that will confidently ship broken bytes to an edge cache if you let it.

---

## Install (2 minutes)

```bash
git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
cp -r dr-non-vibecoding-skills/skills/* ~/.claude/skills/
```

Skills are plain markdown with YAML frontmatter — they work with Claude Code, and the same files drop into Codex/Cursor/Gemini setups as `AGENTS.md` fragments or rules. Nothing here needs a runtime.

Start with **[QUICKSTART.md](QUICKSTART.md)** if you want the 15-minute version.

---

## The nine skills

| Skill | What it fixes |
|---|---|
| [`dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md) | The 14 principles I actually decide by. Ship first. Use what you have. Kill what doesn't work. |
| [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md) | LLM overcomplication, non-surgical diffs, hidden assumptions. *(vendored, MIT, credit upstream)* |
| [`ship-discipline`](skills/ship-discipline/SKILL.md) | Agents that say "done" without ever hitting the live URL. The CPDT loop. |
| [`deploy-verification`](skills/deploy-verification/SKILL.md) | The edge cache silently serving old JS under a new version key. This one cost me a live XSS fix. |
| [`always-on-services`](skills/always-on-services/SKILL.md) | Turning a laptop into 110 production services with launchd + Cloudflare tunnels, without them eating each other. |
| [`agent-memory`](skills/agent-memory/SKILL.md) | Re-explaining your project every session. The CLAUDE.md ladder + lesson docs + a vault. |
| [`data-catalog`](skills/data-catalog/SKILL.md) | Rebuilding the same API adapter in the fourth project. Catalogue, then port. |
| [`design-dna`](skills/design-dna/SKILL.md) | Agents quietly regressing your design system. Write it as a contract with named violations. |
| [`risk-posture`](skills/risk-posture/SKILL.md) | How to take risk like I do — and the specific places it has bitten me. |

## The playbooks

Longer-form, narrative. Read these once; the skills are the daily reference.

1. **[How I actually code](playbooks/01-how-i-actually-code.md)** — the real loop, hour by hour
2. **[The CLAUDE.md ladder](playbooks/02-the-claude-md-ladder.md)** — three tiers of memory that compound
3. **[Ship to production daily](playbooks/03-ship-to-production-daily.md)** — no staging, no QA team, no fear
4. **[Multi-agent and worktrees](playbooks/04-multi-agent-and-worktrees.md)** — running several agents without merge hell
5. **[Taking risk like Dr Non](playbooks/05-taking-risk-like-dr-non.md)** — the actual risk calculus
6. **[War stories](playbooks/06-war-stories.md)** — every incident that changed how I work, with the cost

## Reference

- **[Free APIs](reference/free-apis.md)** — 60+ data sources with tiers, keys, and copy-paste endpoints
- **[Stack decisions](reference/stack-decisions.md)** — what I reach for and why, with the boring honest tradeoffs
- **[Commit conventions](reference/commit-conventions.md)** — why my commit messages read like sentences
- **[Security hygiene](reference/security-hygiene.md)** — the mistakes I made with secrets so you don't have to

## Templates

Drop-in files: [`CLAUDE.md`](templates/CLAUDE.md.template), [`deploy-pages.sh`](templates/deploy-pages.sh) (the poison-proof deploy), [`service.plist`](templates/service.plist.template), [`tunnel.yml`](templates/tunnel.yml.template), [`lesson.md`](templates/lesson.md.template).

---

## The one-paragraph version

Give the agent a written contract (`CLAUDE.md`) so it starts every session knowing your project. Make "done" mean *verified on the live URL*, never localhost. Deploy with a script that proves the bytes arrived, because CDNs lie. Run everything as a supervised service so it survives your laptop closing. Write a lesson doc after anything that hurt, and make the next agent read it. Ship small, ship daily, kill fast, and open-source it — because the code was never the valuable part.

---

## License

MIT. Fork it, strip my name off it, make it yours. `karpathy-guidelines` is MIT from [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) and keeps its upstream attribution.

If you build something with this, I'd genuinely like to see it.
