import { cn } from '@lib/utils';

import { Spinner } from './spinner';

interface PageLoadingProps {
  className?: string;
}

function PageLoading({ className }: PageLoadingProps) {
  return (
    <div className={cn('flex min-h-screen items-center justify-center', className)}>
      <Spinner className="size-8" />
    </div>
  );
}

export { PageLoading };
