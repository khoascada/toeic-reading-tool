# SSR với React Query - Hướng Dẫn Implementation

## 📋 Checklist Setup

### Bước 1: Service Layer - Tách API Function

**File**: `services/search.service.ts`

```ts
// Function cho SSR (server-side)
export const searchDatasetsSSR = async (params: SearchParams) => {
  return serverFetch<SearchResponse<MockDataset>>('/search/datasets', {
    params: { s: params.s, page: params.page, pageSize: params.pageSize },
  });
};

// Function cho CSR (client-side) - giữ nguyên hàm hiện tại
```

---

### Bước 2: Query Keys Factory

**File**: `features/search/hooks/query-keys.ts`

```ts
export const searchQueryKeys = {
  datasets: (params: { s: string; page: number; pageSize: number }) =>
    ['search', 'datasets', params] as const,
  users: (params: { s: string; page: number; pageSize: number }) =>
    ['search', 'users', params] as const,
};
```

---

### Bước 3: Custom Hook (Client-Side)

**File**: `features/search/hooks/use-dataset-search.ts`

```ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { searchService } from '@services/search.service';
import { searchQueryKeys } from './query-keys';

export const useDatasetSearch = (query: string, page: number, pageSize = 10) => {
  return useQuery({
    queryKey: searchQueryKeys.datasets({ s: query, page, pageSize }),
    queryFn: () => searchService.search({ s: query, type: 'dataset', page, pageSize }),
    enabled: !!query,
  });
};
```

---

### Bước 4: Prefetch ở Server Page

**File**: `app/[locale]/(app)/search/page.tsx`

```ts
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@lib/query/get-query-client';
import { searchQueryKeys } from '@features/search/hooks/query-keys';
import { searchDatasetsSSR } from '@services/search.service';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // ... existing code

  // ---- Prefetch Data ----
  const queryClient = getQueryClient();

  if (query) {
    await queryClient.prefetchQuery({
      queryKey: searchQueryKeys.datasets({ s: query, page: datasetPage, pageSize: 10 }),
      queryFn: () => searchDatasetsSSR({ s: query, page: datasetPage, pageSize: 10 }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container">
        {/* ... existing sections ... */}
        <DatasetResultsSection
          query={query}
          currentPage={datasetPage}
          createPageUrl={createDatasetPageUrl}
          locale={locale}
        />
      </div>
    </HydrationBoundary>
  );
}
```

---

### Bước 5: Refactor Component

**File**: `features/search/components/dataset-results-section.tsx`

**Tách thành 2 components:**

```tsx
// 1. Server Wrapper (optional - có thể skip nếu không cần)
export async function DatasetResultsSection(props) {
  return <DatasetResultsContent {...props} />;
}

// 2. Client Component - Main
'use client';

export function DatasetResultsContent({ query, currentPage, createPageUrl, locale }) {
  const t = useTranslations('search');

  // ---- Data Fetching ----
  const { data, isLoading, isError } = useDatasetSearch(query, currentPage, 10);

  // ---- Early Returns ----
  if (!query) return <EmptyState />;
  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState />;
  if (!data?.data?.length) return <NoResults />;

  // ---- Render ----
  return (/* existing JSX */);
}
```

---

## ✅ Verification Checklist

- [ ] Lần đầu load: Data hiển thị ngay (no loading flash)
- [ ] View page source: Có HTML với data
- [ ] Chuyển trang: Fetch mới ở client
- [ ] Quay lại trang cũ: Dùng cache (không refetch)
- [ ] Follow conventions: kebab-case, comments, translations

---

## 🏗️ Cấu Trúc Files

```
services/
  └── search.service.ts          # ✅ Đã có, thêm SSR function

features/search/
  ├── hooks/
  │   ├── query-keys.ts          # 🆕 Tạo mới
  │   └── use-dataset-search.ts  # 🆕 Tạo mới
  └── components/
      └── dataset-results-section.tsx  # 🔄 Refactor

app/[locale]/(app)/search/
  └── page.tsx                   # 🔄 Thêm prefetch + HydrationBoundary
```

---

## 🎯 Key Points

1. **Server + Client Functions**: Service phải hỗ trợ cả 2 môi trường
2. **Query Keys Consistency**: Server prefetch và client hook dùng cùng key
3. **HydrationBoundary**: Wrap component để truyền data từ server → client
4. **'use client'**: Component dùng hooks phải có directive này
