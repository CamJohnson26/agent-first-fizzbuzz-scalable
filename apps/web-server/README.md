# FizzBuzz Web Server

A robust, enterprise-grade web server providing FizzBuzz computation services via a RESTful API.

## Features

- **Multi-Engine Execution**: Seamlessly switch between TypeScript, Rust (WASM), and Lean 4 engines.
- **RESTful API**: Simple endpoints for single and range computations with validation.
- **Log Forwarding**: Asynchronously sends request metadata to the `analytics-service` for observability.
- **Health Checks**: Standard `/health` endpoint for monitoring and orchestration.
- **CORS Support**: Configured for secure access from multiple frontends.

## Tech Stack

- **Runtime**: Node.js 24.14.1
- **Framework**: Express.js
- **Validation**: Zod (via `@fizzbuzz/web-server` internal logic)
- **Logic Engine**: `@fizzbuzz/core-logic`

## Getting Started

### Prerequisites

- Node.js 24.14.1
- pnpm

### Development

```bash
pnpm install
turbo dev
```

The server will be available at `http://localhost:3000`.

### Build

```bash
turbo build
turbo start
```

## API Reference

### `GET /health`

Returns the health status of the service.

### `GET /compute/:n`

Computes FizzBuzz for a single number.

- **Parameters**:
  - `n` (number): The number to compute.
- **Query Parameters**:
  - `engine` (string): The computation engine to use (`typescript`, `rust`, `lean`). Defaults to `typescript`.

### `GET /range?start=<start>&end=<end>&engine=<engine>`

Computes FizzBuzz for a range of numbers.

- **Query Parameters**:
  - `start` (number): The start of the range.
  - `end` (number): The end of the range.
  - `engine` (string): The computation engine to use (`typescript`, `rust`, `lean`). Defaults to `typescript`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port the server listens on | `3000` |
| `ANALYTICS_SERVICE_URL` | Endpoint for log forwarding | `http://analytics-service:3001/api/logs` |
