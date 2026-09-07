# Release Engineering & CI/CD

![Release Pipeline](../assets/diagrams/release-pipeline.svg)

## Release Governance & Principles

Jahiz Analytics follows a rigorous continuous delivery model. Production deployments must be:
1. **Fully Automated**: Zero manual server interventions or SSH hot-patching.
2. **Zero-Downtime**: Rolling container updates ensure active live matches never drop connection.
3. **Migration-Safe**: Database migrations are classified and verified before deployment.
4. **Instantly Recoverable**: If post-deployment health checks fail, the system automatically triggers an immediate rollback to the previous immutable release artifact.

---

## GitLab CI/CD Production Pipeline

Canonical production releases are orchestrated through a **6-stage GitLab CI/CD pipeline** (`.gitlab-ci.yml`):

### Stage 1: `validate` (Test & Quality Gate)
- Spins up an ephemeral, containerized PostgreSQL 17 service container.
- Bootstraps the clean schema snapshot (`server/backups/jahiz_schema_clean.sql`).
- Executes incremental database migrations from baseline to verify migration reproducibility.
- Runs the complete test suite:
  - 390 test files across client and server.
  - Server release preflight tests (`migration-classifier.test.mjs`, `preflight.test.mjs`, `render-rollback-spec.test.mjs`).
  - Strict localization checks (`i18n:check`).
  - Scoped secret line scans.

### Stage 2: `build` (Immutable Container Image)
- Compiles the shared TypeScript workspace and Angular production client.
- Builds the multi-stage production Docker image using `Dockerfile.server`.
- Enforces non-root container security (runs under user `nodejs`).
- Tags the image immutably with the Git commit SHA and pushes to **DigitalOcean Container Registry (DOCR)**.

### Stage 3: `deploy_staging`
- Deploys the newly built image to the staging environment.
- Executes database migrations against the staging database with schema SHA validation.
- Updates the staging web release using atomic symlink directory swapping (`ln -sfn`).

### Stage 4: `verify_staging`
- Executes automated HTTP health and readiness probes:
  - `GET /health` (HTTP 200, basic process responsiveness).
  - `GET /health/ready` (HTTP 200, database pool connectivity).
  - `GET :8081/health` (HTTP 200, background worker daemon responsiveness).
- Runs automated smoke tests against staging endpoints.

### Stage 5: `production_preflight`
- **Migration Classification**: Runs `migration-classifier.ts` to verify whether pending migrations are additive (backward-compatible) or require phased rollout.
- **Rollback Spec Generation**: Renders the exact rollback configuration spec required to revert the release if needed.
- **Dry-Run Validation**: Validates database schema state against production without applying mutations.

### Stage 6: `deploy_production`
- Triggers zero-downtime rolling container replacement on DigitalOcean App Platform.
- Uploads compiled source maps to **Sentry** and creates a release tracking entry keyed to the Git commit SHA.
- **Automated Rollback Path**: If health probes fail within the observation window, the pipeline automatically executes `rollback-production.yml` to revert the container tag to the last verified stable release.

---

## Mobile Release Engineering (iOS & Android)

Jahiz Analytics maintains automated, verified release pipelines for both native platforms:

### Version Consistency Enforcement
The script `scripts/verify-mobile-release.mjs` enforces that versions match across all manifests before any build begins:
- `client/package.json` (`version`)
- `client/android/app/build.gradle` (`versionName` and integer `versionCode`)
- `client/ios/App/App.xcodeproj/project.pbxproj` (`MARKETING_VERSION` and integer `CURRENT_PROJECT_VERSION`)

### Android Publishing (Google Play Store)
- Automated via `client/scripts/publish-android.mjs`.
- Builds signed production Android App Bundles (`.aab`) using Gradle release tasks.
- Verifies keystore signature integrity.
- Publishes bundles directly to **Google Play Closed Testing** or **Internal Testing** tracks via Google Play Developer APIs.

### iOS Publishing (Apple App Store & TestFlight)
- Automated via **Codemagic CI/CD** (`scripts/codemagic.mjs`).
- The CLI script initiates builds remotely, polls build status, and downloads build logs.
- Codemagic manages automatic Apple certificate provisioning, TestFlight compilation, and direct artifact delivery to App Store Connect.
