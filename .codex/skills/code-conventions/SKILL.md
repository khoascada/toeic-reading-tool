---
name: code-conventions
description: Project coding standards, tech stack guidelines, and development conventions for the English Vocabulary learning application. Use this skill when writing business logic, API integrations, state management, or any non-UI code.
---

# Code Conventions for English Vocabulary App

This skill defines the coding standards and conventions for the English Vocabulary learning application.

## Tech Stack

| Category             | Technology               | Version |
| -------------------- | ------------------------ | ------- |
| Framework            | Next.js                  | 16      |
| Language             | TypeScript               | 5       |
| UI Components        | Radix UI                 | Latest  |
| Styling              | TailwindCSS              | 4       |
| State Management     | Zustand                  | 5       |
| Server State         | TanStack React Query     | 5       |
| Forms                | React Hook Form + Zod    | Latest  |
| HTTP Client          | Axios                    | Latest  |
| Testing              | Vitest + Testing Library | Latest  |
| Internationalization | next-intl                | 4       |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   └── [locale]/           # Internationalized routes
├── components/
│   ├── ui/                 # Reusable UI primitives (Radix-based)
│   ├── shared/             # Shared components across features
│   └── layouts/            # Layout components
├── features/               # Feature-based modules (see Feature Folder Convention)
├── services/               # Global API service functions
├── lib/                    # Utilities and configurations
│   ├── api/                # Axios client, auth refresh, server fetch
│   ├── schemas/            # Zod schemas for API response validation
│   ├── types/              # Shared lib types (ApiResponse, ApiError...)
│   └── utils/              # Shared utilities (devLog, validateResponse...)
├── types/                  # Global TypeScript types shared across features
├── messages/               # Translation files (en.json, vi.json)
└── styles/                 # Global styles and CSS variables
```

## Feature Folder Convention

Mỗi feature phải tuân thủ cấu trúc sau:

```
features/{name}/
├── components/     # UI components — bắt buộc nếu feature có UI
├── hooks/          # Custom hooks
│                   #   - Flat by default
│                   #   - Nested CHỈ KHI >10 hooks, theo domain concern
│                   #   - Đúng: socket/, gameplay/, data/, room/
│                   #   - Sai:  queries/, mutations/, effects/
├── store/          # Zustand stores — LUÔN singular dù có nhiều file
├── validations/    # Zod schemas cho form input
├── utils/          # Pure functions — không có React
├── constants/      # Constants scoped trong feature
└── index.ts        # Public API barrel — MANDATORY mọi feature
```

**Rules bắt buộc:**

1. **`index.ts` là mandatory** — define public API của feature. Không có → anyone có thể deep-import internal files.
2. **`store/` luôn singular** — kể cả feature có 2-3 store files, vẫn đặt trong 1 folder `store/`.
3. **Không tạo folder rỗng** — chỉ tạo folder khi có nội dung thực sự.
4. **Types** — type dùng chung nhiều feature để ở `types/` global; type private của feature để ở `features/{name}/types/`.
5. **Cross-feature import** — chỉ qua `index.ts` (public API), không deep-import.
6. **Intra-feature import** — dùng relative path, không dùng alias `@features/...` bên trong cùng feature.

## Internationalization (i18n) Rules

**CRITICAL**: All user-facing text MUST use translations.

### Usage Pattern

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('namespace');

  return <h1>{t('title')}</h1>;
}
```

### Translation Files

- `messages/en.json` - English translations
- `messages/vi.json` - Vietnamese translations

### Rules

1. **Never hardcode user-facing strings** - Always use `t('key')`
2. **Organize by namespace** - Group related translations under a common namespace
3. **Keep keys consistent** - Use the same key structure in both `en.json` and `vi.json`
4. **Use interpolation** for dynamic values: `t('greeting', { name: userName })`

## State Management Patterns

### Zustand Store Pattern

```tsx
// lib/stores/exampleStore.ts
import { create } from 'zustand';

interface ExampleState {
  data: DataType | null;
  isLoading: boolean;
  setData: (data: DataType) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  data: null,
  isLoading: false,
  setData: (data) => set({ data }),
}));
```

### React Query Pattern

```tsx
// features/[feature]/hooks/useFeatureData.ts
import { useQuery } from '@tanstack/react-query';
import { featureService } from '@/services/feature.service';

export const useFeatureData = (id: string) => {
  return useQuery({
    queryKey: ['feature', id],
    queryFn: () => featureService.getById(id),
  });
};
```

## Page-Specific Actions Pattern

**CRITICAL**: Separate UI and Logic by extracting page-specific handlers and states into custom hooks.

### File Naming Convention

For page components, create a corresponding actions hook file in the same directory:

- Page: `page.tsx`
- Actions hook: `use-[page-name]-actions.ts`

### Pattern Structure

```tsx
// app/[locale]/(app)/settings/profile/use-profile-page-actions.ts
import { useState } from 'react';
import { toast } from 'sonner';
import type { UseFormGetValues, UseFormReset, UseFormSetValue } from 'react-hook-form';

export interface ProfilePageActions {
  handler: {
    onSubmit: (
      data: FormData,
      getValues: UseFormGetValues<FormData>,
      dirtyFields: any
    ) => Promise<void>;
    handleCancel: (reset: UseFormReset<FormData>, refetchUser: () => void) => void;
    handleSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsEditing: (value: boolean) => void;
  };
  state: {
    isEditing: boolean;
    isPending: boolean;
    someDialogOpen: boolean;
    setSomeDialogOpen: (value: boolean) => void;
  };
}

export const useProfilePageActions = (t: any): ProfilePageActions => {
  // ---- States ----
  const [isEditing, setIsEditing] = useState(false);
  const [someDialogOpen, setSomeDialogOpen] = useState(false);

  // ---- Mutations ----
  const { mutate, isPending } = useSomeMutation();

  // ---- Handlers ----
  const onSubmit = async (
    data: FormData,
    getValues: UseFormGetValues<FormData>,
    dirtyFields: any
  ) => {
    try {
      await mutate(data);
      toast.success(t('success'));
      setIsEditing(false);
    } catch (err) {
      toast.error(t('errors.failed'));
    }
  };

  const handleCancel = (reset: UseFormReset<FormData>, refetchUser: () => void) => {
    reset();
    refetchUser();
    setIsEditing(false);
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSomeDialogOpen(true);
    }
  };

  return {
    handler: {
      onSubmit,
      handleCancel,
      handleSelectImage,
      setIsEditing,
    },
    state: {
      isEditing,
      isPending,
      someDialogOpen,
      setSomeDialogOpen,
    },
  };
};
```

### Usage in Page Component

```tsx
// app/[locale]/(app)/settings/profile/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useProfilePageActions } from './use-profile-page-actions';

const ProfilePage = () => {
  const t = useTranslations('settings.profiles');

  // ---- Handlers & States ----
  const {
    handler: { onSubmit, handleCancel, handleSelectImage, setIsEditing },
    state: { isEditing, isPending, someDialogOpen, setSomeDialogOpen },
  } = useProfilePageActions(t);

  // ---- Form ----
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { dirtyFields },
  } = useForm();

  // ---- Submit Wrapper ----
  const handleFormSubmit = (data: FormData) => {
    onSubmit(data, getValues, dirtyFields);
  };

  const handleCancelEdit = () => {
    handleCancel(reset, refetchUser);
  };

  // ---- Render ----
  return <form onSubmit={handleSubmit(handleFormSubmit)}>{/* UI components */}</form>;
};
```

### Rules

1. **Always separate page logic** - Extract handlers and state management into `use-[page-name]-actions.ts`
2. **Return structured object** - Group returns into `handler` and `state` objects
3. **Pass dependencies** - Pass form methods (reset, setValue, getValues) and callbacks (refetch) as parameters to handlers
4. **Type safety** - Define and export an interface for the hook's return type
5. **Keep page component focused on UI** - Page component should only handle rendering and coordinate between hooks

## API Service Pattern

```tsx
// services/example.service.ts
import { api } from '@/lib/api';

export const exampleService = {
  getAll: async () => {
    const response = await api.get('/examples');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/examples/${id}`);
    return response.data;
  },

  create: async (data: CreateExampleDto) => {
    const response = await api.post('/examples', data);
    return response.data;
  },
};
```

## Form Validation with Zod

```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;
```

## Naming Conventions

| Item             | Convention                        | Example              |
| ---------------- | --------------------------------- | -------------------- |
| Components       | kebab-case                        | `user-profile.tsx`   |
| Hooks            | kebab-case                        | `use-auth.ts`        |
| Services         | kebab-case with `.service` suffix | `auth.service.ts`    |
| Types            | kebab-case                        | `user-type.ts`       |
| Folders          | kebab-case                        | `my-feature/`        |
| CSS Variables    | kebab-case                        | `--primary-color`    |
| Translation Keys | kebab-case                        | `user-profile.title` |

**Note**: All file and folder names use **kebab-case** for consistency across the project.

## Comment Style

Use section comments with dashes to separate logical blocks of code:

```tsx
// ---- Params ----
const { id } = useParams();

// ---- Form States ----
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// ---- Data Fetching ----
const { data } = useQuery(...);

// ---- Handlers ----
const handleSubmit = () => { ... };

// ---- Render ----
return <div>...</div>;
```

**Rules:**

1. Use `// ---- Section Name ----` format
2. Keep section names concise and descriptive
3. Common sections: Params, States, Hooks, Data Fetching, Handlers, Render, Flags, Tracking
4. Use capitalized words (e.g., `Form Props`, not `form props`)

## Import Order

```tsx
// 1. React/Next.js imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

// 4. Relative imports
import { FeatureCard } from './FeatureCard';

// 5. Types
import type { UserType } from '@/types/user';
```

## Feature Cross-Import & Internal Import Rules

**CRITICAL**: Follow strict boundaries for imports between and within features to maintain modularity (Feature-Sliced Design principles).

1. **Cross-Feature Imports (Public API Only)**:
   - When importing from a different feature, you MUST import exclusively through its `index.ts` (the public API).
   - **Do NOT** "xuyên táo" (deep import) to internal files inside another feature.
   - ✅ Correct: `import { PvpGameArena } from '@features/pvp';`
   - ❌ Incorrect: `import { PvpGameArena } from '@features/pvp/components/playing-game/rules/pvp-game-arena';`

2. **Intra-Feature Imports (Relative Paths Only)**:
   - When importing files within the SAME feature, you MUST use relative paths.
   - **Do NOT** use the absolute feature alias (`@features/...`) for internal feature imports.
   - ✅ Correct: `import { useGameCountdown } from '../../hooks/use-game-countdown';`
   - ❌ Incorrect: `import { useGameCountdown } from '@features/pvp/hooks/use-game-countdown';`

## Error Handling

Use development-only logging utility:

```tsx
import { devLog } from '@/lib/utils/devLog';

try {
  await someAsyncOperation();
} catch (error) {
  devLog.error('Operation failed:', error);
  // Handle error appropriately
}
```
