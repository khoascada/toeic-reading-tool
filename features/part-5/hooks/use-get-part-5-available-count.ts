'use client';

import { useAppQuery } from '@lib/hooks';
import { part5Service } from '@/services';
import type { GetPart5AvailableCountParams } from '@/types';
import { PART_5_QUERY_KEYS } from '../query-keys';

export function useGetPart5AvailableCount({ status, questionType }: GetPart5AvailableCountParams) {
  return useAppQuery<{ count: number }>({
    queryKey: PART_5_QUERY_KEYS.availableCount(status, questionType),
    queryFn: () => part5Service.getAvailableCount({ status, questionType }),
  });
}
