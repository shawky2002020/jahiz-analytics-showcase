[English](./README.md) | [العربية](./README.ar.md)

<p align="center">
  <img src="./assets/brand/jahiz-logo.png" alt="Jahiz Analytics logo" width="160" />
</p>

<h1 align="center">Jahiz Analytics — جاهز</h1>

<p align="center">
  <strong>From Every Match to Measurable Improvement</strong><br />
  Production-Grade Karate Performance Platform & Real-Time Analytics Engine
</p>

<p align="center">
  <a href="https://apps.apple.com/us/app/jahiz-analytics/id6788289047" aria-label="Download Jahiz Analytics on the App Store">
    <img src="./assets/store/app-store.svg" alt="Download on the App Store" width="180" />
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://play.google.com/store/apps/details?id=com.jahiz.analytics" aria-label="Get Jahiz Analytics on Google Play">
    <img src="./assets/store/google-play.svg" alt="Get it on Google Play" width="200" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&amp;logo=angular&amp;logoColor=white" alt="Angular 20" />
  <img src="https://img.shields.io/badge/Ionic-8-3880FF?style=flat-square&amp;logo=ionic&amp;logoColor=white" alt="Ionic 8" />
  <img src="https://img.shields.io/badge/Capacitor-7-119EFF?style=flat-square&amp;logo=capacitor&amp;logoColor=white" alt="Capacitor 7" />
  <img src="https://img.shields.io/badge/NgRx-20-BA68C8?style=flat-square&amp;logo=ngrx&amp;logoColor=white" alt="NgRx 20" />
  <img src="https://img.shields.io/badge/Node.js-22_ESM-339933?style=flat-square&amp;logo=nodedotjs&amp;logoColor=white" alt="Node.js 22 ESM" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white" alt="PostgreSQL 17" />
  <img src="https://img.shields.io/badge/Tests-390_Files-brightgreen?style=flat-square" alt="390 Test Files" />
  <img src="https://img.shields.io/badge/Migrations-37_SQL-orange?style=flat-square" alt="37 SQL Migrations" />
  <img src="https://img.shields.io/badge/Architecture-Sole_Architect_%26_Engineer-blueviolet?style=flat-square" alt="Sole Architect" />
</p>

---

> ### ⚡ Recruiter & Hiring Manager 30-Second Executive Summary
> **Jahiz Analytics** is a live, commercial sports-technology mobile application available on the **App Store (iOS)** and **Google Play (Android)**. Designed, engineered, and maintained by **Shawky Elsayed** as sole architect and lead engineer (735+ commits), it solves high-stakes, sub-second match logging and performance analytics for Olympic/WKF karate coaches and elite athletes.
>
> - **Cross-Platform Frontend**: Angular 20 Standalone, Ionic 8, NgRx 20 state machine, Capacitor 7 native bridges, and bi-directional design system (Arabic RTL / English LTR) with zero Cumulative Layout Shift (CLS).
> - **High-Throughput Backend**: Node.js 22 ESM, Express, PostgreSQL 17 transaction-safe data layer with 37 migrations, connection pooling, and decoupled worker aggregation.
> - **Engineering Rigor**: Exactly **390 automated test files** (219 client, 171 server), 6-stage GitLab CI/CD with automated zero-downtime deployment, Codemagic iOS automation, and Fastlane Google Play releases.

---

<p align="center">
  <img src="./assets/hero/jahiz-product-engineering-showcase.webp" alt="Jahiz Analytics Product & Engineering Showcase" width="100%" />
</p>

---

## 📊 Engineering at a Glance

| Dimension | Production Specification | Architectural Rationale & Verification |
| :--- | :--- | :--- |
| **Frontend Framework** | **Angular 20 Standalone + Ionic 8** | Modern signal-ready component architecture; eliminated legacy NgModule bloat. |
| **Mobile Runtime** | **Capacitor 7** | Direct access to native camera, haptics, secure storage, and device lifecycle hooks. |
| **State Management** | **NgRx 20 (Actions, Reducers, Effects, Selectors)** | Deterministic live match state machine with optimistic updates and local FIFO action queue. |
| **Backend Runtime** | **Node.js 22 LTS (Strict ESM)** | Modern modular runtime with native ES modules, async/await, and decoupled background worker. |
| **Primary Database** | **PostgreSQL 17 via pg Pool** | Relational integrity with 37 sequential migrations, soft deletes, and partial unique indexes. |
| **Task Queue** | **PostgreSQL `FOR UPDATE SKIP LOCKED`** | Zero-external-dependency distributed job queue for asynchronous analytics aggregation. |
| **Testing Pyramid** | **390 Test Files (219 Client, 171 Server)** | Jasmine/Karma, Jest, Supertest, and Playwright covering units, stores, APIs, and transactions. |
| **Release Pipeline** | **GitLab CI/CD + Codemagic + Fastlane** | Automated 6-stage delivery: validation, build, staging verification, preflight, and dual-store release. |
| **Internationalization** | **Bilingual Bi-Directional (Arabic RTL / English LTR)** | Tokenized HSL design system, CSS logical properties, and custom `ArabicNumbersPipe`. |
| **Engineering Ownership** | **735+ Git Commits (Sole Architect & Engineer)** | 100% solo authorship of client, server, shared libraries, DB migrations, and CI/CD pipelines. |

---

<p align="center">
  <img src="./assets/diagrams/engineering-snapshot.svg" alt="Jahiz Analytics Engineering Snapshot" width="100%" />
</p>

---

## 📱 Product & Architecture Video Walkthrough

Watch the native mobile application in action, demonstrating live match scoring, instant timer-synced event logging, offline-resilient optimistic UI, and post-match performance analytics:

<p align="center">
  <a href="./assets/demo/jahiz-demo-full.mp4">
    <img src="./assets/demo/jahiz-demo-poster.webp" alt="Watch Jahiz Mobile Demo" width="100%" />
  </a>
  <br />
  <em>▶️ <a href="./assets/demo/jahiz-demo-full.mp4"><strong>Full Product Walkthrough (MP4, 59.5s, 710 KB)</strong></a> &nbsp;|&nbsp; ⚡ <a href="./assets/demo/jahiz-demo-recruiter.mp4"><strong>Recruiter Fast Cut (MP4, 28.7s, 923 KB)</strong></a></em>
</p>

---

<p align="center">
  <img src="./assets/hero/jahiz-engineering-overview.webp" alt="Jahiz Analytics System Engineering Overview" width="100%" />
</p>

---

## 🏛️ System Architecture

Jahiz is engineered as a clean **npm workspaces monorepo** separating presentation, server business rules, and shared domain models:

```
jahiz-monorepo/
├── client/          # Angular 20 + Ionic 8 + NgRx 20 + Capacitor 7 Mobile App
├── server/          # Node.js 22 ESM + Express + PostgreSQL 17 Core API & Worker
├── shared/          # Shared TypeScript interfaces, DTOs, Enums, and ErrorCodes
├── docs/            # Architecture specifications, ADRs, and operational runbooks
└── tools/           # Automation scripts, Fastlane, and screenshot pipelines
```

<p align="center">
  <img src="./assets/diagrams/system-architecture.svg" alt="Jahiz Full System Architecture" width="100%" />
</p>

---

## 🔬 Four Deep-Dive Engineering Pillars

### 1. Sub-Millisecond Live Match State Machine & Zero-CLS Optimistic UI
In competitive WKF karate, match duration is strictly 3 minutes with rapid-fire scoring bursts (Yuko, Waza-ari, Ippon) and simultaneous penalties (C1/C2 warnings). An unresponsive UI or network latency causes missed points and coach frustration.

- **Optimistic Mutation Queue**: UI events dispatch immediately to local NgRx state, updating scores and timelines in sub-millisecond frames. Actions are appended to an in-memory FIFO queue dispatched to `POST /api/v1/matches/:id/events`.
- **Layout Stability (0 CLS)**: Performance profiling verified a reduction from **146 layouts to 2 layouts per 2 ticks** during active timer ticking, with **0px footer movement** when displaying offline network warnings or rejected action toasts.
- **Rollback & Revalidation**: In the event of network disruption or server rejection, the engine executes a deterministic rollback to the last confirmed server snapshot using `revalidateLiveMatch` powered by RxJS `exhaustMap`, guaranteeing that the running clock and uncommitted user interactions are never corrupted.

<p align="center">
  <img src="./assets/diagrams/live-match-flow.svg" alt="Live Match Event Flow & State Engine" width="100%" />
</p>

📖 *Read the full case study: [Live Match State Machine & Optimistic UI Engine](./docs/case-studies/LIVE_MATCH_ENGINE.md)*

---

### 2. Asynchronous Analytics Aggregation Pipeline
Athletes and coaches require multi-dimensional performance breakdowns: attack type effectiveness (Kizami-Zuki vs. Gyaku-Zuki vs. Ura-Mawashi-Geri), Senshu (first-score advantage) conversion rates, foul severity ratios, and time-bracket fatigue curves.

- **Decoupled Worker Architecture**: Rather than computing heavy aggregations synchronously within HTTP request cycles, match finalization writes a job entry to an internal `analytics_tasks` queue table.
- **PostgreSQL Row-Level Locking**: Workers query using `SELECT ... FOR UPDATE SKIP LOCKED`. This provides zero-external-dependency distributed job scheduling across concurrent worker instances without Redis lock contention.
- **Idempotent Upserts**: Aggregation jobs execute within explicit SQL transactions (`BEGIN ... COMMIT`), generating immutable snapshot summaries in `athlete_analytics_cache` and `match_analytics_cache`. Re-running jobs on event modifications produces identical, deterministic results.

<p align="center">
  <img src="./assets/diagrams/match-to-analytics.svg" alt="Asynchronous Analytics Aggregation Pipeline" width="100%" />
</p>

📖 *Read the full case study: [Asynchronous Analytics Pipeline & Worker Queue](./docs/case-studies/ANALYTICS_PIPELINE.md)*

---

### 3. Industrial Cross-Platform & Bilingual RTL/LTR Design System
Karate is an international sport with massive adoption across both Arab nations and global federations. Jahiz delivers a native mobile experience on iOS and Android with first-class Arabic (RTL) and English (LTR) parity.

- **CSS Logical Properties**: Layouts use standard CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline-start`) instead of hardcoded left/right values, allowing instantaneous dynamic direction flipping without DOM rebuilds.
- **Semantic HSL Design Tokens**: Fully centralized theme in `client/src/theme/variables.scss` using CSS custom properties with HSL color channels for precise opacity adjustments and high-contrast accessibility.
- **Localized Numeric Formatting**: Custom `ArabicNumbersPipe` ensures all live timers, point counts, and tournament bracket indices render correctly in Eastern Arabic numerals when Arabic locale is selected, without altering underlying raw numeric state.

<p align="center">
  <img src="./assets/diagrams/live-match-lifecycle.svg" alt="Match State Lifecycle & Transitions" width="100%" />
</p>

📖 *Read the full case study: [Cross-Platform Mobile Architecture & RTL Design System](./docs/case-studies/MOBILE_ENGINEERING.md)*

---

### 4. Enterprise Release Engineering, CI/CD & Reliability
Production reliability is enforced at every layer, from git commit to dual-store deployment.

- **6-Stage GitLab CI/CD Pipeline**: `validate` (TypeScript type-check, ESLint, format check) ➔ `build` (Angular production AOT bundle, Node.js compilation) ➔ `deploy_staging` (automated staging environment deployment) ➔ `verify_staging` (smoke tests and health check validation) ➔ `production_preflight` (manual approval gate with DB migration preview) ➔ `deploy_production` (zero-downtime rolling update with automated rollback).
- **Automated Mobile Publishing**: Codemagic orchestrates iOS builds, code signing, and automated TestFlight delivery; Fastlane automates Android App Bundle (AAB) compilation, signing, and Google Play Internal track publishing.
- **Database Safety**: 37 sequential SQL migrations enforce partial indexes (e.g., ensuring only one active Senshu per match side), soft deletes (`deleted_at`), and cryptographically secure token rotation.

<p align="center">
  <img src="./assets/diagrams/release-pipeline.svg" alt="Enterprise Release Engineering Pipeline" width="100%" />
</p>

📖 *Read the full case study: [System Reliability, Transactions & Failure Recovery](./docs/case-studies/RELIABILITY.md)*

---

## 📸 Verified Product Gallery

Captured directly from the installed Capacitor application running real production builds with sanitized demo fixtures:

<table>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/home/coach-home-en.webp" alt="Coach Command Center" /><br />
      <strong>Coach Command Center</strong><br />
      Quick-start match actions, squad readiness metrics, and upcoming tournament schedule.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/live-match/live-match-running-timer.webp" alt="Live Match Logging" /><br />
      <strong>Live Match Logging (Aka vs. Ao)</strong><br />
      Sub-second scoring controls, attack classification, penalty tracking, and active timer.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/review/match-review-timeline-events.webp" alt="Match Review & Timeline" /><br />
      <strong>Reviewable Event History</strong><br />
      Chronological event timeline with point differentials, Senshu status, and undo capabilities.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/analytics/match-technique-radar.webp" alt="Performance Analytics" /><br />
      <strong>Performance Analytics View</strong><br />
      Offensive/defensive radar charts, scoring effectiveness by technique, and foul distribution.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/teams/team-roster-management.webp" alt="Coach Team Management" /><br />
      <strong>Coach Team Management</strong><br />
      Squad roster management, weight category tracking, and athlete readiness status.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/athletes/athlete-profile-coach.webp" alt="Athlete Profile Management" /><br />
      <strong>Athlete Profile Details</strong><br />
      Detailed athlete historical records, cumulative medals, and technical attributes.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/tournaments/tournament-hub-individual.webp" alt="Tournament Workflows" /><br />
      <strong>Tournament Management</strong><br />
      Bracket progression, single-elimination bout routing, and tournament-level reporting.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/athletes/athlete-self-profile.webp" alt="Athlete Self Profile" /><br />
      <strong>Athlete Self-Service Profile</strong><br />
      Personal performance summary, upcoming matches, and personal technique evolution.
    </td>
  </tr>
</table>

📖 *Browse the full 64-screenshot visual catalog: [Product Screen Gallery](./docs/PRODUCT_SCREEN_GALLERY.md) & [Screenshot Index](./docs/SCREENSHOT_INDEX.md)*

---

## 🧪 Testing Pyramid & Quality Metrics

The production codebase is backed by **390 automated test files**, ensuring zero regressions across all core user journeys:

```
                 /\
                /  \      15 E2E & Smoke Scenarios (Playwright)
               /----\     - Live Match Flow, Auth Lifecycle, Offline Queue
              /      \
             /--------\   156 Integration & API Route Tests (Supertest + Jest)
            /          \  - Controller-Service Contracts, DB Transactions, Worker Queue
           /------------\
          /              \ 219 Frontend Unit & Store Tests (Jasmine + Karma + NgRx)
         /----------------\ - Reducers, Effects, Selectors, Arabic Pipe, Form Validators
```

| Test Category | Scope & Technologies | Key Invariants Verified |
| :--- | :--- | :--- |
| **Frontend Unit & NgRx** | 219 files (`client/src/app/**/*.spec.ts`) | State transitions, optimistic action dispatch, selector memoization, pipe transformations. |
| **Backend Integration** | 156 files (`server/src/**/*.test.ts`) | Transaction rollbacks on failure, partial unique index constraints, worker queue processing. |
| **Mobile Native & E2E** | 15 test suites (Playwright & native harnesses) | App launch lifecycle, offline event queuing, deep linking, bi-directional RTL rendering. |

📖 *Read the full testing breakdown: [Testing Strategy, Coverage & Quality Assurance](./docs/TESTING_AND_QUALITY.md)*

---

## 📐 Domain Data Model

PostgreSQL 17 schema architected around strict relational integrity, referential constraints, and auditability:

<p align="center">
  <img src="./assets/diagrams/tournament-domain.svg" alt="Jahiz Relational Domain Model" width="100%" />
</p>

- **Soft Deletion Pattern**: Critical tables implement `deleted_at IS NULL` partial indexes to allow athlete record recovery while preserving historical match integrity.
- **Transactional Consistency**: Multi-entity mutations (e.g., match finalization, Senshu awarding, and worker task scheduling) execute inside dedicated `PoolClient` transactions.

---

## 📑 Architecture Decision Records (ADRs)

Key architectural decisions that shaped the production platform:

| ADR | Title | Decision Summary | Core Tradeoff / Rationale |
| :--- | :--- | :--- | :--- |
| **ADR-001** | **Monorepo Structure** | Single repo with npm workspaces (`client`, `server`, `shared`). | Shared TypeScript models prevent API contract drift at compile time. |
| **ADR-002** | **NgRx State Machine** | Centralized NgRx store for match scoring rather than local component state. | Ensures deterministic rollback, audit replay, and clean decoupling from UI layout. |
| **ADR-003** | **PostgreSQL Task Queue** | Built-in `FOR UPDATE SKIP LOCKED` table instead of external Redis/BullMQ. | Eliminates distributed transaction failures; tasks commit with match data atomically. |
| **ADR-004** | **Angular Standalone** | Full migration to Angular Standalone Components without NgModules. | Reduces bundle size, accelerates compilation, and simplifies component tree. |
| **ADR-005** | **Strict Node.js ESM** | Full Node.js 22 ECMAScript Modules with explicit `.js` import specifiers. | Future-proof standard JavaScript runtime; seamless alignment with frontend TS code. |
| **ADR-006** | **CSS Logical Design System** | HSL CSS custom variables + CSS Logical Properties (`*-inline`). | Flawless bi-directional (LTR/RTL) switching without CSS duplication or style recalculation. |
| **ADR-007** | **Sequential SQL Migrations**| Raw, numbered SQL migration scripts without heavy runtime ORM abstractions. | Total visibility into execution plans, indexes, triggers, and lock contention. |
| **ADR-008** | **Automated Dual-Track CI** | GitLab CI/CD for web/backend, Codemagic for iOS, Fastlane for Android. | Platform-native release pipelines tailored for store signing and compliance rules. |

📖 *Read all ADRs: [Architecture Decision Records (ADRs)](./docs/ENGINEERING_DECISIONS.md)*

---

## 📚 Technical Documentation & Case Studies

| Document | Target Audience | Primary Focus |
| :--- | :--- | :--- |
| 📘 [**Engineering Overview**](./docs/ENGINEERING_OVERVIEW.md) | Technical Recruiter / Engineering Manager | High-level system scale, technical stack, metrics, and business value. |
| 🏛️ [**System Architecture**](./docs/ARCHITECTURE.md) | Principal Architect / Staff Engineer | Monorepo topology, data flow, communication protocols, and module design. |
| 📑 [**Engineering Decisions (ADRs)**](./docs/ENGINEERING_DECISIONS.md) | Lead Engineer / System Designer | 8 detailed ADRs with context, options considered, and tradeoffs. |
| 🧪 [**Testing & Quality Assurance**](./docs/TESTING_AND_QUALITY.md) | QA Lead / Senior SDET | 390 test files breakdown, testing pyramid, E2E fixtures, and CI gates. |
| 🚀 [**Release Engineering & DevOps**](./docs/RELEASE_ENGINEERING.md) | DevOps / Infrastructure Engineer | GitLab CI/CD stages, Codemagic iOS builds, Fastlane AABs, and rollbacks. |
| 🔒 [**Privacy & Data Safety**](./docs/PRIVACY_AND_DATA_SAFETY.md) | Security Auditor / Compliance Officer | Showcase redaction policy, zero-PII guarantee, and security posture. |
| ⚡ [**Case Study: Live Match Engine**](./docs/case-studies/LIVE_MATCH_ENGINE.md) | Senior Frontend / Mobile Engineer | Optimistic updates, 0 CLS reflow optimization, and FIFO rollback queue. |
| 📈 [**Case Study: Analytics Pipeline**](./docs/case-studies/ANALYTICS_PIPELINE.md) | Senior Backend / Data Engineer | PostgreSQL worker queue (`SKIP LOCKED`), idempotent aggregations, and caching. |
| 📱 [**Case Study: Mobile Engineering**](./docs/case-studies/MOBILE_ENGINEERING.md) | Mobile Architect / UI Engineer | Capacitor 7 bridges, Ionic 8 theming, and bilingual RTL/LTR parity. |
| 🛡️ [**Case Study: System Reliability**](./docs/case-studies/RELIABILITY.md) | Site Reliability Engineer (SRE) | DB connection pooling, multi-stage transactions, and error handling. |
| 📱 [**Application View Inventory**](./docs/APP_VIEW_INVENTORY.md) | Mobile QA / Product Engineer | 64 distinct views and states mapped by route, role, and capture status. |
| 📸 [**Product Screen Gallery**](./docs/PRODUCT_SCREEN_GALLERY.md) | Technical Recruiter / Designer | Curated visual tour with engineering commentary across 6 domains. |
| 📂 [**Master Screenshot Index**](./docs/SCREENSHOT_INDEX.md) | Showcase Maintainer / Reviewer | Catalog of all 64 screenshots with dimensions, sizes, and states. |
| 🎬 [**Demo Video Storyboard**](./docs/DEMO_VIDEO_STORYBOARD.md) | Video Producer / Reviewer | 10-scene timing, captions, user actions, and video specifications. |
| 📋 [**Asset Integrity Manifest**](./docs/ASSET_MANIFEST.md) | Compliance / Security Auditor | Complete asset tracking, safe demo fixtures, and optimization log. |

---

## 👨‍💻 Engineering Ownership & Author

**Jahiz Analytics** is designed, architected, implemented, tested, and shipped by:

### **Shawky Elsayed**
*Senior Software Engineer & Full-Stack Systems Architect*

- **Monorepo Author**: **735+ Commits** across monorepo history as sole engineer.
- **Core Competencies**: Full-Stack TypeScript, Angular / NgRx, Ionic / Capacitor, Node.js ESM, PostgreSQL, Distributed Systems, CI/CD DevOps, Mobile App Store Operations.
- **GitHub**: [@shawky2002020](https://github.com/shawky2002020)
- **LinkedIn**: [Shawky Elsayed](https://www.linkedin.com/in/shawky2002020/)
- **Portfolio**: [shawky.dev](https://shawky2002020.github.io/)

---

## ⚖️ License & Intellectual Property Notice

This repository is a **public technical showcase and architectural case study**. The underlying production source code, commercial assets, proprietary databases, and backend infrastructure remain private and proprietary. See [NOTICE.md](./NOTICE.md) and [SECURITY.md](./SECURITY.md).

Copyright © 2026 Shawky Elsayed / Jahiz Analytics. All rights reserved.
