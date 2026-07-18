# Public asset audit

| File/group | Purpose | Source | Sanitization / review | Publication state |
| --- | --- | --- | --- | --- |
| `assets/brand/*.png` | Official Jahiz logo variants | Approved application brand assets | Re-exported as optimized PNG; textual metadata stripped; no embedded paths, URLs, or comments found | Ready |
| `assets/brand/*.svg` | Accessible SVG wrappers for logo variants | Showcase-created | Contains only title metadata and local image reference | Ready |
| `assets/diagrams/*.svg` | Product explanations | Showcase-created | No private service, route, account, or infrastructure data | Ready |
| `assets/hero/jahiz-hero.webp` | README hero | Showcase-created composition | Uses only sanitized logo and abstract diagrammatic shapes | Ready |
| `assets/hero/github-social-preview.png` | GitHub social preview | Showcase-created composition | Uses only sanitized logo and abstract diagrammatic shapes | Ready |
| `assets/screenshots/*.webp` | Real product screens | Owner-provided installed-app capture library | Eight screens were traced to local fictional demo fixtures, visually reviewed at 1080 × 1920, metadata-checked, re-exported with no EXIF/XMP/IPTC/text metadata, and labeled as fictional demo data | Ready |

Original private source locations and any capture-session identifiers are intentionally omitted from this public audit.
