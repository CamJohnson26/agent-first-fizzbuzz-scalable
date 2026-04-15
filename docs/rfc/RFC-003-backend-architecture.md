# RFC 003: Backend Architecture Improvements

## Summary
Enhance backend architecture by introducing Dependency Injection (DI), global error handling, and streaming responses for large data ranges.

## Motivation
- **Dependency Injection (F057):** Current services are directly instantiated, making it difficult to mock dependencies and test in isolation.
- **Global Error Handling (F058):** Redundant error handling across handlers creates boilerplate and risk of inconsistent responses.
- **Streaming Responses (F059):** Computing massive ranges in memory before responding can lead to performance issues and memory exhaustion.

## Detailed Design

### 1. Dependency Injection (DI) & Inversion of Control (F057)
- Use a lightweight DI pattern (like constructor injection) or a container library (like `Awilix`).
- Update `web-server` handlers to receive services as dependencies rather than instantiating them directly.

### 2. Global Error Handling Middleware (F058)
- Implement a centralized Express error-handling middleware.
- Create a custom `AppError` class to standardize error management across the system.
- Ensure Zod validation errors are handled consistently in one place.

### 3. Streamed Responses for Large Ranges (F059)
- Implement streaming responses (e.g., NDJSON or Server-Sent Events) for computing large FizzBuzz ranges.
- This allows clients to process data as it arrives and prevents the server from holding the entire result set in memory.

## Alternatives Considered
- **Keep current manual instantiation:** Rejected as it hinders testing and modularity.
- **Retain manual error catching in each handler:** Rejected as it violates DRY (Don't Repeat Yourself) principles.
- **Pagination for large ranges:** Possible alternative, but streaming is better for a "continuous" data processing engine.
