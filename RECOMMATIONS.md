# Architectural Recommendations: Agent-First FizzBuzz Scalable

This document provides a comprehensive set of recommendations for improving the architecture of the **Agent-First FizzBuzz Scalable** project. These suggestions are aimed at enhancing scalability, maintainability, and developer experience (DevX), particularly in an environment where AI agents are primary contributors.

---

## 1. Monorepo & Package Management

### 1.1 Centralized Configuration (Internal Packages)
Currently, `tsconfig.json` and linter configurations (where they exist) are repeated across packages.
- **Recommendation:** Create a `packages/config` directory (or `@fizzbuzz/config`) containing base configurations for TypeScript, ESLint, Prettier, and Vitest.
- **Benefit:** Ensures consistency across the entire monorepo and reduces boilerplate when adding new services or apps.

### 1.2 Shared Type Definitions
The boundary between `@fizzbuzz/core-logic` and consumers (like `web-server`) currently relies on class-based imports.
- **Recommendation:** Create a `packages/types` package to house shared interfaces, especially for API contracts (Request/Response schemas).
- **Benefit:** Decouples implementation from definition and allows for easier client-side SDK generation or frontend type safety.

### 1.3 Standardized Workspace Scripts
Package scripts are slightly inconsistent (e.g., `web-server` has `test:coverage`, `marketing-landing-page` does not).
- **Recommendation:** Standardize top-level scripts across all packages (`build`, `test`, `lint`, `format`, `type-check`).
- **Benefit:** Allows `turbo run <script>` to work predictably across the whole project.

---

## 2. Backend Architecture (API & Services)

### 2.1 Dependency Injection & Inversion of Control
The `handlers.ts` in `web-server` directly instantiates `FizzBuzzService`.
- **Recommendation:** Use a lightweight Dependency Injection (DI) pattern or container (like `Awilix` or simple constructor injection).
- **Benefit:** Improves testability by allowing easy mocking of services and prepares the system for more complex service graphs (e.g., adding an `AnalyticsService` or `DatabaseService`).

### 2.2 Global Error Handling Middleware
Error handling in `handlers.ts` is repetitive and catches `ZodError` manually in every function.
- **Recommendation:** Implement a centralized Express error-handling middleware and a custom `AppError` class.
- **Benefit:** Reduces code duplication, ensures consistent API error responses, and makes the core logic cleaner.

### 2.3 Performance: Streamed Responses for Large Ranges
The current `rangeHandler` computes the entire range in memory and returns a single JSON array.
- **Recommendation:** For large ranges, implement a streaming response (e.g., NDJSON or Server-Sent Events).
- **Benefit:** Prevents memory exhaustion for massive ranges (the "Scalable" part of the project name) and allows clients to process results as they arrive.

---

## 3. Frontend Architecture

### 3.1 Component Library Extraction
The `marketing-landing-page` contains a large `App.tsx` with all UI logic and styles.
- **Recommendation:** As proposed in F028, extract a `@fizzbuzz/ui` package using Tailwind CSS and Headless UI/Radix UI.
- **Benefit:** Consistency between the Marketing page and the Web Dashboard (F009), faster UI development, and better testability of individual components.

### 3.2 State Management & Data Fetching
- **Recommendation:** Adopt `TanStack Query` (React Query) for the Web Dashboard.
- **Benefit:** Handles caching, loading states, and retries automatically, which is critical for a "Distributed Processing Engine" dashboard.

---

## 4. DevOps & Infrastructure

### 4.1 Containerization Strategy
- **Recommendation:** Implement a multi-stage `Dockerfile` at the root that leverages Turborepo's `prune` command.
- **Benefit:** Produces minimal, production-ready images for each service while maintaining the speed of monorepo builds.

### 4.2 Observability & Health Checks
The `/health` endpoint is a great start.
- **Recommendation:** Integrate OpenTelemetry for distributed tracing and Prometheus/Grafana for metrics (throughput, latency).
- **Benefit:** Essential for monitoring the "Distributed Engine" as it grows.

---

## 5. Agent-Specific Optimizations (AI-First Dev)

### 5.1 Machine-Readable ADRs and RFCs
The project already uses ADRs/RFCs (excellent practice).
- **Recommendation:** Ensure all ADRs include a `Metadata` section with tags and specific "Rules for Agents" related to that decision.
- **Benefit:** Helps future agents quickly understand constraints and "why" behind specific architectural choices without reading the entire history.

### 5.2 Automated "Agent Guardrails"
- **Recommendation:** Add a `scripts/validate-architecture.js` that runs in CI to ensure no illegal imports (e.g., a package importing from an `app`).
- **Benefit:** Prevents architectural drift caused by agents (or humans) who might take the "shortest path" to a fix.

---

## Summary of Priority Actions

1. **High Priority:** Centralize configs (ESLint/TS) and add a global formatter (Prettier).
2. **Medium Priority:** Extract shared types and implement DI in the web server.
3. **Medium Priority:** Modularize the frontend into a component library.
4. **Long Term:** Implement streaming for the range engine to support "massive" scale.
