# Security Policy

## Reporting a Vulnerability

If you find a security vulnerability, please report it privately. Do not open a public issue.
You can reach out to the project maintainers directly.

## Security Practices

We are committed to maintaining a high security posture for the Agent-First FizzBuzz Scalable project.

### Automated Scanning

We use the following tools to ensure security:

- **pnpm audit**: We run `pnpm audit --audit-level high` in our CI/CD pipeline and encourage developers to run it locally before submitting pull requests.
- **Trivy**: We use Trivy to scan our repository for secrets and misconfigurations in the CI/CD pipeline using the `aquasecurity/trivy-action`.

### Local Security Checks

Developers should run the following command to check for security issues locally:

```bash
pnpm run security-check
```

This command runs `pnpm audit` and a local file system scan with Trivy. Note that you must have [Trivy](https://github.com/aquasecurity/trivy) installed locally for the Trivy scan to work.

### Handling Findings

1.  **Vulnerability in dependencies**: If `pnpm audit` reports a vulnerability, try upgrading the affected package using `pnpm update <package-name>`.
2.  **Secret leaks**: If Trivy reports a secret leak, invalidate the secret immediately and remove it from the git history if it was committed. Use tools like `git filter-repo` or `BFG Repo-Cleaner` to clean the history.
3.  **Misconfigurations**: Follow the recommendations provided by Trivy to fix any misconfigurations in Dockerfiles or other infrastructure files.

## Guidelines for Agents

Autonomous agents working on this codebase must ensure that any new dependencies introduced do not have high or critical vulnerabilities.
Agents must also be careful not to commit any secrets or API keys.
If an agent's change fails the security check in the CI, the agent must address the security findings before the PR can be merged.
