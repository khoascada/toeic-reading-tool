'use client';
import { MEDIA_QUERIES } from '@lib/constants/breakpoints';
import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string) {
  const matches = useSyncExternalStore(
    (onStoreChange) => {
      // Only subscribe on client
      if (typeof window === 'undefined') return () => {};

      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);

      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    () => {
      // Client: return actual value
      if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches;
      }
      // Server: return false to match initial client render
      return false;
    },
    () => {
      // Fallback for hydration: return false to match server
      return false;
    }
  );

  return matches;
}

// Device detection hooks (synced with MUI theme breakpoints)
export function useIsMobile() {
  return useMediaQuery(MEDIA_QUERIES.mobile);
}

export function useIsTablet() {
  return useMediaQuery(MEDIA_QUERIES.tablet);
}
