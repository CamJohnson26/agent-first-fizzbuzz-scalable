# Session: Fix `pnpm test:services` error

- Date: 2026-04-14
- Agent: Junie
- Task: Run pnpm test:services and fix the error

## Objectives
- [ ] Run `pnpm test:services` and identify the failure
- [ ] Root cause the error
- [ ] Fix the script or Docker configuration
- [ ] Verify the fix

## Progress Summary
- Step 1: Created worktree and initialized WIP file.
- Step 2: Identified the `EEXIST` error during `corepack` installation in Docker builds.
- Step 3: Applied `--force` flag to `npm install -g corepack@latest` in `apps/web-server/Dockerfile` and `apps/web-dashboard/Dockerfile`.
- Step 4: Fixed `TS2688: Cannot find type definition file for 'eslint__js'` in `packages/ui` and `packages/core-logic` by removing the redundant and stub-only `@types/eslint__js` package from root `package.json`.
- Step 5: Verified the fix by running `pnpm build` and `pnpm test:services` successfully.
