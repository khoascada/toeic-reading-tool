import { afterEach, vi } from 'vitest';

// Cleanup after each test if testing-library is present
afterEach(() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { cleanup } = require('@testing-library/react');
    cleanup();
  } catch {
    // ignore if testing-library dom is not installed
  }
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      pathname: '/',
      query: {},
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
