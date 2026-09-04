---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.


English Version: Frontend Strategic Proposals

1. Aesthetic Direction: "Modern Edutech - Gamified Precision" :
The core vision is to blend a high-end, professional productivity tool aesthetic (like Linear or Vercel) with the high-energy feedback of a game.

Typography Strategy:
- Learning Content: Use Lexend, a variable font specifically designed to reduce visual stress and improve reading proficiency—ideal for a vocabulary app.
- Interface Accents: Pair it with a modern Serif like Fraunces to add a "premium editorial" feel, making the experience feel curated and high-quality.
- Color & Theme : use color like my colors.css; High-Impact Accents: Reserve vibrant colors strictly for success states (correct answers, level ups) to create a strong psychological reward.

## Layout & Components Guidelines

### Bento Grid Dashboard
- Redesign dashboard using **Bento Grid** layout
- Apply **Glassmorphism** effect with backdrop blur
- Use **ultra-thin borders** (`0.5px`) for sophisticated look

### Motion & Animation
- Use `tailwindcss-animate` for CSS-based animations
- Focus on **high-impact moments**: page load, state transitions
- Implement **staggered reveals** with `animation-delay`

### FSRS Feedback Animation
- Animate "Memory Lifecycle" when FSRS algorithm schedules a word
- **Hard grade**: slow, heavy exit animation
- **Easy grade**: quick, snappy card fly-out

## Component Styling Rules

1. **Use Radix UI primitives** from `components/ui/`
2. **Apply colors** from `styles/colors.css` CSS variables
3. **Support dark/light mode** via `next-themes`
4. **Maintain consistency** with existing design system

## Do's and Don'ts

### ✅ Do
- Use OKLCH color space from `colors.css`
- Apply semantic colors (`--success`, `--error`, `--warning`)
- Reserve vibrant colors for success states (reward feedback)
- Use `--primary` for interactive elements

### ❌ Don't
- Hardcode color values
- Use generic fonts (Arial, Inter, Roboto)
- Create purple gradients on white backgrounds
- Ignore dark mode support