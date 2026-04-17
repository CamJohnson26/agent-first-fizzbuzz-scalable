# Session: Fix Corepack Unbundling in Node.js 24

- Date: 2026-04-14
- Agent: Junie
- Task: Fix Docker build failure due to missing `corepack` in Node.js 24

## Objectives
- [x] Identify root cause of `corepack: not found` error in Docker builds.
- [x] Update `apps/web-server/Dockerfile` to install `corepack` manually.
- [x] Update `apps/web-dashboard/Dockerfile` to install `corepack` manually.
- [x] Update `README.md` with instructions for Node.js 24+ environments.
- [x] Create RCA document for the build failure.

## Progress Summary
- Step 1: Investigated Node.js 24 changes and confirmed Corepack is no longer bundled.
- Step 2: Created a new branch and worktree `fix-corepack-node-25`.
- Step 3: Modified both Dockerfiles to include `npm install -g corepack@latest`.
- Step 4: Updated `README.md` prerequisites section.
- Step 5: Authored `RCAs/RCA-008-node-25-corepack-unbundling.md`.

## Unfinished Work
- None. Verification is handled by aligning with Node.js 24 official recommendations.
