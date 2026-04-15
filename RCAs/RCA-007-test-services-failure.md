# RCA 007: `test:services` script failure

## Summary
The `test:services` script was failing due to several issues in the Docker build process and production deployment strategy.

## Timeline
- **2026-04-14**: Identified that `test:services` script in `package.json` was failing to start services correctly.
- **2026-04-14**: Discovered that workspace dependencies' `dist` folders were missing from the production deployment due to `pnpm deploy` behavior (they were in `.gitignore` and not in `files`).
- **2026-04-14**: Identified that `pnpm build` was not building dependencies because of missing `...` in Dockerfiles.
- **2026-04-14**: Identified that `test:services` was blocking indefinitely and couldn't signal failure on crash.
- **2026-04-14**: Implemented initial `docker info` check, which correctly identified permission issues but lacked actionable guidance.

## Root Cause
1. **Pnpm Deploy Behavior**: By default, `pnpm deploy` ignores files in `.gitignore`. For workspace packages like `@fizzbuzz/core-logic`, the `dist` folder is typically ignored. Without explicitly adding it to the `files` field in `package.json`, the production bundle is incomplete, causing a runtime crash.
2. **Incomplete Build Commands**: `pnpm --filter <package> build` only builds the package itself. In a monorepo, its dependencies must also be built. Using `...` (e.g., `pnpm --filter <package>... build`) ensures the dependency graph is built.
3. **Improper Test Signaling**: Using `docker compose up` without `--abort-on-container-exit` prevents the script from signaling failure if a container crashes, and it blocks CI runners forever.
4. **Environmental permission issues**: Many Linux users are not in the `docker` group by default, leading to permission denied errors on the Docker socket.

## Action Items
1. Added `files` field to all workspace packages to include `dist` in deployments.
2. Updated Dockerfiles to use recursive build commands (`...`).
3. Updated `test:services` to use `--abort-on-container-exit`.
4. Improved Dockerfiles by relying on `pnpm deploy` for artifact management.
5. Enhanced `test:services` with actionable instructions for Docker permission issues.

## Status
Resolved.
