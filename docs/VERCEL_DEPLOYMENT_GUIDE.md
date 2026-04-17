# Vercel Deployment Guide

This guide explains how to deploy the individual services from this monorepo to Vercel.

## General Strategy

Each application in the `apps/` directory is configured to be deployable as a standalone project on Vercel.

### Deployment Process (per application)

1.  **Create a New Project** on the Vercel Dashboard.
2.  **Connect the Repository**: Select this monorepo.
3.  **Configure Project Settings**:
    -   **Project Name**: e.g., `fizzbuzz-web-server`, `fizzbuzz-dashboard`, etc.
    -   **Framework Preset**:
        -   For `marketing-landing-page` and `web-dashboard`: **Vite**
        -   For Express services (`web-server`, `analytics-service`, `lean-service`): **Other** (Node.js)
    -   **Root Directory**: Set this to the path of the application (e.g., `apps/web-server`).
    -   **Build Command**: `pnpm build`
    -   **Output Directory**:
        -   For Vite apps: `dist`
        -   For Express services: Leave default (Vercel will use the serverless functions defined in `vercel.json`)
    -   **Install Command**: `pnpm install`
4.  **Environment Variables**: Add any required environment variables.
    -   **For `web-server`**:
        -   `ANALYTICS_SERVICE_URL`: URL of the deployed `analytics-service` (e.g., `https://analytics.vercel.app/api/logs`)
        -   `LEAN_SERVICE_URL`: URL of the deployed `lean-service` (e.g., `https://lean.vercel.app`)
    -   **For `web-dashboard`**:
        -   `VITE_API_BASE`: URL of the deployed `web-server` (e.g., `https://api.vercel.app`)
        -   `VITE_ANALYTICS_BASE`: URL of the deployed `analytics-service` (e.g., `https://analytics.vercel.app`)
    -   **For `lean-service`**:
        -   `LEAN_BINARY_PATH`: (Optional) Path to the lean binary if not in default location.

## Service-Specific Notes

### Express-based Services
Services like `web-server` and `analytics-service` have been refactored to export their `app` instance in `src/index.ts`. This allows Vercel to treat the entire application as a single serverless function via the `rewrites` configuration in `vercel.json`.

### Lean Service
The `lean-service` relies on a compiled Lean binary. When deploying to Vercel, ensure the `LEAN_BINARY_PATH` environment variable is correctly set and that the binary is compatible with the Vercel execution environment (Amazon Linux 2).

### Static Frontends
The `marketing-landing-page` and `web-dashboard` use Vite and are configured with a `vercel.json` to support client-side routing (SPAs) by rewriting all non-file requests to `index.html`.

## Automated Deployments
Each pull request will automatically trigger a preview deployment for all configured Vercel projects. Merging to `main` will trigger production deployments.

## Future Improvements: Infrastructure as Code (Terraform)

Currently, the Vercel projects and their environment variables are configured manually via the Vercel Dashboard. To improve scalability, reproducibility, and security, we should move this infrastructure configuration to **Terraform** using the [Vercel Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs).

This will allow us to:
-   Define projects, domains, and environment variables in code.
-   Track infrastructure changes via Git.
-   Ensure consistency across different environments (staging, production).
