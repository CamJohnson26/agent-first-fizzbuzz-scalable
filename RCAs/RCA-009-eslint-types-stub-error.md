# RCA 009: `eslint__js` type definition missing (TS2688)

## Summary
The TypeScript build for `packages/ui` and `packages/core-logic` failed with `error TS2688: Cannot find type definition file for 'eslint__js'`.

## Timeline
- **2026-04-14**: Identified that `pnpm build` and `pnpm test:services` were failing during the `tsc` stage in several packages.
- **2026-04-14**: Discovered the error `error TS2688: Cannot find type definition file for 'eslint__js'` in the build logs.
- **2026-04-14**: Research confirmed that `@types/eslint__js` is now a stub and is no longer needed since `@eslint/js` provides its own type definitions starting with version 9.
- **2026-04-14**: Removed `@types/eslint__js` from the root `package.json` and updated `pnpm-lock.yaml`.

## Root Cause
1. **Redundant Types**: `@eslint/js` version 9+ includes its own type definitions. Keeping `@types/eslint__js` (which is a stub) caused TypeScript to attempt to load it, but the stub was missing the actual type definition file (`index.d.ts`).
2. **Implicit Type Inclusion**: TypeScript by default includes all `@types/*` packages found in `node_modules`.

## Action Items
1. Removed `@types/eslint__js` from root `package.json`.
2. Updated `pnpm-lock.yaml` by running `pnpm install`.
3. Verified the fix by running `pnpm build`.

## Status
Resolved.
