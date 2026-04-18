# Session: Event queue using v86 in web-server

- Date: 2026-04-17
- Agent: Junie
- Task: ticketing/features/F098-event-queue and ticketing/features/F099-virtual-machine-for-better-isolation

## Objectives
- [x] Write ADR for lightweight event queue options
- [x] Setup v86 emulated Linux machine in web-server
- [x] Verify VM starts with the app
- [x] Implement event queue inside VM (using Lua)
- [x] Add web-server API endpoints for event read/write
- [x] Test end-to-end functionality

## Progress Summary
- Step 1: Created worktree and branch.
- Step 2: Researched v86 and event queue options, wrote ADR 012.
- Step 3: Integrated v86 into web-server and verified Linux boot.
- Step 4: Implemented Lua-based event queue inside VM using dual serial ports.
- Step 5: Added Express endpoints and verified with Vitest.
