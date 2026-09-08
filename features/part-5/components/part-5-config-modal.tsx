'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { PART_5_QUESTION_TYPES } from '../types';
import { useGetPart5AvailableCount } from '../hooks/use-get-part-5-available-count';
import { Play, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface Part5ConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultQuestionType?: string;
}

export const Part5ConfigModal: React.FC<Part5ConfigModalProps> = ({
  open,
  onOpenChange,
  defaultQuestionType = 'ALL',
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<'ALL' | 'UNANSWERED'>('ALL');
  const [questionType, setQuestionType] = useState<string>(defaultQuestionType);
  const [limit, setLimit] = useState<number>(10);

  // Sync default question type when modal opens
  useEffect(() => {
    if (open) {
      setQuestionType(defaultQuestionType);
    }
  }, [open, defaultQuestionType]);

  // Query realtime số câu khả dụng theo filter
  const { data: countData, isLoading: isLoadingCount } = useGetPart5AvailableCount({
    status,
    questionType,
  });

  const maxAvailable = countData?.count ?? 0;

  useEffect(() => {
    if (maxAvailable > 0) {
      setLimit((prev) => Math.min(Math.max(1, prev), maxAvailable));
    }
  }, [maxAvailable]);

  const handleQuickLimit = (val: number) => {
    setLimit(Math.min(val, maxAvailable));
  };

  const handleStartPractice = () => {
    if (maxAvailable === 0) return;
    const finalLimit = Math.min(Math.max(1, limit), maxAvailable);
    const query = new URLSearchParams({
      status,
      type: questionType,
      limit: String(finalLimit),
    });
    onOpenChange(false);
    router.push(`/part-5/practice?${query.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Tùy chỉnh luyện tập</span>
          </div>
          <DialogTitle className="text-xl font-bold">Cấu hình bài tập Part 5</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Lựa chọn trạng thái, chủ đề ngữ pháp và số lượng câu hỏi bạn muốn luyện tập.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* 1. Trạng thái câu hỏi */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Trạng thái câu hỏi</Label>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as 'ALL' | 'UNANSWERED')}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL" className="text-xs">
                  Tất cả câu hỏi
                </SelectItem>
                <SelectItem value="UNANSWERED" className="text-xs">
                  Chỉ các câu chưa làm
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. Dạng câu hỏi (QuestionType) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Dạng câu hỏi ngữ pháp / từ vựng</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Chọn dạng câu hỏi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL" className="text-xs font-medium">
                  Tất cả dạng bài (Hỗn hợp)
                </SelectItem>
                {PART_5_QUESTION_TYPES.map((t) => (
                  <SelectItem key={t.key} value={t.key} className="text-xs">
                    {t.label} ({t.key})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. Số lượng câu hỏi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Số lượng câu muốn làm</Label>
              <span className="text-xs text-muted-foreground">
                Khả dụng trong DB:{' '}
                {isLoadingCount ? (
                  <Loader2 className="inline h-3 w-3 animate-spin text-primary" />
                ) : (
                  <strong className="text-primary font-bold">{maxAvailable} câu</strong>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={maxAvailable || 1}
                value={limit}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 1;
                  setLimit(Math.min(Math.max(1, val), maxAvailable || 1));
                }}
                disabled={maxAvailable === 0 || isLoadingCount}
                className="h-9 text-xs font-bold w-24 text-center"
              />

              {/* Quick Limit Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap flex-grow justify-end">
                {[5, 10, 15, 20].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    variant={limit === num ? 'default' : 'outline'}
                    size="sm"
                    disabled={num > maxAvailable || isLoadingCount}
                    onClick={() => handleQuickLimit(num)}
                    className="h-8 px-2.5 text-xs font-semibold"
                  >
                    {num}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant={limit === maxAvailable && maxAvailable > 0 ? 'default' : 'outline'}
                  size="sm"
                  disabled={maxAvailable === 0 || isLoadingCount}
                  onClick={() => handleQuickLimit(maxAvailable)}
                  className="h-8 px-2.5 text-xs font-semibold"
                >
                  Tất cả ({maxAvailable})
                </Button>
              </div>
            </div>

            {maxAvailable === 0 && !isLoadingCount && (
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Không có câu hỏi nào thỏa mãn bộ lọc hiện tại. Thử chọn lại trạng thái khác.</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Hủy
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={maxAvailable === 0 || isLoadingCount}
            onClick={handleStartPractice}
            className="text-xs font-semibold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Play className="h-3.5 w-3.5 fill-current" /> Bắt đầu làm bài
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
