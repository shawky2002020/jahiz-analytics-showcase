# Engineering decisions

These records use a consistent format: **Problem → Constraint → Decision → Tradeoff → Result**. They describe public-safe engineering intent without turning implementation details into absolute guarantees.

## ADR-001 — Server-authoritative match state with optimistic client interaction

**Problem**  
Live match operators need immediate visual feedback, while the saved match must still obey server-side competition and ownership rules.

**Constraint**  
Mobile latency and retries are variable; duplicate taps/retries must not produce duplicate domain effects.

**Decision**  
Apply the action optimistically in NgRx, serialize pending match commands, attach a client event identifier, persist through the backend, then acknowledge or reconcile against canonical server state.

**Tradeoff**  
The client must model pending/rejected/revalidated state and rollback/reconciliation behavior.

**Result**  
Network round-trips are removed from the critical visual-feedback path while the backend remains authoritative.

---

## ADR-002 — PostgreSQL task claiming for analytics work

**Problem**  
Post-match aggregation can be more expensive than recording the match event that triggers it.

**Constraint**  
The system already depends on PostgreSQL, and introducing a separate broker adds another operational component.

**Decision**  
Store analytics tasks in PostgreSQL and let workers claim available rows with `FOR UPDATE SKIP LOCKED`.

**Tradeoff**  
Queue throughput shares database connections/capacity with the transactional system, and worker retry/stale-task behavior must be maintained explicitly.

**Result**  
Analytics work is decoupled from the interactive request path without adding a second queueing product.

---

## ADR-003 — Stable live-scorer layout with isolated transient feedback

**Problem**  
Network/error feedback and timer updates can move controls during rapid interaction.

**Constraint**  
The scorer must work across compact phones, larger devices, and both RTL/LTR directions.

**Decision**  
Use explicit layout regions for the scorer and render transient status/error feedback in isolated overlays instead of allowing banners to change the action surface geometry.

**Tradeoff**  
CSS/layout ownership becomes more deliberate and requires responsive regression testing.

**Result**  
Critical controls are designed to remain positionally stable across timer and connectivity state changes.

---

## ADR-004 — Server-backed mobile version policy

**Problem**  
Backend/API/schema behavior can evolve while older mobile builds remain installed.

**Constraint**  
Store review and user update timing are outside the backend deployment cycle.

**Decision**  
Evaluate client build/version against server-managed policy and return states such as supported, update available, or update required.

**Tradeoff**  
Release operations must maintain compatibility policy alongside application versions.

**Result**  
Backward-compatible changes can remain available while incompatible clients can be guided or gated intentionally.

---

## ADR-005 — Account capabilities separated from plans and usage

**Problem**  
Coach and athlete accounts represent different product capabilities; billing tiers should not redefine identity or authorization.

**Constraint**  
Pricing/quotas can change independently from domain rules and can be disabled during release phases.

**Decision**  
Resolve base capabilities from account type, plan entitlements only inside those capabilities, and usage tracking as a separate concern.

**Tradeoff**  
Policy is more explicit than scattered role checks and requires dedicated tests.

**Result**  
Commercial changes can evolve without turning an athlete plan into coach access or mixing billing logic into domain identity.

---

## ADR-006 — Refresh-token rotation with mobile concurrency handling

**Problem**  
Rotating refresh tokens improves session security, but parallel requests during app resume can race.

**Constraint**  
A strict single-use token with no concurrency handling can invalidate legitimate parallel refresh attempts.

**Decision**  
Track token lineage, store secure token representations, rotate tokens, and allow a bounded concurrency grace path for legitimate in-flight refreshes while retaining replay detection after that path.

**Tradeoff**  
Authentication becomes stateful and transaction-sensitive.

**Result**  
Mobile resume can tolerate legitimate parallel refresh behavior without giving up rotation/replay controls.

---

## ADR-007 — Soft deletion and relational constraints for historical integrity

**Problem**  
Coaches may archive players/teams while historical matches and analytics still depend on those entities.

**Constraint**  
Hard deletion can break history; ordinary uniqueness rules can also prevent recreating an active entity after archival.

**Decision**  
Use history-preserving archival/soft-delete semantics where needed and partial indexes/owner-scoped constraints for active records.

**Tradeoff**  
Repositories must consistently filter active vs archived records.

**Result**  
Historical references can remain intact while active data rules stay enforceable.

---

## ADR-008 — Layered verification instead of one test metric

**Problem**  
Live match behavior spans UI state, API policy, PostgreSQL transactions, network recovery, localization and release behavior.

**Constraint**  
A single test count or coverage percentage does not prove those failure paths.

**Decision**  
Use layered unit/state, API integration, database/concurrency, E2E/responsive/localization and release checks.

**Tradeoff**  
The verification system costs more to maintain than a narrow unit-test suite.

**Result**  
Quality evidence maps to real product risks rather than a volatile file-count badge.
