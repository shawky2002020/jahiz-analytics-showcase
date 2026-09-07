# System Architecture & Topology

![System Architecture](../assets/diagrams/system-architecture.svg)

## 1. High-Level Topology

The system is structured as an enterprise-grade TypeScript monorepo operating across three distinct runtime environments:

1. **Cross-Platform Mobile Client** (`client/`): Built with Angular 20, Ionic 8, and Capacitor 7, compiling to native iOS and Android packages as well as progressive web bundles.
2. **Backend Application Service** (`server/src/app.ts`): An Express HTTP REST API running Node.js 22 in native ESM mode, managing client commands, authentication, session tokens, and domain policy.
3. **Decoupled Analytics Worker** (`server/src/worker.ts`): An autonomous Node.js daemon consuming background analytical tasks from PostgreSQL using high-concurrency row-level locking.
4. **Relational Database** (PostgreSQL 17): The transactional system of record with 37 versioned schema migrations, row-level security policies, and invariant triggers.

---

## 2. Frontend Architecture (Angular 20 + NgRx 20)

```
┌──────────────────────────────────────────────────────────────────┐
│                   Angular 20 Component Layer                     │
│    (Standalone Components • OnPush Change Detection • Signals)   │
└─────────────────────────────────┬────────────────────────────────┘
                                  │ Actions
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                   NgRx 20 State Management                       │
│  ┌──────────────────────┐  ┌──────────────────────────────────┐  │
│  │ Optimistic Reducers  │  │ Memoized Selectors (Signal-based)│  │
│  └──────────┬───────────┘  └──────────────────────────────────┘  │
│             │ Effects                                            │
│             ▼                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ FIFO Command Queue (client_event_id • Bounded Retry)       │  │
│  └──────────────────────────────┬─────────────────────────────┘  │
└─────────────────────────────────┼────────────────────────────────┘
                                  │ HTTPS Requests
                                  ▼
                     Capacitor HTTP / Fetch API
```

### Standalone Component Architecture & OnPush Detection
Every component in the application is `standalone: true` without legacy `NgModule` wrappers. Views leverage Angular's `ChangeDetectionStrategy.OnPush` and signal-based inputs, preventing unnecessary render cycles during rapid timer ticks (1 Hz interval) or live score updates.

### State Flow: Optimistic Reducer → FIFO Queue → Revalidation
- **User Action**: The scorer taps a point or penalty button.
- **Optimistic Mutation**: NgRx reducers update the local scoreboard immediately.
- **Serialization**: The command is assigned a unique, idempotent `client_event_id` and queued into an in-memory FIFO pipeline.
- **Network Dispatch**: An NgRx effect executes the HTTPS call to the backend.
- **Reconciliation**: Upon `200 OK`, the command is acknowledged and removed from the queue. If an error occurs, the effect initiates bounded retries or reconciles against authoritative server state.

### Lifecycle & Route Revalidation Guard (`exhaustMap`)
A critical mobile challenge was ensuring that background-to-foreground transitions or network re-connections did not wipe active local state. The application uses a specialized `revalidateLiveMatch` effect wrapped in RxJS `exhaustMap`. Non-terminal revalidation preserves the running countdown clock, log references, and pending FIFO queue while refreshing only authentication metadata.

---

## 3. Backend Architecture (Node.js 22 + TypeScript)

The backend employs a strict **Controller → Service → Repository** layered pattern across 23 domain modules:

```
HTTP Request ──> Controller ──> Domain Policy ──> Domain Service ──> Repository ──> PostgreSQL
```

### Domain Modules (`server/src/modules/`)
- **`auth`**: Registration, credential verification, bcrypt hashing, canonical email normalization, and social auth providers (Google, Apple).
- **`account` & `account-policy`**: Enforces capability boundaries (e.g., Coach roster management vs Athlete self-profile) independently of commercial plan limits.
- **`match`**: Match lifecycle state machine, score calculation, timer PUT operations, and idempotent event persistence.
- **`analytics`**: Statistical metric generation, technique efficacy calculations, and queue job dispatching.
- **`tournament` & `encounter`**: Tournament brackets, stage progression, and team multi-bout encounters.
- **`mobile-version-policy`**: Client version enforcement inspecting incoming build numbers to enforce mandatory or graceful update policies.

### Transaction Management via `PoolClient`
All multi-stage database modifications operate within explicit ACID transactions:
```typescript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  // 1. Validate session and lock match row
  // 2. Insert event with client_event_id check
  // 3. Recalculate score and Senshu
  // 4. Update match record
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}
```

---

## 4. Database Architecture (PostgreSQL 17)

The relational schema is governed by **37 versioned SQL migrations** (`server/src/db/migrations/`).

### Invariant Protection via Database Triggers
- **Migration `001_add_match_status_trigger.sql`**: Automatically updates timestamp records on state transitions.
- **Migration `011_harden_match_event_terminal_trigger.sql`**: Introduces the `prevent_terminal_match_mutation()` trigger. Any attempt to execute `INSERT`, `UPDATE`, or `DELETE` on `match_events` for a match whose status is `COMPLETED` raises an exception at the PostgreSQL engine level.

### Performance Indexing Strategy
- **Partial Unique Indexes**: Used to enforce that managed player names are unique per coach only among active records (`deleted_at IS NULL`).
- **Composite Indexes**: Optimized for multi-tenant querying (`WHERE user_id = $1 AND deleted_at IS NULL`).
- **Canonical Email Index**: Enforces uniqueness on lowercase, trimmed email addresses.

---

## 5. Distributed Worker Engine & Concurrency Locking

```
┌──────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                    │
│      Table: analytics_tasks (Queue Status & Timings)     │
└──────────────┬────────────────────────────▲──────────────┘
               │ FOR UPDATE SKIP LOCKED     │ UPDATE COMPLETED
               ▼                            │
┌───────────────────────────────────────────┴──────────────┐
│           Node.js Background Worker (src/worker.ts)       │
│                                                          │
│  ┌───────────────────────┐   ┌────────────────────────┐  │
│  │ Concurrency Worker    │   │ Stale Lease Reaper     │  │
│  │ (10s Polling Loop)    │   │ (> 5m stuck recovery)  │  │
│  └───────────┬───────────┘   └────────────────────────┘  │
│              ▼                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │ MatchAnalyticsService Calculation Engine           │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

To scale analytics processing horizontally across multiple processes without duplicate execution or distributed lock managers (e.g. Redis Redlock), the worker uses PostgreSQL's native row-level lock skipping:

```sql
UPDATE analytics_tasks
SET status = 'PROCESSING', updated_at = CURRENT_TIMESTAMP
WHERE task_id = (
  SELECT task_id
  FROM analytics_tasks
  WHERE status = 'PENDING'
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED
)
RETURNING task_id, match_id, attempts;
```

- **Row Locking**: `FOR UPDATE` locks the task record within the transaction.
- **Zero Wait**: `SKIP LOCKED` tells other concurrent worker instances to immediately bypass the locked row and claim the next available job.
- **Crash Recovery**: A stale lease reaper runs periodically, resetting tasks stuck in `PROCESSING` for longer than 5 minutes back to `PENDING` if attempts < 5, or marking them `FAILED` for Sentry triage.
