import { useQuery } from '@tanstack/react-query';
import { part7Service } from '@/services';
import { PART_7_QUERY_KEYS } from '../query-keys';
import type { Part7StatsDetail } from '../types';

export const useGetPart7Stats = () => {
  return useQuery<Part7StatsDetail>({
    queryKey: PART_7_QUERY_KEYS.stats,
    queryFn: () => part7Service.getStats(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
