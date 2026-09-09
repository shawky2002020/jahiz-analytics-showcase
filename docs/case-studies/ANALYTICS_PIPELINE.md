# Case study: asynchronous analytics pipeline

![Analytics pipeline](../../assets/diagrams/match-to-analytics.svg)

## Problem

A completed match can feed several derived analytics views. Calculating all aggregates synchronously inside a match-finalization request would couple interactive API latency to analytical work.

## Constraints

- raw match state and derived analytics must remain traceable;
- more than one worker may process available jobs;
- retrying a failed job should not create inconsistent duplicate results;
- adding a separate message broker would increase operational surface area.

## Decision

Persist analytics work as task rows and process it in a separate worker lifecycle.

```text
domain change
   │
   ▼
analytics task
   │
   ▼
worker claim
FOR UPDATE SKIP LOCKED
   │
   ▼
calculation
   │
   ▼
persist derived state
   │
   ▼
client reads through API
```

### PostgreSQL task claiming

Workers claim one available task inside a transaction using PostgreSQL row locking. `SKIP LOCKED` allows another worker to move to another available row rather than waiting on the same task.

This **reduces duplicate claiming by cooperating workers**; it is not a claim that all race conditions or lock contention disappear. Correctness still depends on transaction boundaries, task identity, retry rules and idempotent persistence.

### Retry and stale-task handling

A task records lifecycle/attempt information so a crashed or failed worker does not leave work permanently invisible. Retry ceilings and stale-task recovery keep failure behavior bounded and observable.

### Client consumption

The client treats analytics as derived state that may become ready after the match workflow. It can poll/retry in a bounded way and show a fallback/retry state if generation does not complete successfully.

## Tradeoffs

- PostgreSQL carries both transactional workload and task coordination;
- task/retry state adds schema and operational logic;
- polling is simpler than persistent realtime transport for short-lived work, but it produces repeated reads while work is pending.

## Result

Analytics generation is separated from the primary match-writing path and can be retried/observed as independent work.

Related: [Architecture](../ARCHITECTURE.md) · [Reliability](./RELIABILITY.md).
