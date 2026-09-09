# Release engineering

![Release pipeline](../assets/diagrams/release-pipeline.svg)

Jahiz uses staged release checks for the backend/web services and separate mobile-store delivery workflows. The goal is controlled, recoverable delivery—not a marketing claim that every failure mode is automatically eliminated.

## Server release flow

A production release follows these concerns, even if the exact CI job layout evolves:

1. **Validate** — compile/static checks, relevant automated tests, localization checks and secret scanning.
2. **Build** — produce the release artifact/container from the reviewed commit.
3. **Staging** — deploy the candidate to a non-production environment and apply compatible schema changes.
4. **Verify** — exercise health/readiness endpoints and critical smoke paths.
5. **Preflight** — inspect production schema compatibility and the intended migration/release plan.
6. **Production** — promote the reviewed artifact through the controlled production deployment path.

Rollback/recovery procedures are maintained for failed releases, but the showcase does not describe rollback as instantaneous or downtime as mathematically impossible.

## Database migration safety

Schema evolution follows a compatibility-first approach:

- prefer additive changes for rolling deployments;
- keep old and new application versions compatible during transition windows where possible;
- separate expand/data-migrate/contract work for breaking changes;
- verify migration state before promotion;
- avoid destructive production data operations as part of ordinary deployment.

## Mobile delivery

The mobile application has separate iOS and Android release concerns: version/build-number consistency, signing, native build validation, store submission and staged rollout/review behavior.

Because installed clients can lag behind the backend, a server-backed mobile version policy can distinguish supported clients from clients that should be encouraged or required to update.

## Observability after release

Health/readiness probes and application error monitoring are part of release verification. Operational decisions should be based on the actual release state rather than README guarantees.

This document deliberately avoids volatile pipeline-stage counts, test-file totals and infrastructure-specific secrets.
