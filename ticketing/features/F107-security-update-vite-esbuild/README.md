# Feature: [BUG] Security - Update Vite and esbuild

## Description
Vulnerability scan identified moderate security issues in `vite` (<=6.4.1) and `esbuild` (<=0.24.2). Both need to be upgraded to their latest stable versions to mitigate potential path traversal and request forgery risks.

## Status
Done

## Next Features (Todo)
- [x] Upgrade `vite` to >= 6.4.2 (Upgraded to ^8.0.8)
- [x] Upgrade `esbuild` to >= 0.25.0 (Upgraded to ^0.27.7 via Vite 8 and tsx 4)
- [x] Run `pnpm security-check` to verify fix
