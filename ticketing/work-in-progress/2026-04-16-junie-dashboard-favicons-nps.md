# Session: Dashboard fixes, Favicons, and NPS fix

- Date: 2026-04-16
- Agent: Junie
- Task: F126 (Dashboard Icon Alignment, Favicons, NPS Fix)

## Objectives
- [x] Fix Icon Button alignment on dashboard
- [x] Add/Fix Favicons for both sites
- [x] Fix NPS feature and have it always open

## Progress Summary
- Step 1: Environment verified (Node 24.14.1)
- Step 2: Git worktree created (`feature/F126-dashboard-favicons-nps`)
- Step 3: Fixed icon button alignment in `App.tsx` (using `gap-2` and fixing refresh button squareness)
- Step 4: Added favicon links to both `web-dashboard` and `marketing-landing-page` index.html files
- Step 5: Fixed NPS feature to be always open and removed trigger logic
- Step 6: Verified with `turbo build` and `turbo test`

## Unfinished Work
- None
