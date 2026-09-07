'use client';

import React, { useState } from 'react';
import { useGetPart5Stats } from '../hooks/use-get-part-5-stats';
import { PART_5_QUESTION_TYPES } from '../types';
import { Part5ConfigModal } from './part-5-config-modal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Progress } from '@components/ui/progress';
import {
  BookOpen,
  Play,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
  Loader2,
  HelpCircle,
} from 'lucide-react';

export const Part5DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTypeForModal, setSelectedTypeForModal] = useState<string>('ALL');

  const { data: stats, isLoading, isError } = useGetPart5Stats();


  const handleOpenModal = (typeKey: string = 'ALL') => {
    setSelectedTypeForModal(typeKey);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Đang tải thống kê Part 5...</p>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-sm text-destructive font-semibold">Không thể tải dữ liệu thống kê Part 5.</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4 text-xs">
          Thử lại
        </Button>
      </div>
    );
  }

  const completionPercent =
    stats.totalQuestions > 0 ? Math.round((stats.totalAnswered / stats.totalQuestions) * 100) : 0;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 md:py-10 space-y-8">
      {/* 1. Hero / Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-muted/40 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TOEIC Reading • Incomplete Sentences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Part 5: Hoàn thành câu trắc nghiệm
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Phần thi kiểm tra kiến thức ngữ pháp và vốn từ vựng trọng tâm. Mỗi câu hỏi gồm một câu có chỗ trống
              và 4 lựa chọn (A, B, C, D).
            </p>
          </div>

          <div className="shrink-0">
            <Button
              size="lg"
              onClick={() => handleOpenModal('ALL')}
              className="w-full sm:w-auto font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <Play className="h-4 w-4 fill-current" />
              Làm bài ngay
            </Button>
          </div>
        </div>

        {/* Quick Exam Tips Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="flex items-center gap-3 bg-background/70 rounded-xl p-3 border border-border/40">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">30 câu hỏi / đề</div>
              <div className="text-[11px] text-muted-foreground">Câu 101 đến câu 130</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-background/70 rounded-xl p-3 border border-border/40">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">~30 giây / câu</div>
              <div className="text-[11px] text-muted-foreground">Tối đa 12 - 15 phút toàn phần</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-background/70 rounded-xl p-3 border border-border/40">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Chiến lược giải nhanh</div>
              <div className="text-[11px] text-muted-foreground">Nhận diện cấu trúc trước khi dịch</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Thống kê tổng quan */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Tiến độ & Kết quả luyện tập</h2>
          </div>
          <span className="text-xs text-muted-foreground">
            Đã làm <strong className="text-foreground">{stats.totalAnswered}</strong> / {stats.totalQuestions} câu
          </span>
        </div>

        {/* 4 Cards Thống kê */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-border/60 bg-card/60 shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">Tổng số câu hỏi</span>
                <Layers className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{stats.totalQuestions}</div>
              <div className="text-[11px] text-muted-foreground mt-1">Trong ngân hàng đề</div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">Đã luyện tập</span>
                <HelpCircle className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {stats.totalAnswered}{' '}
                <span className="text-xs font-normal text-muted-foreground">({completionPercent}%)</span>
              </div>
              <Progress value={completionPercent} className="h-1.5 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">Số câu làm đúng</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {stats.totalCorrect}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                {stats.totalAnswered > 0
                  ? `${Math.round((stats.totalCorrect / stats.totalAnswered) * 100)}% số câu đã làm`
                  : 'Chưa có dữ liệu'}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">Tỷ lệ chính xác</span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{stats.accuracy}%</div>
              <div className="text-[11px] text-muted-foreground mt-1">Hiệu suất trung bình</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Phân tích chi tiết theo 7 dạng QuestionType */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Luyện tập theo chuyên đề ngữ pháp</h2>
            <p className="text-xs text-muted-foreground">
              Chọn một dạng câu hỏi cụ thể để tập trung khắc phục điểm yếu.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PART_5_QUESTION_TYPES.map((typeMeta) => {
            const detail = stats.byType[typeMeta.key] || { total: 0, answered: 0, correct: 0 };
            const typeAccuracy = detail.answered > 0 ? Math.round((detail.correct / detail.answered) * 100) : 0;
            const typePercent = detail.total > 0 ? Math.round((detail.answered / detail.total) * 100) : 0;

            return (
              <Card
                key={typeMeta.key}
                className="border-border/60 bg-card/70 hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${typeMeta.colorClass}`}
                    >
                      {typeMeta.label}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {detail.total} câu
                    </span>
                  </div>
                  <CardTitle className="text-sm font-bold text-foreground mt-2">
                    {typeMeta.key}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-1">
                    {typeMeta.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  {/* Progress & Stats */}
                  <div className="space-y-1.5 bg-muted/40 p-2.5 rounded-lg border border-border/40 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Đã làm:</span>
                      <strong className="text-foreground">
                        {detail.answered} / {detail.total} ({typePercent}%)
                      </strong>
                    </div>
                    <Progress value={typePercent} className="h-1" />
                    <div className="flex justify-between pt-1">
                      <span className="text-muted-foreground">Chính xác:</span>
                      <strong
                        className={
                          typeAccuracy >= 80
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : typeAccuracy >= 50
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-muted-foreground'
                        }
                      >
                        {detail.correct} đúng ({typeAccuracy}%)
                      </strong>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenModal(typeMeta.key)}
                    className="w-full text-xs font-semibold gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <span>Luyện dạng này</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modal cấu hình luyện tập */}
      <Part5ConfigModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultQuestionType={selectedTypeForModal}
      />
    </div>
  );
};
