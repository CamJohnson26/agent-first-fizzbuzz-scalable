#!/bin/bash
# Identify and remove local branches that have been merged into the current branch (e.g., main)
echo "Current branch: $(git branch --show-current)"
if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "WARNING: You are not on the 'main' branch. Cleanup may be incomplete or incorrect."
fi

echo "Identifying merged branches..."
git branch --merged | grep -v "\*" | grep -v "main" | xargs -r git branch -d

echo "Pruning remote branches..."
git remote prune origin
