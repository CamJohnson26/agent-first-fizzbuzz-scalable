# ADR 009: Precision and Scalable Evaluation Strategies

## Status
Proposed

## Context
As the FizzBuzz system generalizes, it must handle large rule sets and massive input ranges without compromising on precision or performance. Naive evaluation (checking every rule for every input) becomes a bottleneck, and standard floating-point or fixed-width arithmetic can introduce subtle errors (e.g., overflow, precision loss) that invalidate the "divisible by X" logic.

## Decision
We will implement pluggable execution backends and precise arithmetic semantics to ensure scalability and correctness.

1. **Explicit Arithmetic Service**: The engine will not rely on native operators directly. Instead, it will use an injectable `Arithmetic` service that defines modulo and other required operations. This allows swapping between:
   - Unbounded BigInt arithmetic.
   - Checked 64-bit machine arithmetic.
   - Formally verified arithmetic wrappers.

2. **Optimized Execution Strategies**:
   - **Period Reduction**: For sequential integer ranges with divisibility-only predicates, the engine will precompute the LCM (Least Common Multiple) of divisors to generate a cycle table.
   - **Counter-based Evaluation**: In environments where modulo is expensive, the engine will use stateful counters to track divisibility through addition/subtraction.
   - **Indexed Predicates**: For large, heterogeneous rule sets, rules will be grouped by type (e.g., range, divisibility, regex) and dispatched via an execution plan or decision tree.

3. **Compiled Rule Approach**: Rule configurations will be "compiled" into immutable runtime objects to avoid repeated parsing and to enable upfront validation of invariants.

## Consequences
- **Pros**:
  - **Performance**: Cycle tables and counter machines provide orders-of-magnitude speedups for sequential integer workloads.
  - **Precision**: Explicit arithmetic prevents silent overflow or coercion errors.
  - **Flexibility**: The same rule set can be executed using different strategies depending on the environment (e.g., embedded vs. cloud).
- **Cons**:
  - **Complexity**: Managing multiple backends increases codebase maintenance.
  - **Statefulness**: Counter-based strategies introduce state that must be carefully managed to prevent drift (see ADR 010).
