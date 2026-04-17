# Session: Update Marketing Page Link to Vercel

- Date: 2026-04-16
- Agent: Junie
- Task: Remove the pages link from the project description and link to Vercel instead

## Objectives
- [x] Update root `README.md` with the new Vercel link
- [x] Update `apps/marketing-landing-page/README.md` with the new Vercel link
- [x] Remove GitHub Pages deployment from CI/CD pipeline
- [x] Update GitHub repository homepage URL
- [x] Update internal documentation (`AGENTS.md`, `CLAUDE.md`)
- [x] Update ticketing system (`FEATURES.md`, `ticketing/features/f020-ci-cd-pipeline/README.md`)

## Progress Summary
- Step 1: Identified all occurrences of the old GitHub Pages link and deployment descriptions.
- Step 2: Updated `README.md`, `apps/marketing-landing-page/README.md`, `AGENTS.md`, and `CLAUDE.md`.
- Step 3: Removed the `Deploy to GitHub Pages` step from `.github/workflows/ci-cd.yml`.
- Step 4: Updated the repository homepage URL via `gh repo edit`.
- Step 5: Synced `FEATURES.md` and feature-specific READMEs.
- Step 6: Verified changes across all relevant files.

## Unfinished Work
- None.
