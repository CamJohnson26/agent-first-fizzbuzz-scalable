# Session: Enforce Mandatory PR Workflow

- Date: 2026-04-16
- Agent: Junie
- Task: F115 - Enforce Mandatory PRs and Forbid Direct Commits

## Objectives
- [x] Investigate why agents bypass PRs.
- [x] Update agent guidelines to forbid local merges and direct commits to main.
- [x] Create RCA for process failure.
- [x] Demonstrate the PR workflow using `gh`.

## Progress Summary
- Step 1: Investigated documentation and found ambiguous instructions in `AGENTS.md` and `CLAUDE.md`.
- Step 2: Strengthened documentation to explicitly forbid local merges and direct commits to `main`.
- Step 3: Required the use of `gh pr create` and `gh pr merge --auto`.
- Step 4: Created RCA-014.
- Step 5: Demonstrated the new workflow by creating this session log and opening a PR.

## Unfinished Work
- None.
