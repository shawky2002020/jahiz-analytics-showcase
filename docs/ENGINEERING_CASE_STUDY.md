# Engineering case study: Jahiz Analytics

Jahiz Analytics combines a mobile live-scoring surface with transactional match data and post-match analytics. The production implementation is private; this repository documents the public-safe engineering decisions and product evidence.

## What makes the system interesting

| Problem | Engineering response | Deep dive |
| --- | --- | --- |
| A scorer cannot wait on every network round-trip | Optimistic NgRx state + ordered pending commands + server reconciliation | [Live match engine](./case-studies/LIVE_MATCH_ENGINE.md) |
| Retries must not duplicate match events | Client event identity + backend/database idempotency | [Reliability](./case-studies/RELIABILITY.md) |
| Analytics should not slow match writes | Background tasks claimed with PostgreSQL `FOR UPDATE SKIP LOCKED` | [Analytics pipeline](./case-studies/ANALYTICS_PIPELINE.md) |
| Arabic/English and device geometry affect live controls | Direction-aware layout, logical CSS and mobile safe-area ownership | [Mobile engineering](./case-studies/MOBILE_ENGINEERING.md) |
| Roles and plans must not become the same authorization system | Backend capability policy separated from commercial entitlements | [Engineering decisions](./ENGINEERING_DECISIONS.md) |
| Schema/client releases evolve at different speeds | Migration preflight, compatibility patterns and mobile version policy | [Release engineering](./RELEASE_ENGINEERING.md) |

## Engineering ownership

**Shawky Elsayed — Software Engineer & Equity Partner, Jahiz Analytics**

Engineering responsibility spans the Angular/Ionic application, NgRx workflows, Node.js APIs, PostgreSQL data flows, analytics processing, testing and cross-platform release operations. Product, business, brand and sport-domain decisions are developed with the wider Jahiz product partners.

## Evidence index

- [Engineering overview](./ENGINEERING_OVERVIEW.md)
- [System architecture](./ARCHITECTURE.md)
- [Engineering decisions](./ENGINEERING_DECISIONS.md)
- [Testing and quality](./TESTING_AND_QUALITY.md)
- [Release engineering](./RELEASE_ENGINEERING.md)
- [Product screen gallery](./PRODUCT_SCREEN_GALLERY.md)
- [Feature claim verification](./FEATURE_CLAIM_VERIFICATION.md)

The case study intentionally avoids volatile commit/test/migration totals and unrepeatable latency claims. Architecture and observable product behavior are the proof.
