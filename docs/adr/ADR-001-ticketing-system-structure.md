# ADR 001: Agent-First Ticketing System Structure

## Status
Accepted

## Context
We need a way for multiple AI agents to collaborate on a single project over multiple sessions. Traditional ticketing systems like Jira or GitHub Issues might be too heavy or less accessible for direct local agent manipulation.

## Decision
We will use a filesystem-based ticketing system within the repository.
- `ticketing/FEATURES.md` for high-level roadmap.
- `ticketing/features/[ID]-[name]/README.md` for specific feature tracking.
- `ticketing/work-in-progress/` for agent session logging.
- `docs/adr/` and `docs/rfc/` for major architectural decisions.

## Consequences
- Pros: Version controlled, searchable by agents, no external dependencies, direct local edit.
- Cons: Manual management, potential merge conflicts on session logs (mitigated by unique filenames).
