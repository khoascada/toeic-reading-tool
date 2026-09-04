// Single source of truth for breakpoints
// Used by both MUI theme and custom hooks

export const BREAKPOINTS = {
  xs: 0,
  sm: 640, // Tablet portrait
  md: 768, // Tablet landscape
  lg: 1024, // Desktop
  xl: 1280, // Desktop large
} as const;

// Helper to get media query strings
export const MEDIA_QUERIES = {
  // Max-width queries (mobile-first cutoffs)
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  tablet: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
} as const;
