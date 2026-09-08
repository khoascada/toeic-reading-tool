'use client';

import Link from 'next/link';
import { useGetPart6Stats } from '../hooks';
import { Part6StartDropdown } from './part-6-start-dropdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Progress } from '@components/ui/progress';
import { Badge } from '@components/ui/badge';
import {
  BookOpen,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  ArrowRight,
  Loader2,
  FileText,
  TrendingUp,
} from 'lucide-react';

export const Part6DashboardView = () => {
  const { data: stats, isLoading, isError } = useGetPart6Stats();

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Đang tải thống kê Part 6...</p>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-sm text-destructive font-semibold">Không thể tải dữ liệu thống kê Part 6.</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4 text-xs">
          Thử lại
        </Button>
      </div>
    );
  }

  const completionPercent =
    stats.totalPassages > 0 ? Math.round((stats.answeredPassages / stats.totalPassages) * 100) : 0;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 md:py-10 space-y-8">
      {/* 1. Hero / Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-muted/40 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TOEIC Reading • Text Completion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Part 6: Hoàn thành đoạn văn
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Phần thi gồm 4 đoạn văn (email, thông báo, bài báo, hướng dẫn...). Mỗi đoạn có 4 chỗ trống cần điền
              từ, cụm từ hoặc câu văn hoàn chỉnh phù hợp với văn cảnh toàn bài.
            </p>
          </div>

          <div className="shrink-0">
            <Part6StartDropdown size="lg" />
          </div>
        </div>

        {/* Quick Exam Tips Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="flex items-center gap-3 bg-background/70 rounded-xl p-3 border border-border/40">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">16 câu hỏi / đề</div>
              <div className="text-[11px] text-muted-foreground">Câu 131 đến câu 146</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-background/70 rounded-xl p-3 border border-border/40">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">4 đoạn văn ngắn</div>
              <div className="text-[11px] text-muted-foreground">Mỗi đoạn chứa 4 câu hỏi</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-background/70 rounded-xl p-3 border border-border/40">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">~8 đến 10 phút</div>
              <div className="text-[11px] text-muted-foreground">Khoảng 2 phút / đoạn văn</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-blue-500" />
              <span>Tiến độ đoạn văn</span>
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-foreground">
              {stats.answeredPassages}
              <span className="text-sm font-normal text-muted-foreground ml-1.5">
                / {stats.totalPassages} bài
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <Progress value={completionPercent} className="h-1.5" />
            <div className="text-[11px] text-muted-foreground text-right">{completionPercent}% hoàn thành</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Câu hỏi đã làm</span>
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-foreground">
              {stats.answeredQuestions}
              <span className="text-sm font-normal text-muted-foreground ml-1.5">
                / {stats.totalQuestions} câu
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <Progress
              value={stats.totalQuestions > 0 ? Math.round((stats.answeredQuestions / stats.totalQuestions) * 100) : 0}
              className="h-1.5"
            />
            <div className="text-[11px] text-muted-foreground text-right">
              {stats.totalQuestions > 0 ? Math.round((stats.answeredQuestions / stats.totalQuestions) * 100) : 0}% tổng số câu
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span>Độ chính xác</span>
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-foreground">
              {stats.accuracy}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Đúng <strong className="text-foreground">{stats.correctQuestions}</strong> trên tổng số {stats.answeredQuestions} câu đã làm
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Danh sách các đoạn văn Part 6 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Danh sách đoạn văn luyện tập</h2>
            <p className="text-xs text-muted-foreground">Chọn một đoạn văn để luyện tập trực tiếp hoặc bấm Làm bài ngẫu nhiên</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.passages.map((p, idx) => (
            <Card key={p.id} className="border-border/70 hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 px-2 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                      Đoạn {idx + 1}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      (Câu {p.questionNumbers.join(', ')})
                    </span>
                  </div>

                  {p.isAnswered ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px]">
                      Đã làm ({p.correctQuestions}/{p.totalQuestions})
                    </Badge>
                  ) : p.answeredQuestions > 0 ? (
                    <Badge variant="outline" className="text-[11px] text-amber-600 border-amber-500/30 bg-amber-500/5">
                      Đang làm ({p.answeredQuestions}/{p.totalQuestions})
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[11px]">
                      Chưa làm
                    </Badge>
                  )}
                </div>

                {p.topic && (
                  <div className="text-sm font-bold text-foreground mt-2 line-clamp-1">
                    {p.topic}
                  </div>
                )}
                {p.mainIdea && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {p.mainIdea}
                  </p>
                )}
              </CardHeader>

              <CardContent className="p-4 pt-2">
                <Button size="sm" variant="outline" asChild className="w-full text-xs font-semibold gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Link href={`/part-6/${p.id}`}>
                    <span>Luyện tập bài này</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
