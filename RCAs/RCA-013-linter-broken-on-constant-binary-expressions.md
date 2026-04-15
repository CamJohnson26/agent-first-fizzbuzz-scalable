# RCA 013: Linter Broken on Constant Binary Expressions

## Status
Completed

## Context
On 2026-04-14, after recent test additions, the CI/CD pipeline and local `pnpm lint` started failing in the `@fizzbuzz/ui` package. The error was reported as "Linter is broken" by the user.

## Root Cause Analysis

### 1. New ESLint Rule Enforcement
The project uses `eslint.config.mjs` which recently (either via update or default settings) started enforcing the `no-constant-binary-expression` rule. This rule prevents using literal `true` or `false` on the left side of a logical expression (e.g., `true && 'value'`).

### 2. Implementation in Tests
In `packages/ui/src/utils.test.ts`, a test case was added to verify conditional class merging in the `cn` utility. The test used literal `true` and `false` to simulate conditional logic:
```typescript
expect(cn('px-2', true && 'py-1', false && 'm-1')).toBe('px-2 py-1');
```
While this is valid JavaScript and common in React/Tailwind contexts, the linter flagged it as a constant expression that could be simplified, leading to a build failure.

## Action Items
- [x] **Fix**: Refactored the test case to use variables (`isPrimary`, `isError`) instead of literal booleans.
- [x] **Verification**: Ran `pnpm lint` at the root and verified all packages pass.
- [x] **Documentation**: Created this RCA to document the cause and resolution.

## Next Steps
1. Ensure new tests avoid literal constant binary expressions to satisfy the linter.
2. Consider if `no-constant-binary-expression` should be relaxed in tests if this pattern becomes common.
