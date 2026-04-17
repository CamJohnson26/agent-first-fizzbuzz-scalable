# @fizzbuzz/rust-engine

A lightning-fast Rust implementation of the FizzBuzz algorithm, compiled to WebAssembly for seamless Node.js integration.

## Features

- **Extreme Performance**: Leverages the power of Rust for heavy computations.
- **Node.js Integration**: Exposed as a WASM module.
- **Scalable**: Perfect for handling massive ranges that would block a standard JS event loop.

## Tech Stack

- **Language**: Rust
- **Target**: WASM
- **Build Tool**: `wasm-pack`

## Getting Started

### Prerequisites

- Rust and `cargo`
- `wasm-pack`
- Node.js 24.14.1

### Build

```bash
turbo build
```

The output will be generated in `dist/node`.

## Usage

```javascript
import { fizzbuzz } from '@fizzbuzz/rust-engine';

const result = fizzbuzz(15); // 'FizzBuzz'
```
