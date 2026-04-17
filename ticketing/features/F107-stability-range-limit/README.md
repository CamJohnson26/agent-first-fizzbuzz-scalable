# Feature: [BUG] Stability - Range Computation Limit

## Description
The `rangeHandler` in `web-server` and the underlying `computeRange` in `core-logic` do not enforce a maximum range limit. This can lead to Out-Of-Memory (OOM) errors or Denial of Service (DoS) if a very large range is requested.

## Status
Proposed

## Next Features (Todo)
- [ ] Add `MAX_RANGE` constant to configuration
- [ ] Implement range validation in `rangeSchema` (zod)
- [ ] Add unit test for range limit enforcement
