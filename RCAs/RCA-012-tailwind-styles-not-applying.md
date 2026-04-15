# RCA 012: Tailwind Styles Not Applying to Apps

## Status
Completed

## Context
On 2026-04-14, it was reported that Tailwind styles were not being applied to the `marketing-landing-page` or the `web-dashboard`. Screenshots showed unstyled HTML content.

## Root Cause Analysis

### 1. Missing Vite Plugin
The project uses Tailwind 4.x (specifically `tailwindcss: ^4.2.2`), which transitions to a CSS-first configuration and integration via a Vite plugin. While the apps had the core `tailwindcss` package installed and were importing `@fizzbuzz/ui/styles.css` (which contains Tailwind 4 directives), they were missing the `@tailwindcss/vite` plugin in their `vite.config.ts`.

### 2. Silent Build Warnings
During previous builds, Vite/LightningCSS emitted warnings like `[lightningcss] Unknown at-rule @theme`. Because the build still "succeeded" (exit code 0), these warnings were overlooked. Without the Vite plugin, the Tailwind directives (`@import "tailwindcss"`, `@theme`) were treated as plain CSS and remained unprocessed in the final bundle, leading to no styles being generated.

## Action Items
- [x] **Installation**: Added `@tailwindcss/vite` as a devDependency to both `apps/marketing-landing-page` and `apps/web-dashboard`.
- [x] **Configuration**: Updated `vite.config.ts` in both applications to include and initialize the `tailwindcss()` plugin.
- [x] **Verification**: Confirmed that production builds no longer emit "Unknown at-rule" warnings and that the resulting CSS bundles are correctly processed.

## Next Steps
1. Monitor future builds for CSS processing warnings.
2. Ensure any new applications added to the workspace include the necessary Tailwind Vite plugin from the start.
