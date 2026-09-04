---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
---

# Using Agent Skills

## Overview

Agent Skills is a collection of engineering workflow skills organized by development phase. Each skill encodes a specific process that senior engineers follow. This meta-skill helps you discover and apply the right skill for your current task.

## Skill Discovery

When a task arrives, identify the development phase and apply the corresponding skill. This tree lists ONLY the skills this project actually has installed — do not route to any skill not in this tree.

```
Task arrives
    │
    ├── Ask mơ hồ, thiếu who/why/success? ──────→ interview-me
    ├── Có concept thô, cần variants/stress-test? → idea-refine
    ├── Feature/change lớn, chưa có spec? ───────→ spec-driven-development
    │
    ├── Implementing code?
    │   ├── Business logic / API / hooks / services / state / naming / imports → code-conventions
    │   ├── UI — visual / design system (màu, font, radius, motion, layout) ──→ frontend-design
    │   ├── UI — engineering (a11y, state mgmt, component architecture) ───────→ frontend-ui-engineering
    │   ├── Refactor component API / compound / render props / context ───────→ vercel-composition-patterns
    │   └── Performance / re-render / data fetching / bundle ─────────────────→ vercel-react-best-practices
    │
    └── Review UI / a11y audit / UX check ───────────────────────────────────→ web-design-guidelines
```

### FE skill role split

Khi `frontend-design` và `frontend-ui-engineering` cùng áp dụng (build UI mới), phân vai như sau:

- **`frontend-design`** = nguồn chân lý về **visual / design system**: màu OKLCH từ `colors.css`, font Lexend/Fraunces, radius `0.8rem`, motion, Bento grid, glassmorphism.
- **`frontend-ui-engineering`** = nguồn chân lý về **engineering**: a11y WCAG 2.1 AA, state management, component architecture, loading/empty/error states.

**Khi xung đột về visual → `frontend-design` + `colors.css` THẮNG.** `frontend-ui-engineering` nói "dùng design system của project" — design system đó chính là `frontend-design`, không phải defaults chung chung của nó.

## Core Operating Behaviors

These behaviors apply at all times, across all skills. They are non-negotiable.

### 1. Surface Assumptions

Before implementing anything non-trivial, explicitly state your assumptions:

```
ASSUMPTIONS I'M MAKING:
1. [assumption about requirements]
2. [assumption about architecture]
3. [assumption about scope]
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The most common failure mode is making wrong assumptions and running with them unchecked. Surface uncertainty early — it's cheaper than rework.

### 2. Manage Confusion Actively

When you encounter inconsistencies, conflicting requirements, or unclear specifications:

1. **STOP.** Do not proceed with a guess.
2. Name the specific confusion.
3. Present the tradeoff or ask the clarifying question.
4. Wait for resolution before continuing.

**Bad:** Silently picking one interpretation and hoping it's right.
**Good:** "I see X in the spec but Y in the existing code. Which takes precedence?"

### 3. Push Back When Warranted

You are not a yes-machine. When an approach has clear problems:

- Point out the issue directly
- Explain the concrete downside (quantify when possible — "this adds ~200ms latency" not "this might be slower")
- Propose an alternative
- Accept the human's decision if they override with full information

Sycophancy is a failure mode. "Of course!" followed by implementing a bad idea helps no one. Honest technical disagreement is more valuable than false agreement.

### 4. Enforce Simplicity

Your natural tendency is to overcomplicate. Actively resist it.

Before finishing any implementation, ask:
- Can this be done in fewer lines?
- Are these abstractions earning their complexity?
- Would a staff engineer look at this and say "why didn't you just..."?

If you build 1000 lines and 100 would suffice, you have failed. Prefer the boring, obvious solution. Cleverness is expensive.

### 5. Maintain Scope Discipline

Touch only what you're asked to touch.

Do NOT:
- Remove comments you don't understand
- "Clean up" code orthogonal to the task
- Refactor adjacent systems as a side effect
- Delete code that seems unused without explicit approval
- Add features not in the spec because they "seem useful"

Your job is surgical precision, not unsolicited renovation.

### 6. Verify, Don't Assume

Every skill includes a verification step. A task is not complete until verification passes. "Seems right" is never sufficient — there must be evidence (passing tests, build output, runtime data).

## Failure Modes to Avoid

These are the subtle errors that look like productivity but create problems:

1. Making wrong assumptions without checking
2. Not managing your own confusion — plowing ahead when lost
3. Not surfacing inconsistencies you notice
4. Not presenting tradeoffs on non-obvious decisions
5. Being sycophantic ("Of course!") to approaches with clear problems
6. Overcomplicating code and APIs
7. Modifying code or comments orthogonal to the task
8. Removing things you don't fully understand
9. Building without a spec because "it's obvious"
10. Skipping verification because "it looks right"

## Skill Rules

1. **Check for an applicable skill before starting work.** Skills encode processes that prevent common mistakes.

2. **Skills are workflows, not suggestions.** Follow the steps in order. Don't skip verification steps.

3. **Multiple skills can apply.** A feature implementation might involve `interview-me` → `idea-refine` → `spec-driven-development` → `code-conventions` (logic) + `frontend-design`/`frontend-ui-engineering` (UI) → `web-design-guidelines` (review) in sequence.

4. **When in doubt, start with a spec.** If the task is non-trivial and there's no spec, begin with `spec-driven-development`.

## Lifecycle Sequence

For a complete feature, the typical skill sequence (using the skills this project has) is:

```
1. interview-me              → Extract what the user actually wants
2. idea-refine               → Refine vague ideas, stress-test assumptions
3. spec-driven-development   → Define what we're building
4. Implement:
     code-conventions          → Business logic / API / hooks / services / state
     frontend-design           → UI visual / design system
     frontend-ui-engineering   → UI engineering (a11y, state, architecture)
     vercel-composition-patterns / vercel-react-best-practices → component API / perf
5. web-design-guidelines     → Review UI / a11y / UX before merge
```

Not every task needs every skill. A small UI tweak might only need `frontend-design` + `frontend-ui-engineering`. A logic-only change might only need `code-conventions`.

## Quick Reference

| Phase | Skill | One-Line Summary |
|-------|-------|-----------------|
| Define | interview-me | Surface what the user actually wants before any plan, spec, or code exists |
| Define | idea-refine | Refine ideas through structured divergent and convergent thinking |
| Define | spec-driven-development | Requirements and acceptance criteria before code |
| Build | code-conventions | Business logic, API, hooks, services, state, naming, imports |
| Build | frontend-design | UI visual / design system (màu, font, radius, motion, layout) |
| Build | frontend-ui-engineering | UI engineering — a11y, state management, component architecture |
| Build | vercel-composition-patterns | Compound components, render props, context, component API |
| Build | vercel-react-best-practices | Performance, re-render, data fetching, bundle optimization |
| Review | web-design-guidelines | Review UI against Web Interface Guidelines (a11y, UX) |
