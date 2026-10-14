---
name: cloudflare-security
description: >-
  Verify edge and origin trust boundaries. Use when deploying Cloudflare
  Access, Workers, Pages, WAF, storage or paid bindings.
license: MIT
---

# Cloudflare Security

> A protected hostname is not proof that every route to its origin is protected.

Original, preventive guidance requested by Dr Non, not a claim that these controls
have been deployed to every project. The existing runaway-cost incident belongs
to [cf-runaway-cost](../cf-runaway-cost/SKILL.md); this skill owns ingress and identity.

## Procedure

1. Inventory the public hostname, origin IP, tunnel, `workers.dev`, preview URLs,
   Pages aliases, admin paths and service bindings. Record which are intentionally
   public. Do not migrate a project's CLI or change DNS merely because this skill loads.
2. For private routes, verify the Access JWT signature, expected issuer, audience
   and expiry at the application boundary. Fail closed on missing configuration,
   token or key validation. An email header alone is not identity. Then authorize
   the operation/resource/tenant; Access authentication does not implement business permissions.
3. Close unwanted ingress, or apply equivalent controls to every alias. Choose
   Tunnel, authenticated origin access or an appropriate network restriction for
   the actual architecture. Test missing/expired/wrong-audience credentials and
   the direct-origin route in an authorized staging environment. Do not publish
   real origin addresses or tokens in reports.
4. Inspect WAF and rate-limit rules by route and method. Start changes in logging
   or staging, check legitimate traffic, then enforce. Verify plan entitlement:
   features and quotas differ; unavailable controls require a documented alternative.
   Edge limits complement application per-user quotas, input limits, timeouts and
   cost caps. Challenges must not break API clients or signed webhooks.
5. Store secrets as Worker secrets or a secret manager, not `vars`, bundled code,
   logs or checked-in `.dev.vars`. Use scoped, expiring deployment credentials.
   Keep R2 objects/private databases behind explicit authorization; bound signed
   URL lifetime and object scope. Never cache a private response across identities.
6. Apply [cf-runaway-cost](../cf-runaway-cost/SKILL.md) to alarms, fan-out, Queues,
   storage and inference. Confirm that rollback and the kill switch actually work.
   Budget notifications are not an application spending stop.
7. Retain route/config version, sanitized positive and negative probes, logging
   evidence, owner and rollback. Record gaps in the [release playbook](../../playbooks/17-security-from-source-to-edge.md).

## Anti-patterns

- Treating WAF as a fix for missing object authorization, SSRF or an exposed origin.
- Assuming Access on a custom domain also protects previews and other hostnames.
- Changing live WAF, Access, DNS or account settings without scoped authority.
- Calling a dashboard configuration screenshot proof of denied access.

## The test

A legitimate staging user succeeds; an anonymous user, a wrong tenant, invalid
token and unintended ingress fail without leaking data. The rate/cost boundary
is tested with bounded fixtures. Evidence names the deployed version and gaps.

## Sources and optional upstream skills

Checked 2026-10-14. Original MIT synthesis; no upstream pack is vendored.

- [Access JWT verification](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)
- [Worker routing](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)
- [WAF](https://developers.cloudflare.com/waf/) and [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cloudflare platform skills](https://github.com/cloudflare/skills) — optional product-specific guidance; review and pin before installation
- [Cloudflare security-audit-skill](https://github.com/cloudflare/security-audit-skill) — coverage-led source audit, routed through [cso](../cso/SKILL.md), not an edge firewall
