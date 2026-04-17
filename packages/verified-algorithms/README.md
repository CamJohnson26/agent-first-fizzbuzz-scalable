# @fizzbuzz/verified-algorithms

Formally verified implementations of core FizzBuzz algorithms using the Lean 4 theorem solver.

## Features

- **Mathematical Certainty**: Prove that our FizzBuzz implementation is 100% correct according to formal specifications.
- **Mission Critical**: For enterprise users who require formal verification of their logic.
- **Integrated Verification**: Built into our CI/CD pipeline to ensure every change remains verified.

## Tech Stack

- **Language**: Lean 4
- **Build Tool**: `lake`

## Getting Started

### Prerequisites

- Lean 4 and `elan`
- Lake

### Verification

```bash
turbo verify
```

This will run the Lean compiler and verify the proofs in the `lean` directory.

## Current Verified Proofs

The following properties are formally proven in `lean/Fizzbuzz/Basic.lean`:

- **`fizzbuzz_15`**: Proves that for any natural number `n`, if `n` is divisible by 15, then `fizzbuzz n` returns `"FizzBuzz"`.
- **`fizzbuzz_3`**: Proves that if `n` is divisible by 3 but **not** by 5, then `fizzbuzz n` returns `"Fizz"`.
- **`fizzbuzz_5`**: Proves that if `n` is divisible by 5 but **not** by 3, then `fizzbuzz n` returns `"Buzz"`.
- **`fizzbuzz_other`**: Proves that if `n` is neither divisible by 3 nor by 5, then `fizzbuzz n` returns the string representation of `n`.

These proofs provide mathematical certainty that our implementation matches the classic FizzBuzz specification.

## Directory Structure

- `lean/`: The Lean 4 project directory.
  - `Fizzbuzz/`: Contains the core logic and proofs.
    - `Basic.lean`: The primary implementation and theorem definitions.
  - `Main.lean`: An executable entry point for demonstrating the verified code.
  - `lakefile.toml`: Build configuration for the Lean project.
