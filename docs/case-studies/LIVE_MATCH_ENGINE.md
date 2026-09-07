# Case Study: The Real-Time Live Match State Engine

![Live Match Flow](../../assets/diagrams/live-match-flow.svg)

## 1. Problem & Context

In Olympic and WKF karate, matches are characterized by lightning-fast exchanges. An athlete executes a blitz attack, scores a technique, and the referee halts the action within seconds. 

The match operator must:
- Record points (Yuko: 1 pt, Waza-ari: 2 pts, Ippon: 3 pts) for either the red (AKA) or blue (AO) athlete.
- Track cumulative penalties (Category 1 & Category 2 infractions, Chui, Hansoku-Chake).
- Record and manage Senshu (first undisputed point advantage, which determines tie-breakers).
- Control the 1 Hz countdown match clock (start, pause, adjust seconds).
- Recover from accidental operator mis-taps via instant **Undo**.
- Operate reliably in crowded sports arenas with unstable Wi-Fi and cellular connections.

A standard client-server request/response model fails completely here: a 300 ms network lag causes operator hesitation, duplicate button taps, and desynchronized timing.

---

## 2. Engineering Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                   Live Match Operator Action                     │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                    NgRx Optimistic Reducer                       │
│    Score / Penalties / Senshu updated locally (0 ms latency)     │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                    In-Memory FIFO Command Queue                  │
│    Assigned client_event_id • Ordered command serialization      │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼ (Background HTTPS POST /event)
┌──────────────────────────────────────────────────────────────────┐
│                    Node.js Backend Validation                    │
│    Idempotency verification • Terminal status check              │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                   PostgreSQL ACID Transaction                    │
│    Trigger check • Append match_events • Update match totals     │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼ (HTTP 200 OK + Canonical State)
┌──────────────────────────────────────────────────────────────────┐
│                    Client UI Reconciliation                      │
│    Flush FIFO command • Reconcile against authoritative truth    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Key Engineering Challenges & Solutions

### A. Zero Cumulative Layout Shift (CLS) on Live Controls
- **Symptom**: Earlier versions had dynamic error banners that shifted the footer controls down by 25–62 px whenever network connectivity dropped or an error occurred. During rapid scoring, this caused operators to mis-tap buttons.
- **Root Cause**: Status components participated in implicit grid tracks, stealing height from the action container.
- **Resolution**: Rebuilt the scorer using explicit CSS Grid row allocations. Connection feedback and mutation errors now share the action container in a dedicated overlay layer that occupies zero layout height when idle. Controls maintain 100% stable pixel geometry across all states.
- **Result**: Clock ticks layout recalculations dropped from **146 to 2 per 2 seconds**; control movement reduced to **0 px**.

### B. Route-Aware Lifecycle Revalidation Guard (`revalidateLiveMatch`)
- **Symptom**: When a user switched to another app and returned to Jahiz, or when the phone recovered cellular signal, standard hydration dispatched full match initialization, resetting the active clock countdown and discarding unacknowledged queued commands.
- **Resolution**: Created a dedicated `revalidateLiveMatch` NgRx effect utilizing RxJS `exhaustMap`. Non-terminal revalidation preserves the exact running clock instance, log references, and pending commands while refreshing authentication credentials. Stale route responses are discarded.

### C. Idempotency & Duplicate Replay Protection
- **Symptom**: Spotty arena network causes client HTTP retries, risking duplicate point recording.
- **Resolution**: Every client action generates a UUID `client_event_id`. The database enforces uniqueness on `(match_id, client_event_id)`. If a retransmitted command arrives, the backend detects the existing event and returns the current authoritative state without re-applying score mutations.

### D. Destructive Action Recovery (Undo Pipeline)
- **Design**: Live sports require instant recovery from operator mistakes. Jahiz implements single-action Undo via `DELETE /event/:eventId`.
- **Execution**: The server executes the deletion inside an ACID transaction, recalculates score and Senshu totals from the remaining historical event stream, updates the match summary, and returns the recomputed canonical state. The client updates its NgRx store reactively.
- **Note on Redo**: The system explicitly avoids fabricating Redo semantics, as live sports timelines move forward in real time; an undone mistake cannot be re-applied after subsequent match action occurs.

### E. PostgreSQL Terminal State Trigger Enforcement
- **Design**: Once a match concludes, its event log must become immutable.
- **Implementation**: Migration `011_harden_match_event_terminal_trigger.sql` installs the `prevent_terminal_match_mutation()` trigger. If a client attempts to append, modify, or delete an event on a match with status `COMPLETED`, the database raises an exception immediately.
