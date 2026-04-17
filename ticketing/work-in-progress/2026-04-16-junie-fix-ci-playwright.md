# Session: Fix CI Playwright Browser Failure

- Date: 2026-04-16
- Agent: Junie
- Task: Fix CI failure due to missing Playwright browsers

## Objectives
- [x] Identify cause of CI failure
- [x] Add Playwright browser installation to GitHub Actions workflow
- [ ] Verify CI pass

## Progress Summary
- Step 1: Used `gh` to read failing CI logs.
- Step 2: Confirmed failure is due to missing Playwright browsers (`Executable doesn't exist`).
- Step 3: Updated `.github/workflows/ci-cd.yml` to include `pnpm --filter @fizzbuzz/e2e exec playwright install --with-deps`.
- Step 4: Identified further CI failure due to `web-server` attempting to connect to `analytics-service` and `lean-service` via Docker hostnames.
- Step 5: Updated `web-server` defaults and Playwright config to use `localhost`.
- Step 6: Verified all 16 E2E tests pass locally.

## Unfinished Work
- None.
