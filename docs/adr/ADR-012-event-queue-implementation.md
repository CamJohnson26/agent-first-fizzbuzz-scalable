# ADR 012: Event Queue Implementation in Emulated VM

## Status
Proposed

## Context
We need to add an event queue to the system. A unique requirement is that this queue must run inside a lightweight Linux machine emulated by `v86` within the `web-server` Express application. The emulated machine should be created when the app starts and deleted when it stops.

The constraints are:
- Must run in an x86 emulator (`v86`) written in JavaScript/Wasm.
- Performance will be limited due to emulation overhead.
- Memory is limited.
- Communication between the host (Node.js) and the guest (Linux) needs to be efficient.

## Options

### 1. Beanstalkd
- **Description**: A simple, fast work queue. Its interface is generic, but was originally designed for reducing the latency of page views in high-volume web applications by running time-consuming tasks asynchronously.
- **Pros**:
    - Extremely lightweight (written in C, very small memory footprint).
    - Simple text-based protocol.
    - Stable and mature.
- **Cons**:
    - Requires a C compiler to build or a pre-compiled binary for the guest OS.

### 2. Redis
- **Description**: An in-memory data structure store, used as a database, cache, and message broker.
- **Pros**:
    - Very popular, excellent client libraries.
    - Supports multiple queue patterns (Pub/Sub, Lists, Streams).
- **Cons**:
    - Heavier than Beanstalkd.
    - Might be overkill for a simple event queue in an emulated environment.

### 3. NATS
- **Description**: A cloud-native messaging system.
- **Pros**:
    - High performance.
    - Single binary (Go).
- **Cons**:
    - Go binaries can be large and memory-intensive for a small VM.

### 4. ZeroMQ
- **Description**: A high-performance asynchronous messaging library, aimed at use in distributed or concurrent applications.
- **Pros**:
    - Brokerless option available.
    - Very fast.
- **Cons**:
    - More of a library than a ready-to-use "application" (would need a small wrapper script).

### 5. SQLite-based Queue
- **Description**: Using an SQLite database file as a queue.
- **Pros**:
    - Very lightweight.
    - Persistent by default.
- **Cons**:
    - Not a "real" event queue application; requires custom logic to handle polling/notifications.

## Decision
We chose a **custom lightweight event queue implemented in Lua** running inside the emulated VM.

## Rationale
While Beanstalkd is lightweight, its binary dependencies (e.g., specific libc versions) make it harder to integrate into a minimal pre-built Buildroot image without a cross-compiler. Lua is already available in the chosen `v86` Buildroot image and provides enough functionality to implement a simple and efficient event queue. Communication between the Node.js host and the Lua application in the guest is handled via a dedicated serial port (`/dev/ttyS1`), which is simpler and more reliable than virtual networking in this emulated environment.

## Consequences
- **Pros**: Minimal resource usage in the emulated VM; simple integration via the beanstalkd protocol over a serial port or virtual network.
- **Cons**: We need to ensure a compatible binary is available in the Linux image used for `v86`.
