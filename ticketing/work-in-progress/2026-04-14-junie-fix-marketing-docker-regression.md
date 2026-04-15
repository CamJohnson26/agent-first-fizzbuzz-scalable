# Session: Fix Marketing Site Docker Regression

- Date: 2026-04-14
- Agent: Junie
- Task: Fix marketing site Docker build error (index.html already exists)

## Objectives
- [x] Reproduce Docker build error: `ln: index.html: File exists`
- [x] Fix `apps/marketing-landing-page/Dockerfile` by using `ln -sf` or clearing the target directory
- [x] Verify Docker build succeeds
- [x] Update RCA-011 with regression details

## Progress Summary
- Step 1: Investigated issue (confirmed `index.html` exists in nginx base image)
- Step 2: Confirmed Docker is available in the environment
- Step 3: Reproduced build error with `docker compose build`
- Step 4: Fixed `Dockerfile` by adding `RUN rm -rf ./*` and using `ln -sf`
- Step 5: Verified successful build

## Unfinished Work
- None.
