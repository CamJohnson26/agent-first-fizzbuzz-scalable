# FizzBuzz Core CLI

The primary command-line interface for performing FizzBuzz computations.

## Features

- **Single Computation**: Quickly compute the FizzBuzz value for any single number.
- **Range Computation**: Generate FizzBuzz values for a range of numbers.
- **Scalable Logic**: Powered by `@fizzbuzz/core-logic`.

## Getting Started

### Prerequisites

- Node.js 24.14.1
- pnpm

### Installation

```bash
pnpm install
```

### Usage

You can run the CLI directly using `tsx`:

```bash
pnpm dev compute 15
# Output: FizzBuzz

pnpm dev range 1 15
# Output:
# 1: 1
# 2: 2
# 3: Fizz
# ...
```

Or build and run:

```bash
pnpm build
pnpm start compute 15
```

## Commands

### `compute <number>`

Computes the FizzBuzz result for a single number.

- **Arguments**:
  - `<number>`: The number to compute.

### `range <start> <end>`

Computes the FizzBuzz result for a specified range of numbers.

- **Arguments**:
  - `<start>`: The starting number.
  - `<end>`: The ending number.
