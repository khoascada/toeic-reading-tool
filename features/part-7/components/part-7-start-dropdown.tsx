'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGetRandomPassageId } from '../hooks';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Play, ChevronDown, Layers, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import type { Part7StatusFilter } from '../types';

interface Part7StartDropdownProps {
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}

export const Part7StartDropdown: React.FC<Part7StartDropdownProps> = ({
  className,
  size = 'lg',
}) => {
  const router = useRouter();
  const { getRandomId, isLoading } = useGetRandomPassageId();

  const handleSelectStatus = async (status: Part7StatusFilter) => {
    const randomId = await getRandomId(status);
    if (randomId) {
      router.push(`/part-7/${randomId}?status=${status}`);
    } else {
      const statusLabels: Record<Part7StatusFilter, string> = {
        ALL: 'Tất cả',
        UNANSWERED: 'Chưa làm',
        ANSWERED: 'Đã làm',
      };
      alert(`Không tìm thấy đoạn văn nào thuộc danh mục "${statusLabels[status]}".`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={size}
          disabled={isLoading}
          className={`font-bold gap-2 shadow-md shadow-primary/20 hover:scale-[1.02] transition-transform ${className}`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4 fill-current" />
          )}
          <span>Làm bài ngay</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-lg border-border/80">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5">
          Chọn dạng bài luyện tập
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleSelectStatus('ALL')}
          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-sm font-medium"
        >
          <div className="p-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Layers className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span>Tất cả bài đọc</span>
            <span className="text-[11px] text-muted-foreground">Ngẫu nhiên bất kỳ đoạn văn nào</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSelectStatus('UNANSWERED')}
          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-sm font-medium"
        >
          <div className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span>Bài chưa làm</span>
            <span className="text-[11px] text-muted-foreground">Ưu tiên đoạn văn chưa luyện tập</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSelectStatus('ANSWERED')}
          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-sm font-medium"
        >
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span>Bài đã làm</span>
            <span className="text-[11px] text-muted-foreground">Ôn tập lại các đoạn văn đã giải</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
