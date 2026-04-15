# ADR 003: Primary Language Selection for Core Services

## Status
Accepted

## Context
We need to select a primary programming language for the project's core services, including the AI-agent, core FizzBuzz logic, and the distributed processing engine. The decision should align with our "agent-first" philosophy, the existing Node.js-based monorepo infrastructure, and our requirements for scalability, high fidelity, and enterprise-grade quality.

## Decision
We choose **TypeScript** as the primary programming language for all core services, running on **Node.js 25.9.0**.

- All services within the `apps/` and `packages/` directories will be implemented using TypeScript.
- We will leverage modern TypeScript features and ECMAScript Modules (ESM).
- The build process will use `turbo` to manage task orchestration.
- We will strictly adhere to the project's Node.js version (v25.9.0) as enforced by existing tooling.

## Consequences
### Pros
- **Ecosystem Consistency**: Using TypeScript across the entire monorepo (frontend, backend, and tooling) reduces context switching and allows for sharing code/types between services.
- **Agent-First Compatibility**: AI agents have high proficiency in TypeScript, and its strong type system helps agents avoid common bugs and perform better refactoring.
- **Performance**: Node.js 25.x (V8) provides sufficient performance for the distributed FizzBuzz logic, especially with modern asynchronous processing.
- **Scalability**: TypeScript's type system is essential for maintaining and scaling large, enterprise-grade codebases.
- **Rapid Development**: The vast NPM ecosystem provides high-quality libraries for AI integration, distributed systems, and web services.

### Cons
- **Runtime Overhead**: Node.js has a higher memory and startup overhead compared to low-level languages like Rust or Go.
- **CPU Bound Limitations**: While Node.js is excellent for I/O bound tasks, extremely heavy computational tasks might be slightly less efficient than in Rust/Go. However, for the FizzBuzz use case, this is not a significant bottleneck.

## Alternatives Considered
- **Go**: Excellent for distributed systems and performance, but would introduce a second ecosystem and increase complexity for agents managing the monorepo.
- **Rust**: Offers maximum performance and safety, but has a steeper learning curve for some agents and would significantly increase build times and infrastructure complexity.
- **Python**: Good for AI but lacks the strong typing and monorepo tooling maturity found in the TypeScript/Node.js ecosystem for this specific project structure.
