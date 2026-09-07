# Case Study: Production Reliability & Fault Tolerance

## 1. Production Resilience Principles

When building software for live sports events, reliability cannot be an afterthought. Live sporting matches cannot be replayed due to an application crash, dropped network packet, or expired session token.

Jahiz Analytics implements defensive engineering at every system layer:

```
┌──────────────────────────────────────────────────────────────────┐
│ Client Layer: Optimistic FIFO Queue • Bounded Retries • CLS = 0  │
├──────────────────────────────────────────────────────────────────┤
│ Network Layer: Idempotency Keys (client_event_id) • Grace Window │
├──────────────────────────────────────────────────────────────────┤
│ Backend Layer: Layered Policy Guards • Token Rotation • PoolClient│
├──────────────────────────────────────────────────────────────────┤
│ Database Layer: Terminal Status Triggers • Soft Deletes • Migr.  │
├──────────────────────────────────────────────────────────────────┤
│ Release Layer: Automated Preflight • Zero-Downtime Rollback Path │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Idempotency & Network Resilience

Arena Wi-Fi is notoriously flaky. If an HTTP request recording a match event is interrupted, the mobile client must safely retry without risking duplicate point scoring.

### Mechanism:
1. Every client mutation generates a unique `client_event_id` (UUID v4) prior to dispatch.
2. The backend repository checks the composite unique constraint `(match_id, client_event_id)` inside an isolated transaction.
3. If an event with the same identifier already exists, the server short-circuits execution, commits nothing new, and returns the current canonical match state with HTTP 200 OK.

---

## 3. Cryptographic Token Rotation with Concurrency Grace

Mobile sessions must remain secure without forcing frequent disruptive re-logins during active competitions.

### The Race Condition:
On mobile app resume, multiple Angular components may trigger parallel API requests (e.g., fetching user profile, active roster, and tournament status). With standard single-use refresh tokens, the first request refreshes the token, causing all subsequent parallel requests to present a now-invalid token and force-logout the user.

### The Solution (Migration 033):
The backend implements **Refresh Token Rotation with a 30-Second Concurrency Grace Period**:
- Tokens are tracked in a relational table with parent/child family lineage.
- When a refresh token is exchanged, a new token pair is issued.
- If concurrent requests submit the same refresh token within 30 seconds of its initial rotation, the server recognizes the in-flight grace window and returns the already-issued new token pair.
- If a used token is submitted *after* the 30-second window, the system flags potential token theft and revokes the entire token family immediately.

---

## 4. Zero-Downtime Database Migration Governance

Database schema modifications must never break running application instances or disrupt active competitions.

### The Migration Safety Protocol:
1. **Preflight Classification**: Prior to deployment, `migration-classifier.ts` analyzes pending SQL files. Only additive changes (adding nullable columns, new tables, non-blocking indexes) are permitted in rolling updates.
2. **Backward Compatibility**: Code is deployed in two phases for breaking changes: expand first, migrate data, contract later.
3. **Database Trigger Protection**: Critical invariants (such as preventing event modifications on completed matches) are enforced by database triggers, making audit integrity independent of application code bugs.

---

## 5. Automated Rollback & Observability

- **Sentry Integration**: Monitored across all tiers:
  - Client errors captured via `@sentry/angular` and `@sentry/capacitor`.
  - Backend API errors captured via `@sentry/node`.
  - Releases tagged with the Git commit SHA; source maps uploaded during CI build.
- **Automated Rollback Trigger**: GitLab CI deploys containers using health and readiness probes (`/health`, `/health/ready`). If the container fails readiness within the observation threshold, the deployment script triggers an immediate, zero-downtime rollback to the previous immutable release artifact.
