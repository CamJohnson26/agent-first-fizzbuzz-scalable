# RCA 019: Fly.io Machine Instability and Chat OOM

## Status
Completed

## Incident Summary
Fly.io machines were frequently stopping or crashing, particularly when the chat feature was used. This resulted in service interruptions and a degraded user experience.

## Timeline
- **2026-04-19 14:00**: Observed that Fly.io was stopping one of the two machines, and the chat feature was failing with 500 errors.
- **2026-04-19 14:30**: Investigation revealed that the chat feature (Node.js + V86 + PyTorch) was exceeding the 1GB memory limit.
- **2026-04-19 14:45**: Discovered that the chat feature spawned a new Python/PyTorch process per request, leading to massive memory spikes.
- **2026-04-19 15:00**: Implemented stability fixes and optimized the chat feature.

## Root Cause
The combination of low memory limits (1GB), aggressive auto-stop policies, and inefficient process management in the chat feature (fork-exec of heavy PyTorch processes) caused the system to be unstable.

## Action Items
- [x] Increase memory to 2GB in `fly.toml`.
- [x] Disable `auto_stop_machines` and `auto_start_machines` in `fly.toml`.
- [x] Refactor transformer into a persistent service to avoid reloading PyTorch on every request.
- [ ] Monitor memory usage after deployment to ensure 2GB is sufficient for concurrent requests.
