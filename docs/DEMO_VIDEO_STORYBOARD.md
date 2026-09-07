# Jahiz Analytics: Demo Video Storyboard & Script

> Production video direction, scene breakdown, and motion timing for the Jahiz Analytics native mobile application demonstration.
> Covers both the **Full Product Walkthrough** (59.4s) and the **Recruiter Showcase** (28.7s).

---

## 🎯 Executive Video Objectives

Within **60 to 90 seconds**, a technical recruiter, engineering leader, or architect reviewing the video must clearly recognize:
1. **Commercial Mobile Polish**: Flawless native touch responsiveness, consistent HSL design system, and zero UI stutter on real mobile hardware.
2. **Sub-Millisecond State Machine**: High-speed live match scoring (Yuko, Waza-ari, Ippon), timer synchronization, and instant rollback.
3. **Structured Domain Persistence**: Live events instantly translate into a chronological review timeline and multi-dimensional analytics.
4. **Architectural Depth**: Coach squad management, athlete self-service profiles, and multi-round tournament brackets.

---

## 🎬 Scene-by-Scene Storyboard (Full Product Walkthrough)

| Scene # | Timecode | Visual Screen / Sequence | On-Screen Caption | Action & Interaction Description | Core Engineering Takeaway |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **01** | `00:00 - 00:03` | Product Intro & Badge Overlay | `Production Karate Performance Platform` | Clean app launch on mobile hardware; official brand mark and store availability badges fade in. | Cross-platform Capacitor 7 mobile app shipped on iOS & Android. |
| **02** | `00:03 - 00:08` | Coach Command Center (`HomePage`) | `Coach Command Center` | Coach Omar Hassan scrolls through active squad cards, quick-start match actions, and upcoming tournament schedule. | High-performance Angular 20 Standalone components with zero layout shift. |
| **03** | `00:08 - 00:14` | Managed Athlete Roster & Profile | `Athlete Profile & Roster Context` | Tapping into athlete Youssef Adel (-75kg). Displays bio, historical medal tally, and technical attributes. | Normalized PostgreSQL relational models with strict role-based access. |
| **04** | `00:14 - 00:20` | Match List & Creation Setup | `Individual & Team Match Workflows` | Browsing recent match history. Quick tap into match creation; opponent Karim Mostafa pre-selected; weight category confirmed. | Pre-validated form states and route guards ensuring data integrity. |
| **05** | `00:20 - 00:36` | Live Match Scorer (Aka vs. Ao) | `Sub-Second Live Match State Machine` | Match timer starts ticking at 03:00. Fast tap records Yuko (+1 Aka). Senshu awarded. Opponent penalty logged. Technique modal opens (Kizami-Zuki). Undo tap demonstrates instant local rollback. | In-memory FIFO optimistic mutation queue with sub-millisecond local dispatch and zero CLS. |
| **06** | `00:36 - 00:40` | Match Completion & Winner State | `Deterministic Match Finalization` | Final buzzer sounds. Score 3–1 Aka. Decisive victory confirmed with Senshu indicator active. | State machine locks event mutations and transitions to finalized snapshot. |
| **07** | `00:40 - 00:46` | Chronological Match Review | `Structured Event Timeline` | Post-match review timeline displays every point, penalty, and warning in exact second-by-second order. | Immutable event-sourcing persistence model stored in PostgreSQL. |
| **08** | `00:46 - 00:54` | Performance Analytics | `Technique & Radar Analytics` | Smooth scroll through offensive/defensive radar charts, scoring technique distribution, and foul severity analysis. | Asynchronous PostgreSQL worker queue (`SKIP LOCKED`) generating materialized analytics cache. |
| **09** | `00:54 - 00:57` | Tournament & Team Hub | `Tournament Brackets & Team Encounters` | Quick pan through tournament bracket progress and team roster readiness overview. | Complex multi-entity domain management spanning athletes, bouts, and tournaments. |
| **10** | `00:57 - 01:00` | Closing Hero & Callout | `Available on App Store & Google Play` | Clean closing card displaying repository links, tech badges, and sole architect profile for Shawky Elsayed. | 735+ git commits, 390 test files, 37 SQL migrations. |

---

## ⚡ Recruiter Fast Cut Breakdown (28.7s Version)

For high-throughput review on LinkedIn, GitHub, and portfolios:
- **00:00 - 04:50**: *"Your athletes. One clear view."* — Coach Command Center & Squad Overview.
- **04:50 - 09:00**: *"Manage every athlete."* — Athlete Roster & Weight Category Readiness.
- **09:00 - 14:50**: *"Every match becomes measurable."* — Match Setup & Live Scorer Interaction.
- **14:50 - 21:00**: *"See what changed the fight."* — Chronological Event Review & Decision Timeline.
- **21:00 - 27:00**: *"Coach with evidence."* — Multi-Dimensional Radar Analytics.
- **27:00 - 28:69**: *Official Jahiz Analytics Wordmark & App Store Badges*.

---

## 🎥 Production & Video Specifications

- **Containers**: MP4 (MPEG-4 Part 14)
- **Video Codec**: H.264 / AVC (High Profile, Level 4.0, YUV 4:2:0)
- **Audio Codec**: AAC-LC (64 kbps, 44.1 kHz, stereo)
- **Resolution**: 1920 × 1080 (16:9 Full HD Landscape)
- **Full Demo File**: `assets/demo/jahiz-demo-full.mp4` (726 KB, 59.5s)
- **Recruiter Demo File**: `assets/demo/jahiz-demo-recruiter.mp4` (944 KB, 28.7s)
- **Poster Artwork**: `assets/demo/jahiz-demo-poster.webp` (80 KB, 1920x1080)
