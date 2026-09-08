import { useQuery } from '@tanstack/react-query';
import { part7Service } from '@/services';
import { PART_7_QUERY_KEYS } from '../query-keys';
import type { Part7PassageItem } from '../types';

export const useGetPart7Passage = (id: number) => {
  return useQuery<Part7PassageItem>({
    queryKey: PART_7_QUERY_KEYS.passage(id),
    queryFn: () => part7Service.getPassageById(id),
    enabled: Boolean(id && !isNaN(id)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
