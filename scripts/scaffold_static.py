#!/usr/bin/env python3
"""Add an honest, runnable static baseline. Never overwrite existing project files."""
import argparse
import html
from pathlib import Path
import shutil

p = argparse.ArgumentParser()
p.add_argument('target', type=Path)
p.add_argument('--name', required=True)
p.add_argument('--desc', default='A browser-based project starter.')
p.add_argument('--stack', default='Static HTML/JS')
p.add_argument('--port', type=int, default=3000)
p.add_argument('--url', default='not deployed')
a = p.parse_args()
if not 1 <= a.port <= 65535:
    p.error('port must be between 1 and 65535')
root = Path(__file__).resolve().parent.parent
a.target.mkdir(parents=True, exist_ok=True)

def add(name, content, executable=False):
    dest = a.target / name
    if dest.exists():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding='utf-8')
    if executable:
        dest.chmod(0o755)

contract = f'''# {a.name} — {a.desc}

## Conservation law

The page remains readable when every external API is unavailable. Missing data is
labelled unavailable; an HTTP success alone never means the system is live.

## Current implementation

Static HTML/JS, entry point `index.html`. Requested future stack: {a.stack}.
No framework or dependencies have been installed. Port: {a.port}.
Live URL: {a.url}. An example URL is not a deployment.

## Exact commands

- Run: `./scripts/start.sh` (Python 3; serves only on 127.0.0.1).
- Test: `bash scripts/verify.sh`.
- Build: none; static files are the output.
- Health check: `curl -f http://127.0.0.1:{a.port}/` while the server runs.
- Deploy: not configured. `scripts/deploy.sh` is an adaptation template, not a ready deployment.

## Sacred items — do not regress

1. Keep all three feed cards and their unavailable states.
2. Keep this contract, keyboard-readable content and the component reference.
3. Never collapse a file by more than 30% without approval or replace earned content with filler.

## Work method

Read README.md and these exact commands first. Recall at most three relevant
shared lessons if the memory bridge is available; the bridge is optional.
State the blast radius, make surgical changes, and verify the changed behaviour.
Record verified novel fixes in docs/lessons/. No secrets in contracts or Git.

## Production gates

Current maturity: Demo. No authentication, paid API keys or personal data.
Validate external data. If adding a paid endpoint, add authentication and rate limits.
Displayed observations need source and observation date; never pass fallback data off as live.

## Design contract

Register: Console. Reader: a newcomer checking three public feeds.
Keep responsive cards, square geometry and clear status. Document intentional exceptions.

## Optional integrations

Local models, cloned voice, messaging bots and hosting require separate setup.
No required environment variables for reading. Credentials stay in the environment.
Service templates are inert until configured and explicitly installed.

## Done

Report succeeded, failed, skipped and unverified separately. When a live URL exists,
commit, push, deploy and verify it before calling a production change done.
'''
for filename in ('AGENTS.md', 'CLAUDE.md', 'GEMINI.md'):
    add(filename, contract)

add('scripts/start.sh', f'''#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is needed for HTTP preview. Install Python 3, or open index.html directly for the basic reader." >&2
  exit 1
fi
echo "Open http://127.0.0.1:{a.port}/ (Ctrl-C to stop). External feeds require internet."
exec python3 -m http.server {a.port} --bind 127.0.0.1
''', True)
add('README.md', f'''# {a.name}

{a.desc}

## Start here

Open `index.html` in your browser. No npm, API key or account is required to read it.
External feeds need internet and may block file-based requests; their failures are labelled.
For reliable local preview, run `./scripts/start.sh`, then open http://127.0.0.1:{a.port}/.
The server requires Python 3 and is bound to your computer only.

Run `bash scripts/verify.sh` before committing. Open `docs/components.html` for the
component reference. Read `AGENTS.md` (same contract in CLAUDE.md and GEMINI.md).

## What was actually created

A static browser starter, not an installed {a.stack} application. Ask your agent to
implement that stack if you need it. No package.json means npm commands do not apply.
The SQLite helper is optional: `python3 scripts/database.py init`.

## Optional setup, not included services

Hosting, custom domains, local models, voice cloning, Telegram/LINE/Discord bots,
shared memory and paid APIs need their own setup. None is required to open this page.
`scripts/deploy.sh` is a template: choose a hosting target, configure it, and adapt
its output root and versioned asset probes before using it. It is not a one-click deploy.
Do not upload secrets, local databases or service credentials with static files.
''')
component = a.target / 'docs/components.html'
if not component.exists():
    component.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(root / 'templates/component-library.html.template', component)
dashboard = (root / 'templates/starter-dashboard.html.template').read_text()
dashboard = dashboard.replace('<Project>', html.escape(a.name)).replace(
    "<one sentence: what it is and who it's for>", html.escape(a.desc))
add('index.html', dashboard)
