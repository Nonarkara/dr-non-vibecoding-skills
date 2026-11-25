# Deploy evidence must block the upload, not merely accompany it

Date: 2026-10-24. Scope: this stack's Pages deployment template, not a live-service assessment.

## Symptom and cause

The existing template could invoke Wrangler with placeholder destinations and a
user-selected upload directory before requiring the eight-boundary release receipt.
The release-evidence validator existed, but was not on this execution path.
Git ignore rules are not an upload boundary: a directory can contain untracked
credentials, repository internals or links to private files.

## Correction

Require the four explicit Pages settings. Before upload, reject repository-root,
absolute and traversal paths, symlinks, recognizable credential/configuration
names and database/key files in the complete asset tree. Require strict release
evidence for the actual Git HEAD. Keep the existing canonical-first HTML and
throwaway-key asset convergence checks unchanged.

The AppSec hook example now resolves Git's configured hooks path, creates an
executable hook exclusively without overwriting existing work, and invokes the
current staged CLI. Dependency bots propose updates; a person approves merges.

## Verification receipt

`python3 scripts/test-deploy-security.py`: 11 test methods passed on 2026-10-24.
The offline fixtures test every one of eight failed/unverified controls; absent
gate/manifest; wrong revision, stale or changed receipts; unsafe asset paths,
private names, links, and incomplete configuration. A valid synthetic receipt
reaches a fake upload command exiting 73; no curl command is reached. A separate
fixture executes the documented hook against a fake scanner, verifies argument
forwarding and failure exit propagation, and confirms an existing hook is retained.

`python3 scripts/test-security-release.py`: 14 test methods passed.
`bash -n templates/deploy-pages.sh`: passed.

## Limits and next route

These are synthetic local regression fixtures, not a pentest, a real deploy, or
proof of production security. No cloud policy, credentials or live host was read
or changed. Filename checks cannot recognize every secret; build and review an
asset-only release artifact, scan it separately with authorized tooling, keep it
immutable through upload, and inspect receipt contents. A valid hash proves which
receipt was checked, not that the receipt's claims are true. CDN convergence still
requires an approved deployment and live verification.
