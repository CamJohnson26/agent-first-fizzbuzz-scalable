# Fly.io Deployment Guide

This guide explains how to deploy the individual services from this monorepo to Fly.io.

## General Strategy

Each application in the `apps/` directory is configured as a standalone Fly App. We use `fly.toml` for configuration and Docker for containerization.

### Deployment Process (per application)

1.  **Install `flyctl`**:
    ```bash
    curl -L https://fly.io/install.sh | sh
    ```
2.  **Authenticate**:
    ```bash
    fly auth login
    ```
3.  **Navigate to the App Directory**:
    ```bash
    cd apps/<app-name>
    ```
4.  **Create the Fly App** (if not already done):
    ```bash
    fly apps create agent-first-fizzbuzz-<app-short-name> --org personal
    ```
5.  **Deploy from Monorepo Root**:
    From the root of the monorepo, run:
    ```bash
    fly deploy --config apps/<app-name>/fly.toml .
    ```
    *Note: We use the root as the build context because our Dockerfiles use `turbo prune` to handle monorepo dependencies.*

### Application Details

| App Name | Fly App Name | Internal Port |
|----------|--------------|---------------|
| `web-server` | `agent-first-fizzbuzz-web-server` | 3000 |
| `analytics-service` | `agent-first-fizzbuzz-analytics` | 3001 |
| `lean-service` | `agent-first-fizzbuzz-lean` | 3002 |
| `marketing-landing-page` | `agent-first-fizzbuzz-marketing` | 80 |
| `web-dashboard` | `agent-first-fizzbuzz-web-dashboard` | 80 |

## Environment Variables

Configure environment variables using `fly secrets set` or in the Fly Dashboard.

- **For `web-dashboard`**:
  - `VITE_API_BASE`: `https://agent-first-fizzbuzz-web-server.fly.dev`
  - `VITE_ANALYTICS_BASE`: `https://agent-first-fizzbuzz-analytics.fly.dev`
- **For `marketing-landing-page`**:
  - `VITE_DASHBOARD_URL`: `https://agent-first-fizzbuzz-web-dashboard.fly.dev/`

## Automated Deployments

We use GitHub Actions for automated deployments. On every push to `main`, the CI/CD pipeline deploys all 5 applications to Fly.io.

Requirements for GitHub Actions:
- `FLY_API_TOKEN` must be added to GitHub Repository Secrets.

## Benefits of Fly.io over Serverless (Vercel)

- **Persistent VMs**: Our `web-server` can now maintain the state of its emulated v86 Virtual Machine, providing a persistent event queue.
- **Zero Cold Starts**: Long-running machines eliminate the latency of spinning up the VM environment on every request.
- **Full Control**: Direct access to CPU, memory, and networking configurations for high-performance execution.
