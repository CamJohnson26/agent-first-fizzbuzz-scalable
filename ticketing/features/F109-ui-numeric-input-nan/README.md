# Feature: [BUG] UI/UX - Numeric Input NaN Handling

## Description
In `web-dashboard`, when a user clears a numeric input (n, start, or end), the state becomes `NaN`. This causes the UI to display "NaN" or fail silently when trying to compute. The inputs should handle empty values gracefully (e.g., default to 1 or show a validation message).

## Status
Proposed

## Next Features (Todo)
- [ ] Update `App.tsx` state handlers to check for `NaN`
- [ ] Provide fallback values for empty inputs
- [ ] Add client-side validation feedback
