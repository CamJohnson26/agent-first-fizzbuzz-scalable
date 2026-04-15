# RCA 003: GitHub Actions CI/CD Deployment Failure

## Date: 2026-04-14
## Status: Closed
## Severity: High

## Executive Summary
On 2026-04-14, the "Deploy GH Pages" step in the initial implementation of the GitHub Actions CI/CD pipeline (F020) failed. The error message reported a `403 Forbidden` when attempting to push to the `gh-pages` branch, and a warning about an unexpected input `force_push` for the `peaceiris/actions-gh-pages@v4` action. This regression prevented the marketing landing page from being automatically deployed upon successful builds.

## Incident Timeline
1. **Initial Implementation (F020):** Agent implemented the CI/CD pipeline (`.github/workflows/ci-cd.yml`) and the marketing landing page.
2. **First Run (Failure):** The pipeline was triggered, and the deployment step failed with a `403 Forbidden` error and a configuration warning.
3. **Investigation:** Agent analyzed the logs and identified two root causes: missing workflow permissions for writing to the repository contents and an invalid parameter in the GitHub Action configuration.
4. **Resolution (Fix CI/CD):** Agent updated the workflow file to include `permissions: contents: write` and removed the `force_push` input.
5. **Verification:** A `Debug dist` step was added to ensure the build artifacts were correctly generated in the `dist` directory.

## Root Cause Analysis
- **Permission Scoping:** By default, GitHub Actions workflows have read-only access to the repository's contents. Deploying to GitHub Pages requires explicit `write` permissions to the `contents` scope to push the built assets to the `gh-pages` branch. This was omitted in the initial implementation.
- **Incorrect Configuration:** The `force_push` input was used in the `peaceiris/actions-gh-pages@v4` action, but this input is not recognized by version 4 of the action, causing a configuration warning and potential instability.
- **Assumed Defaults:** The agent assumed that standard GITHUB_TOKEN permissions would be sufficient for deployment without explicit declaration, which is a common pitfall in modern GitHub Actions environments where default permissions are often restricted to read-only for security reasons.

## Action Items
1. **Explicit Permission Declaration:** (COMPLETED) Added `permissions: contents: write` to the `ci-cd.yml` workflow file.
2. **Correct Action Inputs:** (COMPLETED) Removed the invalid `force_push` input from the deployment step.
3. **Artifact Verification:** (COMPLETED) Added a `Debug dist` step to list files in `apps/marketing-landing-page/dist` before deployment to confirm build success.
4. **Deployment Documentation:** (COMPLETED) Updated `README.md` and `AGENTS.md` with explicit build and deployment instructions.

## Lessons Learned
- **Permissions-First Design:** All GitHub Actions workflows that involve pushing code or deploying assets must explicitly define their required permissions (least privilege principle).
- **Action Documentation Review:** Always verify the supported inputs for the specific version of a GitHub Action being used (e.g., checking `peaceiris/actions-gh-pages` v4 documentation vs. older versions).
- **Environment Variance:** Recognize that default permissions in CI environments (like GitHub Actions) can change over time for security reasons; explicit configuration is safer and more portable.
