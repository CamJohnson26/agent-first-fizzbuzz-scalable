# Lean 4 FizzBuzz Verification

This directory contains the Lean 4 implementation and formal proofs for the FizzBuzz algorithm.

## Getting Started

### Prerequisites

You need to have [elan](https://github.com/leanprover/elan) installed, which is the version manager for Lean.

### Build & Verify

To build the project and verify all proofs, use `lake`:

```bash
lake build
```

The output will confirm if all theorems are successfully proven.

### Run Demonstration

To run the demonstration script that applies the verified logic:

```bash
lake exe fizzbuzz
```

## Project Structure

- `Fizzbuzz/Basic.lean`: Core implementation of `fizzbuzz` and formal proof theorems.
- `Fizzbuzz.lean`: Library entry point.
- `Main.lean`: Executable entry point.

## Formal Proofs

The project proves the correctness of the `fizzbuzz` function for all natural numbers `n`:

1. **Divisibility by 15**: Returns `"FizzBuzz"`.
2. **Divisibility by 3 (not 5)**: Returns `"Fizz"`.
3. **Divisibility by 5 (not 3)**: Returns `"Buzz"`.
4. **Otherwise**: Returns the string representation of the number.