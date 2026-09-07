# Engineering Case Study: Jahiz Analytics

> Executive architecture and engineering review of the production sports-technology platform **Jahiz Analytics (جاهز)**.

## Executive Context

Karate match analytics represents a unique engineering challenge: sub-second decision making during high-speed athletic combat combined with deep, longitudinal tactical analysis. The software must never lag, jank, or drop user interaction during competition, yet must produce deterministic, multi-dimensional tactical insights for coaches and national team selectors.

Jahiz Analytics was architected, engineered, and shipped to the **App Store (iOS)** and **Google Play (Android)** by **Shawky Elsayed** as sole architect and lead engineer across 735+ git commits.

---

## Core Engineering Documentation

This showcase provides thorough, evidence-backed documentation across every tier of the production stack:

### 🏛️ Architecture & Decisions
- [**System Architecture (ARCHITECTURE.md)**](../docs/ARCHITECTURE.md): Monorepo layout, micro-frontend mobile structure, Node.js ESM backend, and PostgreSQL 17 relational design.
- [**Architecture Decision Records (ENGINEERING_DECISIONS.md)**](../docs/ENGINEERING_DECISIONS.md): 8 comprehensive ADRs covering state machines, database job queues, standalone components, and release workflows.
- [**Engineering Overview (ENGINEERING_OVERVIEW.md)**](../docs/ENGINEERING_OVERVIEW.md): Executive summary of tech stack, codebase metrics, business problem, and technical achievements.

### 🔬 Deep-Dive Case Studies
1. [**Live Match State Machine & Optimistic UI (LIVE_MATCH_ENGINE.md)**](../docs/case-studies/LIVE_MATCH_ENGINE.md):
   - Local FIFO action queue with immediate NgRx store updates.
   - Reflow reduction from 146 layouts to 2 layouts per 2 ticks; 0px footer movement.
   - Deterministic rollback using `revalidateLiveMatch` and RxJS `exhaustMap`.
2. [**Asynchronous Analytics Pipeline (ANALYTICS_PIPELINE.md)**](../docs/case-studies/ANALYTICS_PIPELINE.md):
   - PostgreSQL 17 task queue utilizing `SELECT ... FOR UPDATE SKIP LOCKED`.
   - Decoupled worker process (`src/worker.ts` on port 8081).
   - Idempotent aggregations stored in materialized cache tables.
3. [**Cross-Platform Mobile Architecture (MOBILE_ENGINEERING.md)**](../docs/case-studies/MOBILE_ENGINEERING.md):
   - Capacitor 7 native bridges for haptics, storage, and device lifecycle.
   - Bilingual parity: Arabic (RTL) and English (LTR) via CSS Logical Properties.
   - Custom `ArabicNumbersPipe` ensuring authentic Eastern Arabic numerals without data mutation.
4. [**System Reliability & Fault Tolerance (RELIABILITY.md)**](../docs/case-studies/RELIABILITY.md):
   - Strict ACID transactions via `pg` connection pool clients.
   - 37 sequential SQL migrations with partial unique indexes and soft deletes.
   - Error code catalog and structured application exceptions.

### 🧪 Verification, Quality & DevOps
- [**Testing Strategy & Quality Assurance (TESTING_AND_QUALITY.md)**](../docs/TESTING_AND_QUALITY.md): Complete analysis of the 390 automated test files (219 client, 171 server) spanning unit, store, API, and E2E suites.
- [**Release Engineering & CI/CD (RELEASE_ENGINEERING.md)**](../docs/RELEASE_ENGINEERING.md): 6-stage GitLab CI/CD pipeline, Codemagic iOS TestFlight delivery, and Fastlane Google Play automation.
- [**Privacy & Data Safety (PRIVACY_AND_DATA_SAFETY.md)**](../docs/PRIVACY_AND_DATA_SAFETY.md): Sanitization audit, zero-PII guarantee, and public safety boundary rules.

---

## Technical Summary Matrix

| Pillar | Technology | Production Metric / Invariant |
| :--- | :--- | :--- |
| **Mobile & Web** | Angular 20 Standalone + Ionic 8 | 0 CLS reflows; sub-millisecond local interaction latency |
| **State Machine** | NgRx 20 (Reducers, Effects, Selectors) | Deterministic replay, local FIFO rollback, memoized selectors |
| **Native Bridge** | Capacitor 7 | iOS & Android unified runtime; native camera & haptic feedback |
| **Backend API** | Node.js 22 LTS (Strict ESM) + Express | Clean 3-tier pattern: Controller → Service → Repository |
| **Task Queue** | PostgreSQL 17 `FOR UPDATE SKIP LOCKED` | Zero external infrastructure; distributed concurrency control |
| **Database** | PostgreSQL 17 with 37 Migrations | Multi-stage transactions; `deleted_at` partial unique indexes |
| **Quality** | 390 Automated Test Files | 219 Angular/NgRx tests, 156 Server tests, 15 E2E suites |
| **DevOps** | GitLab CI + Codemagic + Fastlane | Automated dual-store delivery with automated rollback |
