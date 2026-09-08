export const PART_7_QUERY_KEYS = {
  all: ['part-7'] as const,
  stats: ['part-7', 'stats'] as const,
  passageIdsRoot: ['part-7', 'passage-ids'] as const,
  passageIds: (status?: string) => ['part-7', 'passage-ids', status || 'ALL'] as const,
  passageRoot: ['part-7', 'passage'] as const,
  passage: (id: number) => ['part-7', 'passage', id] as const,
};
