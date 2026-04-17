# RCA-017: Web Server Deployment Failure - Fetch Type Errors

## Status
Completed

## Incident Summary
The web server deployment on Vercel failed with TypeScript errors:
`error TS2339: Property 'ok' does not exist on type 'Response'`
`error TS2339: Property 'status' does not exist on type 'Response'`

This occurred despite the code working locally for some developers and having `as any` casts in some places.

## Timeline
- **2026-04-16**: Dependency Injection and Analytics integration were implemented.
- **2026-04-17**: Vercel deployment failed with TS2339 errors in `apps/web-server/src/app.ts`.
- **2026-04-17**: Analysis revealed that `tsconfig.json` was missing the `DOM` library, which provides full Fetch API type definitions.
- **2026-04-17**: Fixed by adding `DOM` to `lib` in `apps/web-server/tsconfig.json` and removing unsafe `as any` casts.

## Root Cause
The `apps/web-server` package used global `fetch` but did not explicitly include the `DOM` library in its TypeScript configuration. While `ESNext` includes some modern features, the full Fetch API types (including `ok` and `status` properties on `Response`) are often tied to the `DOM` or `WebWorker` libraries in TypeScript, even when running in Node.js. The discrepancy between local success and Vercel failure likely stemmed from different TypeScript versions or cached type definitions.

## Permanent Action Items
1.  **Updated `tsconfig.json`**: Added `"DOM"` to the `lib` array in `apps/web-server/tsconfig.json`.
2.  **Cleaned up Workarounds**: Removed unsafe `as any` casts that were attempting to bypass the type errors.
3.  **Monorepo Consistency Check**: Verified that other packages using `fetch` (like `marketing-landing-page`) already have correct type configurations.
