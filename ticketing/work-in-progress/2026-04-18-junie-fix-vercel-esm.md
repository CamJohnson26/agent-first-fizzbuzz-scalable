# Session: F102 Fix Vercel ESM Error

- Date: 2026-04-18
- Agent: Junie
- Task: F102 Vercel Deployment Fix

## Objectives
- [x] Fix ESM error in `analytics-service` and `web-server` on Vercel
- [x] Remove `outputDirectory: "dist"` to allow Vercel to find `package.json` and `api/`
- [x] Add missing `rewrites` to `analytics-service/vercel.json`
- [x] Fix imports in `api/index.ts` to be compatible with Vercel's Node.js builder
- [x] Add `api/package.json` with `{"type": "module"}` to force ESM behavior
- [x] Update `tsconfig.json` and `tsconfig.build.json` to correctly handle `api/` folder
- [x] (Attempt 3) Add `"type": "module"` to root `package.json` and rename scripts to `.cjs`
- [x] (Attempt 3) Rename `api/index.ts` to `api/index.mts` for all backend services
- [x] Verify build locally via `turbo build`
- [x] Commit, push, and update PR 68

## Progress Summary
- Step 1: Created git worktree `feature/F102-fix-vercel-esm`.
- Step 2: Removed `outputDirectory: "dist"` from `web-server`, `analytics-service`, and `lean-service` in `vercel.json`.
- Step 3: Standardized `api/index.ts` entry points with clean handler exports.
- Step 4: Added missing `buildCommand` and `installCommand` to `lean-service/vercel.json`.
- Step 5: (Attempt 2) Re-added `.js` extensions for ESM compliance.
- Step 6: (Attempt 2) Added `api/package.json` with `{"type": "module"}` for all backend services.
- Step 7: (Attempt 2) Updated `tsconfig.json` and `tsconfig.build.json` to include `api/` while avoiding `rootDir` conflicts.
- Step 8: (Attempt 3) Moved `type: module` to root `package.json` and renamed `api/index.ts` to `api/index.mts`.
- Step 9: Verified builds and scripts locally.
- Step 10: Pushed updates to PR 68.

## Unfinished Work
- None.
