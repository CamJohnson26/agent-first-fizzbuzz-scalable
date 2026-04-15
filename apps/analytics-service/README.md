# Analytics Service

A lightweight service for collecting and analyzing logs from other services in the FizzBuzz ecosystem.

## Features

- **Log Collection**: Receives logs via a POST `/api/logs` endpoint.
- **Real-time Stats**: Provides basic metrics (total logs, logs per service) via the `/stats` endpoint.
- **Validation**: Uses Zod for strict schema validation of incoming log data.
- **Dockerized**: Fully configured for containerized deployment.

## Tech Stack

- **Runtime**: Node.js 25.9.0
- **Framework**: Express.js
- **Validation**: Zod
- **Testing**: Vitest (planned)

## Getting Started

### Prerequisites

- Node.js 25.9.0
- pnpm

### Development

```bash
pnpm install
pnpm dev
```

The service will be available at `http://localhost:3001`.

### Build

```bash
pnpm build
pnpm start
```

## API Reference

### `POST /api/logs`

Forwards a log message to the analytics service.

**Body:**

```json
{
  "service": "web-server",
  "message": "Request GET /compute/15",
  "metadata": {
    "method": "GET",
    "url": "/compute/15",
    "statusCode": 200,
    "duration": "5ms"
  },
  "timestamp": "2026-04-14T23:31:00Z"
}
```

### `GET /stats`

Returns aggregated log statistics.

**Response:**

```json
{
  "totalLogs": 42,
  "logsByService": {
    "web-server": 42
  }
}
```

### `GET /health`

Basic health check endpoint.
