import { useMutation, useQueryClient } from '@tanstack/react-query';
import { part7Service } from '@/services';
import { PART_7_QUERY_KEYS } from '../query-keys';
import type { SubmitPart7Payload } from '../types';

export const useSubmitPart7 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitPart7Payload) => part7Service.submit(payload),
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: PART_7_QUERY_KEYS.stats });
      queryClient.invalidateQueries({ queryKey: PART_7_QUERY_KEYS.passage(variables.passageId) });
      queryClient.invalidateQueries({ queryKey: PART_7_QUERY_KEYS.passageIdsRoot });
    },
  });
};
