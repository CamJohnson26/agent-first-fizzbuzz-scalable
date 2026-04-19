# ADR 013: Migration to Fly.io for Persistent VM Support

## Status
Proposed

## Context
The project currently uses Vercel for deploying frontend and backend applications. While Vercel is excellent for serverless functions and static sites, it poses significant challenges for the `web-server` component, which relies on an emulated v86 Virtual Machine to manage an event queue.

On Vercel, the `web-server` runs as a serverless function. This means:
1. **Statelessness**: The v86 VM is spun up per request (or per warm instance), losing its state between requests. This is problematic for a persistent event queue.
2. **Cold Starts**: Initializing the v86 VM on every cold start adds significant latency.
3. **Resource Limits**: Vercel functions have strict execution time and memory limits that can interfere with heavy VM emulation.

We need a deployment platform that supports persistent, stateful VMs (containers) to host our core services reliably.

## Decision
We will migrate all applications and services from Vercel to **Fly.io**.

1. **Deployment Model**: Each application will be deployed as a Fly App using a `fly.toml` configuration.
2. **Containerization**: We will use Dockerfiles for all services. We already have a root multi-stage Dockerfile (F062) which can be adapted or used as a reference.
3. **Persistence**: Fly.io allows for persistent volumes if needed, although for the current `web-server` implementation, a long-running process (Machine) with in-memory persistence or SQLite (F041) will already be a major improvement over serverless.
4. **Unified Tooling**: We will use `flyctl` for deployments and management.
5. **CI/CD**: GitHub Actions will be updated to use Fly.io for deployments on push to `main`.

## Consequences
### Pros
- **Persistent State**: The `web-server` and its v86 VM can run as a long-lived process, maintaining the event queue state.
- **Improved Performance**: Eliminates Vercel cold starts for the VM initialization.
- **Scalability**: Fly.io provides fine-grained control over VM resources and regions.
- **Consistency**: All apps (frontend and backend) will use the same deployment paradigm.

### Cons
- **Management Overhead**: Moving away from Vercel's zero-config frontends might require slightly more manual configuration (though Fly.io is also developer-friendly).
- **Migration Effort**: Requires setting up `fly.toml` for 5+ applications and updating CI/CD.

## Supersedes
- ADR 007: Vercel Deployment Strategy
