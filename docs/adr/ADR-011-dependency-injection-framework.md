# ADR 011: Dependency Injection Framework

## Status
Accepted

## Context
As the FizzBuzz service grows in complexity and is used across multiple applications (CLI core, Web Server, etc.), manual instantiation of services and their dependencies becomes difficult to manage and test. We need a standardized way to handle dependency injection and inversion of control to improve modularity, testability, and scalability.

## Decision
We will adopt `tsyringe` as the primary Dependency Injection (DI) container for the TypeScript services.

- `tsyringe` is a lightweight, easy-to-use DI container from Microsoft that works well with TypeScript decorators.
- We will use constructor injection for all services.
- `reflect-metadata` will be used to support decorator metadata.
- Services will be marked with `@injectable()`.

## Consequences
- Pros:
    - Decouples service implementation from consumption.
    - Simplifies unit testing by allowing easy mocking/stubbing of dependencies.
    - Standardizes how services are instantiated and managed across the monorepo.
    - Lightweight with minimal runtime overhead.
- Cons:
    - Requires enabling `experimentalDecorators` and `emitDecoratorMetadata` in TypeScript configuration.
    - Adds a runtime dependency on `tsyringe` and `reflect-metadata`.
