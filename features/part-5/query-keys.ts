export const PART_5_QUERY_KEYS = {
  all: ['part-5'] as const,
  stats: ['part-5', 'stats'] as const,
  availableCountRoot: ['part-5', 'available-count'] as const,
  availableCount: (status: string, questionType?: string) =>
    ['part-5', 'available-count', status, questionType || 'ALL'] as const,
  practice: (params: { status?: string; questionType?: string; limit?: number }) =>
    ['part-5', 'practice', params] as const,
};
