# FizzBuzz Web Dashboard

A modern, responsive web application for monitoring and interacting with the FizzBuzz system.

## Features

- **Multi-Engine Computation**: Select between TypeScript, Rust (WASM), and Lean 4 engines for computation.
- **Enterprise Data Exports**: Export computation results to CSV, JSON, PDF, and Excel for offline analysis.
- **Range Explorer**: View FizzBuzz results for large ranges of numbers with optimized rendering.
- **Interactive UI**: Compute single values directly from your browser with real-time feedback.
- **System Health**: Monitor the health status of the `web-server` and engine availability.
- **Live Analytics**: Real-time log monitoring and NPS feedback integration.
- **Enterprise Design**: Built with Tailwind CSS 4 and a dedicated shared UI component library.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Components**: `@fizzbuzz/ui` (Shared Component Library)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 24.14.1
- pnpm

### Development

1. Ensure the `web-server` and `analytics-service` are running.
2. Install dependencies and start the development server:

```bash
pnpm install
turbo dev
```

The dashboard will be available at `http://localhost:5173`.

### Production Build

```bash
turbo build
# Preview build
turbo preview
```

## Configuration

The dashboard connects to:
- **Web Server**: `http://localhost:3000`
- **Analytics Service**: `http://localhost:3001`

These endpoints are currently hardcoded for local development. For production environments, these can be configured through environment variables or a configuration service.
