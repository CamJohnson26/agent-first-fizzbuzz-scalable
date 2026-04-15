# Ticketing System Usage

This system tracks the development of the Agent-First FizzBuzz Scalable project.

## Project Structure

- `ticketing/FEATURES.md`: Tracking candidates for new high-level features.
- `ticketing/features/`: Each major feature has its own folder here.
- `ticketing/work-in-progress/`: Tracking session-level work for each agent.

## How to use for Agents

1. **Before Starting a Task**: Search `ticketing/FEATURES.md` for candidate features, or check `ticketing/features/` for active ones.
2. **When Working on a Feature**: Create or update the relevant folder in `ticketing/features/`.
3. **Session Tracking**: Create a new session file in `ticketing/work-in-progress/` at the start of each agent session. Use the template provided in `CLAUDE.md`.
4. **Documentation**: Use `docs/adr/` for Architecture Decision Records and `docs/rfc/` for Request for Comments on large, breaking changes.

## Templates

See `CLAUDE.md` for Markdown templates for:
- Feature Definition
- Session Progress Tracking
- ADR / RFC
