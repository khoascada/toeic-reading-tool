---
name: code-conventions
description: Project coding standards, stack guidelines, and development conventions for this reusable Next.js starter. Use this skill when writing business logic, API integrations, state management, docs tied to architecture, or any non-visual code.
---

# Code Conventions for the Next.js Starter

Skill này mô tả coding conventions cho starter hiện tại. Hãy bám vào code thật trong repo, không giả định thêm domain, module hay workflow từ project cũ.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 16 |
| Language | TypeScript 5 |
| UI Components | Radix UI |
| Styling | Tailwind CSS 4 |
| Client State | Zustand |
| Server State | TanStack React Query 5 |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Testing | Vitest + Testing Library |
| Storybook | Storybook 10 |

## Project Structure

```text
app/          # App Router entries, layouts, pages, metadata routes
components/   # UI primitives, shared UI, layouts
lib/          # Providers, configs, helpers, utilities, low-level infrastructure
public/       # Static assets
services/     # API/service layer
styles/       # Global styles
types/        # Shared types
```

Có thể tồn tại thêm thư mục khác trong repo, nhưng đừng áp đặt feature structure nếu code hiện tại không dùng nó.

## Core Rules

1. Dùng `kebab-case` cho file và folder.
2. Không dùng `any` nếu chưa rõ kiểu dữ liệu.
3. Ưu tiên type/interface rõ ràng ở boundary với API, storage, socket hoặc external input.
4. Không thêm abstraction sớm. Chỉ tách layer khi có lợi ích rõ ràng về reuse hoặc readability.
5. Bám import paths và aliases đang được repo hỗ trợ thực tế.

## Import Order

```ts
// 1. React / Next
import { Suspense } from 'react';
import Link from 'next/link';

// 2. Third-party packages
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Internal absolute imports
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api/client';

// 4. Relative imports
import { buildSearchParams } from './build-search-params';

// 5. Type-only imports
import type { SearchParams } from '@/types/search';
```

## Service Pattern

Service layer nên giữ đơn giản, rõ input/output, không lẫn UI concerns.

```ts
import { api } from '@/lib/api/client';
import type { UserProfile } from '@/types/user-profile';

export const profileService = {
  async getMe() {
    const response = await api.get<UserProfile>('/me');
    return response.data;
  },
};
```

## React Query Pattern

```ts
import { useQuery } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';

export const use-get-me = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: () => profileService.getMe(),
  });
};
```

Query keys phải ổn định, dễ đọc, và phản ánh đúng resource đang fetch.

## Validation Pattern

Nếu repo đang dùng `validateResponse` hoặc schema validation ở boundary quan trọng, chỉ áp dụng cho endpoint có blast radius cao như auth, identity, permission, feature flags hoặc config trọng yếu. Không biến validation thành nghi thức bắt buộc cho mọi list endpoint.

## Forms and Zod

```ts
import { z } from 'zod';

export const profileFormSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  email: z.email(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
```

## Naming

| Item | Convention | Example |
| --- | --- | --- |
| Components | kebab-case | `profile-card.tsx` |
| Hooks | kebab-case | `use-get-me.ts` |
| Services | kebab-case + `.service` | `profile.service.ts` |
| Helpers | kebab-case | `build-search-params.ts` |
| Schemas | kebab-case | `profile-form.schema.ts` |
| Folders | kebab-case | `shared-table/` |

## Comments

Comment chỉ dùng khi nó giúp người đọc hiểu nhanh hơn logic không tự hiển nhiên. Tránh comment mô tả điều code đã quá rõ.

Khi cần chia block:

```ts
// ---- Data fetching ----
// ---- Derived state ----
// ---- Handlers ----
```

## Testing

- Với logic thuần: ưu tiên unit test.
- Với component có interaction: ưu tiên Testing Library.
- Với pattern dùng lại nhiều nơi: thêm test khi risk regression đủ cao.

## Verification

Sau thay đổi non-trivial, chạy bước verify phù hợp nhất với phạm vi sửa:

- `npm run type-check`
- `npm run lint`
- `npm run test`
- search validation bằng `rg`

Không cần chạy tất cả mọi thứ nếu thay đổi chỉ là docs, nhưng phải có bằng chứng rằng rule mới không tự mâu thuẫn.
