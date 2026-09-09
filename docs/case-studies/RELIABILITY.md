# Case study: reliability and recovery

## Reliability model

Jahiz reliability is built from several bounded mechanisms rather than one "never fails" guarantee:

```text
Client      optimistic state · pending commands · lifecycle revalidation
Network     idempotent event identity · bounded retries
Backend     policy guards · canonical state · explicit errors
Database    transactions · constraints · history-preserving records
Worker      claim/retry/stale-task lifecycle
Release     migration preflight · health/readiness · recovery procedures
```

## Idempotent match events

**Problem:** an interrupted request may be retried even though the first attempt reached the server.

**Decision:** client-originated mutations carry a stable event identity. Persistence checks that identity in the context of the match before applying a duplicate domain effect.

**Tradeoff:** both client and server must preserve identity semantics consistently.

**Result:** retry behavior has an explicit deduplication path instead of assuming the network delivers each command exactly once.

## Session rotation under mobile concurrency

**Problem:** several API calls can race when a mobile app resumes and needs refreshed authentication.

**Decision:** refresh tokens rotate with server-side lineage/replay state and a bounded concurrency path for legitimate parallel refreshes.

**Tradeoff:** session refresh becomes stateful and transaction-sensitive.

**Result:** the design can handle legitimate concurrent refresh activity while retaining replay detection outside the allowed concurrency path.

## Transaction and history safety

Important multi-write operations use database transactions so partial updates can be rolled back. Historical entities are archived/soft-deleted where destructive removal would break match review or analytics references.

Backend ownership/capability checks remain authoritative even when the frontend hides or disables unavailable actions.

## Schema and client compatibility

Schema changes prefer additive/backward-compatible rollout where practical. More disruptive changes require phased expand/migrate/contract handling rather than assuming every installed client updates at the same moment.

A mobile version policy provides an explicit way to distinguish supported clients from clients that should update.

## Recovery and observability

Health/readiness checks and application error monitoring provide release and runtime signals. Recovery can include redeploying or rolling back to a previously verified release artifact, but this document does not promise instantaneous or interruption-free recovery for every failure mode.

## Result

Failure paths—duplicate requests, stale sessions, partial writes, background-task failures and version mismatch—have explicit handling mechanisms that can be tested and operated.

Related: [Release engineering](../RELEASE_ENGINEERING.md) · [Testing and quality](../TESTING_AND_QUALITY.md).
