export const PART_6_QUERY_KEYS = {
  all: ['part-6'] as const,
  stats: ['part-6', 'stats'] as const,
  passageIdsRoot: ['part-6', 'passage-ids'] as const,
  passageIds: (status?: string) => ['part-6', 'passage-ids', status || 'ALL'] as const,
  passageRoot: ['part-6', 'passage'] as const,
  passage: (id: number) => ['part-6', 'passage', id] as const,
};
