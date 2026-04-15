# RFC 007: Agent-First Scalable Colors

## Summary
This RFC proposes a standardized color palette for the Agent-First FizzBuzz Scalable project. The palette is designed to be "agent-first" (high legibility, logical naming, and consistent across tools) and "scalable" (supports dark/light modes and various UI components).

## Motivation
Both the marketing site and web dashboard are currently unstyled and lack a cohesive visual identity. To scale the project and provide a professional experience for both humans and AI agents, we need a unified design language, starting with colors.

## Detailed Design

### Core Principles
1.  **High Contrast**: Ensure accessibility (WCAG 2.1 AA+) and easy parsing for AI vision models.
2.  **Logical Naming**: Use functional names (e.g., `primary`, `secondary`, `surface`, `border`) alongside semantic Tailwind shades.
3.  **Thematic Resonance**: Colors should evoke "agentic" vibes—efficiency, intelligence, and digital precision.

### The Palette

| Role | Tailwind Color | hex | Usage |
|------|----------------|-----|-------|
| **Primary** | `emerald-500` | `#10b981` | Action buttons, active states, brand identity. |
| **Secondary** | `cyan-500` | `#06b6d4` | Secondary actions, accents, information cues. |
| **Accent** | `violet-500` | `#8b5cf6` | Special highlights, AI-driven features. |
| **Neutral** | `slate` | - | Backgrounds, text, borders. |
| **Success** | `green-500` | `#22c55e` | Validations, positive states. |
| **Warning** | `amber-500` | `#f59e0b` | Warnings, pending states. |
| **Error** | `rose-500` | `#f43f5e` | Critical errors, destructive actions. |

### Semantic Mapping (Dark Mode Focus)
- `background`: `slate-950`
- `surface`: `slate-900`
- `surface-hover`: `slate-800`
- `text-primary`: `slate-50`
- `text-secondary`: `slate-400`
- `border`: `slate-800`

### Integration
- Export these as Tailwind CSS variables in the `@fizzbuzz/ui` package.
- Provide a `ThemeProvider` or similar mechanism to ensure consistency across `apps/`.

## Alternatives Considered
1.  **Classic Blue/Gray**: Too generic; doesn't feel "agent-first".
2.  **Terminal Green/Black**: Good for agents, but poor for marketing and general usability.
3.  **Full Custom Colors**: Harder to maintain than standard Tailwind scales; Tailwind shades are well-tested for contrast.
