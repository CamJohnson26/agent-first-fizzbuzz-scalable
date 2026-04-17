# RCA-016: Vercel "Invalid export" Runtime Error in ESM Services

## Summary
The `analytics-service` and `web-server` services were experiencing persistent 500 errors on Vercel with the message `Invalid export found in module "/var/task/apps/analytics-service/src/app.mjs". The default export must be a function or server.` This occurred despite the services working correctly in local development and having ostensibly correct entry points in the `api/` directory.

## Timeline
- **2026-04-16 23:08**: First reported 500 errors in analytics service.
- **2026-04-16 23:12**: Initial investigation showed successful builds but runtime failures.
- **2026-04-16 23:18**: Attempted to use explicit function handler in `api/index.ts`.
- **2026-04-16 23:25**: User reported persistent 500 errors with specific log message identifying `src/app.mjs` as the failing module.
- **2026-04-16 23:30**: Root cause identified as Vercel picking up `src/app.mjs` as an entry point without a default export.
- **2026-04-16 23:35**: Standardized all services to use default exports for the Express app instance.

## Root Cause Analysis
Vercel's Node.js builder and runtime, when handling ESM projects with certain framework settings (e.g. "express" or "node"), may attempt to resolve the primary handler from several locations. In this project's structure, even with an `api/index.ts` entry point defined, the runtime was attempting to load the compiled `src/app.mjs` file. Because this file only exported a factory function (`createApp`) and lacked a `default` export, the Vercel handler identification logic failed, leading to a `FUNCTION_INVOCATION_FAILED` state.

## Impact
- `analytics-service` was completely unreachable in production (500 error on all paths).
- `web-server` had intermittent failures on the root path `/`.

## Resolution
Standardized the architecture of all microservices (`analytics-service`, `web-server`, `lean-service`) to:
1. Export the Express app instance as the `default` export from `src/app.ts`.
2. Provide a root `/` route in each service to ensure valid responses even on the base path.
3. Import the default app in `api/index.ts` and `src/index.ts` to maintain consistency across local and production environments.

## Permanent Action Items
- [ ] Update project templates to enforce default exports for microservice app instances.
- [ ] Add a "smoke test" to the CI/CD pipeline that verifies production entry points after build.
- [ ] Ensure all services have a defined root `/` handler.
