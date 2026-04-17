# Feature: Code Quality - Remove 'any' types

## Description
Lint scan identified `any` type warnings in `web-server/src/app.ts` and `marketing-landing-page/src/data/blogPosts.ts`. These should be replaced with proper interfaces or types to improve type safety.

## Status
Done

## Next Features (Todo)
- [x] Define proper types for `metadata` in `web-server` (using `Record<string, unknown>`)
- [x] Define proper types for `blogPosts` data structure (using `BlogPost[]`)
- [x] Fix identified `@typescript-eslint/no-explicit-any` warnings in targeted files
