import { useQuery } from '@tanstack/react-query';
import { part6Service } from '@/services';
import { PART_6_QUERY_KEYS } from '../query-keys';
import type { Part6StatsDetail } from '../types';

export const useGetPart6Stats = () => {
  return useQuery<Part6StatsDetail>({
    queryKey: PART_6_QUERY_KEYS.stats,
    queryFn: () => part6Service.getStats(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

