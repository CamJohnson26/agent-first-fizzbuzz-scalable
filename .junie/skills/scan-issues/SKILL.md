# Skill: Scan Issues

This skill provides mandatory steps and tools for scanning the project for issues (code quality, bugs, security, improvements) and creating GitHub issues to track them.

## Mandatory Steps

### 1. Code Quality Scan
- Run `turbo lint` to find linting issues across the monorepo.
- Scan for `TODO`, `FIXME`, or `HACK` comments using `grep` or search tools.
- Identify "any" types in TypeScript files that should be replaced with proper interfaces.

### 2. Security Scan
- Run `pnpm audit` to check for known vulnerabilities in dependencies.
- Use any integrated security scanners (e.g., as mentioned in F045).

### 3. Functional & UX Audit
- Browse the application using `npx agent-browser` and identify any UX problems or bugs.
- Check for missing error handling or edge cases in core logic (e.g., FizzBuzz range limits).

### 4. Create GitHub Issues
- For every issue found, create a new GitHub issue using the `gh issue create` command.
- Follow the project's issue template if one exists.
- Label issues appropriately (e.g., `bug`, `security`, `enhancement`, `ux`).

## Provided Scripts

### `scripts/scan-todos.sh`
This script scans the codebase for `TODO`, `FIXME`, and `HACK` comments and lists them for review.

## Example Usage
```bash
# Scan for TODOs
bash .junie/skills/scan-issues/scripts/scan-todos.sh

# Create an issue
gh issue create --title "[BUG] Fix NaN handling in dashboard" --body "Empty numeric inputs cause NaN in the dashboard." --label "bug,ux"
```
