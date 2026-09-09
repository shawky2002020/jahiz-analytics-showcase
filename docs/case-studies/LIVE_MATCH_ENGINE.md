# Case study: live match state engine

![Live match flow](../../assets/diagrams/live-match-flow.svg)

## Problem

A karate match operator records score changes, penalties, match state and timer-related actions while attention remains on the bout. Waiting for every request to complete before updating the screen makes the interface feel disconnected from the operator's action; blindly trusting local state risks divergence from server rules.

## Constraints

- mobile connectivity can be intermittent;
- retries and accidental double taps are possible;
- score/penalty state has ordering semantics;
- the app can background and resume during an active match;
- critical controls should remain stable while timer/network state changes;
- the backend must remain the source of truth.

## Decision

### Optimistic local state

NgRx updates the visible match state immediately for eligible operator actions. The command is also represented as pending work rather than being treated as final truth.

```text
tap
 │
 ▼
optimistic reducer
 │
 ▼
ordered pending command
 │
 ▼
API validation + transaction
 │
 ├── accepted → acknowledge/reconcile
 └── rejected → rollback/revalidate
```

### Ordered, idempotent commands

Client-originated match events carry an event identity used by backend persistence to recognize retries. Pending actions are serialized so later actions are not silently committed ahead of earlier dependent state.

### Lifecycle-aware revalidation

Foreground/resume and network-recovery paths revalidate active match state instead of performing a destructive full initialization. This lets the client refresh authoritative data while preserving the local match context that still needs reconciliation.

### Undo as a domain operation

Undo is handled through the server, not by simply decrementing a client number. The backend removes/reverses the eligible event within domain rules, recomputes affected canonical match state, and returns the result to the client.

### Stable interaction geometry

Timer updates and transient connection/error messages are isolated from the primary action layout. The goal is that temporary feedback does not push frequently tapped controls into new positions.

## Tradeoffs

- optimistic UX requires more client state than request/response CRUD;
- idempotency requires stable command identity and database constraints/logic;
- reconciliation paths need dedicated regression tests;
- server-side Undo can cost more work than a local inverse action, but preserves domain correctness.

## Result

The operator receives immediate local feedback while accepted match state remains server-authoritative. Retries, lifecycle transitions and correction flows have explicit recovery semantics instead of relying on accidental UI state.

Related: [Reliability](./RELIABILITY.md) · [Architecture](../ARCHITECTURE.md).
