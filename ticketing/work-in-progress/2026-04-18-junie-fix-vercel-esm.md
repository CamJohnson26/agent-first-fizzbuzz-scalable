# Session: F102 Fix Vercel ESM Error

- Date: 2026-04-18
- Agent: Junie
- Task: F102 Vercel Deployment Fix

## Objectives
- [x] Fix ESM error in `analytics-service` and `web-server` on Vercel
- [x] Remove `outputDirectory: "dist"` to allow Vercel to find `package.json` and `api/`
- [x] Add missing `rewrites` to `analytics-service/vercel.json`
- [x] Fix imports in `api/index.ts` to be compatible with Vercel's Node.js builder
- [x] Verify build locally (as much as possible)
- [ ] Commit, push, and create PR

## Progress Summary
- Step 1: Created git worktree `feature/F102-fix-vercel-esm`.
- Step 2: Removed `outputDirectory: "dist"` from `web-server`, `analytics-service`, and `lean-service` in `vercel.json`.
- Step 3: Standardized `api/index.ts` entry points with extension-less imports and clean handler exports.
- Step 4: Added missing `buildCommand` and `installCommand` to `lean-service/vercel.json`.
- Step 5: Verified builds locally via `turbo build`.

## Unfinished Work
- None.
