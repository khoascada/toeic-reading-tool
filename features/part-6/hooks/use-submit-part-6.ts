import { useMutation, useQueryClient } from '@tanstack/react-query';
import { part6Service } from '@/services';
import { PART_6_QUERY_KEYS } from '../query-keys';
import type { SubmitPart6Payload } from '../types';

export const useSubmitPart6 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitPart6Payload) => part6Service.submit(payload),
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: PART_6_QUERY_KEYS.stats });
      queryClient.invalidateQueries({ queryKey: PART_6_QUERY_KEYS.passage(variables.passageId) });
      queryClient.invalidateQueries({ queryKey: PART_6_QUERY_KEYS.passageIdsRoot });
    },
  });
};

