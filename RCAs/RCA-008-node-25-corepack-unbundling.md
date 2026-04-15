# RCA 008: `corepack` unbundling in Node.js 25

## Summary
The Docker build process for `web-server` and `web-dashboard` was failing because `corepack` is no longer bundled with Node.js starting from version 25.

## Timeline
- **2026-04-14**: Identified that `pnpm test:services` was failing during the Docker build stage.
- **2026-04-14**: Discovered the error `/bin/sh: 1: corepack: not found` in the Docker build logs.
- **2026-04-14**: Research confirmed that Node.js 25 unbundled Corepack, making it a separate package that must be installed via `npm`.
- **2026-04-14**: Implemented manual `corepack` installation in Dockerfiles and updated project documentation.
- **2026-04-14**: Encountered and resolved an `EEXIST` error during `corepack` installation in the Docker build, caused by existing `yarn` binaries. Resolved by adding the `--force` flag to the `npm install` command.

## Root Cause
1. **Node.js 25 Changes**: Starting with Node.js 25, Corepack is no longer included in the default distribution. Our project upgraded to Node.js 25.9.0 without accounting for this unbundling.
2. **Docker Image Minimalist Design**: The `node:25.9.0-slim` image provides a minimal environment and does not include non-standard or unbundled tools like Corepack by default.

## Action Items
1. Updated `apps/web-server/Dockerfile` to install `corepack` via `npm install -g corepack@latest --force` before enabling it.
2. Updated `apps/web-dashboard/Dockerfile` to install `corepack` via `npm install -g corepack@latest --force` before enabling it.
3. Updated `README.md` to provide correct instructions for enabling `pnpm` on Node.js 25+.
4. (Recommendation) Consider pinning `corepack` version if further stability is needed, but `@latest` is currently sufficient for enabling `pnpm`.

## Status
Resolved.
