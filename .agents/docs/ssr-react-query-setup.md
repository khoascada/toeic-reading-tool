# SSR với React Query - Hướng dẫn chung

Tài liệu này mô tả pattern chung để prefetch dữ liệu ở server và hydrate sang client trong starter hiện tại.

## Mục tiêu

- Server prefetch dữ liệu cho lần render đầu
- Client tiếp tục dùng cùng query key để tránh loading flash
- Tách rõ service layer, query key và hook client

## 1. Service layer

Tách hàm fetch dùng được cho server hoặc tạo riêng hàm SSR nếu cần headers/cookies đặc thù.

```ts
export const articleService = {
  async list(params: ArticleListParams) {
    const response = await api.get<ArticleListResponse>('/articles', { params });
    return response.data;
  },
};
```

## 2. Query keys

```ts
export const articleQueryKeys = {
  list: (params: ArticleListParams) => ['articles', 'list', params] as const,
};
```

## 3. Client hook

```ts
'use client';

import { useQuery } from '@tanstack/react-query';

export const use-article-list = (params: ArticleListParams) => {
  return useQuery({
    queryKey: articleQueryKeys.list(params),
    queryFn: () => articleService.list(params),
  });
};
```

## 4. Server prefetch trong page hoặc layout

```tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query/get-query-client';

export default async function ArticlesPage() {
  const queryClient = getQueryClient();
  const params = { page: 1, pageSize: 10 };

  await queryClient.prefetchQuery({
    queryKey: articleQueryKeys.list(params),
    queryFn: () => articleService.list(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesView initialParams={params} />
    </HydrationBoundary>
  );
}
```

## 5. Verification

- Lần load đầu không bị loading flash ngoài dự kiến
- Query key giữa server và client khớp nhau
- Chuyển filter/page trên client vẫn fetch đúng
- Type-check pass nếu có thay đổi code

## Ghi chú

- Chỉ áp dụng SSR prefetch khi nó thực sự giúp UX hoặc SEO.
- Với màn hình thuần interactive, CSR đơn giản có thể là lựa chọn tốt hơn.
