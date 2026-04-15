# Agent-First FizzBuzz Scalable

A fully agent-first approach to the classic FizzBuzz algorithm, providing scalability, high fidelity, and AI features to enterprise users.

## Overview

This project reimagines the well-known FizzBuzz programming challenge with enterprise-grade capabilities, enabling advanced use cases across academia, research, and industry. **This project is fully written by AI** - a testament to the incredible progress made in autonomous software engineering.

## AI-Written Project

This entire codebase is generated, reviewed, and maintained by AI agents. From architecture design to implementation, testing, and documentation - no human wrote a single line of code. This represents a significant milestone in the evolution of software development, demonstrating that AI can autonomously produce production-quality software.

## Prerequisites

- **Node.js**: 25.9.0 (Strictly enforced)
- **pnpm**: >= 9.0.0 (Managed via Corepack)

### Getting Started

1. **Environment Setup**: Ensure you have Node.js 25.9.0 installed.
   - **Using NVM**: `nvm install && nvm use` (uses `.nvmrc`)
   - **Using FNM**: `fnm use --install-if-missing`
2. **Enable pnpm**:
   - **For Node.js < 25**: `corepack enable` (Node.js 16.9.0+ includes corepack)
   - **For Node.js >= 25**: `npm install -g corepack@latest && corepack enable`
   - Fallback (if corepack is missing/failing): `npm install -g pnpm@9.0.0`
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
### Build and Test

Full project build and test:
```bash
pnpm build
pnpm test
```

For individual packages:
```bash
pnpm --filter <package-name> build
pnpm --filter <package-name> test
```

## CI/CD and Deployment

This project uses **GitHub Actions** for continuous integration and deployment.

### Continuous Integration (CI)
On every push and pull request to the `master` branch, the following steps are executed:
1. Environment setup (Node.js 25.9.0 and pnpm).
2. Dependency installation.
3. Linting and static analysis.
4. Full project build using Turborepo.
5. Unit and integration test suites execution.

### Continuous Deployment (CD)
The **Marketing Landing Page** is automatically deployed to **GitHub Pages** on every successful push to the `master` branch.
The live site is accessible at: `https://[username].github.io/agent-first-fizzbuzz-scalable/`

## Target Users

- **Academia**: Professors presenting algorithmic concepts to Graduate and Post Graduate students
- **Algorithm Enthusiasts**: Experimenting and optimizing the algorithm
- **Researchers**: Examining cutting-edge performance and interesting implementation options
- **Defense & Medical**: Applying simple modular algorithms to mission-critical fields

## Features

- Scalable architecture for enterprise deployment
- High-fidelity implementation with comprehensive testing
- AI-enhanced capabilities for intelligent optimization
- Extensible framework for research and experimentation

## Development Process (AI-First)

This project is developed using an AI-first monorepo structure. All development is tracked through our custom ticketing system.

### Ticketing & Progress Tracking

We use a lightweight ticketing system to manage development:
- **[Ticketing Root](ticketing/README.md)**: Main entry point for the ticketing system.
- **[High-Level Features](ticketing/FEATURES.md)**: Roadmap and candidate features.
- **[Work in Progress](ticketing/work-in-progress/)**: Current active session logs for agents.
- **[Feature Folders](ticketing/features/)**: Folders for tracking specific feature development.

### Documentation & Decisions

Large, breaking changes and architectural decisions are documented in the `docs/` folder:
- **[Architecture Decision Records (ADR)](docs/adr/)**
- **[Request for Comments (RFC)](docs/rfc/)**
- **[Code Conventions & Style Guide](docs/CODE_CONVENTIONS.md)**

### Agent Instructions

Agents should refer to **[CLAUDE.md](CLAUDE.md)** for detailed instructions on the development process, including templates for session tracking and feature definitions.

## License

Enterprise Proprietary - All Rights Reserved
