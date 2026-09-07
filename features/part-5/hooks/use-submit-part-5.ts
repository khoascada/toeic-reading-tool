'use client';

import { useAppMutation } from '@lib/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { part5Service } from '@/services';
import type { SubmitPart5Payload, SubmitPart5Response } from '@/types';
import { PART_5_QUERY_KEYS } from '../query-keys';

export function useSubmitPart5() {
  const queryClient = useQueryClient();

  return useAppMutation<SubmitPart5Response, Error, SubmitPart5Payload>({
    mutationFn: (payload: SubmitPart5Payload) => part5Service.submit(payload),
    onSuccess: () => {
      // Invalidate stats và available-count để dashboard cập nhật ngay lập tức
      queryClient.invalidateQueries({ queryKey: PART_5_QUERY_KEYS.stats });
      queryClient.invalidateQueries({ queryKey: PART_5_QUERY_KEYS.availableCountRoot });
    },
  });
}
