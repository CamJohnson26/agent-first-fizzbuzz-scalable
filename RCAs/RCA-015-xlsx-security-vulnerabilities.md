# RCA 015: High Severity Security Vulnerabilities in xlsx (SheetJS)

## Status
Completed

## Context
On 2026-04-16, a security scan identified two high-severity vulnerabilities in the `xlsx` (SheetJS) library used in the `web-dashboard` application for Excel exports. 
The vulnerabilities are:
1. **CVE-2023-30533**: Prototype Pollution (CVSS 7.5 HIGH). Fixed in version 0.19.3.
2. **CVE-2024-22363**: Regular Expression Denial of Service (ReDoS) (CVSS 7.5 HIGH). Fixed in version 0.20.2.

The project was using version `0.18.5`, which is the last version published to the public NPM registry under the `xlsx` package name. SheetJS moved to its own CDN for subsequent versions.

## Root Cause Analysis

### 1. Dependency Obsolescence
The project relied on the `xlsx` package from NPM. SheetJS (the maintainers) transitioned to a private CDN (`cdn.sheetjs.com`) and stopped pushing security updates to the public NPM `xlsx` package after version `0.18.5`. This led to a "silent" obsolescence where standard dependency updates (e.g., `pnpm update`) would not find newer, secure versions.

### 2. Lack of Automated Security Scanning
While the project has a `security-check` script, it may not have been run frequently enough or its output might have been ignored during recent feature development (F121 added Excel exports). The use of a legacy package version (`0.18.5`) should have been flagged during the introduction of the dependency.

### 3. Vulnerable Implementation
The Prototype Pollution vulnerability (CVE-2023-30533) allows attackers to inject properties into the global `Object.prototype` by providing specially crafted workbooks, potentially leading to Remote Code Execution (RCE) in Node.js environments or cross-site scripting (XSS) in browsers.
The ReDoS vulnerability (CVE-2024-22363) allows an attacker to cause a Denial of Service by providing a workbook that triggers catastrophic backtracking in SheetJS's internal regular expressions.

## Action Items

- [x] **Immediate**: Upgrade `xlsx` to version `0.20.2` using the official SheetJS CDN.
- [x] **Validation**: Verify that Excel export functionality remains intact with the new version.
- [x] **Documentation**: Write an RCA (this document) and a blog post to inform the team and users.
- [ ] **Infrastructure**: Update the CI pipeline to include a mandatory `pnpm audit` and ensure it checks for CDN-hosted packages if possible.
- [ ] **Policy**: Add a rule to `CLAUDE.md` or `GUIDELINES.md` that explicitly forbids using legacy NPM packages known to be unmaintained (like `xlsx` NPM package).

## Next Steps
1. Perform a full project build and test run to ensure no regressions. ✓
2. Merge the security fix into the `main` branch. *
3. Publish the blog post about the security upgrade. *
