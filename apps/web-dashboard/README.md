# FizzBuzz Web Dashboard

A modern, responsive web application for monitoring and interacting with the FizzBuzz system.

## Features

- **Interactive UI**: Compute FizzBuzz values directly from your browser.
- **Range Explorer**: View FizzBuzz results for large ranges of numbers.
- **System Health**: Monitor the health status of the `web-server`.
- **Live Analytics**: Real-time log monitoring from the `analytics-service`.
- **Enterprise Design**: Built with Tailwind CSS and a dedicated component library.

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
