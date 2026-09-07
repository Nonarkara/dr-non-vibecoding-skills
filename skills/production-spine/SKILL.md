---
name: production-spine
description: >-
  Gate software that touches real users, money, or data with tests, protected paid-key
  endpoints, honest source labels, secret rotation, and boundary validation. Use before
  calling a system production-ready, shipping a public endpoint, or reviewing a release
  whose failure would affect people outside the builder.
license: MIT
---

# Production Spine

> Production is a claim backed by evidence, not a feeling created by a green deploy.

This skill starts where [`ship-discipline`](../ship-discipline/SKILL.md) ends. CPDT proves that new bytes reached the live URL. The production spine proves those bytes are safe enough for the maturity label attached to them.

## The five gates

### 1. Behavior ships with its test

Every new production behavior gets a test in the same commit. A bug fix gets a regression test that fails before the fix. Match the test to the risk:

- pure transformation: unit test;
- database or service boundary: integration test;
- critical user journey: browser or end-to-end test;
- instruction or agent workflow: deterministic grader first, representative prompt eval second.

Do not chase an arbitrary coverage percentage. Test the conservation law, boundaries, fallback, and failure path.

### 2. Paid keys never sit behind a naked public endpoint

Any public route that can spend money needs authentication, rate limiting, bounded input, timeouts, and cost-aware logs. A hidden URL is not authentication. Client-side obfuscation is not a secret store.

Self-issued local keys that cannot spend money have a different blast radius, but still require access control when they expose private data or machine capability.

### 3. Every displayed number carries an honest envelope

Use `{source, tier, age}` from [`honest-envelope`](../honest-envelope/SKILL.md). Fallback and mock data stay visibly labeled. A cached value may keep the service useful; it must not impersonate a live value.

### 4. A leaked secret gets rotated

Deleting a key from the current file does not remove it from git history, logs, screenshots, or copied prompts. If a credential entered any of those, treat it as compromised: revoke or rotate it, then clean the repository. Never print even a shortened secret while investigating.

### 5. Validate every external boundary

Parse and validate external API responses before storage or display. Verify webhook signatures on the server before processing. Treat model output, recalled memory, scraped text, browser content, and tool output as untrusted input until checked against the authoritative source.

## Maturity labels

| Label | Honest meaning |
|---|---|
| **Demo** | Proves the idea. Manual recovery and mock data may exist, visibly labeled. |
| **Pilot** | Real users in a bounded setting. Critical paths have tests, monitoring, and a named operator. |
| **Production** | Public or operational use with all five gates, recovery paths, and live verification. |
| **Contract** | Production plus written service, security, data, and support obligations that the operator can meet. |

Do not skip labels because the interface looks polished. A beautiful demo is still a demo.

## Review with evidence

Borrow two useful constraints from gstack's review loop:

1. Every finding quotes the code or configuration that caused it. If you cannot point to the line, lower confidence and label it unverified.
2. Search the repository, standard library, platform, and installed dependencies before recommending new code or a new package.

Use severity plus confidence. A low-confidence catastrophic risk still gets surfaced; a low-confidence style opinion does not block a release.

## Failure protocol

After the same fix fails twice, stop changing code. Capture the exact failure, last successful step, current branch and process state, then run one check that separates competing causes. Repeated retries are not progress. This is the smallest useful part of ECC's agent-introspection loop.

## Ship report

Report four buckets:

- **Succeeded** — action plus evidence.
- **Failed** — exact failure and evidence.
- **Skipped** — why it did not apply.
- **Unverified** — what remains unknown and how to verify it.

Then state the maturity label. Never use “production-ready” without naming which five gates passed.

## Sources

- [ECC](https://github.com/affaan-m/ecc) — deterministic verification and contained self-debugging
- [gstack](https://github.com/garrytan/gstack) — search-before-building, evidence-backed findings, and complete-within-scope reviews

## The test

Can you show the test, protection, data provenance, secret status, boundary validation, and live proof? If one is missing, name the gap. Do not upgrade the label.
