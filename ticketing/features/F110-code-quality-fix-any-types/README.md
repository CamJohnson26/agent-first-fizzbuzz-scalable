# Feature: Code Quality - Remove 'any' types

## Description
Lint scan identified `any` type warnings in `web-server/src/app.ts` and `marketing-landing-page/src/data/blogPosts.ts`. These should be replaced with proper interfaces or types to improve type safety.

## Status
Proposed

## Next Features (Todo)
- [ ] Define proper types for `metadata` in `web-server`
- [ ] Define proper types for `blogPosts` data structure
- [ ] Fix all `@typescript-eslint/no-explicit-any` warnings
