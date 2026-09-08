import { Suspense } from 'react';
import { Part7PracticeClient } from '@features/part-7/components/part-7-practice-client';
import { Loader2 } from 'lucide-react';

interface Part7PracticePageProps {
  params: Promise<{ id: string }>;
}

export default async function Part7PracticePage({ params }: Part7PracticePageProps) {
  const { id } = await params;
  const passageId = Number(id);

  return (
    <main className="min-h-screen pb-12">
      <Suspense
        fallback={
          <div className="container mx-auto flex min-h-[450px] max-w-5xl flex-col items-center justify-center px-4 py-20">
            <Loader2 className="text-primary mb-3 h-9 w-9 animate-spin" />
            <p className="text-muted-foreground text-sm font-medium">Đang tải đoạn văn Part 7...</p>
          </div>
        }
      >
        <Part7PracticeClient id={passageId} />
      </Suspense>
    </main>
  );
}
