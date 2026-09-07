# Jahiz Analytics: Asset Manifest & Integrity Registry

> Complete tracking registry for all visual assets, screenshots, hero graphics, vector diagrams, and demonstration videos in the public showcase repository.

---

## 📋 Asset Inventory Manifest

| Asset Path | Type | Resolution / Format | File Size | Safe Demo Data | Optimization Method | Primary Showcase Usage |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| `assets/hero/jahiz-product-engineering-showcase.webp` | Image (Hero) | 1920 × 1080 WebP | 100 KB | Verified Fictional | PIL Composite + WebP Q88 | Showcase Hero & Readme Header |
| `assets/hero/jahiz-engineering-overview.webp` | Image (Hero) | 1920 × 1080 WebP | 94 KB | Verified Fictional | PIL Composite + WebP Q88 | Architecture Overview & Portfolio |
| `assets/hero/github-social-preview.png` | Image (Meta) | 1280 × 640 PNG | 450 KB | Verified Fictional | Lossless PNG + sRGB ICC | GitHub Repository Social Card |
| `assets/demo/jahiz-demo-full.mp4` | Video (Demo) | 1920 × 1080 MP4 | 710 KB | Verified Fictional | FFmpeg H.264 CRF26 + Web Padded | Full Product Walkthrough (59.5s) |
| `assets/demo/jahiz-demo-recruiter.mp4` | Video (Demo) | 1920 × 1080 MP4 | 923 KB | Verified Fictional | FFmpeg H.264 CRF25 + AAC 64k | Recruiter Fast Cut (28.7s) |
| `assets/demo/jahiz-demo-poster.webp` | Image (Poster) | 1920 × 1080 WebP | 79 KB | Verified Fictional | PIL Composite + WebP Q88 | Video Demo Placeholder & Poster |
| `assets/diagrams/system-architecture.svg` | Vector Diagram | SVG Vector | 14.5 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Monorepo Architecture Section |
| `assets/diagrams/live-match-flow.svg` | Vector Diagram | SVG Vector | 8.1 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Live Match State Machine Pillar |
| `assets/diagrams/live-match-lifecycle.svg` | Vector Diagram | SVG Vector | 7.2 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Match State Lifecycle & Transitions |
| `assets/diagrams/match-to-analytics.svg` | Vector Diagram | SVG Vector | 11.6 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Asynchronous Analytics Pipeline |
| `assets/diagrams/tournament-domain.svg` | Vector Diagram | SVG Vector | 9.8 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Domain Entity-Relationship Diagram |
| `assets/diagrams/release-pipeline.svg` | Vector Diagram | SVG Vector | 13.0 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Enterprise DevOps & CI/CD Pipeline |
| `assets/diagrams/engineering-snapshot.svg` | Vector Diagram | SVG Vector | 9.3 KB | N/A (Architecture) | Clean Hand-Crafted SVG | Recruiter 30-Second Glance Banner |
| `assets/screenshots/auth/*` (7 files) | Screenshot Set | 1080p WebP | 12–45 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Authentication & Onboarding Docs |
| `assets/screenshots/home/*` (3 files) | Screenshot Set | 1080p WebP | 53–82 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Coach & Athlete Dashboards |
| `assets/screenshots/athletes/*` (5 files) | Screenshot Set | 1080p WebP | 24–66 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Managed Roster & Athlete Profiles |
| `assets/screenshots/matches/*` (3 files) | Screenshot Set | 1080p WebP | 31–55 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Match History & Creation Forms |
| `assets/screenshots/live-match/*` (9 files)| Screenshot Set | 1080p WebP | 34–69 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Live Match State Engine Gallery |
| `assets/screenshots/review/*` (2 files) | Screenshot Set | 1080p WebP | 44 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Match Event Review & Timeline |
| `assets/screenshots/analytics/*` (5 files)| Screenshot Set | 1080p WebP | 39–74 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Radar & Technique Analytics |
| `assets/screenshots/teams/*` (4 files) | Screenshot Set | 1080p WebP | 26–66 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Squad Roster & Team Matches |
| `assets/screenshots/tournaments/*` (6 files)| Screenshot Set | 1080p WebP | 26–40 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Tournament Hub & Bouts |
| `assets/screenshots/reports/*` (2 files) | Screenshot Set | 1080p WebP | 27–44 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Summary & Tournament Reports |
| `assets/screenshots/settings/*` (6 files)| Screenshot Set | 1080p WebP | 22–63 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Preferences, Support & Legal |
| `assets/screenshots/localization/*` (5 files)| Screenshot Set| 1080p WebP | 49–57 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Arabic RTL Parity Evidence |
| `assets/screenshots/production-ux/*` (7 files)| Screenshot Set| 1080p WebP | 38–76 KB | Verified Fictional | FFmpeg WebP Q82 -map_metadata -1 | Responsive & Tablet UX Evidence |

---

## 🔒 Privacy & Data Sanitization Invariant

All assets listed above have undergone automated and manual sanitization:
1. **Zero Production PII**: Athlete names, coach identities, club affiliations, and match results are strictly derived from the isolated demo fixture dataset.
2. **Metadata Neutrality**: All EXIF, XMP, IPTC, device identifiers, filesystem paths, and timestamp tags have been stripped via `-map_metadata -1`.
3. **Repository Compliance**: Every asset file strictly respects the showcase repository limit of < 3 MiB.
