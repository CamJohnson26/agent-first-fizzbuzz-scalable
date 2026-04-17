# Installation Guide

This guide will walk you through the process of installing and setting up the FizzBuzz Scalable ecosystem on your local machine or server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v25.9.0 (Strictly enforced)
- **pnpm**: v9.15.4 or higher
- **Docker**: Optional, for running the full containerized stack
- **Lean 4**: Optional, for running formal verification locally

## Step 1: Clone the Repository

```bash
git clone https://github.com/CamJohnson26/agent-first-fizzbuzz-scalable.git
cd agent-first-fizzbuzz-scalable
```

## Step 2: Environment Setup

We recommend using a version manager like `nvm` to manage your Node.js version.

```bash
# Using NVM
nvm install && nvm use
```

## Step 3: Install Dependencies

Use `pnpm` to install dependencies across the entire monorepo.

```bash
pnpm install
```

## Step 4: Initial Build

Build all packages and applications in the workspace.

```bash
pnpm build
```

## Step 5: Verification

Run the test suite to ensure everything is set up correctly.

```bash
pnpm test
```

## Troubleshooting

If you encounter any issues during installation, please refer to our [Frequently Asked Questions](#) or reach out to our support team.
