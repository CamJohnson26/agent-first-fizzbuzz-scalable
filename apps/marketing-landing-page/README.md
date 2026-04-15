# Marketing Landing Page

A professional landing page for the Agent-First FizzBuzz Scalable project, built with React, Vite, and Tailwind CSS.

## Features

- Modern, responsive design.
- AI-first project showcase.
- Integrated with the monorepo build system.

## Build and Development

### Local Development

Run the development server:

```bash
pnpm --filter marketing-landing-page dev
```

### Build

Generate a production build:

```bash
pnpm --filter marketing-landing-page build
```

The output will be in the `dist/` directory.

### Testing

Run unit tests:

```bash
pnpm --filter marketing-landing-page test
```

## Deployment

This application is automatically deployed to GitHub Pages via GitHub Actions on every push to the `master` branch.
The live version can be found at: `https://[username].github.io/agent-first-fizzbuzz-scalable/`
