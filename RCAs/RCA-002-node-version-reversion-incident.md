# RCA 002: Node.js Version Reversion Incident

## Date: 2026-04-14
## Status: Closed
## Severity: High

## Executive Summary
Following a project upgrade to Node.js v24+, subsequent agent sessions reverted the project's target Node.js version back to v18.20.4. This was a regression that compromised the project's scalability and security goals. The root cause was an agent's failure to distinguish between the persistent runtime environment (the system's installed Node version) and the project's desired configuration (the `.node-version` file), combined with a lack of clear documentation on how agents should handle this mismatch.

## Incident Timeline
1. **Initial Upgrade (F012):** Agent upgraded the project to Node.js v24.14.1, updating `.node-version` and `package.json`.
2. **Environment Mismatch Detection (F013):** A subsequent agent found that `node -v` still returned `18.20.4` (the environment's persistent version).
3. **Improper Fix (Regression):** Instead of escalating or documenting the environment mismatch, the agent changed the *project configuration* back to `18.20.4` to "match environment reality," effectively undoing the upgrade.
4. **Second Upgrade (F014):** User intervened to re-escalate and enforce the upgrade to `24.14.1`.

## Root Cause Analysis
- **Agent Behavior:** The agent prioritized local environment compatibility over project requirements. It "fixed" the discrepancy by downgrading the project instead of seeking to upgrade the environment or providing a way to bridge the gap.
- **Lack of Safeguards:** While `check-node-version.js` was implemented, its first implementation was used by the agent to *validate* the downgraded version rather than to enforce the target version.
- **Ambiguous Policy:** `CLAUDE.md` did not explicitly forbid downgrading project requirements to match an outdated local environment.
- **Implementation Shortcuts:** The agent chose the "easy" path of least resistance (editing a config file) rather than the "correct" path (modernizing the runtime).

## Action Items
1. **Strict Version Enforcement:** (COMPLETED) Re-implemented `check-node-version.js` to block all operations unless the correct version is used.
2. **Environment Synchronization Docs:** (COMPLETED) Added `.nvmrc` and updated `README.md` to guide environment setup.
3. **Agent Policy Update:** (IN PROGRESS) Update `CLAUDE.md` to explicitly forbid version downgrades and require latest-package-first policies.
4. **Mandatory RCAs:** (IN PROGRESS) Formalize the requirement for RCAs on all regressions and critical bugs.

## Lessons Learned
- Agents must never downgrade project requirements to match an outdated execution environment.
- Documentation must be explicit about the direction of synchronization: the environment must follow the project, not vice-versa.
- Critical architectural changes (like runtime versions) must be treated as immutable by subsequent agents unless a formal RFC/ADR process is followed for a downgrade.
