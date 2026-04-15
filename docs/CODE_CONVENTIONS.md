# Code Conventions & Style Guide

## Core Architectural Patterns

- **Monorepo Structure**: All services and applications should reside in the `apps/` directory, while shared libraries should reside in `packages/` (if/when introduced).
- **Service-Oriented Architecture**: Each service in `apps/` should be autonomous and independent.
- **Dependency Management**: Use `pnpm` for package management and `turbo` for build orchestration.
- **Clean Architecture**: Services should aim for separation of concerns between business logic, data access, and transport layers.

## Naming Conventions

### File & Directory Naming
- **Files**: Use kebab-case (e.g., `user-service.ts`, `auth-middleware.js`).
- **Directories**: Use kebab-case (e.g., `web-dashboard`, `ai-agent`).

### Code Identifiers
- **Classes**: Use PascalCase (e.g., `UserService`, `DatabaseConnection`).
- **Interfaces**: Use PascalCase with an `I` prefix (optional) or just PascalCase (e.g., `IUser`, `UserConfig`).
- **Functions & Variables**: Use camelCase (e.g., `getUserById`, `isLoggedIn`).
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`).

## Indentation & Formatting

- **Indentation**: Use 2 spaces for indentation. Do not use tabs.
- **Semicolons**: Use semicolons at the end of statements.
- **Quotes**: Use single quotes (`'`) for strings unless double quotes are required for escaping or JSON.
- **Trailing Commas**: Use trailing commas in multi-line arrays and objects for better git diffs.
- **Braces**: Use Egyptian brackets (opening brace on the same line as the statement).
- **Line Length**: Limit lines to approximately 80-100 characters.

## Language Specifics

### JavaScript/TypeScript
- Use `const` by default, `let` if reassignment is necessary. Avoid `var`.
- Use arrow functions for callbacks and anonymous functions.
- Prefer async/await over raw Promises or callbacks.

## Documentation

- Use JSDoc/TSDoc for documenting public APIs, classes, and complex functions.
- Keep comments concise and focused on the "why" rather than the "what".
