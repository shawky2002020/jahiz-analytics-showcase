# Testing and quality strategy

The production implementation is private, so this public document explains **what is verified and why** rather than publishing a test-file counter or coverage percentage that becomes stale.

## Test layers

| Layer | Focus | Typical risks |
| --- | --- | --- |
| Unit / state | reducers, selectors, pipes, services and domain functions | incorrect transitions, derived-state bugs, localization logic |
| API / service integration | request validation, ownership, domain policy and error contracts | privilege leaks, invalid state transitions, inconsistent errors |
| Database integration | transactions, constraints, indexes and concurrency-sensitive flows | partial writes, duplicate events, history breakage |
| End-to-end | authentication, match creation, live scoring, finalization and review | cross-layer regressions in critical journeys |
| Bilingual / responsive regression | Arabic RTL, English LTR, compact mobile and tablet layouts | direction bugs, clipped controls, unstable geometry |
| Release verification | build, migration preflight, health/readiness and client compatibility | deployment or schema/client mismatch |

## Live-match regression priorities

The scorer receives extra attention because timer, score, penalty and Undo state interact with network and lifecycle events. Regression coverage should exercise:

- optimistic local changes followed by server acknowledgement;
- rejected mutation and state reconciliation;
- duplicate/retried event requests;
- app background/foreground transitions;
- network loss and recovery;
- terminal match behavior;
- Undo and recalculated canonical state;
- Arabic and English direction/layout behavior.

## Database and concurrency checks

Integration tests use a real PostgreSQL test database for behavior that cannot be proven with mocks alone. Examples include unique/idempotency constraints, transaction rollback, owner-scoped queries, token/session concurrency behavior, and worker task claiming.

## Capacity and performance testing

Load/capacity tooling is used as an engineering diagnostic where appropriate, but this public showcase does not publish fixed VU counts or latency thresholds as permanent product guarantees. Performance evidence should be tied to a dated test environment and reproducible run when shared.

## Static and release checks

CI/release automation includes type/lint/localization checks as applicable, secret-pattern scanning for public artifacts, documentation/link validation, migration safety checks, and runtime health/readiness verification.

The public showcase itself runs `npm run check:docs` to verify local Markdown/image references, required public assets, canonical links, forbidden stale demo-video references and basic secret patterns.
