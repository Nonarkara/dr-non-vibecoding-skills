# Security policy

## Reporting a vulnerability

Please do not publish an unpatched exploit, leaked secret, or sensitive user data in a public issue.

Use [GitHub private vulnerability reporting](https://github.com/Nonarkara/dr-non-vibecoding-skills/security/advisories/new) for vulnerabilities in this repository. Include the affected path and commit, impact, a minimal reproduction, and any safe remediation you have tested. If private reporting is unavailable, open a public issue containing no exploit or secret and ask the maintainer for a private channel.

## Scope

Security reports are welcome for:

- the installer and project-bootstrap scripts;
- templates that could leak credentials, overwrite user files, or create insecure defaults;
- plugin manifests and agent instructions that could cause unsafe tool use;
- dependency or supply-chain instructions that are materially unsafe at the documented version.

Advice becoming stale is also worth reporting when following it can destroy data, expose a service, spend money, or create a false security claim.

## Supported version

The latest commit on `main` is supported. This is a documentation-and-template stack rather than a long-running service, so fixes are made forward on `main`.

## Safe research

Test only systems you own or are explicitly authorized to assess. Prefer disposable fixtures and redact tokens, private hostnames, personal data, and exploit payloads from reports. See [`reference/strix-when-to-run.md`](reference/strix-when-to-run.md) for the boundary between ordinary AppSec checks and active exploitation.
