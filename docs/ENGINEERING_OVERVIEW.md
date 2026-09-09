# Engineering overview

## Product and engineering context

Jahiz Analytics is a cross-platform karate performance product for athletes and coaches. The current application centers on player management, live match logging, match review and analytics, individual tournaments, and coach-only team workflows.

The engineering problem is a combination of **interactive mobile state**, **transactional sports data**, **background analytics**, **role/ownership boundaries**, **bilingual layout**, and **mobile release compatibility**.

## Stack at a glance

| Layer | Technologies | Why it is here |
| --- | --- | --- |
| Mobile client | Angular, Ionic, Capacitor, RxJS | Cross-platform mobile delivery and device lifecycle integration |
| State | NgRx | Explicit actions/effects/selectors for long-lived match workflows |
| API | Node.js, TypeScript, Express | Domain APIs and server-authoritative policy |
| Database | PostgreSQL | Relational integrity, transactions, indexes and historical data |
| Background work | Node.js worker + PostgreSQL task coordination | Keeps heavier analytics work outside the primary HTTP path |
| Testing | Unit, integration, E2E and release checks | Covers domain behavior, state, persistence and critical journeys |
| Delivery | CI/CD + mobile store tooling | Staged server/mobile releases and compatibility checks |
| Observability | Application error monitoring + health/readiness probes | Production diagnosis and release verification |

Specific framework versions, commit totals, migration totals and test-file totals are intentionally omitted here because they change over time and are not useful recruiter-facing evidence on their own.

## Core engineering principles

### Server-authoritative state with responsive local interaction

Live scorer actions are reflected locally through NgRx so the operator receives immediate feedback. Mutations are still validated by the backend and reconciled against canonical server state. Idempotency and ordered pending actions reduce the risk of duplicate or out-of-order effects during retries.

### Stable live-match layout

Timer ticks, network state and mutation feedback should not move critical controls unexpectedly. The scorer layout therefore gives explicit ownership to stable regions and overlays transient feedback rather than letting banners restructure the action surface.

### Transactional domain rules

Important multi-step writes use explicit database transactions. Ownership and capability checks live on the backend, and historical records are preserved where later review/analytics depend on them.

### Asynchronous analytics

Analytics generation can be more expensive than recording a match event. Background workers claim queued tasks using PostgreSQL row locking so aggregation can happen independently from the match-writing request path.

### Safe product evolution

Database changes and mobile client releases do not always move together. Release preflight, additive/backward-compatible schema patterns where possible, health/readiness checks and mobile version policy help manage that gap.

## Product boundary

Exports, AI insights, video analysis, coach-athlete invitations, organization/academy accounts and commercial enforcement are not described as shipped capabilities in this showcase. See [Feature claim verification](./FEATURE_CLAIM_VERIFICATION.md).
