'use client';

import { useAppQuery } from '@lib/hooks';
import { part5Service } from '@/services';
import type { ReadingPassageItem, GetPart5PracticeParams } from '@/types';
import { PART_5_QUERY_KEYS } from '../query-keys';

export function useGetPart5Practice(params: GetPart5PracticeParams) {
  return useAppQuery<ReadingPassageItem[]>({
    queryKey: PART_5_QUERY_KEYS.practice(params),
    queryFn: () => part5Service.getPractice(params),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}
