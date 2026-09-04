---
name: code-conventions
description: Project coding standards, tech stack guidelines, and development conventions for the English Vocabulary learning application. Use this skill when writing business logic, API integrations, state management, or any non-UI code.
---

# Code Conventions for English Vocabulary App

This skill defines the coding standards and conventions for the English Vocabulary learning application.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16 |
| Language | TypeScript | 5 |
| UI Components | Radix UI | Latest |
| Styling | TailwindCSS | 4 |
| State Management | Zustand | 5 |
| Server State | TanStack React Query | 5 |
| Forms | React Hook Form + Zod | Latest |
| HTTP Client | Axios | Latest |
| Testing | Vitest + Testing Library | Latest |
| Internationalization | next-intl | 4 |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   └── [locale]/           # Internationalized routes
├── components/
│   ├── ui/                 # Reusable UI primitives (Radix-based)
│   ├── shared/             # Shared components across features
│   └── layouts/            # Layout components
├── features/               # Feature-based modules
│   └── [feature]/
│       ├── components/     # Feature-specific components
│       ├── hooks/          # Feature-specific hooks
│       └── types/          # Feature-specific types
├── services/               # API service functions
├── lib/                    # Utilities and configurations
├── types/                  # Global TypeScript types
├── messages/               # Translation files (en.json, vi.json)
└── styles/                 # Global styles and CSS variables
```

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

| Item | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `user-profile.tsx` |
| Hooks | kebab-case | `use-auth.ts` |
| Services | kebab-case with `.service` suffix | `auth.service.ts` |
| Types | kebab-case | `user-type.ts` |
| Folders | kebab-case | `my-feature/` |
| CSS Variables | kebab-case | `--primary-color` |
| Translation Keys | kebab-case | `user-profile.title` |

**Note**: All file and folder names use **kebab-case** for consistency across the project.

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
