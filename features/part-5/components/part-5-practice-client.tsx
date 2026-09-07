'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useGetPart5Practice } from '../hooks/use-get-part-5-practice';
import { Part5PracticeView } from './part-5-practice-view';
import { Button } from '@components/ui/button';
import { Loader2, AlertCircle, ArrowLeft, BookOpen } from 'lucide-react';

export const Part5PracticeClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = (searchParams.get('status') as 'ALL' | 'UNANSWERED') || 'ALL';
  const questionType = searchParams.get('type') || 'ALL';
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const { data: passages, isLoading, isError } = useGetPart5Practice({
    status,
    questionType,
    limit,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 flex flex-col items-center justify-center min-h-[450px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <h3 className="text-base font-bold text-foreground">Đang chuẩn bị đề thi ngẫu nhiên...</h3>
        <p className="text-xs text-muted-foreground mt-1">Đang chọn lọc {limit} câu hỏi phù hợp từ ngân hàng đề.</p>
      </div>
    );
  }

  if (isError || !passages) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
        <h3 className="text-base font-bold text-foreground">Không thể tải đề thi</h3>
        <p className="text-xs text-muted-foreground mt-1">Đã có lỗi xảy ra khi tạo bài luyện tập.</p>
        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={() => router.push('/part-5')} className="text-xs">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Về trang Part 5
          </Button>
          <Button size="sm" onClick={() => window.location.reload()} className="text-xs">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  if (passages.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/60 mb-3" />
        <h3 className="text-base font-bold text-foreground">Không tìm thấy câu hỏi phù hợp</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Tất cả câu hỏi trong nhóm này có thể đã được hoàn thành.
        </p>
        <Button onClick={() => router.push('/part-5')} className="mt-6 text-xs" size="sm">
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại chọn bài tập khác
        </Button>
      </div>
    );
  }

  return <Part5PracticeView passages={passages} />;
};
