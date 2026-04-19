# RCA: Vercel ENOENT error for v86.wasm

## Incident Summary
The `web-server` application failed to start in the Vercel environment with the error:
`Unhandled Rejection: Error: ENOENT: no such file or directory, open '/var/task/node_modules/v86/build/v86.wasm'`

## Timeline
- **2026-04-18 21:22**: Issue reported with Vercel logs showing `ENOENT` for `v86.wasm`.
- **2026-04-18 21:30**: Investigation revealed that `V86Service` used `process.cwd()` for path resolution, which is not reliably traceable by Vercel's Node File Trace (NFT).
- **2026-04-18 21:35**: `vercel.json` found to be missing `v86` assets in `includeFiles`.
- **2026-04-18 21:45**: Implemented robust path resolution using `import.meta.url` and `createRequire`.
- **2026-04-18 22:00**: Updated `vercel.json` with `includeFiles` (using string format as required).

## Root Cause
1. **Implicit File Dependencies**: The application relied on `v86.wasm` and VM images located in `node_modules` and a sub-folder, but accessed them via dynamic path resolution (`process.cwd() + path`). Vercel's NFT could not statically analyze these dependencies to include them in the deployment bundle.
2. **Missing Configuration**: `vercel.json` did not explicitly include these assets in the `functions.includeFiles` configuration.

## Action Items
- [x] Use `import.meta.url` and `require.resolve` for all asset paths to enable static analysis.
- [x] Explicitly list required assets in `vercel.json` under `includeFiles`.
- [ ] Monitor Vercel deployments for similar `ENOENT` errors.

## Permanent Fix
Modified `V86Service` to use ESM-safe path resolution and updated `vercel.json` to ensure assets are bundled.
