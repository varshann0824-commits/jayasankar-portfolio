# Jobsuit motion reference

The supplied reference was inspected at https://www.jobsuit.ai/. Its “How Jobsuit helps you get noticed” section uses a numbered, progressive feature sequence to make scrolling feel like a guided workflow.

This portfolio uses the pacing idea only. It does not copy Jobsuit’s copy, illustrations, logos, or assets.

Implemented original treatment:

- “Where I can contribute” now moves through three portfolio-specific steps: Build, Explain, Learn.
- “Selected work” now includes a SmartFarm journey: Understand, Build, Refine.
- Each step reveals as it enters the viewport using IntersectionObserver.
- The SmartFarm dashboard receives a restrained scroll-position parallax on desktop.
- Mobile stacks the sequence vertically and disables dashboard parallax for a calmer touch experience.
- Reduced-motion users retain a static, fully visible layout.

Reference: https://www.jobsuit.ai/
