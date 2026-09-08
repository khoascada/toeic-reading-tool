import { Suspense } from 'react';
import { Part5PracticeClient } from '@features/part-5/components/part-5-practice-client';
import { Loader2 } from 'lucide-react';

export default function Part5PracticePage() {
  return (
    <main className="min-h-screen pb-16">
      <Suspense
        fallback={
          <div className="container mx-auto flex min-h-[450px] max-w-4xl flex-col items-center justify-center px-4 py-20">
            <Loader2 className="text-primary mb-4 h-10 w-10 animate-spin" />
            <p className="text-muted-foreground text-xs font-medium">
              Đang tải giao diện luyện tập...
            </p>
          </div>
        }
      >
        <Part5PracticeClient />
      </Suspense>
    </main>
  );
}
