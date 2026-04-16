# Feature: F083 Company Blog

## Description
Implement a company blog for the marketing landing page that automatically converts ADRs, RFCs, and RCAs into blog posts. This ensures that technical decisions and engineering culture are visible to potential customers and talent.

## Status
Done

## Accomplishments
- [x] Integrated `react-markdown` and `remark-gfm` for high-fidelity document rendering.
- [x] Implemented a data generation script (`scripts/generate-blog-data.js`) to parse Markdown docs into blog content.
- [x] Created a merged blog data structure supporting both manual and auto-generated posts.
- [x] Updated Marketing Landing Page UI with a functional blog listing and detail view.
- [x] Verified full build on the target Node.js v25.9.0 environment.

## Next Features (Todo)
- [ ] Add RSS feed for blog posts.
- [ ] Implement search and filtering by document type (ADR/RFC/RCA).
- [ ] Add social sharing buttons for technical deep-dives.
