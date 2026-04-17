# Skill: Create Release

This skill provides mandatory steps and tools for managing the project's release lifecycle, including documentation updates, GitHub releases, and release announcements.

## Mandatory Steps

### 1. Version Update
- Increment the version number in `package.json` according to SemVer principles.
- Use `pnpm version <patch|minor|major>` to update the version and create a tag.

### 2. Documentation Update
- Update `CHANGELOG.md` with the new version and a summary of changes since the last release.
- Ensure all relevant README files and internal documentation are up to date.

### 3. GitHub Release
- Push the new tag to GitHub: `git push origin --tags`.
- Create a GitHub release using `gh release create <tag> --generate-notes`.
- Edit the generated notes to ensure they are professional and highlight the key features.

### 4. Blog Post Announcement
- Create a new blog post in `apps/marketing-landing-page/src/data/manualPosts.ts`.
- Describe the key features and improvements in the new release.
- Follow the high-impact, salesy style for "viral" potential.

## Example Usage
```bash
# Update version
pnpm version patch

# Push tags
git push origin --tags

# Create GitHub release
gh release create v1.2.3 --title "Release v1.2.3: The Scalability Update" --notes "This release includes significant improvements to the distributed engine."
```
