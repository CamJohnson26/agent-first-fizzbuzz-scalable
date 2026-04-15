# Agent-First FizzBuzz Scalable

A fully agent-first approach to the classic FizzBuzz algorithm, providing scalability, high fidelity, and AI features to enterprise users.

## Overview

This project reimagines the well-known FizzBuzz programming challenge with enterprise-grade capabilities, enabling advanced use cases across academia, research, and industry. **This project is fully written by AI** - a testament to the incredible progress made in autonomous software engineering.

## AI-Written Project

This entire codebase is generated, reviewed, and maintained by AI agents. From architecture design to implementation, testing, and documentation - no human wrote a single line of code. This represents a significant milestone in the evolution of software development, demonstrating that AI can autonomously produce production-quality software.

## Prerequisites

- **Node.js**: 25.9.0 (Strictly enforced)
- **pnpm**: >= 9.0.0 (Managed via Corepack)

### Environment Setup

To ensure you are using the correct Node.js version, we recommend using a version manager:

#### Using NVM (Node Version Manager)
1. Install the required version:
   ```bash
   nvm install
   ```
2. Use the version (nvm will automatically detect `.nvmrc` or `.node-version` if configured, or run manually):
   ```bash
   nvm use
   ```

#### Using FNM (Fast Node Manager)
1. Install and use:
   ```bash
   fnm use --install-if-missing
   ```

### Getting Started

1. Enable Corepack to get pnpm:
   ```bash
   corepack enable
   ```
2. Install dependencies (this will trigger a version check):
   ```bash
   pnpm install
   ```

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

### Agent Instructions

Agents should refer to **[CLAUDE.md](CLAUDE.md)** for detailed instructions on the development process, including templates for session tracking and feature definitions.

## License

Enterprise Proprietary - All Rights Reserved
