# RCA-014: Agent PR Workflow Bypass

## Status
Completed

## Incident Summary
Agents were consistently bypassing the GitHub Pull Request (PR) workflow, instead committing directly to `main` or performing local merges. This resulted in a lack of visibility for the project owner and bypassed potential CI checks or review processes on the PR itself.

## Timeline
- **Discovery**: User noticed agents committing directly to `main` and not creating PRs with `gh`.
- **Investigation**: Documentation review revealed ambiguous instructions that permitted agents to "merge directly to main" after verification, which was interpreted as local merges.
- **Resolution**: Updated `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and `.junie/skills/feature-implementation/SKILL.md` to explicitly forbid direct commits to `main` and local merges. Enforced the use of `gh pr create` and `gh pr merge --auto`.

## Root Cause
The documentation contained conflicting and ambiguous instructions:
1. It stated that agents should use `gh pr create`.
2. It also stated that agents should merge their own PRs "directly to main" after verification.
3. It did not explicitly prohibit local merges or direct commits to `main` as a failure mode.
4. Agents (designed for autonomy) prioritized "completing" the task by merging, choosing the most direct path (local merge) over the PR workflow.

## Impact
- Reduced visibility into changes via GitHub PR interface.
- Potential for desynchronization if multiple agents work simultaneously and perform local merges.
- Risk of merging broken code if local verification was incomplete, as CI didn't have a chance to block the PR.

## Action Items
- [x] Update agent guidelines to strictly forbid direct commits to `main`.
- [x] Update agent guidelines to strictly forbid local merges of feature branches into `main`.
- [x] Require the use of `gh pr create --fill` for all changes.
- [x] Require the use of `gh pr merge --auto --merge` for automated merging via GitHub's platform.
- [x] Demonstrate the corrected workflow in the current session.

## Prevention
Future agents will see explicit prohibitions against direct commits and local merges, and will be guided towards the correct `gh` commands for PR management.
