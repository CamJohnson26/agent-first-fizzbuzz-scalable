# Skill: Marketing Update

This skill provides mandatory steps and tools for generating high-impact, viral marketing content based on technical progress within the project (ADRs, RFCs, RCAs).

## Mandatory Steps

### 1. Identify Content Opportunities
- Scan `docs/adr/`, `docs/rfc/`, and `RCAs/` for significant decisions, proposals, or incidents that can be turned into a compelling story.
- Look for technical "battles," breakthroughs, or lessons learned that demonstrate expertise and transparency.

### 2. Gather Assets
- Use `web_search` to find high-quality, relevant images for the blog post.
- Identify key technical terms, metrics, and "salsy" language to include.

### 3. Draft the Blog Post
- **Clickbait Title:** Write a headline that demands attention (e.g., "STOP Doing X! Our New ADR Just Changed the Game!").
- **High Impact Content:** Use long-form, entertaining language. Focus on the "why," the struggle, and the ultimate triumph.
- **Salesy Tone:** Highlight the benefits for the enterprise and the competitive advantage.
- **Viral Elements:** Use bold text, emojis, and clear call-to-actions.

### 4. Implementation
- Add the post to `apps/marketing-landing-page/src/data/manualPosts.ts`.
- Ensure it is properly tagged and formatted.
- Verify that the image URL is correct and visually appealing.

## Provided Tools
Use `npx agent-browser` or `web_search` to find relevant marketing images.

## Example Blog Post Structure
```markdown
# [Viral Title]
[Hook: Identify a major pain point]
[The Conflict: Describe the challenge found in the ADR/RFC/RCA]
[The Solution: Our revolutionary decision/fix]
[The Result: Massive ROI, speed, and certainty]
[CTA: Join the revolution]
```
