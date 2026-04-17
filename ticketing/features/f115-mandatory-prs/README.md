# Feature: Enforce Mandatory PRs and Forbid Direct Commits (F115)

## Description
Agents were bypassing the PR workflow by performing local merges or direct commits to `main`. This feature enhances the documentation and agent skills to explicitly forbid these practices and enforce the use of `gh pr create` and `gh pr merge --auto`. It also explicitly requires that agents merge their work before closing their session.

## Status
Done

## Next Features (Todo)
- [x] Identify gaps in existing PR workflow documentation.
- [x] Update `AGENTS.md`, `CLAUDE.md`, and `CONTRIBUTING.md`.
- [x] Update `.junie/skills/feature-implementation/SKILL.md`.
- [x] Create RCA-014 for process failure.
- [x] Explicitly link session closure to merging.
- [x] Demonstrate the corrected workflow in the current session.
