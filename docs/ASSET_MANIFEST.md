# Public asset manifest

This manifest documents the public-safe asset groups used by the Jahiz Analytics showcase. It intentionally avoids brittle file-count and file-size marketing claims.

| Asset / group | Purpose | Publication boundary |
| --- | --- | --- |
| `assets/brand/` | Jahiz marks and logo variants | Public brand assets only |
| `assets/store/app-store.svg` | App Store CTA | Links to the public Jahiz listing |
| `assets/store/google-play.svg` | Google Play CTA | Links to the public Jahiz listing |
| `assets/hero/jahiz-product-engineering-showcase.webp` | Product/launch visual | Sanitized showcase composition; used as the clickable launch poster |
| `assets/hero/jahiz-hero.webp` | Supporting repository hero | Public-safe showcase composition |
| `assets/hero/github-social-preview.png` | Repository social preview | Public-safe showcase composition |
| `assets/diagrams/system-architecture.svg` | Runtime boundaries and data flow | High-level architecture only |
| `assets/diagrams/live-match-flow.svg` | Live match command/reconciliation flow | No private credentials or infrastructure endpoints |
| `assets/diagrams/match-to-analytics.svg` | Analytics processing flow | High-level worker/data flow |
| `assets/diagrams/release-pipeline.svg` | Release-safety flow | Conceptual stages; no secrets |
| `assets/screenshots/` | Product experience evidence | Sanitized/non-production data only |

## Launch video policy

The public launch video is intentionally **not duplicated as a repository-hosted video file**. The README links to the real Jahiz launch post:

https://lnkd.in/p/eqWueRtk

This avoids synthetic/recruiter cuts becoming the primary product proof and keeps the repository focused on durable product and engineering evidence.

## Safety invariant

Public assets must not contain production credentials, private infrastructure addresses, customer data, real-user PII, private source paths, or internal-only URLs. Screenshots are reviewed for public use and should use sanitized or non-production data.
