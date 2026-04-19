# Session: Fix Build and Update URLs

- Date: 2026-04-18
- Agent: Junie
- Task: Fix failing build and test on GitHub, and update GitHub project URL.

## Objectives
- [x] Fix lint errors in `web-server` (unused vars)
- [x] Fix failing test in `marketing-landing-page` (URL mismatch)
- [x] Update legacy Fly.io URLs to point to new monolith
- [x] Correct E2E test URLs and CI/CD base URL
- [x] Verify all tests pass locally

## Progress Summary
- Fixed `apps/web-server/src/v86-service.ts` lint error.
- Fixed `apps/marketing-landing-page/src/App.test.tsx` failing test by updating expected dashboard URL.
- Updated `apps/marketing-landing-page/src/data/manualPosts.ts` to use monolith dashboard URL.
- Updated `apps/web-dashboard/src/App.tsx` to use monolith marketing URL.
- Updated `.github/workflows/ci-cd.yml` to use `/` as `VITE_BASE_URL`.
- Updated `packages/e2e/playwright.config.ts` and test files to use correct local URLs.
- Verified all 17 E2E tests and all unit tests pass.

## Unfinished Work
- None. Everything verified locally and ready for merge.
