# Skill: Feature Implementation

This skill provides mandatory steps and templates for implementing features in this repository, ensuring consistency, high fidelity, and proper documentation.

## Mandatory Steps

### 1. Environment Verification
- Check `.node-version` and ensure your environment matches. Run `nvm install` if necessary.
- Use `pnpm` for package management (installing, adding dependencies) and `turbo` for task execution (build, test, lint).

### 2. Isolation & Conflict Prevention
- **Git Worktree**: Always create a new `git worktree` before starting work.
- **Branching**: Work on a dedicated feature branch (e.g., `feature/FXXX-description`).

### 3. Session Tracking
- Create a session log in `ticketing/work-in-progress/YYYY-MM-DD-agent-name-task-description.md`.
- Use the template provided in `AGENTS.md`.

### 4. Feature Documentation
- Ensure a feature folder exists in `ticketing/features/FXXX-feature-name/`.
- Maintain a `README.md` in the feature folder using the template in `AGENTS.md`.

### 5. Architectural Alignment
- For significant changes, create an **ADR** (Architectural Decision Record) in `docs/adr/`.
- For proposed complex changes, create an **RFC** (Request For Comments) in `docs/rfc/`.

### 6. Full Implementation
- Do not skip tests, documentation, or proper project structuring.
- Always use the latest stable LTS versions of packages.
- Ensure the project builds (`turbo build`) and tests pass (`turbo test`) before finishing.

### 7. Completion & Commitment
- **Mandatory Commit**: Always commit your work at the end of the session.
- **Co-authored-by**: Include the `Co-authored-by: Junie <junie@jetbrains.com>` trailer in your commit message.
- If a critical bug was fixed, write an **RCA** (Root Cause Analysis) in `RCAs/`.

## Reference Files
- `AGENTS.md`: Full policy and guide.
- `ticketing/FEATURES.md`: Master list of features.
