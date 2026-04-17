# Session: Standardize Vercel Entry Points and Fix Marketing Page

- Date: 2026-04-17
- Agent: Junie
- Task: F118-standardize-vercel-entry-points

## Objectives
- [x] Investigate marketing page rendering issue with `agent-browser`
- [x] Fix Vite `base` URL for Vercel and GitHub Pages
- [x] Standardize service entry points at `api/index.ts`
- [x] Ensure all 5 services have correct `vercel.json`
- [x] Update Vercel deployment documentation

## Progress Summary
- Step 1: Used `npx agent-browser` to confirm the marketing page was empty due to incorrect asset paths (`/agent-first-fizzbuzz-scalable/assets/...`).
- Step 2: Fixed `apps/marketing-landing-page/vite.config.ts` to default `base` to `/` and set `VITE_BASE_URL` in CI-CD for GitHub Pages.
- Step 3: Migrated `analytics-service` and `lean-service` to use the `api/index.ts` pattern, which was already working for `web-server`.
- Step 4: Verified that all 5 services/apps have `vercel.json` and are configured for Vercel.
- Step 5: Updated `docs/VERCEL_DEPLOYMENT_GUIDE.md` to reflect the new standardized entry point.

## Unfinished Work
- `lean-service` depends on a binary that is currently built via Docker. Running it on Vercel Node runtime may require a pre-compiled Linux binary or a custom builder.
