[English](./README.md) | [العربية](./README.ar.md)

<p align="center">
  <img src="./assets/brand/jahiz-logo.png" alt="Jahiz Analytics logo" width="160" />
</p>

<h1 align="center">Jahiz Analytics — جاهز</h1>

<p align="center"><strong>From every match to measurable improvement.</strong><br />
A mobile-first karate performance platform for live match tracking, athlete development, tournament workflows, and actionable analytics.</p>

<p align="center"><img src="./assets/hero/jahiz-hero.webp" alt="Jahiz Analytics product showcase artwork with the official logo and match-to-insight workflow" width="100%" /></p>

<p align="center">Available now on <strong>Google Play</strong> and the <strong>App Store</strong>.</p>

## What is Jahiz Analytics?

Jahiz Analytics helps karate coaches and athletes turn match activity into structured, reviewable performance information. It brings live logging, athlete and player management, tournaments, and analytics into one mobile-first product.

## The problem

Coaching observations often live in memory, loose notes, or disconnected files. That makes patterns hard to compare across matches, slows down feedback, and fragments player and tournament context. During competition, recording must stay fast and focused.

## The solution

Jahiz connects **match recording → structured data → performance analytics → better training decisions**. It supports quick capture of scoring and penalties, then turns completed activity into a reviewable match record and verified analytics views.

<img src="./assets/diagrams/match-to-insight.svg" alt="Live events flow into structured match records, performance metrics, and coaching insights" width="100%" />

## Product experience

These are real installed-app captures, prepared from the product's local fictional demo fixtures. Each image was reviewed at full resolution, re-exported without EXIF/XMP/IPTC/text metadata, and annotated so the demo-only status remains unmistakable. They are not browser captures or recreated product screens.

<table>
  <tr>
    <td width="50%"><img src="./assets/screenshots/coach-home.webp" alt="Coach home screen with quick actions, overview, and recent matches" /><br /><strong>Coach command center</strong><br />Quick match logging, athlete management, and tournament entry points.</td>
    <td width="50%"><img src="./assets/screenshots/live-match-logging.webp" alt="Live karate match logging screen with timer, score controls, and attack classification" /><br /><strong>Live match logging</strong><br />Timer-aware scoring, techniques, missed points, and penalties in a focused two-sided workflow.</td>
  </tr>
  <tr>
    <td width="50%"><img src="./assets/screenshots/match-review-history.webp" alt="Match review screen with event timeline and completed score" /><br /><strong>Reviewable event history</strong><br />A structured timeline turns each recorded event into a clear post-match record.</td>
    <td width="50%"><img src="./assets/screenshots/match-performance-analytics.webp" alt="Match analytics screen with offensive defensive and performance metrics" /><br /><strong>Verified performance views</strong><br />Match-level indicators and technique breakdowns where analytics are available in the current app.</td>
  </tr>
  <tr>
    <td width="50%"><img src="./assets/screenshots/athlete-profile-management.webp" alt="Athlete profile details screen" /><br /><strong>Athlete and player profiles</strong><br />Coaches can maintain the contextual profile information used in match and team workflows.</td>
    <td width="50%"><img src="./assets/screenshots/coach-team-management.webp" alt="Coach team management screen with roster readiness and squad members" /><br /><strong>Coach team management</strong><br />Roster visibility and team-readiness context for verified coach workflows.</td>
  </tr>
  <tr>
    <td width="50%"><img src="./assets/screenshots/tournament-workflow.webp" alt="Individual tournament screen with start match action and tournament report state" /><br /><strong>Tournament workflows</strong><br />Individual tournaments and coach team-tournament paths where verified.</td>
    <td width="50%"><img src="./assets/screenshots/athlete-self-profile.webp" alt="Athlete self profile screen" /><br /><strong>Athlete experience</strong><br />Athletes can view and manage their own profile for personal matches and analytics.</td>
  </tr>
</table>

## Live match tracking

Record karate scoring and penalty events with match timer support, then review the match activity history. The product is designed for focused interaction during live competition and a clear review flow after completion.

## Performance analytics

Where verified in the current app, performance views help coaches and athletes review scoring patterns, technique distribution, activity timelines, and comparisons across recorded match activity. Analytics are presented as decision support, not as invented ratings or guarantees.

## Athletes, players, teams, and tournaments

Athletes can manage their own profile and match history; coaches can work with managed players and teams where those flows are enabled. Jahiz supports individual tournament workflows and coach team-tournament workflows where verified. This showcase deliberately does not disclose internal authorization rules.

<img src="./assets/diagrams/capability-overview.svg" alt="Jahiz connects athletes, coaches, players, matches, tournaments, and analytics" width="100%" />

## How it works

<img src="./assets/diagrams/product-workflow.svg" alt="Create a player, organize a match, record events, review the match, analyze performance, and inform training" width="100%" />

## Engineering highlights

Jahiz Analytics is a cross-platform mobile product built with a TypeScript-based stack: Angular, Ionic, Capacitor, Node.js, Express, PostgreSQL, RxJS, and chart-driven analytics presentation. Its design emphasizes structured feature boundaries, mobile-first responsive UX, consistent design tokens, and backend-controlled business rules.

See the recruiter-focused [engineering case study](./docs/ENGINEERING_CASE_STUDY.md) and the high-level [platform overview](./assets/diagrams/platform-overview.svg).

## Product principles

- Fast interaction during live matches.
- Clear match state and reviewable activity history.
- Role-aware coach and athlete product experiences.
- Accessible performance information on mobile screens.
- Privacy-conscious demo and showcase material.
- Progressive delivery of advanced analytics.

## Current status

| Area | Status |
| --- | --- |
| Mobile experience | Public release / active development |
| Live match logging | Available |
| Match review and event history | Available |
| Performance analytics | Available where verified in the current app |
| Player and athlete profiles | Available |
| Coach team management | Available where verified |
| Individual tournaments | Available |
| Team tournaments | Available for coaches where verified |
| Android release | Available on Google Play |
| iOS release | Available on the App Store |
| Google Play / App Store | Publicly available |
| Exports, AI, and video analysis | Roadmap |

## Roadmap

**Available now:** public Android and iOS releases, profile management, live logging, scoring and penalty tracking, match review, verified analytics, and verified tournament workflows.

**In progress:** cross-platform refinement and continued product improvements.

**Future direction:** PDF/report exports, AI-generated insights, video analysis, coach-athlete invitations, organization and academy accounts, federation/official organizer mode, public marketplace, advanced sharing and permissions, and full payment, subscription, and quota enforcement.

## App availability

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.jahiz.analytics"><img src="./assets/store/google-play.svg" alt="Get Jahiz Analytics on Google Play" width="180" /></a>
  &nbsp;&nbsp;
  <a href="https://apps.apple.com/us/app/jahiz-analytics/id6788289047"><img src="./assets/store/app-store.svg" alt="Download Jahiz Analytics on the App Store" width="180" /></a>
</p>

## Privacy and ownership

This repository contains demonstration-only material. No user data is stored here; the included screens use reviewed fictional fixtures only. Production source code, infrastructure, and private services remain private. Read the [privacy and data-safety note](./docs/PRIVACY_AND_DATA_SAFETY.md).

Jahiz Analytics is an independent sports-technology product developed to modernize karate performance tracking and match analysis. Featured work includes product architecture, cross-platform application engineering, mobile UI/UX, match workflows, analytics presentation, and release preparation.

## Contact

GitHub: [@shawky2002020](https://github.com/shawky2002020)

## Repository notes

This is a showcase and case-study repository, not the production application. See [NOTICE.md](./NOTICE.md) and [SECURITY.md](./SECURITY.md).
