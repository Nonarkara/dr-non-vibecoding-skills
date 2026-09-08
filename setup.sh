#!/usr/bin/env bash
# ==============================================================================
# Dr Non's Vibe Coding Stack — Setup & Project Bootstrapper
#
# Clones, installs skills across all coding agents (Claude Code, Codex, Cursor,
# Antigravity, Gemini CLI), and bootstraps new or existing projects with
# Dr Non's complete scaffolding, contracts, deploy discipline, and invariants.
#
# Usage:
#   ./setup.sh --become-builder      # THE one-liner: skills on every detected agent
#   ./setup.sh                       # Interactive menu (TTY) or --become-builder (pipe)
#   ./setup.sh --install-skills      # Install skills only (no identity print)
#   ./setup.sh --init-project <path> # Scaffold project codebase structure
#   ./setup.sh --audit [path]        # Audit existing project against invariants
#   ./setup.sh --help                # Show usage
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR"
SKILLS_DIR="$ROOT_DIR/skills"
TEMPLATES_DIR="$ROOT_DIR/templates"

# ANSI Colors (Amber accent: \033[38;5;214m, consistent with Axiom Design Core)
AMBER=$'\033[38;5;214m'
BOLD=$'\033[1m'
DIM=$'\033[2m'
GREEN=$'\033[32m'
RED=$'\033[31m'
CYAN=$'\033[36m'
NC=$'\033[0m'

banner() {
  cat <<EOF
${AMBER}${BOLD}▲ Dr Non's Vibe Coding Stack${NC}
${DIM}Solo civic-studio practice for shipping software with AI agents${NC}
----------------------------------------------------------------------
EOF
}

usage() {
  banner
  cat <<EOF
Usage:
  ./setup.sh --become-builder          # Become Dr Non the Builder (canonical)
  ./setup.sh [OPTIONS]

The primary path. Clone, then one command — skills on every agent this machine
has, then the next three moves (contract, walkthrough, hindsight):

  git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
  cd dr-non-vibecoding-skills && ./setup.sh --become-builder

Options:
  -b, --become-builder           Install skills everywhere + print Builder next steps
  -s, --install-skills           Install skills to all detected agent paths
  -i, --init-project [DIR]       Bootstrap a project codebase with contracts
  -a, --audit [DIR]              Audit an existing project for Dr Non invariants
  -v, --validate                 Run repository validator (scripts/validate_repo.py)
  -h, --help                     Show this help message

Project Bootstrapper Options (non-interactive):
  --name <name>                  Project name (default: directory basename)
  --desc <description>           One-sentence purpose
  --stack <stack>                Primary stack (e.g. "Next.js + TypeScript", "Vite", "FastAPI")
  --url <url>                    Live URL (e.g. "https://app.example.com")
  --port <port>                  Local dev port (default: 3000)
  --axiom-design                 Apply Axiom Design Core tokens (hairlines, 0 radius, amber)
  --no-design                    Skip design tokens
  --services                     Generate launchd + tunnel service templates (macOS)
  --no-services                  Skip service templates
  -y, --yes                      Accept defaults without prompting

Examples:
  ./setup.sh --become-builder                  # You are Dr Non the Builder
  ./setup.sh                                   # Interactive menu (TTY) / become-builder (pipe)
  ./setup.sh --install-skills                  # Skills only, no identity print
  ./setup.sh --init-project ~/Projects/my-app  # Scaffold ~/Projects/my-app
EOF
}

# ------------------------------------------------------------------------------
# 1. Install Skills to Detected Coding Agents
# ------------------------------------------------------------------------------
install_skills() {
  # Single source of truth is scripts/install-skills.sh (host-aware, --dry-run, rsync).
  # Keep this wrapper thin so behaviour stays in one place.
  if [[ -x "$ROOT_DIR/scripts/install-skills.sh" ]]; then
    "$ROOT_DIR/scripts/install-skills.sh" "$@"
    return
  fi
  echo -e "\n${AMBER}${BOLD}▶ Installing skills across agent environments...${NC}"

  local targets=()
  local installed_count=0

  # 1. Claude Code (~/.claude/skills)
  targets+=("$HOME/.claude/skills:Claude Code")

  # 2. Codex / ChatGPT Desktop (~/.agents/skills)
  targets+=("$HOME/.agents/skills:Codex / ChatGPT Desktop")

  # 3. Cursor global skills (~/.cursor/skills)
  targets+=("$HOME/.cursor/skills:Cursor (Global)")

  # 4. Hermes (~/.hermes/skills)
  if [[ -d "$HOME/.hermes" ]]; then
    targets+=("$HOME/.hermes/skills:Hermes")
  fi
  # 5. OpenCode (~/.config/opencode/skills) — only if present
  if [[ -d "$HOME/.config/opencode" ]]; then
    targets+=("$HOME/.config/opencode/skills:OpenCode")
  fi

  for entry in "${targets[@]}"; do
    local target_path="${entry%%:*}"
    local agent_label="${entry##*:}"

    echo -e "  ${DIM}Checking ${agent_label} (${target_path})...${NC}"
    mkdir -p "$target_path"
    cp -R "$SKILLS_DIR"/* "$target_path/"
    local skill_count
    skill_count=$(find "$target_path" -maxdepth 2 -name "SKILL.md" | wc -l | tr -d ' ')
    echo -e "  ${GREEN}✓${NC} ${agent_label}: ${BOLD}${skill_count} skills${NC} installed at ${target_path}"
    ((installed_count++)) || true
  done

  # Also check if current directory is a project with .cursor
  if [[ -d ".cursor" ]]; then
    mkdir -p ".cursor/skills"
    cp -R "$SKILLS_DIR"/* ".cursor/skills/"
    local cur_count
    cur_count=$(find ".cursor/skills" -maxdepth 2 -name "SKILL.md" | wc -l | tr -d ' ')
    echo -e "  ${GREEN}✓${NC} Local Cursor workspace (.cursor/skills): ${BOLD}${cur_count} skills${NC} installed"
  fi

  echo -e "\n${GREEN}${BOLD}✓ Skills installation complete across ${installed_count} agent environments.${NC}"
  local total_skills
  total_skills=$(ls -1 "$SKILLS_DIR" 2>/dev/null | wc -l | tr -d ' ')
  echo -e "  All ${total_skills} skills are active and ready for automatic discovery."
}

# ------------------------------------------------------------------------------
# 1b. Become Dr Non the Builder — canonical one-command path
# ------------------------------------------------------------------------------
print_builder_identity() {
  local total_skills
  total_skills=$(ls -1 "$SKILLS_DIR" 2>/dev/null | wc -l | tr -d ' ')
  cat <<EOF

${AMBER}${BOLD}You are Dr Non the Builder.${NC}
${DIM}กลายเป็น Dr Non the Builder แล้ว — ทักษะทุกเอเจนต์บนเครื่องนี้ พร้อมส่งของ${NC}

${BOLD}${total_skills} skills${NC} on every agent this machine has.
One product: install → build → ship → walkthrough → hindsight reconstruct.

${AMBER}${BOLD}Next — the three moves that make the skills executable${NC}

  1. ${BOLD}Contract${NC}      copy templates/AGENTS.md.template (or CLAUDE.md.template)
                     into the project you will ship. Anti-regression first.
  2. ${BOLD}Walkthrough${NC}   skills/human-walkthrough  — 3 personas × a real browser
                     before a major release. Output: blueprint + Now/Next/Later/Never.
  3. ${BOLD}Hindsight${NC}     skills/power-of-hindsight — Collect → Analyze → Reconstruct
                     when the Frankenstein year needs an end.

${DIM}Optional — scaffold a blank project with the same templates:${NC}
  ./setup.sh --init-project ~/Projects/my-app --yes

${DIM}Prove this clone is coherent:${NC}
  make validate

${DIM}Alternates (same skills, not a second product):${NC}
  plugin install  ·  BLUEPRINT.md paste  ·  QUICKSTART.md  ·  make install-skills

Fork the method, not the secrets.
EOF
}

become_builder() {
  banner
  echo -e "${AMBER}${BOLD}▶ Becoming Dr Non the Builder${NC}"
  echo -e "${DIM}Installing ${NC}${BOLD}$(ls -1 "$SKILLS_DIR" | wc -l | tr -d ' ')${NC}${DIM} skills to every detected agent…${NC}\n"
  install_skills "$@"
  for arg in "$@"; do
    if [[ "$arg" == "--dry-run" ]]; then
      echo -e "${DIM}(dry-run — no files changed. Drop --dry-run to actually become the Builder.)${NC}"
      return
    fi
  done
  print_builder_identity
}

# ------------------------------------------------------------------------------
# 2. Project Bootstrapper
# ------------------------------------------------------------------------------
bootstrap_project() {
  local target_dir="${1:-}"
  local opt_name="${ARG_NAME:-}"
  local opt_desc="${ARG_DESC:-}"
  local opt_stack="${ARG_STACK:-}"
  local opt_url="${ARG_URL:-}"
  local opt_port="${ARG_PORT:-3000}"
  local opt_design="${ARG_DESIGN:-prompt}"
  local opt_services="${ARG_SERVICES:-prompt}"
  local non_interactive="${ARG_YES:-false}"

  if [[ -z "$target_dir" ]]; then
    if [[ "$non_interactive" == "true" ]]; then
      target_dir="."
    else
      echo -e "\n${AMBER}${BOLD}Where should the project codebase be set up?${NC}"
      read -rp "Target directory path [default: .]: " target_dir
      target_dir="${target_dir:-.}"
    fi
  fi

  # Resolve absolute path
  mkdir -p "$target_dir"
  target_dir="$(cd "$target_dir" && pwd)"
  local default_name
  default_name="$(basename "$target_dir")"

  echo -e "\n${AMBER}${BOLD}▶ Bootstrapping project codebase at:${NC} ${BOLD}${target_dir}${NC}"

  # Prompt or infer defaults
  local proj_name="${opt_name:-$default_name}"
  if [[ -z "$opt_name" && "$non_interactive" != "true" ]]; then
    read -rp "Project name [${default_name}]: " input_name
    proj_name="${input_name:-$default_name}"
  fi

  local proj_desc="${opt_desc:-High-integrity application with Dr Non vibe coding invariants}"
  if [[ -z "$opt_desc" && "$non_interactive" != "true" ]]; then
    read -rp "One-sentence purpose [${proj_desc}]: " input_desc
    proj_desc="${input_desc:-$proj_desc}"
  fi

  local proj_stack="${opt_stack:-Next.js + TypeScript}"
  if [[ -z "$opt_stack" && "$non_interactive" != "true" ]]; then
    echo -e "Primary stack choices: [1] Next.js + TS, [2] Vite + React, [3] Python + FastAPI, [4] Node / Express, [5] Static HTML/JS, [6] Other"
    read -rp "Select stack [default: 1]: " stack_choice
    case "${stack_choice:-1}" in
      1) proj_stack="Next.js + TypeScript" ;;
      2) proj_stack="Vite + React" ;;
      3) proj_stack="Python + FastAPI" ;;
      4) proj_stack="Node.js + Express" ;;
      5) proj_stack="Static HTML/JS" ;;
      *) proj_stack="Custom" ;;
    esac
  fi

  local proj_port="${opt_port:-3000}"
  if [[ -z "$opt_port" && "$non_interactive" != "true" ]]; then
    read -rp "Local development port [${proj_port}]: " input_port
    proj_port="${input_port:-$proj_port}"
  fi

  local default_url="https://${proj_name}.example.com"
  local proj_url="${opt_url:-$default_url}"
  if [[ -z "$opt_url" && "$non_interactive" != "true" ]]; then
    read -rp "Canonical Live URL [${default_url}]: " input_url
    proj_url="${input_url:-$default_url}"
  fi

  local use_design="true"
  if [[ "$opt_design" == "false" ]]; then
    use_design="false"
  elif [[ "$opt_design" == "prompt" && "$non_interactive" != "true" ]]; then
    read -rp "Apply Axiom Design Core lineage (0 radius, hairlines, amber #f59e0b, 3 text sizes)? [Y/n]: " input_design
    if [[ "$input_design" =~ ^[Nn] ]]; then
      use_design="false"
    fi
  fi

  local use_services="false"
  if [[ "$(uname)" == "Darwin" ]]; then
    if [[ "$opt_services" == "true" ]]; then
      use_services="true"
    elif [[ "$opt_services" == "prompt" && "$non_interactive" != "true" ]]; then
      read -rp "Set up macOS always-on background service (launchd triad + tunnel)? [y/N]: " input_serv
      if [[ "$input_serv" =~ ^[Yy] ]]; then
        use_services="true"
      fi
    fi
  fi

  local today
  today="$(date +%Y-%m-%d)"
  local created_files=()

  # ----------------------------------------------------------------------------
  # 2.1 CLAUDE.md (Tier-2 Project Contract)
  # ----------------------------------------------------------------------------
  local claude_target="$target_dir/CLAUDE.md"
  if [[ ! -f "$claude_target" ]]; then
    sed \
      -e "s|<Project>|${proj_name}|g" \
      -e "s|<one sentence: what it is and who it's for>|${proj_desc}|g" \
      -e "s|<Stack in one line.*>|Stack: ${proj_stack}. Port: ${proj_port}.|g" \
      -e "s|https://<host>|${proj_url}|g" \
      -e "s|<similar-host>|app-staging.example.com|g" \
      -e "s|<the other product>|staging preview|g" \
      -e "s|<path>|./preview|g" \
      -e "s|https://api-<host>|https://api-${proj_name}.example.com|g" \
      -e "s|<PORT>|${proj_port}|g" \
      -e "s|<pages/vercel/render project name>|${proj_name}|g" \
      -e "s|<app>|${proj_name}|g" \
      "$TEMPLATES_DIR/CLAUDE.md.template" > "$claude_target"
    created_files+=("CLAUDE.md (Tier-2 project contract for Claude Code & Mavis)")
  fi

  # ----------------------------------------------------------------------------
  # 2.2 AGENTS.md (Tier-2 Project Contract Mirror for non-Claude agents)
  # ----------------------------------------------------------------------------
  local agents_target="$target_dir/AGENTS.md"
  if [[ ! -f "$agents_target" ]]; then
    sed \
      -e "s|<Project>|${proj_name}|g" \
      -e "s|<one sentence about what it does>|${proj_desc}|g" \
      -e "s|<the quantity, behavior, or experience that must remain true>|Zero unverified claims. Public dashboard must remain functional even under primary DB failover.|g" \
      -e "s|<canonical URL or \"not deployed\">|${proj_url}|g" \
      "$TEMPLATES_DIR/AGENTS.md.template" > "$agents_target"
    created_files+=("AGENTS.md (Universal project contract for Codex, Cursor, Gemini CLI, Antigravity)")
  fi

  # ----------------------------------------------------------------------------
  # 2.2b GEMINI.md (Dedicated Tier-2 Mirror for Gemini CLI & Google AI agents)
  # ----------------------------------------------------------------------------
  local gemini_target="$target_dir/GEMINI.md"
  if [[ ! -f "$gemini_target" ]]; then
    cp "$agents_target" "$gemini_target"
    created_files+=("GEMINI.md (Dedicated Tier-2 contract mirror for Gemini CLI & Google agents)")
  fi

  # ----------------------------------------------------------------------------
  # 2.3 docs/lessons/ & Starter Lesson
  # ----------------------------------------------------------------------------
  mkdir -p "$target_dir/docs/lessons"
  touch "$target_dir/docs/lessons/.gitkeep"
  local starter_lesson="$target_dir/docs/lessons/${today}-bootstrap.md"
  if [[ ! -f "$starter_lesson" ]]; then
    cat <<EOF > "$starter_lesson"
# Lesson: Initial Project Bootstrap (${today})

## Context
Project initialized with Dr Non's Vibe Coding Stack. Scaffolding, memory contracts, deploy verification, and anti-regression boundaries set up on day one.

## The incident / reason
Prevent future agent amnesia, cowboy edits, and unverified deployments before any feature code is written.

## Invariants established
1. **Sacred items:** Live routes and primary contracts must never be collapsed by >30% without explicit human approval.
2. **Definition of Done:** Localhost is never a deliverable. Work is verified when the deployed URL serves it and a curl probe confirms it.
3. **Design lineage:** Invariants are treated as constraints, not suggestions.

## One line for the next agent
> Respect the Tier-2 contracts in CLAUDE.md and AGENTS.md; never replace earned code with generic AI templates.
EOF
    created_files+=("docs/lessons/${today}-bootstrap.md (First institutional memory document)")
  fi

  # ----------------------------------------------------------------------------
  # 2.4 scripts/deploy.sh (Poison-proof CDN deploy verification)
  # ----------------------------------------------------------------------------
  mkdir -p "$target_dir/scripts"
  local deploy_target="$target_dir/scripts/deploy.sh"
  if [[ ! -f "$deploy_target" ]]; then
    sed \
      -e "s|myapp.pages.dev|${proj_name}.pages.dev|g" \
      -e "s|https://myapp.example.com|${proj_url}|g" \
      "$TEMPLATES_DIR/deploy-pages.sh" > "$deploy_target"
    chmod +x "$deploy_target"
    created_files+=("scripts/deploy.sh (Poison-proof deploy verification script)")
  fi

  # ----------------------------------------------------------------------------
  # 2.5 scripts/verify.sh (Pre-commit & Invariant Verification Gate)
  # ----------------------------------------------------------------------------
  local verify_target="$target_dir/scripts/verify.sh"
  if [[ ! -f "$verify_target" ]]; then
    if [[ -f "$TEMPLATES_DIR/verify.sh.template" ]]; then
      cp "$TEMPLATES_DIR/verify.sh.template" "$verify_target"
    else
    cat <<'EOF' > "$verify_target"
#!/usr/bin/env bash
# ==============================================================================
# Dr Non Pre-Flight Invariant & Integrity Verification Gate
# Runs before commit, deploy, or completion report.
# ==============================================================================
set -euo pipefail

echo "▶ Running Dr Non Vibe Coding Stack verification..."
ERRORS=0

# 1. Verify Contracts Exist
for f in CLAUDE.md AGENTS.md; do
  if [[ ! -f "$f" ]]; then
    echo "❌ Missing required contract: $f"
    ERRORS=$((ERRORS + 1))
  else
    echo "✓ Contract present: $f"
  fi
done

# 2. Check for Leaked Secrets in Staging
if command -v git >/dev/null 2>&1 && [[ -d .git ]]; then
  if git diff --cached --name-only | grep -E '(\.env|\.pem|\.key|id_rsa)' >/dev/null 2>&1; then
    echo "❌ Secret or environment file staged in git! Aborting."
    ERRORS=$((ERRORS + 1))
  else
    echo "✓ No secret files staged in git."
  fi
fi

# 3. Check for Anti-Regression 30% Collapse Rule
if command -v git >/dev/null 2>&1 && [[ -d .git ]]; then
  # Verify staged files didn't shrink by more than 30% without notice
  for file in $(git diff --cached --name-only); do
    if [[ -f "$file" ]] && git cat-file -e "HEAD:$file" 2>/dev/null; then
      old_lines=$(git show "HEAD:$file" | wc -l | tr -d ' ')
      new_lines=$(wc -l < "$file" | tr -d ' ')
      if (( old_lines > 20 && new_lines < (old_lines * 70 / 100) )); then
        echo "⚠️  WARNING: $file shrank by >30% ($old_lines -> $new_lines lines). Verify with human."
      fi
    fi
  done
fi

# 4. Run Build / Type Check if available
if [[ -f "package.json" ]]; then
  if grep -q '"type-check"' package.json; then
    echo "▶ Running npm run type-check..."
    npm run type-check || ERRORS=$((ERRORS + 1))
  fi
elif [[ -f "pyproject.toml" ]] || [[ -f "requirements.txt" ]]; then
  if command -v pytest >/dev/null 2>&1 && [[ -d "tests" ]]; then
    echo "▶ Running pytest..."
    pytest || ERRORS=$((ERRORS + 1))
  fi
fi

if (( ERRORS > 0 )); then
  echo "❌ Verification failed with $ERRORS error(s)."
  exit 1
fi

echo "✓ All Dr Non invariants verified clean."
exit 0
EOF
    fi
    chmod +x "$verify_target"
    created_files+=("scripts/verify.sh (Pre-flight invariant verification gate)")
  fi

  # ----------------------------------------------------------------------------
  # 2.6 .gitignore & .env.example (Agent Hygiene & Secrets Protection)
  # ----------------------------------------------------------------------------
  local gitignore_target="$target_dir/.gitignore"
  if [[ ! -f "$gitignore_target" ]]; then
    if [[ -f "$TEMPLATES_DIR/gitignore.template" ]]; then
      cp "$TEMPLATES_DIR/gitignore.template" "$gitignore_target"
    else
      cat <<'EOF' > "$gitignore_target"
# Environments & Secrets
.env
.env.*
!.env.example
*.pem
*.key
*.cert

# OS Metadata
.DS_Store
Thumbs.db

# Dependencies & Build Output
node_modules/
dist/
build/
.next/
.turbo/
out/
__pycache__/
*.pyc
.venv/
env/

# Logs
logs/
*.log
npm-debug.log*

# AI Agent Temporary Artifacts & Transcripts
.gemini/
.claude/
scratch/
.antigravity/
.system_generated/
EOF
    fi
    created_files+=(".gitignore (Hardened secrets, build, and agent-scratch ignore rules)")
  fi
  local envex_target="$target_dir/.env.example"
  if [[ ! -f "$envex_target" ]]; then
    if [[ -f "$TEMPLATES_DIR/env.example.template" ]]; then
      cp "$TEMPLATES_DIR/env.example.template" "$envex_target"
      created_files+=(".env.example (Env var names with signup URLs — never values)")
    fi
  fi

  # ----------------------------------------------------------------------------
  # 2.7 Axiom Design Core Tokens (Design DNA)
  # ----------------------------------------------------------------------------
  if [[ "$use_design" == "true" ]]; then
    mkdir -p "$target_dir/design"
    local tokens_target="$target_dir/design/tokens.css"
    if [[ ! -f "$tokens_target" ]]; then
      if [[ -f "$TEMPLATES_DIR/design-tokens.css.template" ]]; then
        cp "$TEMPLATES_DIR/design-tokens.css.template" "$tokens_target"
      else
      cat <<'EOF' > "$tokens_target"
/**
 * Axiom Design Core — Rams/Braun Lineage Tokens
 * Strict geometric invariants: 0 radius, hairlines, one amber accent.
 */
:root {
  /* Geometry — Sacred Invariant */
  --radius-base: 0px;
  --radius-circle: 50%;

  /* Color Palette — Functional, high-contrast */
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-surface-hover: #1c1c1c;
  --color-border: #262626;
  --color-border-subtle: #1f1f1f;
  --color-text: #ededed;
  --color-text-muted: #a1a1aa;
  --color-text-dim: #71717a;

  /* Single Amber Accent (#f59e0b) — Never generic SaaS purple or blue */
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-accent-alpha: rgba(245, 158, 11, 0.12);

  /* Status Colors */
  --color-success: #10b981;
  --color-danger: #ef4444;

  /* Typography — Maximum 3 text sizes per screen */
  --font-size-sm: 0.8125rem;  /* 13px: secondary, metadata, timestamps */
  --font-size-base: 0.9375rem; /* 15px: body, controls, inputs */
  --font-size-lg: 1.25rem;     /* 20px: headers, hero stats */

  /* Monospace for numbers and coordinates */
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Shadows — Zero gratuitous drop shadows; hairlines only */
  --shadow-none: none;
  --border-hairline: 1px solid var(--color-border);
}

/* Don Norman Affordances */
button, a, input, select {
  border-radius: var(--radius-base);
}

button:focus-visible, a:focus-visible, input:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 1px;
}
EOF
      fi
      created_files+=("design/tokens.css (Axiom Design Core Rams/Braun tokens)")
    fi
  fi

  # ----------------------------------------------------------------------------
  # 2.8 Services (launchd + tunnel templates if macOS requested)
  # ----------------------------------------------------------------------------
  if [[ "$use_services" == "true" ]]; then
    mkdir -p "$target_dir/services"
    local plist_target="$target_dir/services/com.${proj_name}.server.plist"
    if [[ ! -f "$plist_target" ]]; then
      sed \
        -e "s|myapp|${proj_name}|g" \
        -e "s|myuser|$(whoami)|g" \
        -e "s|/path/to/my-project|${target_dir}|g" \
        "$TEMPLATES_DIR/service.plist.template" > "$plist_target"
      created_files+=("services/com.${proj_name}.server.plist (Supervised launchd plist)")
    fi

    local tunnel_target="$target_dir/services/tunnel.yml"
    if [[ ! -f "$tunnel_target" ]]; then
      sed \
        -e "s|myapp|${proj_name}|g" \
        -e "s|3000|${proj_port}|g" \
        "$TEMPLATES_DIR/tunnel.yml.template" > "$tunnel_target"
      created_files+=("services/tunnel.yml (Cloudflare tunnel config)")
    fi
  fi

  # ----------------------------------------------------------------------------
  # 2.9 Workspace Tier-1 index (one table of every project — only if needed)
  # ----------------------------------------------------------------------------
  local ws_root
  ws_root="$(dirname "$target_dir")"
  if [[ -f "$TEMPLATES_DIR/workspace-CLAUDE.md.template" && ! -f "$ws_root/CLAUDE.md" ]]; then
    # Create workspace index only when the parent looks like a fresh workspace
    # (no existing CLAUDE.md/AGENTS.md) — safe to run even on first project.
    cp "$TEMPLATES_DIR/workspace-CLAUDE.md.template" "$ws_root/CLAUDE.md"
    created_files+=("$ws_root/CLAUDE.md (Workspace Tier-1 index — fill the project table)")
  fi
  if [[ -f "$TEMPLATES_DIR/workspace-AGENTS.md.template" && ! -f "$ws_root/AGENTS.md" ]]; then
    cp "$TEMPLATES_DIR/workspace-AGENTS.md.template" "$ws_root/AGENTS.md"
    created_files+=("$ws_root/AGENTS.md (Workspace Tier-1 mirror for non-Claude agents)")
  fi

  # ----------------------------------------------------------------------------
  # 2.10 Git Initialization & Initial Commit
  # ----------------------------------------------------------------------------
  local git_committed="false"
  if [[ ! -d "$target_dir/.git" ]]; then
    (
      cd "$target_dir"
      git init -q
      git add .
      git commit -q -m "chore(init): bootstrap project with Dr Non vibe coding stack scaffolding"
    )
    git_committed="true"
    created_files+=(".git repository initialized with initial convention commit")
  fi

  # ----------------------------------------------------------------------------
  # 2.10 Summary & Next Actions Report
  # ----------------------------------------------------------------------------
  echo -e "\n${GREEN}${BOLD}✓ Project successfully bootstrapped!${NC}"
  echo -e "\n${AMBER}${BOLD}What was generated:${NC}"
  for item in "${created_files[@]}"; do
    echo -e "  ${GREEN}✓${NC} ${item}"
  done

  echo -e "\n${AMBER}${BOLD}Immediate Next Steps:${NC}"
  echo -e "  1. ${CYAN}cd \"${target_dir}\"${NC}"
  echo -e "  2. Review and refine ${BOLD}CLAUDE.md${NC} and ${BOLD}AGENTS.md${NC} exact commands"
  echo -e "  3. Run pre-flight verification: ${CYAN}./scripts/verify.sh${NC}"
  if [[ "$use_services" == "true" ]]; then
    echo -e "  4. To install launchd service: ${CYAN}launchctl bootstrap gui/\$(id -u) services/com.${proj_name}.server.plist${NC}"
  fi
  echo -e "\n${DIM}Localhost is never a deliverable. Work is done when deployed and verified.${NC}\n"
}

# ------------------------------------------------------------------------------
# 3. Audit Existing Project Invariants
# ------------------------------------------------------------------------------
audit_project() {
  local target_dir="${1:-.}"
  target_dir="$(cd "$target_dir" && pwd)"

  echo -e "\n${AMBER}${BOLD}▶ Auditing Dr Non invariants at:${NC} ${BOLD}${target_dir}${NC}"

  local passed=0
  local warnings=0

  # Check CLAUDE.md
  if [[ -f "$target_dir/CLAUDE.md" ]]; then
    echo -e "  ${GREEN}✓${NC} CLAUDE.md present"
    ((passed++))
    if grep -q "Anti-regression" "$target_dir/CLAUDE.md"; then
      echo -e "    ${GREEN}✓${NC} Anti-regression section defined"
    else
      echo -e "    ${RED}✗${NC} Missing Anti-regression section in CLAUDE.md"
      ((warnings++))
    fi
  else
    echo -e "  ${RED}✗${NC} Missing CLAUDE.md (Tier-2 project contract)"
    ((warnings++))
  fi

  # Check AGENTS.md
  if [[ -f "$target_dir/AGENTS.md" ]]; then
    echo -e "  ${GREEN}✓${NC} AGENTS.md present (universal agent mirror)"
    ((passed++))
  else
    echo -e "  ${RED}✗${NC} Missing AGENTS.md"
    ((warnings++))
  fi

  # Check GEMINI.md
  if [[ -f "$target_dir/GEMINI.md" ]]; then
    echo -e "  ${GREEN}✓${NC} GEMINI.md present (Gemini CLI / Google agents mirror)"
    ((passed++))
  fi

  # Check docs/lessons/
  if [[ -d "$target_dir/docs/lessons" ]]; then
    local count
    count=$(find "$target_dir/docs/lessons" -name "*.md" | wc -l | tr -d ' ')
    echo -e "  ${GREEN}✓${NC} docs/lessons/ directory present (${count} lesson docs)"
    ((passed++))
  else
    echo -e "  ${RED}✗${NC} Missing docs/lessons/ institutional memory folder"
    ((warnings++))
  fi

  # Check deploy script
  if [[ -f "$target_dir/scripts/deploy.sh" ]]; then
    echo -e "  ${GREEN}✓${NC} scripts/deploy.sh present"
    ((passed++))
  else
    echo -e "  ${RED}✗${NC} Missing scripts/deploy.sh"
    ((warnings++))
  fi

  # Check verification script
  if [[ -f "$target_dir/scripts/verify.sh" ]]; then
    echo -e "  ${GREEN}✓${NC} scripts/verify.sh present"
    ((passed++))
  else
    echo -e "  ${RED}✗${NC} Missing scripts/verify.sh"
    ((warnings++))
  fi

  # Check hygiene files (secrets protection + env names)
  if [[ -f "$target_dir/.gitignore" ]]; then
    echo -e "  ${GREEN}✓${NC} .gitignore present"
    ((passed++))
  else
    echo -e "  ${RED}✗${NC} Missing .gitignore (templates/gitignore.template)"
    ((warnings++))
  fi
  if [[ -f "$target_dir/.env.example" ]]; then
    echo -e "  ${GREEN}✓${NC} .env.example present"
    ((passed++))
  else
    echo -e "  ${RED}✗${NC} Missing .env.example (templates/env.example.template)"
    ((warnings++))
  fi

  echo -e "\n${AMBER}${BOLD}Audit summary:${NC} ${passed} passed, ${warnings} warning(s)."
  if (( warnings > 0 )); then
    echo -e "Run ${CYAN}./setup.sh --init-project \"${target_dir}\"${NC} to fill in missing contracts."
  fi
}

# ------------------------------------------------------------------------------
# 4. Main Entry Point
# ------------------------------------------------------------------------------
main() {
  local action=""
  local target=""

  ARG_NAME=""
  ARG_DESC=""
  ARG_STACK=""
  ARG_URL=""
  ARG_PORT=""
  ARG_DESIGN="prompt"
  ARG_SERVICES="prompt"
  ARG_YES="false"
  SKILLS_ARGS=()

  while [[ $# -gt 0 ]]; do
    case "$1" in
      -b|--become-builder)
        action="become"
        shift
        ;;
      -s|--install-skills)
        action="skills"
        shift
        ;;
      -i|--init-project)
        action="init"
        if [[ $# -gt 1 && ! "$2" =~ ^- ]]; then
          target="$2"
          shift 2
        else
          target="."
          shift
        fi
        ;;
      -a|--audit)
        action="audit"
        if [[ $# -gt 1 && ! "$2" =~ ^- ]]; then
          target="$2"
          shift 2
        else
          target="."
          shift
        fi
        ;;
      -v|--validate)
        action="validate"
        shift
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      --name)
        ARG_NAME="$2"
        shift 2
        ;;
      --desc)
        ARG_DESC="$2"
        shift 2
        ;;
      --stack)
        ARG_STACK="$2"
        shift 2
        ;;
      --url)
        ARG_URL="$2"
        shift 2
        ;;
      --port)
        ARG_PORT="$2"
        shift 2
        ;;
      --axiom-design)
        ARG_DESIGN="true"
        shift
        ;;
      --no-design)
        ARG_DESIGN="false"
        shift
        ;;
      --services)
        ARG_SERVICES="true"
        shift
        ;;
      --no-services)
        ARG_SERVICES="false"
        shift
        ;;
      --dry-run|--claude|--codex|--cursor|--hermes|--opencode|--all)
        SKILLS_ARGS+=("$1")
        if [[ -z "$action" ]]; then action="skills"; fi
        shift
        ;;
      -y|--yes)
        ARG_YES="true"
        shift
        ;;
      *)
        echo -e "${RED}Unknown option: $1${NC}"
        usage
        exit 1
        ;;
    esac
  done

  # No flag: pipe/script → become-builder. TTY → menu with Builder as default.
  if [[ -z "$action" ]]; then
    if [[ ! -t 0 ]]; then
      become_builder "${SKILLS_ARGS[@]}"
      exit 0
    fi
    banner
    echo -e "${AMBER}${BOLD}Become Dr Non the Builder${NC} — one product, one command.\n"
    echo -e "  ${BOLD}[1]${NC} Become Dr Non the Builder  ${DIM}(install skills everywhere + next steps)${NC}"
    echo -e "  [2] Bootstrap a project codebase  ${DIM}(CLAUDE.md, AGENTS.md, deploy, lessons)${NC}"
    echo -e "  [3] Builder + project scaffold"
    echo -e "  [4] Audit an existing project against Dr Non invariants"
    echo -e "  [5] Validate this stack repo  ${DIM}(scripts/validate_repo.py)${NC}"
    echo -e "  [q] Quit\n"

    read -rp "Choice [1]: " choice
    case "${choice:-1}" in
      1) become_builder ;;
      2) bootstrap_project ;;
      3)
        become_builder
        bootstrap_project
        ;;
      4)
        read -rp "Directory to audit [default: .]: " audit_dir
        audit_project "${audit_dir:-.}"
        ;;
      5)
        python3 "$ROOT_DIR/scripts/validate_repo.py"
        ;;
      q|Q)
        echo "Exiting."
        exit 0
        ;;
      *)
        echo "Invalid option."
        exit 1
        ;;
    esac
    exit 0
  fi

  case "$action" in
    become)
      become_builder ${SKILLS_ARGS[@]+"${SKILLS_ARGS[@]}"}
      ;;
    skills)
      install_skills ${SKILLS_ARGS[@]+"${SKILLS_ARGS[@]}"}
      ;;
    init)
      bootstrap_project "$target"
      ;;
    audit)
      audit_project "$target"
      ;;
    validate)
      python3 "$ROOT_DIR/scripts/validate_repo.py"
      ;;
  esac
}

main "$@"
