# Fly.io Deployment Guide (Consolidated Monolith)

This guide explains how to deploy the entire Agent-First FizzBuzz Scalable stack as a single consolidated Fly App.

## Monolith Architecture

To optimize for costs and performance, we use a "Monolith within a Container" strategy. A single Fly Machine runs an Nginx reverse proxy that routes traffic to multiple backend services and serves multiple static frontend applications.

### Routing Table

| Path | Target | Port | Type |
|------|--------|------|------|
| `/` | Marketing Landing Page | Nginx Static | Static |
| `/dashboard/` | Web Dashboard | Nginx Static | Static |
| `/api/` | Web Server (Express) | 3000 | API |
| `/analytics/` | Analytics Service (Express) | 3001 | API |
| `/lean/` | Lean Service (Express) | 3002 | API |
| `/health` | Monolith Health Check | Nginx | Internal |

## General Strategy

We use a root `Dockerfile.monolith` that builds all applications in the monorepo and packages them into a single production image.

### Deployment Process

1.  **Install `flyctl`**:
    ```bash
    curl -L https://fly.io/install.sh | sh
    ```
2.  **Authenticate**:
    ```bash
    fly auth login
    ```
3.  **Deploy from Root**:
    ```bash
    fly deploy --config fly.toml .
    ```

## Automated Deployments

We use GitHub Actions for automated deployments. On every push to `main`, the CI/CD pipeline builds the monolith image and deploys it to the `agent-first-fizzbuzz-scalable` app on Fly.io.

### GitHub Secrets Required
- `FLY_API_TOKEN`: Obtain from `fly tokens create deploy`.

## Local Development vs. Production

- **Local**: Services run on individual ports (3000, 3001, 3002, 5173, etc.). The `web-dashboard` uses Vite's proxy to reach the backends.
- **Production**: All traffic goes through port 8080 (internal) / 443 (public). Routing is handled by Nginx based on the path prefix.

## Infrastructure Components

- **Nginx**: reverse proxy and static file server.
- **scripts/start-monolith.sh**: Orchestration script that starts all Node.js backends and Nginx.
- **Dockerfile.monolith**: Multi-stage build including Rust, Lean, Node.js, and Python/Torch.

## Troubleshooting

Check the logs of the consolidated machine:
```bash
fly logs --app agent-first-fizzbuzz-scalable
```

You can also use the internal health checks:
```bash
curl https://agent-first-fizzbuzz-scalable.fly.dev/health
curl https://agent-first-fizzbuzz-scalable.fly.dev/api/health
```
