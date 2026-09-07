import { Suspense } from 'react';
import { Part5PracticeClient } from '@features/part-5/components/part-5-practice-client';
import { Loader2 } from 'lucide-react';

export default function Part5PracticePage() {
  return (
    <main className="min-h-screen pb-16">
      <Suspense
        fallback={
          <div className="container mx-auto max-w-4xl px-4 py-20 flex flex-col items-center justify-center min-h-[450px]">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-xs text-muted-foreground font-medium">Đang tải giao diện luyện tập...</p>
          </div>
        }
      >
        <Part5PracticeClient />
      </Suspense>
    </main>
  );
}
