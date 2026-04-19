# Feature: Fly.io Stability Fix

## Description
This feature addresses the instability of Fly.io machines caused by the chat feature's resource demands. It involves disabling auto-stop/start behavior and increasing machine memory to prevent OOM crashes and service interruptions.

## Status
Done

## Next Features (Todo)
- [x] Disable auto-stop in `fly.toml`.
- [x] Increase memory to 2GB.
- [x] Optimize chat model loading.
