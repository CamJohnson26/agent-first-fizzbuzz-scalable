# ADR 012: SQLite Integration with better-sqlite3

## Status
Proposed

## Context
The project needs a local data storage and persistence layer to support a future event queue system and other features. SQLite was chosen for its simplicity and local-first nature.

## Decision
We will use `better-sqlite3` as the SQLite driver for the Node.js webserver. 
`better-sqlite3` is chosen because:
- It is the fastest SQLite driver for Node.js.
- It has a synchronous API which is easier to work with in many scenarios, while still being highly performant.
- It is well-maintained and widely used in the ecosystem.

The integration will be exposed via a `DatabaseService` using the `tsyringe` dependency injection framework.

## Consequences
- Pros: Simple local storage, high performance, synchronous API for easier logic handling.
- Cons: Synchronous API blocks the event loop for long-running queries (not expected for our current needs), requires compilation of native modules (handled by `pnpm`).
