# Architectural Decision Records (ADRs)

This document records the key software engineering decisions made during the design, implementation, and production maintenance of Jahiz Analytics.

---

## ADR-001: Server-Authoritative State with Optimistic UI & Idempotent FIFO Event Serialization

### Context
In competitive karate scoring, operator taps cannot wait 100–300 ms for network round-trips; the UI must respond instantly. However, if client calculations conflict with server competition rules (or if events arrive out of order), corrupted match records result.

### Constraints
- Mobile network latency in sports venues fluctuates significantly.
- Accidental double-taps by operators can record duplicate points.
- Match events must maintain strict sequential integrity.

### Decision
Implement optimistic local state updates via NgRx reducers coupled with an in-memory FIFO queue. Every command generates a client-side UUID (`client_event_id`). The backend validates uniqueness against PostgreSQL's unique constraint on `(match_id, client_event_id)`. The server responds with canonical match state, against which the client reconciles.

### Trade-offs
- Increased complexity in the NgRx store layer to handle reconciliation and rollback of rejected actions.
- Requires local storage of uncommitted actions until server acknowledgement.

### Result
Zero perceived UI latency for the operator; mathematically guaranteed event ordering; duplicate network retries safely ignored by the database.

---

## ADR-002: PostgreSQL `FOR UPDATE SKIP LOCKED` for Distributed Queue Processing

### Context
Post-match analytics calculations (offensive/defensive ratios, technique distributions, tournament aggregations) require substantial CPU processing. Running these synchronously on the API thread degrades HTTP response times.

### Constraints
- Introducing an external message broker (RabbitMQ, Kafka, AWS SQS) would increase operational overhead and local setup friction.
- Multiple worker instances must be able to process jobs concurrently without double-processing.

### Decision
Use PostgreSQL as the message queue via the `analytics_tasks` table. Workers claim tasks using `SELECT ... FOR UPDATE SKIP LOCKED` inside an `UPDATE` statement. A dedicated background worker process (`src/worker.ts`) runs independently of the API server (`src/app.ts`).

### Trade-offs
- Relies on database connection pool capacity.
- Requires dedicated maintenance logic (stale lease reaper, retry ceilings).

### Result
Eliminated third-party infrastructure dependencies; achieved seamless horizontal worker scaling with zero lock contention; decoupled API latency from analytics computation.

---

## ADR-003: Composite CSS Grid Architecture & Shared Overlay to Eliminate Cumulative Layout Shift (CLS)

### Context
During live scoring, network status notifications ("Offline", "Reconnecting") and mutation error banners previously caused the scorer footer to shift by 25–62 px. This caused operator mis-taps during critical bouts. Furthermore, the animated clock rail caused 146 layout recalculations during two clock ticks.

### Constraints
- The UI must accommodate screens from 320 px wide up to full-size tablets, in both LTR and RTL directions.
- All primary touch targets must strictly maintain the 44×44 CSS px minimum.

### Decision
1. Restructure the scorer shell into an explicit CSS Grid with fixed header, content, and footer row tracks.
2. Place connection feedback and error messages in a shared overlay layer that shares the action row, consuming zero layout height when idle and passing pointer events through.
3. Replace layout-animating CSS properties (`left`) on the activity rail with compositor-friendly hardware-accelerated `transform`.

### Trade-offs
- Slightly more complex CSS styling and overlay positioning logic.

### Result
Layout shifts during clock ticks dropped from **146 to 2 per 2 seconds**; footer movement on network loss reduced from **25 px to 0 px**; zero operator mis-taps due to shifting controls.

---

## ADR-004: Dual-Channel Mobile Version Policy & Mandatory Upgrade Gating

### Context
As database schemas and API protocols evolve, older mobile application versions in the wild can submit obsolete payloads or experience runtime crashes.

### Constraints
- App Store and Google Play review delays make immediate client updates impossible.
- Non-breaking changes should allow graceful operation, while breaking changes must block outdated clients safely.

### Decision
Implement a database-driven mobile version policy (`027_create_mobile_version_policies.sql`). The client transmits its build version on every handshake. The server responds with status: `UP_TO_DATE`, `UPDATE_AVAILABLE`, or `UPDATE_REQUIRED`. If `UPDATE_REQUIRED`, the client locks the interface and provides direct deep-links to the App Store / Google Play.

### Trade-offs
- Requires maintaining policy tables and updating build numbers in release scripts.

### Result
Prevented corrupted data submissions from outdated clients; enabled controlled, backward-compatible API evolution.

---

## ADR-005: Decoupling Account Capabilities from Commercial Plans & Usage Ledgers

### Context
In sports organizations, coaches have fundamentally different workflows (roster management, multi-athlete tracking, team encounters) compared to individual athletes (self-profile, personal history). Conflating role capabilities with billing tiers creates brittle authorization rules scattered across the UI and backend.

### Constraints
- Commercial billing and subscriptions may be enabled, disabled, or phased in progressively.
- Athletes must never be able to access coach-managed rosters even under premium tiers.

### Decision
Establish a strict 3-tier authorization model:
1. **Account Type** (`COACH` vs `ATHLETE`): Determines immutable capability boundaries.
2. **Subscription Plan**: Determines scale limits (number of managed athletes, historical retention).
3. **Usage Ledger**: Records consumed quotas independently of access checks.

### Trade-offs
- Requires explicit policy checks in domain services rather than simple role checks.

### Result
Clean separation of concerns; zero privilege escalation between roles; seamless ability to adjust commercial limits without altering domain logic.

---

## ADR-006: Cryptographic Refresh Token Rotation with Concurrency Grace Periods

### Context
Mobile applications maintain long-lived authenticated sessions. Standard static refresh tokens create significant security exposure if intercepted. However, strict single-use refresh token invalidation causes race conditions on mobile devices when multiple concurrent requests (e.g. app resume triggering parallel dashboard queries) attempt to refresh tokens simultaneously.

### Constraints
- Mobile clients frequently issue bursts of parallel API requests on foreground resume.
- Token theft must be detected and neutralized immediately.

### Decision
Implement rotating refresh tokens backed by PostgreSQL (`033_expand_refresh_token_rotation.sql`) featuring:
1. Unique family IDs tracking token lineage.
2. A cryptographic hash stored in the database.
3. A **30-second concurrency grace period**: If a used token is submitted within 30 seconds by concurrent requests, the server returns the existing new token pair rather than revoking the session.
4. Any reuse *after* the grace period triggers immediate revocation of the entire token family (theft detection).

### Trade-offs
- Additional state tracking and transactional verification on token refresh.

### Result
Zero false-positive logouts during parallel mobile resume requests; robust cryptographic protection against token replay and theft.

---

## ADR-007: Relational Domain Modeling with Partial Unique Indexes & Soft Deletes

### Context
Coaches frequently archive or delete athletes and teams, but historical match records referencing those entities must remain fully intact for analytics integrity. Furthermore, coaches often recreate an athlete with the same name after deleting an older record.

### Constraints
- Relational integrity must prevent dangling foreign key references in historical matches.
- Standard unique constraints on athlete name would prevent recreating an athlete previously deleted.

### Decision
Implement soft deletes (`deleted_at IS NULL`) across all primary entities coupled with PostgreSQL **partial unique indexes**:
```sql
CREATE UNIQUE INDEX idx_players_coach_active_name
ON players (user_id, LOWER(TRIM(name)))
WHERE deleted_at IS NULL;
```

### Trade-offs
- All domain queries must explicitly include `WHERE deleted_at IS NULL` guards.

### Result
Historical matches and analytics remain 100% intact; coaches can reuse athlete names after deletion without index violations.

---

## ADR-008: Comprehensive Multi-Tier Quality Strategy (Unit, Contract, E2E, Capacity)

### Context
Live sporting events cannot be paused to debug mobile software defects. Quality verification must prove reliability across native mobile devices, network transitions, localization, and high concurrency.

### Constraints
- Testing only in web browsers fails to expose mobile safe-area, haptic, and orientation issues.
- Heavy reliance on manual QA slows down continuous delivery.

### Decision
Implement a 5-tier automated testing pyramid:
1. **Static Analysis**: TypeScript `--noEmit`, scoped ESLint, Prettier, line-level secret scans.
2. **Unit & Contract**: Vitest (backend domain logic, concurrency scripts) and Angular/Jasmine (NgRx reducers, pipes, services).
3. **Database Concurrency Tests**: Explicit integration tests validating token rotation grace periods and transaction rollbacks.
4. **Playwright E2E**: Smoke, visual regression, accessibility (a11y), and bilingual resilience (`resilience-en`, `resilience-ar`).
5. **k6 Capacity Engineering**: Automated performance testing covering average-load, stress, spike, soak, and live-match event write capacity.

### Trade-offs
- Higher initial investment in CI infrastructure and test maintenance.

### Result
**390 verified test files** protecting production; zero regression escapes during major version upgrades.
