# Jahiz Analytics: Application View & Screen Inventory

> Comprehensive view matrix, routing registry, and state catalog for the Jahiz Analytics mobile and web application.
> Generated from source inspection of `client/src/app/app.routes.ts`, `tabs.routes.ts`, and feature modules.

---

## 📊 Inventory Summary

- **Total Distinct View States**: 64
- **Core Production Roles**: Coach, Athlete, Internal Administrator
- **Device Support**: Mobile (iOS / Android portrait baseline: 390x844 / 412x915), Tablet (iPad 2048x2732), Responsive Web (320px–1024px)
- **Localization Parity**: English (LTR) & Arabic (RTL) with dedicated Eastern Arabic numeral transformations
- **Capture Coverage**: 100% of user-facing production views and states

---

## 📱 Application View Matrix

| ID | Functional Area | Screen / View Component | Role | State & Variant | Capture Required | Captured | Showcase Asset Location |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **AUTH-01** | Authentication | `WelcomeExperienceComponent` | All | Default / Language Selector | Yes | Yes | `assets/screenshots/auth/auth-welcome-en.webp` |
| **AUTH-02** | Authentication | `WelcomeExperienceComponent` | All | Arabic RTL Selection | Yes | Yes | `assets/screenshots/auth/auth-welcome-ar.webp` |
| **AUTH-03** | Authentication | `AuthLandingComponent` | All | Landing with Direct Actions | Yes | Yes | `assets/screenshots/auth/auth-landing-en.webp` |
| **AUTH-04** | Authentication | `AuthEntryComponent` (Sign In) | All | Empty Input / Keyboard Ready | Yes | Yes | `assets/screenshots/auth/sign-in-en.webp` |
| **AUTH-05** | Authentication | `AuthEntryComponent` (Sign In) | All | Populated / Settled Form | Yes | Yes | `assets/screenshots/auth/sign-in-settled.webp` |
| **AUTH-06** | Authentication | `AuthEntryComponent` (Sign Up) | All | Role Selection (Coach/Athlete)| Yes | Yes | `assets/screenshots/auth/register-role-selection.webp` |
| **AUTH-07** | Authentication | `ForgotPasswordComponent` | All | Password Reset Request | Yes | Yes | `assets/screenshots/auth/forgot-password.webp` |
| **HOME-C-01** | Home / Dashboard | `HomePage` (Coach) | Coach | Populated Dashboard (English) | Yes | Yes | `assets/screenshots/home/coach-home-en.webp` |
| **HOME-C-02** | Home / Dashboard | `HomePage` (Coach) | Coach | Populated Dashboard (Arabic) | Yes | Yes | `assets/screenshots/home/coach-home-ar.webp` |
| **HOME-C-03** | Home / Dashboard | `HomePage` (Coach) | Coach | Tablet View (iPad Pro 13") | Yes | Yes | `assets/screenshots/production-ux/tablet-coach-home.webp` |
| **HOME-A-01** | Home / Dashboard | `HomePage` (Athlete) | Athlete | Populated Activity Feed | Yes | Yes | `assets/screenshots/home/athlete-home-en.webp` |
| **HOME-A-02** | Home / Dashboard | `HomePage` (Athlete) | Athlete | Tablet View (iPad Pro 13") | Yes | Yes | `assets/screenshots/production-ux/tablet-athlete-home.webp` |
| **ATH-01** | Athlete Management | `AthletesListComponent` | Coach | Populated Managed Roster | Yes | Yes | `assets/screenshots/athletes/athlete-list-populated.webp` |
| **ATH-02** | Athlete Management | `AthleteFormComponent` | Coach | Add Athlete Form (Android) | Yes | Yes | `assets/screenshots/athletes/athlete-create-form.webp` |
| **ATH-03** | Athlete Management | `AthleteDetailsComponent` | Coach | Detail View (Stats & Bio) | Yes | Yes | `assets/screenshots/athletes/athlete-profile-coach.webp` |
| **ATH-04** | Athlete Management | `AthleteSelfProfileComponent` | Athlete | Athlete Self Profile (Owned) | Yes | Yes | `assets/screenshots/athletes/athlete-self-profile.webp` |
| **ATH-05** | Athlete Management | `AthleteFormComponent` | Athlete | Edit Self Profile Mode | Yes | Yes | `assets/screenshots/athletes/athlete-edit-profile.webp` |
| **TEAM-01** | Team Management | `TeamsListComponent` | Coach | Populated Teams List | Yes | Yes | `assets/screenshots/teams/team-list-populated.webp` |
| **TEAM-02** | Team Management | `TeamCreateComponent` | Coach | Create Squad Form | Yes | Yes | `assets/screenshots/teams/team-create-form.webp` |
| **TEAM-03** | Team Management | `TeamDetailsComponent` | Coach | Team Roster & Readiness | Yes | Yes | `assets/screenshots/teams/team-roster-management.webp` |
| **TEAM-04** | Team Management | `TeamDetailsComponent` | Coach | Team Match History Tab | Yes | Yes | `assets/screenshots/teams/team-match-entry.webp` |
| **MATCH-01** | Match History | `MatchListComponent` | All | Populated Individual Matches | Yes | Yes | `assets/screenshots/matches/match-list-populated.webp` |
| **MATCH-02** | Match Creation | `NewMatchComponent` | Coach | Athlete & Opponent Setup | Yes | Yes | `assets/screenshots/matches/match-create-setup.webp` |
| **MATCH-03** | Match Overview | `MatchOverviewPageComponent` | Coach | Encounter Match Details | Yes | Yes | `assets/screenshots/matches/match-overview-encounter.webp` |
| **LIVE-01** | Live Match Scorer | `LiveScorerComponent` | All | Initial Ready State (0–0) | Yes | Yes | `assets/screenshots/live-match/live-match-ready-0-0.webp` |
| **LIVE-02** | Live Match Scorer | `LiveScorerComponent` | All | Active Timer Running State | Yes | Yes | `assets/screenshots/live-match/live-match-running-timer.webp` |
| **LIVE-03** | Live Match Scorer | `LiveScorerComponent` | All | Scoring Action: Yuko (+1 Aka) | Yes | Yes | `assets/screenshots/live-match/live-match-scoring-yuko.webp` |
| **LIVE-04** | Live Match Scorer | `LiveScorerComponent` | All | Scoring Action: Waza-ari (+2) | Yes | Yes | `assets/screenshots/live-match/live-match-scoring-waza-ari.webp` |
| **LIVE-05** | Live Match Scorer | `LiveScorerComponent` | All | Technique Picker Modal | Yes | Yes | `assets/screenshots/live-match/live-match-technique-picker.webp` |
| **LIVE-06** | Live Match Scorer | `LiveScorerComponent` | All | Penalties State (C1/C2 Warnings)| Yes | Yes | `assets/screenshots/live-match/live-match-penalties-c1-c2.webp` |
| **LIVE-07** | Live Match Scorer | `LiveScorerComponent` | All | Undo Action Feedback State | Yes | Yes | `assets/screenshots/live-match/live-match-undo-action.webp` |
| **LIVE-08** | Live Match Scorer | `LiveScorerComponent` | All | End-of-Match Final State | Yes | Yes | `assets/screenshots/live-match/live-match-final-complete.webp` |
| **LIVE-09** | Live Match Scorer | `LiveScorerComponent` | All | End Confirmation Dialog | Yes | Yes | `assets/screenshots/live-match/live-match-confirmation.webp` |
| **REV-01** | Match Review | `MatchReviewSummaryComponent` | All | Final Score & Winner Card | Yes | Yes | `assets/screenshots/review/match-review-summary.webp` |
| **REV-02** | Match Review | `MatchReviewComponent` | All | Chronological Event Timeline | Yes | Yes | `assets/screenshots/review/match-review-timeline-events.webp` |
| **ANL-01** | Match Analytics | `MatchAnalyticsComponent` | All | Radar Chart: Offense vs Defense | Yes | Yes | `assets/screenshots/analytics/match-analytics-overview.webp` |
| **ANL-02** | Match Analytics | `MatchAnalyticsComponent` | All | Technique Effectiveness Breakdown| Yes | Yes | `assets/screenshots/analytics/match-technique-radar.webp` |
| **ANL-03** | Match Analytics | `MatchAnalyticsComponent` | All | Scoring & Point Distribution | Yes | Yes | `assets/screenshots/analytics/scoring-distribution-chart.webp` |
| **ANL-04** | Match Analytics | `MatchAnalyticsComponent` | All | Activity Timeline Chart | Yes | Yes | `assets/screenshots/analytics/match-activity-timeline.webp` |
| **ANL-05** | Athlete Analytics | `MatchAnalyticsComponent` | Athlete | Historical Career Analytics | Yes | Yes | `assets/screenshots/analytics/athlete-analytics-history.webp` |
| **TOURN-01** | Tournaments | `TournamentListComponent` | Coach | Populated Tournament Roster | Yes | Yes | `assets/screenshots/tournaments/tournament-list-populated.webp` |
| **TOURN-02** | Tournaments | `NewTournamentComponent` | Coach | Tournament Creation Form | Yes | Yes | `assets/screenshots/tournaments/tournament-create-form.webp` |
| **TOURN-03** | Tournaments | `TournamentHubComponent` | Coach | Individual Tournament Hub | Yes | Yes | `assets/screenshots/tournaments/tournament-hub-individual.webp` |
| **TOURN-04** | Tournaments | `TournamentHubComponent` | Coach | Team Tournament Hub | Yes | Yes | `assets/screenshots/tournaments/tournament-team-hub.webp` |
| **TOURN-05** | Tournaments | `TournamentIndividualMatchComponent`| Coach | Quick Tournament Match Launch | Yes | Yes | `assets/screenshots/tournaments/tournament-quick-match.webp` |
| **TOURN-06** | Tournaments | `TournamentTeamMatchComponent` | Coach | Team Encounter Setup | Yes | Yes | `assets/screenshots/tournaments/tournament-team-match.webp` |
| **REP-01** | Reports & Export | `MatchReviewSummaryComponent` | All | Clean Match Summary Report View | Yes | Yes | `assets/screenshots/reports/match-summary-report.webp` |
| **REP-02** | Reports & Export | `TournamentHubComponent` | Coach | Tournament Report Ready State | Yes | Yes | `assets/screenshots/reports/tournament-report-ready.webp` |
| **SET-01** | Settings | `SettingsComponent` | All | Main Settings List (English) | Yes | Yes | `assets/screenshots/settings/settings-en.webp` |
| **SET-02** | Settings | `SettingsComponent` | All | Main Settings List (Arabic RTL)| Yes | Yes | `assets/screenshots/settings/settings-ar.webp` |
| **SET-03** | Settings / Account | `AccountProfileComponent` | All | User Account Profile Details | Yes | Yes | `assets/screenshots/settings/account-profile.webp` |
| **SET-04** | Settings | `SettingsComponent` | All | Language Selection Sheet | Yes | Yes | `assets/screenshots/settings/language-switch.webp` |
| **SET-05** | Settings / Support | `ReportBugComponent` | All | In-App Bug & Feedback Form | Yes | Yes | `assets/screenshots/settings/report-bug-form.webp` |
| **SET-06** | Settings / Legal | `LegalCenterComponent` | All | Legal Center & Compliance Docs | Yes | Yes | `assets/screenshots/settings/legal-center.webp` |
| **RTL-01** | Localization RTL | `HomePage` | Coach | Arabic Command Center | Yes | Yes | `assets/screenshots/localization/rtl-coach-home.webp` |
| **RTL-02** | Localization RTL | `LiveScorerComponent` | All | Arabic Live Match Scorer (0-0)| Yes | Yes | `assets/screenshots/localization/rtl-live-match-scorer.webp` |
| **RTL-03** | Localization RTL | `LiveScorerComponent` | All | Arabic Penalties (C1/C2) | Yes | Yes | `assets/screenshots/localization/rtl-live-match-penalties.webp` |
| **RTL-04** | Localization RTL | `LiveScorerComponent` | All | Arabic Undo Toast & Action Queue| Yes | Yes | `assets/screenshots/localization/rtl-live-match-undo.webp` |
| **RTL-05** | Localization RTL | `SettingsComponent` | All | Arabic Settings & Version Info | Yes | Yes | `assets/screenshots/localization/rtl-settings.webp` |
| **UX-01** | Production UX | `LiveScorerComponent` | All | Ultra-Compact 320px Responsive | Yes | Yes | `assets/screenshots/production-ux/responsive-320px.webp` |
| **UX-02** | Production UX | `LiveScorerComponent` | All | Medium 360px x 780px Screen | Yes | Yes | `assets/screenshots/production-ux/responsive-360px.webp` |
| **UX-03** | Production UX | `LiveScorerComponent` | All | Large 412px Flagship Screen | Yes | Yes | `assets/screenshots/production-ux/responsive-412px.webp` |
| **UX-04** | Production UX | `LiveScorerComponent` | All | Offline / Rejection Resilience | Yes | Yes | `assets/screenshots/production-ux/offline-network-resilience.webp` |
| **UX-05** | Production UX | `HomePage` | Coach | iPad Pro 13" Full Resolution | Yes | Yes | `assets/screenshots/production-ux/tablet-ipad-large.webp` |

---

## 🧭 Technical Verification Note

All view states above represent verified production components compiled directly from the Angular 20 Standalone codebase. No placeholder or mock designs are used; all captures originate from installed Capacitor application sessions and native device recordings with fictional demo data (**Coach: Omar Hassan**, **Primary Athlete: Youssef Adel**).
