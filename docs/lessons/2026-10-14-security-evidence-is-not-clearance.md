# Security evidence is not automatic clearance

The approved scope added three preventive skills, a release checklist and a
scaffold ledger. It did not authorize production scanning, plugin installation,
paid model usage or account configuration. Three layers must stay distinct:
advisory review, enforced runtime controls, and tested application boundaries.

The first release-validator version checked hidden components before resolving
an evidence path, then checked containment. Independent review reproduced a
strict pass for `receipt.txt` pointing to a fake `.env` inside the same directory.
Outside-root links were already rejected, so the existing external-link fixture
did not catch it. Evidence symlinks are now refused before reading/hashing.

The Claude example also needed `autoAllowBashIfSandboxed: false`; enabling the
sandbox alone defaults to auto-allow for sandboxed Bash. Effective host behaviour
still needs controlled canary testing; JSON validation is not proof of enforcement.

Verification: 14 Python unittest methods, including all eight failed/unknown
control paths, missing/duplicate coverage, missing owners/evidence, hashes,
freshness, target revision, malformed values, inside/outside symlink escapes and
CLI exit status. Repository validation covers 182 skills, 17 playbooks, 14
references, 20 templates and portable plugin packaging. Bootstrap and Chromium
starter checks pass without enabling security services.

Two other security PRs were already open: #17 vendors Cloudflare's audit workflow;
#22 adds day-one scanner configurations. This change preserves both pending PRs,
adds host/edge/Strix guidance and release attestations, and borrows the audit
method through cso. After either merges, resynchronize counts and resolve shared
README/AGENTS/CI edits deliberately; do not overwrite their changes.

No actual Cloudflare-policy enforcement, Claude-host isolation, Strix scan or
application security certification was performed. Passing the ledger proves
only current, complete attestations; a reviewer must verify their contents.

Shared source: `Scars/Debug-Logs/2026-10-14-security-evidence-paths-must-reject-internal-credential-symlinks.md`.
