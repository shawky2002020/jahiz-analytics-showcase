[English](./README.md) | [العربية](./README.ar.md)

<p align="center">
  <img src="./assets/brand/jahiz-logo.png" alt="Jahiz Analytics logo" width="150" />
</p>

<h1 align="center">Jahiz Analytics — جاهز</h1>

<p align="center">
  <strong>Karate performance analytics built around the match itself.</strong><br />
  Record live match events, review what happened, and turn competition data into practical performance insight.
</p>

<p align="center">
  <a href="https://apps.apple.com/us/app/jahiz-analytics/id6788289047">
    <img src="./assets/store/app-store.svg" alt="Download Jahiz Analytics on the App Store" width="172" />
  </a>
  &nbsp;&nbsp;
  <a href="https://play.google.com/store/apps/details?id=com.jahiz.analytics">
    <img src="./assets/store/google-play.svg" alt="Get Jahiz Analytics on Google Play" width="190" />
  </a>
</p>

<p align="center">
  <strong>Shipped cross-platform product</strong> · iOS & Android · Arabic RTL & English LTR
</p>

---

## ▶ Watch the Jahiz Launch

<p align="center">
  <a href="https://lnkd.in/p/eqWueRtk">
    <img src="./assets/hero/jahiz-product-engineering-showcase.webp" alt="Jahiz Analytics product launch — open the real launch post on LinkedIn" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://lnkd.in/p/eqWueRtk"><strong>▶ Watch the Jahiz Launch on LinkedIn</strong></a>
</p>

The primary product proof here is the **public launch of the real shipped application**, not a repository-hosted demo cut. The showcase keeps product screenshots and engineering documentation on GitHub so reviewers can inspect the experience and the technical decisions without access to the private production source.

---

## 30-second recruiter summary

**Jahiz Analytics** is a mobile product for karate athletes and coaches. It supports athlete/player management, live individual match logging, match review and analytics, individual tournaments, and coach workflows for teams and team tournaments.

My role is **Software Engineer & Equity Partner — Jahiz Analytics**. I owned engineering work across the Angular/Ionic mobile application, NgRx state flows, Node.js APIs, PostgreSQL data design, live-match workflows, analytics processing, testing, CI/CD, and mobile delivery.

The technically interesting parts are not the technology names themselves. They are the constraints behind the product:

- live match interactions must stay responsive while the server remains authoritative;
- timer, score, penalties, Undo, and network recovery must not corrupt match state;
- analytics work should not make match-writing requests heavier;
- coach and athlete capabilities have different ownership boundaries;
- Arabic RTL and English LTR must behave as one product across mobile layouts;
- schema and mobile releases must evolve without breaking older clients unnecessarily.

**Stack:** Angular · Ionic · Capacitor · NgRx · RxJS · Node.js · TypeScript · Express · PostgreSQL

---

## What Jahiz solves

Karate matches produce useful information that is easy to lose once the bout ends. Jahiz makes the match itself the data source: score events, penalties, techniques, timing, match context, and review history can be captured during the bout and analyzed afterward.

The current product centers on:

- athlete/player profiles and coach-managed rosters;
- live individual match logging and review;
- performance analytics derived from recorded match data;
- individual tournament workflows;
- coach teams, team matches, and team tournaments where supported;
- bilingual Arabic/English mobile use.

Features such as AI insights, video analysis, coach-athlete invitations, organization/academy workspaces, and commercial billing enforcement are **not presented here as shipped functionality**. See [Feature claim verification](./docs/FEATURE_CLAIM_VERIFICATION.md).

---

## My engineering role

### Shawky Elsayed
**Software Engineer & Equity Partner — Jahiz Analytics**

My responsibility spans the product implementation and delivery lifecycle:

| Area | Ownership |
| --- | --- |
| **Mobile product** | Angular/Ionic application architecture, responsive UI, native Capacitor integration |
| **Client state** | NgRx actions, reducers, effects and selectors for stateful match workflows |
| **Backend** | Node.js/TypeScript APIs, domain rules, authentication and ownership enforcement |
| **Data** | PostgreSQL schema evolution, transactions, indexes and history-preserving data flows |
| **Live match** | scoring, timer lifecycle, penalties, Undo, optimistic interaction and reconciliation |
| **Analytics** | match-derived analytics workflows and background processing |
| **Quality** | unit/integration/E2E checks, regression hardening and failure-path testing |
| **Delivery** | CI/CD, schema preflight, mobile builds, App Store and Google Play release operations |

Business, brand, and sport-domain decisions are developed with the Jahiz product partners. This repository focuses on the engineering work I can show publicly.

---

## Product experience

These are sanitized captures of the real application using non-production data. The main README intentionally shows only a small set; the larger visual inventory lives in [`docs/PRODUCT_SCREEN_GALLERY.md`](./docs/PRODUCT_SCREEN_GALLERY.md).

<table>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/home/coach-home-en.webp" alt="Jahiz coach home screen" /><br />
      <strong>Coach workspace</strong><br />
      Athlete, match, team and tournament workflows in one mobile context.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/live-match/live-match-running-timer.webp" alt="Jahiz live karate match logging screen with active timer" /><br />
      <strong>Live match logging</strong><br />
      Score, match state, timer and competition actions designed for fast use.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/review/match-review-timeline-events.webp" alt="Jahiz chronological match review timeline" /><br />
      <strong>Match review</strong><br />
      Recorded events remain inspectable after the bout.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/analytics/match-technique-radar.webp" alt="Jahiz match performance analytics screen" /><br />
      <strong>Performance analytics</strong><br />
      Match data is transformed into technique and performance views.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/teams/team-management.webp" alt="Jahiz coach team management screen" /><br />
      <strong>Coach team workflows</strong><br />
      Team management is a coach capability rather than an athlete-plan upgrade.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/tournaments/tournament-hub-individual.webp" alt="Jahiz individual tournament hub" /><br />
      <strong>Tournament workflow</strong><br />
      Individual competition context connects matches with tournament progression.
    </td>
  </tr>
</table>

---

## Engineering at a glance

| Concern | Decision |
| --- | --- |
| **Client** | Angular + Ionic + Capacitor for one cross-platform mobile codebase |
| **State** | NgRx for explicit state transitions around long-lived match workflows |
| **API** | Node.js + TypeScript + Express with domain/service boundaries |
| **Database** | PostgreSQL as the transactional source of record |
| **Live interaction** | Optimistic client updates with server reconciliation and idempotent event handling |
| **Analytics** | Background worker flow so heavier aggregation stays outside the primary request path |
| **Queueing** | PostgreSQL row locking with `FOR UPDATE SKIP LOCKED` for worker task claiming |
| **Localization** | Arabic RTL and English LTR treated as layout architecture, not only translation |
| **Release safety** | staged validation, migration checks, health/readiness verification and mobile version policy |
| **Source boundary** | production source is private; this repository contains public-safe evidence and explanations |

---

## Engineering case studies

### 1. Live match state under unreliable networks

**Problem:** a scorer should not have to wait for a network round-trip before seeing a point or penalty reflected locally.

**Decision:** update local NgRx state optimistically, serialize pending match commands, assign idempotency identifiers, and reconcile with the server-authoritative match state.

**Tradeoff:** the client becomes more complex because it must represent pending, accepted, rejected, and revalidated state explicitly.

**Evidence:** [`LIVE_MATCH_ENGINE.md`](./docs/case-studies/LIVE_MATCH_ENGINE.md) · [`live-match-flow.svg`](./assets/diagrams/live-match-flow.svg)

### 2. Analytics outside the match-writing request path

**Problem:** post-match aggregation should not compete with live event ingestion.

**Decision:** enqueue analytics work and let background workers claim tasks through PostgreSQL row locks using `FOR UPDATE SKIP LOCKED`.

**Tradeoff:** PostgreSQL becomes both the system of record and the task coordination layer, so worker throughput and connection-pool usage must be monitored.

**Evidence:** [`ANALYTICS_PIPELINE.md`](./docs/case-studies/ANALYTICS_PIPELINE.md) · [`match-to-analytics.svg`](./assets/diagrams/match-to-analytics.svg)

### 3. Stable bilingual mobile interaction

**Problem:** a live scorer has dense controls, mixed-direction athlete names, notches/safe areas, and two layout directions.

**Decision:** use explicit layout ownership, logical CSS properties, direction-aware UI, localized formatting, and mobile lifecycle handling through Ionic/Capacitor.

**Tradeoff:** localization and device geometry become architecture concerns that must be exercised in regression testing.

**Evidence:** [`MOBILE_ENGINEERING.md`](./docs/case-studies/MOBILE_ENGINEERING.md)

### 4. Data and release safety

**Problem:** matches, analytics, schemas, authentication state, and installed mobile clients evolve at different speeds.

**Decision:** keep backend rules authoritative, use transactions and idempotency around important writes, preserve historical records where needed, classify schema changes, and gate incompatible mobile versions.

**Tradeoff:** safe evolution requires more policy, migration and release discipline than a simple CRUD deployment.

**Evidence:** [`RELIABILITY.md`](./docs/case-studies/RELIABILITY.md) · [`RELEASE_ENGINEERING.md`](./docs/RELEASE_ENGINEERING.md)

---

## Architecture

<p align="center">
  <img src="./assets/diagrams/system-architecture.svg" alt="Jahiz Analytics system architecture showing mobile client, API, worker and PostgreSQL" width="100%" />
</p>

At a high level, the mobile client sends domain commands to the API; the API validates ownership and match rules before committing transactional state to PostgreSQL. Analytics tasks can be handled asynchronously by a separate worker, while the client reads canonical state and derived analytics through the API.

The design intentionally keeps commercial plan logic separate from account capabilities. A paid athlete plan, for example, must not become a back door into coach-only team workflows.

Read the fuller explanation in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) and the decision records in [`docs/ENGINEERING_DECISIONS.md`](./docs/ENGINEERING_DECISIONS.md).

---

## Reliability, testing and delivery

The private production repository contains the implementation and its automated test suites. This public repository does **not** publish volatile test-file counts, migration counts, commit totals, latency numbers, or coverage percentages as marketing metrics.

The engineering strategy covers:

- reducer/service/domain unit tests for deterministic business behavior;
- API and database integration tests for ownership, transactions and concurrency;
- end-to-end mobile/web flows for critical match journeys;
- bilingual and responsive regression checks;
- migration and release preflight checks;
- health/readiness verification and production observability;
- mobile release/version compatibility checks.

Details: [`TESTING_AND_QUALITY.md`](./docs/TESTING_AND_QUALITY.md) · [`RELEASE_ENGINEERING.md`](./docs/RELEASE_ENGINEERING.md)

---

## Deep-dive documentation

| Document | Why read it |
| --- | --- |
| [Engineering overview](./docs/ENGINEERING_OVERVIEW.md) | Fast technical orientation |
| [System architecture](./docs/ARCHITECTURE.md) | Runtime boundaries and data flow |
| [Engineering decisions](./docs/ENGINEERING_DECISIONS.md) | Problem → constraint → decision → tradeoff → result |
| [Live match engine](./docs/case-studies/LIVE_MATCH_ENGINE.md) | Optimistic state, ordering, reconciliation and Undo |
| [Analytics pipeline](./docs/case-studies/ANALYTICS_PIPELINE.md) | Worker queue and asynchronous aggregation |
| [Mobile engineering](./docs/case-studies/MOBILE_ENGINEERING.md) | Capacitor, safe areas, RTL/LTR and lifecycle |
| [Reliability](./docs/case-studies/RELIABILITY.md) | Idempotency, sessions, transactions and recovery |
| [Testing and quality](./docs/TESTING_AND_QUALITY.md) | Layered verification strategy |
| [Release engineering](./docs/RELEASE_ENGINEERING.md) | Delivery and migration safety |
| [Feature claim verification](./docs/FEATURE_CLAIM_VERIFICATION.md) | Current vs future product boundary |
| [Product screen gallery](./docs/PRODUCT_SCREEN_GALLERY.md) | Extended visual inspection |
| [Asset manifest](./docs/ASSET_MANIFEST.md) | Public asset purpose and safety boundary |

---

## About

### Shawky Elsayed
**Software Engineer & Equity Partner — Jahiz Analytics**

[LinkedIn](https://www.linkedin.com/in/shawky-elsayed/) · [GitHub](https://github.com/shawky2002020) · [Portfolio](https://www.shawkyelsayed.com/)

---

## Commercial source notice

Jahiz Analytics is a commercial product. The production application source code, private infrastructure configuration, credentials, customer data, and operational secrets are **not** published here.

This repository is a public engineering and product case study containing sanitized screenshots, public-safe diagrams, and high-level technical documentation. See [`NOTICE.md`](./NOTICE.md), [`SECURITY.md`](./SECURITY.md), and [`docs/PRIVACY_AND_DATA_SAFETY.md`](./docs/PRIVACY_AND_DATA_SAFETY.md).
