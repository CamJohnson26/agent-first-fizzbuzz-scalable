# 🚀 Agent-First FizzBuzz Scalable

[![CI/CD](https://github.com/CamJohnson26/agent-first-fizzbuzz-scalable/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/CamJohnson26/agent-first-fizzbuzz-scalable/actions/workflows/ci-cd.yml)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE.md)
[![Node.js](https://img.shields.io/badge/Node.js-25.9.0-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0.0-orange.svg)](https://pnpm.io/)

> **A fully agent-first approach to the classic FizzBuzz algorithm, providing scalability, high fidelity, and AI features to enterprise users.**

---

## 🌐 Live Demo

The **Marketing Landing Page** is automatically deployed to **GitHub Pages**.

🔗 **[View Live Site](https://camjohnson26.github.io/agent-first-fizzbuzz-scalable/)**

---

## 🤖 AI-Written Project

This entire codebase is **generated, reviewed, and maintained by AI agents**. From architecture design to implementation, testing, and documentation - no human wrote a single line of code.

This represents a significant milestone in the evolution of software development, demonstrating that AI can autonomously produce production-quality software in a modern monorepo environment.

---

## 🏛 Architecture Overview

Built on a robust, scalable monorepo architecture using **Turborepo** and **pnpm**.

- **`/apps`**: High-performance applications (Landing Page, Dashboard, Core Service)
- **`/packages`**: Shared libraries and core logic engines
- **`/scripts`**: Tooling for environment enforcement and automation
- **`/ticketing`**: Autonomous task management and progress tracking

---

## 🛠 Prerequisites

- **Node.js**: `25.9.0` (Strictly enforced)
- **pnpm**: `>= 9.0.0` (Managed via Corepack)

### 🚀 Getting Started

1.  **Environment Setup**:
    - **NVM**: `nvm install && nvm use` (uses `.nvmrc`)
    - **FNM**: `fnm use --install-if-missing`

2.  **Enable pnpm**:
    - `npm install -g corepack@latest && corepack enable`
    - *Fallback*: `npm install -g pnpm@9.0.0`

3.  **Install dependencies**:
    ```bash
    pnpm install
    ```

---

## 💻 Build and Test

Run the entire pipeline across all packages:

```bash
pnpm build
pnpm test
pnpm lint
```

For individual packages:
```bash
pnpm --filter <package-name> build
pnpm --filter <package-name> test
```

---

## 🎯 Target Users

- 🎓 **Academia**: Presenting complex algorithmic concepts to graduate students.
- 🧪 **Researchers**: Examining cutting-edge performance and implementation patterns.
- ⚡ **Optimizers**: Experimenting with distributed processing and modular logic.
- 🛡️ **Mission-Critical**: Applying simple, verified modular algorithms to specialized fields.

---

## ✨ Features

- ✅ **Scalable Architecture**: Designed for enterprise-scale distribution.
- ✅ **High-Fidelity**: Precision logic verified by comprehensive test suites.
- ✅ **AI-Enhanced**: Optimized by autonomous agents for various targets.
- ✅ **Modern Tech Stack**: React 19, Tailwind 4, Vite 6, and Node.js 25.

---

## 📝 Development Process (AI-First)

Development is tracked through our custom autonomous ticketing system.

- 🎟️ **[Ticketing Root](ticketing/README.md)**: Entry point for task management.
- 🗺️ **[High-Level Roadmap](ticketing/FEATURES.md)**: Current and planned features.
- 📓 **[Architecture Records (ADR)](docs/adr/)**: Key design decisions.
- 📖 **[Code Conventions](docs/CODE_CONVENTIONS.md)**: Style and standard guides.

---

## 📜 License

Enterprise Proprietary - All Rights Reserved. See [LICENSE.md](LICENSE.md) for details.
