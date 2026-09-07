'use client';

import { useAppQuery } from '@lib/hooks';
import { part5Service } from '@/services';
import type { Part5StatsDetail } from '@/types';
import { PART_5_QUERY_KEYS } from '../query-keys';

export function useGetPart5Stats() {
  return useAppQuery<Part5StatsDetail>({
    queryKey: PART_5_QUERY_KEYS.stats,
    queryFn: () => part5Service.getStats(),
  });
}
