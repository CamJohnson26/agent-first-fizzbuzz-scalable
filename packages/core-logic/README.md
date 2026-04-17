# @fizzbuzz/core-logic

The heart of the FizzBuzz ecosystem. This package provides the foundational, high-performance logic used across all services and applications.

## Features

- **High-Performance**: Optimized computation logic.
- **TypeScript First**: Fully typed for safety and clarity.
- **Shared Logic**: Used by both the web server and the command-line tools.

## Tech Stack

- **Runtime**: Node.js 24.14.1
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 24.14.1
- pnpm

### Development

```bash
pnpm install
pnpm dev
```

### Build

```bash
pnpm build
```

## Usage

```typescript
import { computeFizzBuzz } from '@fizzbuzz/core-logic';

const result = computeFizzBuzz(15); // 'FizzBuzz'
```
