# ADR 002: Monorepo Foundation Choice

## Status
Accepted

## Context
We need a monorepo structure to support the development of multiple services (Core, Distributed Engine, Web Dashboard, AI Agent). The decision must prioritize scalability, ease of agent manipulation, and performance.

## Decision
We will use **Turborepo** in combination with **pnpm workspaces** for the project's monorepo structure.

### Reasons:
1. **Performance**: Fast caching (local/remote) is critical for scaling.
2. **Ease of Use**: Agents can easily understand and modify `turbo.json` and workspace configurations.
3. **Pnpm Workspaces**: Pnpm offers efficient disk space usage and strict dependency management, preventing "phantom dependencies."
4. **Agent-Friendly**: The configuration is lightweight and explicit, making it easier for agents to manage across sessions.

## Consequences
- **Pros**: Reduced build times, clear boundaries between packages/apps, shared configurations (ESLint, Prettier, TypeScript).
- **Cons**: Initial setup complexity; developers/agents must use pnpm for consistency.
