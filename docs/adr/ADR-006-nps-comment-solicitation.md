# ADR 006: NPS Comment Solicitation Implementation

## Status
Proposed

## Context
We need to gather user sentiment and feedback through Net Promoter Score (NPS) and comments.
The goal is to implement a component in the `web-dashboard` that prompts the user for a score (0-10) and an optional comment after they have performed a few successful computations.

## Decision
- Implement a `NPSFeedback` component in `apps/web-dashboard/src/components/NPSFeedback.tsx`.
- The component will use `@fizzbuzz/ui` components for consistency.
- The component will be shown when a user has performed at least 3 computations in the current session.
- Once the user submits or dismisses the survey, it won't be shown again in the same session.
- Submissions will be sent to the `analytics-service` via the `POST /api/logs` endpoint with the following format:
  ```json
  {
    "service": "web-dashboard",
    "message": "NPS Submission",
    "level": "info",
    "metadata": {
      "score": number,
      "comment": string
    }
  }
  ```
- Vitest/React Testing Library will be used for unit tests.

## Consequences
- Pros: Provides valuable user feedback; integrated with existing analytics; minimal impact on UX if managed correctly.
- Cons: Might be intrusive if shown too frequently.
