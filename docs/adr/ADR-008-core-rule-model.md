# ADR 008: Core Rule Model for Generalized FizzBuzz

## Status
Proposed

## Context
Traditional FizzBuzz is often implemented as a series of hardcoded divisibility checks (e.g., `if n % 3 == 0`). This approach lacks the flexibility required for a truly scalable and generalized system where:
- The input domain may not be limited to integers (e.g., records, streams).
- Predicates may involve complex logic beyond simple modulo operations.
- Output composition needs to be configurable and extensible.
- Correctness must be verifiable under fault conditions.

## Decision
We will adopt a generalized rule-evaluation model that separates the evaluation engine from the rules themselves.

1. **Rule Abstraction**: A rule consists of:
   - **Predicate**: A test that determines if the rule matches the input.
   - **Renderer**: An emitter that produces an output if the rule matches.
   - **Priority**: A numeric value to determine the order of evaluation or composition.

2. **Engine Architecture**: The engine is responsible for:
   - Orchestrating rule evaluation.
   - Using a **Composer** to combine matched outputs.
   - Providing a **Fallback** mechanism when no rules match.
   - Supporting optional **Validators** for input/output integrity.

3. **Separation of Concerns**: Policy (the rules) is injected into the mechanism (the engine), allowing for swappable arithmetic backends, formatting logic, and execution strategies.

## Consequences
- **Pros**:
  - **Extensibility**: New rules can be added without modifying the engine core.
  - **Testability**: Components (predicates, composers) are independently testable.
  - **Generality**: The engine can handle any data type `T` through its generic interface.
- **Cons**:
  - **Complexity**: Higher initial overhead compared to a simple loop with `if` statements.
  - **Performance**: Indirect evaluation may be slower than hardcoded logic (mitigated by optimized backends in ADR 009).
