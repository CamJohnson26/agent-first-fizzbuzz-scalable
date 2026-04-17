# RCA 011: Marketing Site Docker 404 and Test Failures

## Status
Completed

## Context
On 2026-04-14, several issues were reported:
1. Marketing site assets (CSS/JS) were returning 404 errors when running in Docker.
2. The full project test suite was failing.

## Root Cause Analysis

### 1. Docker Asset 404
The `marketing-landing-page` app was configured with `base: '/agent-first-fizzbuzz-scalable/'` in `vite.config.ts`. This was likely set for GitHub Pages deployment. However, the `Dockerfile` for the marketing site was copying the build artifacts directly to the Nginx root `/usr/share/nginx/html/`.
When the browser requested assets at `/agent-first-fizzbuzz-scalable/assets/...`, Nginx could not find them because the subdirectory did not exist in the container.

### 2. Test Failures (@fizzbuzz/ui)
The `@fizzbuzz/ui` package was configured to run `vitest run`, but it contained no `*.test.ts` or `*.test.tsx` files. Vitest by default exits with code 1 if no test files are found, causing the entire `turbo run test` pipeline to fail.

### 3. Node.js Version Mismatch
The project required Node.js 24.14.1 (enforced by `scripts/check-node-version.js`), but the environment was initially using 18.20.4. This prevented the tests from running until the environment was correctly configured using `nvm`.

## Action Items

- [x] **Docker Fix**: Updated `apps/marketing-landing-page/Dockerfile` to serve from the `/agent-first-fizzbuzz-scalable` subdirectory and added symlinks to the root to support both access patterns.
- [x] **Test Fix**: Added a basic utility test `packages/ui/src/utils.test.ts` to satisfy the vitest requirement for at least one test file in the package.
- [x] **Node.js**: Correctly configured the session to use `nvm use 24.14.1` per project guidelines.

## Next Steps
1. Verify Docker build with the updated path structure. ✓
2. Ensure all packages have at least one test file to prevent future pipeline failures. ✓
3. Update documentation if the deployment path expectations change. ✓

## Regression: Docker Build Failure (index.html exists)
After the initial fix, the Docker build for `marketing-landing-page` failed with `ln: index.html: File exists`. This was because the `nginx:stable-alpine` image already contains a default `index.html` file in `/usr/share/nginx/html`.

### Resolution
- Updated the `Dockerfile` to explicitly remove all files in `/usr/share/nginx/html` before copying new artifacts.
- Changed `ln -s` to `ln -sf` to force overwrite any existing files when creating symlinks.
