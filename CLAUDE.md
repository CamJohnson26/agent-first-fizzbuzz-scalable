# Agent Configuration & Development Guide

This guide describes the AI-first development process and how agents should interact with this codebase.

## Runtime & Tooling

- **Node.js**: Use version specified in `.node-version`. This version is strictly enforced by `scripts/check-node-version.js` across all core operations.
- **Environment Sync**: When updating the `.node-version` file, ensure all agents and developers synchronize their environment using a manager like `nvm` or `fnm`. **Agents MUST NEVER downgrade project version requirements to match an outdated local environment.** If the environment does not match, run `nvm install` (or equivalent) using the provided `.nvmrc` before executing any core operations.
- **Package Manager**: Use `pnpm`.

## Agent Policy & Core Principles

To maintain a scalable and high-fidelity project, all agents must adhere to the following principles:

1. **Mandatory Agent Skills**: Agents MUST always use the relevant skills located in `.junie/skills/` before starting work. Specifically, the `feature-implementation` skill MUST be used for all feature development.
2. **Always Use Latest Packages**: Always upgrade to and use the latest stable LTS (Long Term Support) versions of all packages, tools, and runtimes for security, performance, and modern feature access. NEVER revert a package to an older version without an explicit RFC and approval.
3. **Full Implementation (No Skipping Steps)**: When implementing features or technologies, do not oversimplify or skip steps (e.g., skip tests, documentation, or proper project structuring). Follow the full standard lifecycle for each technology being introduced.
4. **Mandatory RCAs for Critical Bugs**: Any critical bug, regression, or high-severity incident MUST have a Root Cause Analysis (RCA) written in the `RCAs/` folder (e.g., `RCA-XXX-name.md`). This RCA should identify the root cause, create a timeline, and list permanent action items.
5. **Agent Integrity**: If an execution environment does not meet project requirements, the agent should attempt to upgrade the environment or clearly document the discrepancy, rather than modifying the project to match the inferior environment.
6. **Conflict Prevention & Git Strategy**:
   - **Git Worktrees**: Agents MUST always create a new `git worktree` before doing any work to minimize merge conflicts and ensure clean session isolation.
   - **Mandatory Code Commit**: Agents MUST always commit their work when finished at the end of every session. Uncommitted work is not permitted as it blocks other agents and causes state desynchronization.
   - **Branch Isolation**: When possible, work on dedicated feature branches before merging to `main`.

## Ticketing System Usage

The ticketing system is located in the `ticketing/` directory.

### Session Progress Tracking (Template)

When starting a session, create a file in `ticketing/work-in-progress/YYYY-MM-DD-agent-name-task-description.md` with the following template:

```markdown
# Session: [Short Description]

- Date: [YYYY-MM-DD]
- Agent: [Agent Name]
- Task: [Reference to ticketing/FEATURES.md or ticketing/features/ID]

## Objectives
- [ ] Task 1
- [ ] Task 2

## Progress Summary
- Step 1: Completed...
- Step 2: In progress...

## Unfinished Work
- [List things for the next agent session]
```

### Feature Folder Template

Each feature folder in `ticketing/features/` should contain a `README.md` with the following:

```markdown
# Feature: [Feature Name]

## Description
[Description of the feature]

## Status
[Proposed | In Progress | Done]

## Next Features (Todo)
- [ ] Task 1
- [ ] Task 2
```

## Documentation

### ADR (Architectural Decision Record) Template

Place in `docs/adr/ADR-XXX-name.md`:

```markdown
# ADR XXX: [Decision Title]

## Status
[Draft | Proposed | Accepted | Deprecated | Superseded]

## Context
[What is the problem we are solving?]

## Decision
[What is the chosen solution?]

## Consequences
[What are the pros and cons of this decision?]
```

### RFC (Request For Comments) Template

Place in `docs/rfc/RFC-XXX-name.md`:

```markdown
# RFC XXX: [RFC Title]

## Summary
[Brief summary of the proposed change]

## Motivation
[Why are we doing this?]

## Detailed Design
[How will it work?]

## Alternatives Considered
[What else did we think of?]
```

## Build and Deployment

### CI/CD Pipeline
GitHub Actions workflow is located at `.github/workflows/ci-cd.yml`.
It runs on every push to `main` and pull request.

- **CI**: Runs lint, build, and test.
- **CD**: Deploys `apps/marketing-landing-page/dist` to the `gh-pages` branch on push to `main`.

### Local Build Commands
- Environment setup: `nvm install && nvm use` (uses `.nvmrc`)
- Full project build: `pnpm build`
- Full project test: `pnpm test`
- Filtered build: `pnpm --filter <package-name> build`

## Code Conventions

Refer to **[CODE_CONVENTIONS.md](docs/CODE_CONVENTIONS.md)** for detailed coding standards, naming conventions, and formatting rules. All agents and developers must adhere to these standards to ensure consistency across the codebase.
