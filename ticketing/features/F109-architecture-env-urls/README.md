# Feature: Architecture - Environment Configurable API URLs

## Description
`web-dashboard` has `API_BASE` and `ANALYTICS_BASE` hardcoded to `localhost`. This prevents the application from being deployed to production or other environments without manual code changes.

## Status
Proposed

## Next Features (Todo)
- [ ] Implement environment variable support for Vite (using `.env` and `import.meta.env`)
- [ ] Replace hardcoded strings in `App.tsx` with environment variables
- [ ] Document required environment variables in README
