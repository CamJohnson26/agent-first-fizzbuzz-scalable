# Feature: [BUG] Security - Update Vite and esbuild

## Description
Vulnerability scan identified moderate security issues in `vite` (<=6.4.1) and `esbuild` (<=0.24.2). Both need to be upgraded to their latest stable versions to mitigate potential path traversal and request forgery risks.

## Status
Proposed

## Next Features (Todo)
- [ ] Upgrade `vite` to >= 6.4.2
- [ ] Upgrade `esbuild` to >= 0.25.0
- [ ] Run `pnpm security-check` to verify fix
