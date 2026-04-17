# ADR 007: Vercel Deployment Strategy

## Status
Accepted

## Context
The project needs to be deployable on Vercel. However, it's a monorepo with multiple applications, including static frontends and Express-based backend services. Currently, nothing is building or deploying correctly on Vercel because the root directory and build commands for each service are not configured, and Express applications need to be refactored for Vercel's serverless runtime.

## Decision
We will adopt the following strategy for Vercel deployment:

1. **Individual Projects**: Each application in the `apps/` directory will be treated as an individual project on Vercel.
2. **Root Directory Configuration**: For each Vercel project, the "Root Directory" should be set to the corresponding folder in `apps/` (e.g., `apps/marketing-landing-page`).
3. **Build Command**: The build command will be `pnpm build` (or `turbo build --filter <package-name>`) from the project root. Vercel handles monorepos by default if the root is correctly specified.
4. **Serverless Compatibility**: Express applications will be refactored to export their `app` instance instead of immediately calling `app.listen()`. This allows Vercel to treat them as serverless functions.
5. **`vercel.json` Configuration**: Each application will include a `vercel.json` file in its own directory to define its specific runtime settings, rewrites, and headers.

## Consequences
### Pros
- Unified deployment platform for both frontend and backend.
- Automatic scaling for backend services via serverless functions.
- Simple preview URLs for each pull request.

### Cons
- Backend services may face "cold start" issues characteristic of serverless environments.
- Each service requires manual setup of a project in Vercel (unless using Vercel CLI/API to automate).

## Future Work
- **Terraform Integration**: We plan to move the manual project configuration and environment variable management to Terraform to ensure better infrastructure consistency and automation.
