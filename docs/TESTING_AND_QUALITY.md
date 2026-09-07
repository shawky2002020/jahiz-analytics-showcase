# Testing & Quality Assurance Strategy

Jahiz Analytics maintains an uncompromising quality culture. Because the application is used during live, high-pressure sports competition, software failures, data loss, or visual instability are unacceptable.

The project maintains **390 verified test files** spanning unit, integration, database concurrency, end-to-end browser automation, and high-load capacity testing.

---

## 1. Verified Test Suite Matrix

```
                       ┌─────────────────────────┐
                       │   k6 Capacity Suites    │
                       │  (Smoke, Spike, Stress) │
                       └────────────┬────────────┘
                                    │
                       ┌────────────▼────────────┐
                       │   Playwright E2E Suites │
                       │ (Visual, Smoke, a11y, AR)│
                       └────────────┬────────────┘
                                    │
                       ┌────────────▼────────────┐
                       │ Database & Concurrency  │
                       │ (Token Grace, Triggers) │
                       └────────────┬────────────┘
                                    │
                       ┌────────────▼────────────┐
                       │   Unit & Store Specs    │
                       │  (219 Client, 171 Server)│
                       └────────────┬────────────┘
                                    │
                       ┌────────────▼────────────┐
                       │ Static Checks & Secrets │
                       │ (Types, Lints, i18n)    │
                       └─────────────────────────┘
```

| Scope | Location | File Count | Tools & Frameworks | Key Test Targets |
| :--- | :--- | :---: | :--- | :--- |
| **Client Specs** | `client/src/` | **219** | Jasmine, Karma, NgRx Testing | OnPush components, NgRx reducers, effects, memoized selectors, Arabic numbers pipe, layout geometry. |
| **Server Specs** | `server/src/`, `server/tests/` | **171** | Vitest, Supertest, `pg` | Domain services, controllers, repository queries, transaction rollbacks, policy checks, auth token lifecycle. |
| **Total Automated Specs** | Monorepo | **390** | | |

---

## 2. Playwright End-to-End Suite

The client maintains an extensive Playwright automation suite configured across multiple dedicated profiles:

### A. Smoke & Critical Path (`--project=smoke`)
- User authentication and session establishment.
- Match creation, athlete selection, timer start/pause, score recording, finalization.
- Immediate post-match timeline review and tournament rollup.

### B. Visual Regression & Layout Invariants (`--project=visual`)
- Pixel-level screenshot comparisons across device viewports:
  - Mobile Portrait: 360×640, 375×667, 390×844, 412×915, 430×932.
  - Mobile Landscape: 844×390 with simulated notch cutouts.
  - Tablet Portrait: 768×1024.
- Verifies that scoring buttons, Undo controls, and scoreboard numbers maintain invariant measured rectangles during layout feedback.

### C. Bilingual Resilience (`--project=resilience-en`, `--project=resilience-ar`)
- Executes complete scoring journeys in both English (LTR) and Arabic (RTL).
- Asserts that mixed-direction text (e.g. English athlete names in an Arabic interface) does not break layout boundaries.
- Validates number formatting via `ArabicNumbersPipe`.

### D. Accessibility & Safe Areas (`--project=a11y`)
- Automated axe-core audits for WCAG 2.1 AA compliance.
- Ensures all interactive controls maintain the **44×44 CSS px** minimum touch requirement.
- Verifies safe-area padding calculations on notched devices.

---

## 3. Database & Concurrency Verification Scripts

Dedicated executable scripts run against real PostgreSQL instances during CI:

- `test:refresh-token-concurrency:db`: Simulates concurrent mobile app resume requests exchanging identical refresh tokens within the 30-second grace window, verifying that valid token pairs are returned without false revocations.
- `test:mobile-version-policy:db`: Verifies that forced upgrade rules accurately intercept outdated client build numbers while allowing supported clients through.
- `test:player-name-uniqueness:db`: Validates partial unique index behavior when creating, soft-deleting, and recreating identically named athletes.
- `scripts/validate-coach-athlete-collaboration-foundation.sql`: Direct SQL test file executing transactional preflight checks on database triggers and relationship integrity.

---

## 4. k6 Performance & Capacity Engineering

To ensure backend resilience during peak tournament activity, the repository includes comprehensive k6 load-testing suites:

| Scenario | Target Workload | Focus & Pass Criteria |
| :--- | :--- | :--- |
| **`perf:smoke`** | 5 VUs, 1 minute | Baseline health check; p95 latency < 100 ms. |
| **`perf:load`** | 50 VUs, 10 minutes | Average tournament traffic; zero error rate; p95 latency < 200 ms. |
| **`perf:stress`** | 150 VUs, ramp-up | System limit discovery; validates graceful degradation and rate-limiting. |
| **`perf:spike`** | Sudden burst to 200 VUs | Simulates final round of major tournament; validates connection pool recovery. |
| **`perf:soak`** | Sustained load, 2 hours | Memory leak detection; connection pool leak detection in Node.js and Postgres. |
| **`capacity:live-score`** | Event ingestion burst | Validates high-concurrency match event POST and idempotency filter performance. |
| **`capacity:analytics-burst`**| 100+ concurrent task enqueues | Validates background worker `FOR UPDATE SKIP LOCKED` throughput and lock queue health. |

---

## 5. Static Verification & Secret Prevention

Every pull request and commit passes automated preflight checks:
- **TypeScript Type Checking**: `tsc --noEmit` across client and server workspaces.
- **Changed-File Linting**: Targeted ESLint runs ensuring zero new lint warnings on modified files.
- **Strict i18n Audits**: Scans templates and code for untranslated strings or missing translation keys.
- **Line-Level Secret Scanner**: Analyzes changed git diffs for credentials, private keys, database connection strings, or cloud provider tokens.
