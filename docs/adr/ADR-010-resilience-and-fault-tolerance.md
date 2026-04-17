# ADR 010: Resilience and Fault Tolerance in Rule Evaluation

## Status
Proposed

## Context
In high-assurance or unstable environments, software must detect and mitigate faults such as:
- **Bit-flips**: Random memory corruption affecting rule configurations or intermediate state (e.g., counters).
- **Configuration Corruption**: Malicious or accidental modification of rules in storage or transit.
- **Implementation Bugs**: Subtle errors in optimized backends (e.g., cycle table generation).

## Decision
We will integrate multiple layers of assurance and fault detection into the engine architecture.

1. **Rule Configuration Protection**:
   - Rules will be stored in a canonical, serialized format.
   - We will use SHA-256 checksums or digital signatures to verify rule integrity at startup and periodically during execution.
   - Rule objects will be strictly immutable once loaded.

2. **Fault Detection via Cross-Checking**:
   - The engine will support a **Cross-Check Mode** where two independent evaluators (e.g., a simple modulo-based reference and an optimized cycle-table backend) run in parallel.
   - If their outputs disagree for any input, the system will raise a `RuntimeError` or log a fault telemetry event.

3. **State Resynchronization**:
   - For stateful backends (like counter machines), the engine will periodically "resynchronize" state by recomputing counters from the absolute source index every $N$ iterations (e.g., $N=1024$). This prevents local bit-flips from causing permanent drift.

4. **Input/Output Validation**:
   - Pluggable `Validator` objects will enforce invariants (e.g., "output must not be empty if rules matched") to catch logical failures early.

## Consequences
- **Pros**:
  - **High Assurance**: Significant increase in reliability and trustworthiness of results.
  - **Observability**: Fault telemetry provides insights into environmental stability.
  - **Maintainability**: Cross-checking makes it easier to verify new optimizations against a known-good reference.
- **Cons**:
  - **Performance Overhead**: Dual execution and checksumming consume more CPU and memory resources.
  - **Implementation Effort**: Building redundant evaluators and validation logic requires more development time.
