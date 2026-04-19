# RCA 018: Lint Broken on Main after PR #82

## Status
Completed

## Context
On 2026-04-19, after the merge of PR #82 (Cleanups and New Features), the CI/CD pipeline and local `pnpm lint` started failing. The errors included unescaped entities, React Hook violations, and new ESLint rules being applied to root scripts.

## Root Cause Analysis

### 1. Unstable Hook Dependencies
In `apps/web-dashboard/src/App.tsx`, several functions and variables defined inside the component were used in `useEffect` without being included in the dependency array or being wrapped in `useCallback`. This triggered `react-hooks/exhaustive-deps`.

### 2. Variable Hoisting in TipOfTheDay
In `apps/web-dashboard/src/components/TipOfTheDay.tsx`, a `const` function (`generateTip`) was called in `useEffect` before its declaration. Additionally, calling `setState` directly within `useEffect` triggered `react-hooks/set-state-in-effect`.

### 3. Misconfigured ESLint for Scripts
The project's base ESLint configuration recently started enforcing `@typescript-eslint/no-require-imports`. This rule was incorrectly applied to root-level Node.js scripts (like `scripts/generate-blog-data.js`) which still use CommonJS `require`.

### 4. Unescaped Entities
The `TipOfTheDay.tsx` component used a literal `'` in JSX, which triggered `react/no-unescaped-entities`.

## Action Items
- [x] **Fix**: Updated `packages/config/eslint/base.mjs` to disable `no-require-imports` for `.js`, `.mjs`, and `.cjs` files.
- [x] **Fix**: Refactored `TipOfTheDay.tsx` to use lazy state initialization for the initial tip, moved helper functions outside the component, and escaped HTML entities.
- [x] **Fix**: Wrapped dashboard handlers in `useCallback` and moved constants outside the component to stabilize `useEffect` dependencies.
- [x] **Fix**: Replaced `any` types with more specific types (`unknown`, `Record<string, unknown>`, etc.) in tests and services.
- [x] **Verification**: Ran `turbo lint` and `npx eslint . --max-warnings 0` to ensure clean linting across the entire monorepo.

## Next Steps
1. Always run `npx eslint . --max-warnings 0` before opening a PR to catch hidden warnings that might fail CI.
2. Be mindful of React Hook best practices when introducing new components (especially `useCallback` for stable functions).
