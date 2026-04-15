# FizzBuzz Web Server

A robust, enterprise-grade web server providing FizzBuzz computation services via a RESTful API.

## Features

- **RESTful API**: Simple endpoints for single and range computations.
- **Log Forwarding**: Asynchronously sends request metadata to the `analytics-service` for observability.
- **Health Checks**: Standard `/health` endpoint for monitoring and orchestration.
- **CORS Support**: Configured for secure access from multiple frontends.

## Tech Stack

- **Runtime**: Node.js 25.9.0
- **Framework**: Express.js
- **Validation**: Zod (via `@fizzbuzz/web-server` internal logic)
- **Logic Engine**: `@fizzbuzz/core-logic`

## Getting Started

### Prerequisites

- Node.js 25.9.0
- pnpm

### Development

```bash
pnpm install
pnpm dev
```

The server will be available at `http://localhost:3000`.

### Build

```bash
pnpm build
pnpm start
```

## API Reference

### `GET /health`

Returns the health status of the service.

### `GET /compute/:n`

Computes FizzBuzz for a single number.

- **Parameters**:
  - `n` (number): The number to compute.

### `GET /range?start=<start>&end=<end>`

Computes FizzBuzz for a range of numbers.

- **Query Parameters**:
  - `start` (number): The start of the range.
  - `end` (number): The end of the range.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port the server listens on | `3000` |
| `ANALYTICS_SERVICE_URL` | Endpoint for log forwarding | `http://analytics-service:3001/api/logs` |
