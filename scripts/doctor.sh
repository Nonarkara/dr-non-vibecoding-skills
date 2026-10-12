#!/usr/bin/env bash
# Read-only prerequisite check; no installs, credentials, or network requests.
set -euo pipefail
missing=0
for tool in bash git python3; do
  if command -v "$tool" >/dev/null 2>&1; then
    echo "OK: $tool"
  else
    echo "MISSING: $tool — required for the clone/bootstrap/test workflow"
    missing=1
  fi
done
for tool in node npm ollama claude codex gemini; do
  if command -v "$tool" >/dev/null 2>&1; then
    echo "OPTIONAL available: $tool"
  else
    echo "OPTIONAL absent: $tool — not needed to read skills or open the starter"
  fi
done
echo "Windows: use WSL or a Bash environment with Git and Python 3. Native PowerShell is not tested."
echo "Node.js is required for make test; it is not required for the Markdown skills or static bootstrap."
echo "Models, voice, bots and cloud deployment require separate provisioning; no background services are started."
echo "Skill files copied to a host are not proof it loaded them. Restart the host and ask it to list a skill."
exit "$missing"
