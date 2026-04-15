# Agent Configuration & Development Guide

This guide describes the AI-first development process and how agents should interact with this codebase.

## Runtime & Tooling

- **Node.js**: Use version specified in `.node-version`. This version is strictly enforced by `scripts/check-node-version.js` across all core operations.
- **Environment Sync**: When updating the `.node-version` file, ensure all agents and developers synchronize their environment using a manager like `nvm` or `fnm`. **Agents MUST NEVER downgrade project version requirements to match an outdated local environment.**
- **Package Manager**: Use `pnpm`.

## Agent Policy & Core Principles

To maintain a scalable and high-fidelity project, all agents must adhere to the following principles:

1. **Always Use Latest Packages**: Always upgrade to and use the latest stable LTS (Long Term Support) versions of all packages, tools, and runtimes for security, performance, and modern feature access. NEVER revert a package to an older version without an explicit RFC and approval.
2. **Full Implementation (No Skipping Steps)**: When implementing features or technologies, do not oversimplify or skip steps (e.g., skip tests, documentation, or proper project structuring). Follow the full standard lifecycle for each technology being introduced.
3. **Mandatory RCAs for Critical Bugs**: Any critical bug, regression, or high-severity incident MUST have a Root Cause Analysis (RCA) written in the `RCAs/` folder (e.g., `RCA-XXX-name.md`). This RCA should identify the root cause, create a timeline, and list permanent action items.
4. **Agent Integrity**: If an execution environment does not meet project requirements, the agent should attempt to upgrade the environment or clearly document the discrepancy, rather than modifying the project to match the inferior environment.
5. **Conflict Prevention & Git Strategy**:
   - **Git Subtrees**: Agents MUST use `git subtree` or isolated subdirectories for their work to minimize merge conflicts when multiple agents are active. Ensure changes are scoped to the specific feature's subtree.
   - **Mandatory Code Check-in**: Agents MUST always check in their code at the end of every session. Uncommitted work is not permitted as it blocks other agents and causes state desynchronization.
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
