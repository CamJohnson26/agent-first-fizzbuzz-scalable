# Agent Configuration & Development Guide

This guide describes the AI-first development process and how agents should interact with this codebase.

## Runtime & Tooling

- **Node.js**: Use version specified in `.node-version`. This version is strictly enforced by `scripts/check-node-version.js` across all core operations.
- **Environment Sync**: When updating the `.node-version` file, ensure all agents and developers synchronize their environment using a manager like `nvm` or `fnm`.
- **Package Manager**: Use `pnpm`.

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
