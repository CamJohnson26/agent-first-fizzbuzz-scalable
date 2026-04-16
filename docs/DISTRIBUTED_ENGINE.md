# Distributed Engine

The FizzBuzz Scalable Distributed Engine is designed to handle computational ranges that exceed the capacity of a single machine.

## Architecture

Our engine utilizes a master-worker architecture:

1. **Orchestrator**: Receives the request and splits the range into manageable chunks.
2. **Workers**: Independent nodes that process individual chunks in parallel.
3. **Aggregator**: Collects results from workers and assembles the final response.

## Edge Orchestration

For global deployments, we utilize Edge Orchestration to route requests to the nearest available worker, minimizing latency for the end user.

## Scalability Limits

Currently, the engine is tested up to **1 trillion (10^12)** operations per second across a global cluster of 500+ nodes.

## Configuration

You can configure the distribution strategy in your `fizzbuzz.config.js` file:

```javascript
module.exports = {
  distribution: {
    strategy: 'geo-optimized',
    maxWorkers: 100,
    chunkSize: 1000000
  }
};
```
