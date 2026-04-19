# Session: Fix Analytics Service ESM Error

- Date: 2026-04-18
- Agent: Junie
- Task: Fix "SyntaxError: Cannot use import statement outside a module" in analytics-service

## Objectives
- [x] Identify root cause of ESM error on Vercel
- [x] Update `api/index.ts` to import from `dist/` instead of `src/`
- [x] Apply same fix to `web-server` for consistency
- [x] Verify local build with Node 24

## Progress Summary
- Step 1: Investigated `analytics-service` and `web-server` configurations. Found both had identical `api/index.ts` importing from `src/`.
- Step 2: Identified that Vercel was failing because it was trying to load the ESM `app.js` (compiled from `app.ts`) as CJS, likely due to directory structure and `rootDir` constraints.
- Step 3: Changed imports to point to `../dist/app.js`, which is already compiled and correctly marked as ESM by the project's build process.
- Step 4: Verified that `api/` was outside `rootDir` in `tsconfig.json`, causing `tsc` errors and likely confusing Vercel's builder.
- Step 5: Successfully built both services locally using Node 24.14.1.

## Unfinished Work
- [ ] Commit and push changes
- [ ] Create PR and schedule merge
