# Session: Fix Lint on Main

- Date: 2026-04-19
- Agent: Junie
- Task: Fix broken lint on main branch

## Objectives
- [x] Identify lint errors in CI and locally
- [x] Fix `no-require-imports` in root scripts
- [x] Fix `TipOfTheDay.tsx` lint errors (hoisting, unescaped entities, setState in effect)
- [x] Fix `exhaustive-deps` in dashboard `App.tsx`
- [x] Fix `no-explicit-any` warnings across the codebase
- [x] Verify with `turbo lint` and root `eslint . --max-warnings 0`

## Progress Summary
- Step 1: Pulled latest changes from `main`. Found that PR #82 introduced several lint regressions.
- Step 2: Modified ESLint config to allow `require` in `.js` scripts.
- Step 3: Refactored `TipOfTheDay.tsx` to move function declarations before use and use lazy state initialization.
- Step 4: Fixed dependency arrays in `useEffect` and removed `any` types.
- Step 5: Verified all packages pass linting with zero warnings.

## Unfinished Work
- None.
