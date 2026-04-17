# Skill: Cleanup Worktrees and Branches

This skill provides mandatory steps and tools for maintaining a clean development environment by removing old git worktrees and stale branches.

## Mandatory Steps

### 1. Identify Stale Worktrees
- List all current worktrees using `git worktree list`.
- Identify worktrees that are no longer in active use or belong to completed sessions.

### 2. Cleanup Worktrees
- Remove stale worktrees using `git worktree remove <path>`.
- Use `--force` if necessary, but with extreme caution.
- Ensure you are not in the worktree directory when removing it.

### 3. Identify Merged Branches
- Identify local branches that have been merged into `main`.
- Identify remote-tracking branches that no longer exist on the remote.

### 4. Cleanup Stale Branches
- Delete merged local branches using `git branch -d <branch-name>`.
- Prune stale remote-tracking branches using `git remote prune origin`.

## Provided Scripts

### `scripts/cleanup-merged.sh`
This script identifies and removes local branches that have been merged into the current branch (ideally run from `main`).

## Example Usage
```bash
# List worktrees
git worktree list

# Remove a worktree
git worktree remove /path/to/stale-worktree

# Prune remote branches
git remote prune origin
```
