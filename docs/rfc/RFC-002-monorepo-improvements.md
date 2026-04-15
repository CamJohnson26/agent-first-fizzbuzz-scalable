# RFC 002: Monorepo & Package Management Improvements

## Summary
Improve the monorepo structure by centralizing configurations, sharing type definitions, and standardizing workspace scripts.

## Motivation
- **Centralized Configuration:** Currently, configurations like `tsconfig.json` and linter settings are repeated across packages, leading to inconsistency and maintenance overhead.
- **Shared Type Definitions:** Decoupling implementation from definition by sharing interfaces allows for better type safety and easier integration between backend and frontend.
- **Standardized Workspace Scripts:** Predictable scripts across all packages enable better automation with tools like Turborepo.

## Detailed Design

### 1. Centralized Configuration (F054)
Create a `packages/config` directory (or `@fizzbuzz/config`) containing base configurations for:
- TypeScript (`tsconfig.base.json`)
- ESLint
- Prettier
- Vitest

### 2. Shared Type Definitions (F055)
Create a `packages/types` package to house shared interfaces, specifically:
- API contracts (Request/Response schemas)
- Core domain entities

### 3. Standardized Workspace Scripts (F056)
Ensure every package in the monorepo implements a standard set of scripts:
- `build`
- `test`
- `lint`
- `format`
- `type-check`

## Alternatives Considered
- **Keep configurations decentralized:** Rejected because it makes it harder to maintain a consistent developer experience and harder for agents to follow a unified style.
- **Use internal classes for types:** Rejected as it creates tight coupling between packages and makes client-side SDK generation more difficult.
