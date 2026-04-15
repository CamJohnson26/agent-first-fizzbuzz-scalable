# RCA 001: Node.js Version Mismatch After Upgrade

## Status
Completed

## Context
On 2026-04-14, an attempt was made to upgrade the project's Node.js runtime from `18.20.4` to `24.14.1` (Krypton LTS). While the project configuration files (`.node-version`, `package.json`, `README.md`) were successfully updated and committed, subsequent checks revealed that `node -v` still returned `18.20.4`.

## Root Cause Analysis

### 1. Environment Limitations
The agent operates in a pre-configured environment where Node.js is managed by NVM (located at `/home/cameron/.nvm/versions/node/v18.20.4/bin/node`). The agent has the ability to modify project files but does not have the necessary permissions or tools (like a persistent shell with NVM activation) to change the system-level or session-level Node.js binary actually used by the executor.

### 2. Lack of Enforcement
The project relied on documentation and `engines` fields in `package.json`. However, these are advisory or checked only during specific package manager operations (like `pnpm install`). There was no active runtime check to prevent the code from running on an unsupported Node.js version.

### 3. Silent Failure
The "Upgrade" was considered "Done" because the *code* was updated, but the *runtime* verification was incomplete or misinterpreted. The agent assumed that updating `.node-version` would be sufficient for the environment to adapt, which is not true in this specific setup.

## Action Items

- [x] **Immediate**: Create a Node.js version enforcement script that runs before key tasks.
- [x] **Configuration**: Update `package.json` with a `preinstall` and custom script that explicitly fails if the Node.js version is incorrect.
- [x] **Stability**: Revert project target to `18.20.4` until environment upgrades are possible, ensuring a consistent development experience today.
- [ ] **Infrastructure**: Investigate if the environment can be configured to use a more modern Node.js version by default or if a custom NVM command can be issued at the start of each session (though this might be outside agent control).
- [ ] **Onboarding**: Update the "Getting Started" guide to include a manual Node.js check step for human developers.

## Next Steps
1. Implement `scripts/check-node-version.js`. ✓
2. Integrate this script into `package.json` scripts. ✓
3. Verify that it correctly identifies the environment and prevents mismatch. ✓
