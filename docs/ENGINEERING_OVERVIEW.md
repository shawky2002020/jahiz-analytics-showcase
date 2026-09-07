# Engineering Overview

## System Mission & Product Scope

**Jahiz Analytics (جاهز)** is a high-performance, cross-platform sports analytics and tournament management platform built for Olympic and WKF (World Karate Federation) karate. Shipped to production on both the **Apple App Store** and **Google Play Store**, it transforms fast-paced, live match events into structured, longitudinal athletic intelligence.

In competitive karate, bouts last 2 to 3 minutes of high-intensity action. Scorers and coaches must capture points (Yuko, Waza-ari, Ippon), penalties (Chui 1–3, Hansoku-Chake), warnings, Senshu (first-score advantage), and timer adjustments with split-second precision on handheld mobile devices, frequently under hostile Wi-Fi or cellular conditions inside crowded sports arenas.

The engineering challenge was to design and ship a system that satisfies three uncompromising requirements:
1. **Zero-Latency Interaction**: The mobile scorer must update instantly (0 ms perceived latency) with absolute touch reliability.
2. **Strict Server Authority**: The server database remains the single source of truth, enforcing tournament rules, idempotency, and terminal state invariants via transactional database triggers.
3. **Decoupled Analytical Processing**: Heavy analytics generation must never compete with real-time match event ingestion on the API thread.

---

## Technical Stack at a Glance

| Layer | Technologies | Architectural Highlights |
| :--- | :--- | :--- |
| **Mobile & Client** | Angular 20, Ionic 8, Capacitor 7, NgRx 20, RxJS | Standalone Components, Signals, OnPush change detection, Optimistic reducers, FIFO command queue, True RTL/LTR layout parity, Native Haptics. |
| **Backend API** | Node.js 22 (ESM), Express, TypeScript | Controller → Service → Repository pattern, Policy-driven authorization, JWT session rotation with concurrency grace periods. |
| **Database** | PostgreSQL 17, `pg` Connection Pool | 37 SQL migrations, ACID multi-stage transactions via `PoolClient`, Row-level locking (`FOR UPDATE SKIP LOCKED`), Terminal state triggers, Soft deletes. |
| **Worker Engine** | Node.js Worker Process (`src/worker.ts`) | Decoupled background service, Distributed PostgreSQL queue, Stale lease reaper, Bounded exponential retry backoff, Dedicated health port (8081). |
| **Testing & Quality** | Vitest, Jasmine, Playwright, k6 | 390 Test files, Bilingual resilience E2E, Visual regression, Accessibility (a11y), Capacity & stress load testing (smoke, spike, soak, breakpoint). |
| **CI/CD & Delivery** | GitLab CI/CD, DigitalOcean (DOCR), Codemagic, Fastlane | 6-Stage pipeline with automated rollback, Multi-stage Docker runner image, Google Play automated publishing, iOS TestFlight automation. |
| **Observability** | Sentry (Node, Angular, Capacitor) | Client & server error monitoring, Distributed tracing, Health & readiness probes (`/health`, `/health/ready`, `/health/live`). |

---

## Core Engineering Principles

### 1. Backend Authoritative Truth, Optimistic Frontend UX
The client assumes local success for operator commands to maintain fluid interaction on the competition floor, but every mutation is verified and committed by the server. If an event is rejected or fails network validation, the client reconciles gracefully without silent corruption or state desynchronization.

### 2. Zero Cumulative Layout Shift (CLS) on Critical Surfaces
In live scoring, an interface control must never shift position while the operator is tapping. Error banners, connection loss notices, and expanded rule descriptions exist in isolated, explicitly dimensioned layers. Layouts during active clock ticks dropped from 146 to 2 per two seconds, with 0 px movement of primary controls upon network status changes.

### 3. Database Invariants Enforced at the Engine Level
Business-critical rules are not left solely to application code. PostgreSQL triggers enforce terminal match invariants: once a match is marked `COMPLETED`, all subsequent write operations to its event stream are aborted at the database engine level, guaranteeing tamper-proof historical audits.

### 4. Decoupled Asynchronous Processing
Match logging and analytics calculation operate on independent lifecycles. Real-time scoring routes persist raw events with minimal database overhead. Analytical metric computation, technique efficacy models, and tournament rollups are dispatched asynchronously to a background worker engine via row-locked PostgreSQL queues.

### 5. Verified Release Engineering & Store Delivery
Code is not considered shipped until it passes end-to-end release gating: isolated database migration verification, static line-level secret scans, strict localization assertions, Docker image validation, and automated deployment pipelines to staging, production, TestFlight, and Google Play.
