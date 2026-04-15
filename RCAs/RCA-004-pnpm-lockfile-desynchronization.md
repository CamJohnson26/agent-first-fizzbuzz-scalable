# RCA 004: PNPM Lockfile Desynchronization in CI

## Date: 2026-04-14
## Status: Closed
## Severity: Medium

## Executive Summary
On 2026-04-14, the GitHub Actions CI pipeline failed during the `pnpm install` step with the error `ERR_PNPM_OUTDATED_LOCKFILE`. This occurred because a new application (`apps/web-dashboard`) was introduced with its own `package.json`, but the root-level `pnpm-lock.yaml` was not updated and committed simultaneously. This resulted in an inconsistent state that prevented the "frozen-lockfile" install from succeeding in the CI environment.

## Incident Timeline
1. **Introduction of Web Dashboard (F009):** Agent created `apps/web-dashboard` and its `package.json` with several new dependencies.
2. **Partial Commit:** Agent committed the new application files but did not run `pnpm install` at the root level to synchronize the lockfile, or if they did, they failed to stage the changes to `pnpm-lock.yaml`.
3. **CI Failure:** The subsequent push triggered the CI pipeline, which failed at the installation stage because the lockfile did not match the new workspace state.
4. **Resolution:** A subsequent agent session identified the mismatch, ran `pnpm install --no-frozen-lockfile` to regenerate the lockfile, and committed the updated `pnpm-lock.yaml`.

## Root Cause Analysis
- **Monorepo Workflow Awareness:** In a pnpm monorepo, adding or modifying dependencies in *any* workspace package requires a synchronization of the single root `pnpm-lock.yaml`. The agent failed to follow this mandatory step.
- **Incomplete Staging:** The agent may have updated the lockfile locally but used selective `git add` commands that excluded the large lockfile, focusing only on the "feature code."
- **Lack of Local Pre-Commit Validation:** The agent did not run a full `pnpm install` check across all workspaces before committing, which would have revealed the discrepancy.

## Action Items
1. **Lockfile Synchronization:** (COMPLETED) Updated and committed `pnpm-lock.yaml` for all 6 workspace projects.
2. **CI Pipeline Robustness:** (PLANNED) Investigate if `turbo` can be used to more effectively manage installation steps or if a custom check script should be added to prevent pushing desynchronized lockfiles.
3. **Agent Guidelines Update:** (COMPLETED) Explicitly documented the requirement for lockfile synchronization in monorepo workflows within `AGENTS.md`.

## Lessons Learned
- **Lockfile is Immutable and Mandatory:** Every change to a `package.json` in a monorepo MUST be accompanied by a corresponding update to the root lockfile in the same commit.
- **Avoid Selective Staging of Configs:** When dependencies change, `pnpm-lock.yaml` should always be included in the commit.
- **CI/CD Mirroring:** Agents must assume CI will run with `--frozen-lockfile` and ensure their local state perfectly mirrors what is expected in CI.
