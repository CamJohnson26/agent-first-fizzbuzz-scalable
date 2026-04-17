# @fizzbuzz/ui

A shared UI component library and design system used across the entire FizzBuzz ecosystem.

## Features

- **Modern Components**: Built with React 19 and Tailwind CSS 4.
- **Enterprise Design**: Clean, high-fidelity UI components.
- **Shared Theming**: Ensures visual consistency across the Web Dashboard and Marketing Landing Page.

## Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS 4
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

```tsx
import { Button, Card } from '@fizzbuzz/ui';
import '@fizzbuzz/ui/styles.css';

export const MyComponent = () => (
  <Card>
    <Button>Click Me</Button>
  </Card>
);
```
