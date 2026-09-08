import { Suspense } from 'react';
import { Part6PracticeClient } from '@features/part-6/components/part-6-practice-client';
import { Loader2 } from 'lucide-react';

interface Part6PracticePageProps {
  params: Promise<{ id: string }>;
}

export default async function Part6PracticePage({ params }: Part6PracticePageProps) {
  const { id } = await params;
  const passageId = Number(id);

  return (
    <main className="min-h-screen pb-12">
      <Suspense
        fallback={
          <div className="container mx-auto max-w-5xl px-4 py-20 flex flex-col items-center justify-center min-h-[450px]">
            <Loader2 className="h-9 w-9 animate-spin text-primary mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Đang tải đoạn văn Part 6...</p>
          </div>
        }
      >
        <Part6PracticeClient id={passageId} />
      </Suspense>
    </main>
  );
}

