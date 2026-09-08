import { useQuery } from '@tanstack/react-query';
import { part6Service } from '@/services';
import { PART_6_QUERY_KEYS } from '../query-keys';
import type { Part6PassageItem } from '../types';

export const useGetPart6Passage = (id: number) => {
  return useQuery<Part6PassageItem>({
    queryKey: PART_6_QUERY_KEYS.passage(id),
    queryFn: () => part6Service.getPassageById(id),
    enabled: Boolean(id && !isNaN(id)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

