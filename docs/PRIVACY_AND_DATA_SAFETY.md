# Privacy, Data Safety & Showcase Boundaries

## The Non-Negotiable Showcase Boundary

**Jahiz Analytics** is a live commercial production application. The actual application source code, infrastructure configurations, and production database remain strictly **PRIVATE**.

This showcase repository is public and is engineered specifically as a **technical case study** to demonstrate system architecture, engineering rigor, and problem-solving methodology without exposing proprietary implementation code or sensitive credentials.

---

## What is Strictly Redacted & Private

The following assets, credentials, and details are strictly protected and will never appear in public showcase material:
- **Proprietary Source Code**: Private controllers, services, repositories, and UI template code.
- **Secrets & Credentials**: Private keys, JWT secrets, database connection strings, Sentry DSNs, Apple/Google signing certificates, and API tokens.
- **Production User Data**: Real athlete names, coach identities, emails, phone numbers, club affiliations, match scores, or private user IDs.
- **Internal Infrastructure**: DigitalOcean droplet IPs, internal domain names, firewall rules, and container orchestration secrets.

---

## Sanitized Fictional Demo Datasets

All screenshots, videos, and narrative examples displayed in this showcase originate from an isolated, purpose-built demo fixture environment (`src/scripts/mobile-demo.ts`):

- **Fictional Athletes**: Consistent synthetic profiles (e.g. *Zayn*, *Nour*) created solely for demonstration.
- **Synthetic Competitions**: Fictional tournaments (e.g. *Cairo Series*, *Alexandria Cup*) and team encounters (*Nile Team Challenge*).
- **Metadata Scrubbing**: All exported screenshots undergo automated metadata stripping, removing EXIF, XMP, IPTC, and location headers.

---

## Automated Verification

This showcase repository enforces its own automated security and quality gate (`scripts/check-docs.mjs`):
- Scans every text file for regex patterns matching private keys, API secrets, and connection strings.
- Validates that all asset sizes remain within reasonable bounds (< 3 MiB).
- Validates all internal documentation and media links to prevent broken references.
