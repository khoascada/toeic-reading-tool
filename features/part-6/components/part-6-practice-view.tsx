'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
  ArrowLeft,
  Send,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Part6PassageCard } from './part-6-passage-card';
import { Part6PassageAnalysis } from './part-6-passage-analysis';
import { Part6QuestionCard } from './part-6-question-card';
import type { ReadingPassageItem, Part6StatusFilter } from '../types';

interface Part6PracticeViewProps {
  passage: ReadingPassageItem;
  phase: 'PRACTICE' | 'SUBMITTED';
  currentStatus?: Part6StatusFilter;
  selectedAnswers: Record<number, number>;
  expandedExplanations: Record<number, boolean>;
  expandedAnalysisSections: Record<string, boolean>;
  totalQuestions: number;
  answeredCount: number;
  isAllAnswered: boolean;
  score: { correct: number; total: number; accuracy: number } | null;
  isSubmitting: boolean;
  isFindingNext: boolean;
  onSelectAnswer: (questionId: number, answerId: number) => void;
  onToggleExplanation: (questionId: number) => void;
  onToggleAnalysisSection: (sectionKey: string) => void;
  onSubmit: () => void;
  onNextPassage: () => void;
}

const STATUS_LABELS: Record<Part6StatusFilter, string> = {
  ALL: 'Tất cả bài',
  UNANSWERED: 'Bài chưa làm',
  ANSWERED: 'Bài đã làm',
};

export const Part6PracticeView: React.FC<Part6PracticeViewProps> = ({
  passage,
  phase,
  currentStatus = 'ALL',
  selectedAnswers,
  expandedExplanations,
  expandedAnalysisSections,
  totalQuestions,
  answeredCount,
  isAllAnswered,
  score,
  isSubmitting,
  isFindingNext,
  onSelectAnswer,
  onToggleExplanation,
  onToggleAnalysisSection,
  onSubmit,
  onNextPassage,
}) => {
  return (
    <div className="container mx-auto max-w-7xl px-3 sm:px-6 py-5 md:py-8 space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-xs sticky top-2 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs font-semibold">
            <Link href="/part-6">
              <ArrowLeft className="h-4 w-4" />
              <span>Về danh sách Part 6</span>
            </Link>
          </Button>

          <div className="hidden sm:block h-4 w-px bg-border/60" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              Đoạn văn #{passage.id}
            </span>
            <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary bg-primary/5">
              {STATUS_LABELS[currentStatus]}
            </Badge>
            {phase === 'SUBMITTED' ? (
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs">
                Đã nộp bài
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                {answeredCount}/{totalQuestions} câu đã chọn
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons: Nộp bài & Bài tiếp theo */}
        <div className="flex items-center gap-2.5">
          {phase === 'SUBMITTED' && score && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>
                Đúng {score.correct}/{score.total} ({score.accuracy}%)
              </span>
            </div>
          )}

          {phase === 'PRACTICE' && (
            <Button
              size="sm"
              onClick={onSubmit}
              disabled={!isAllAnswered || isSubmitting}
              className="gap-1.5 font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Đang nộp...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Nộp bài</span>
                </>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onNextPassage}
            disabled={isFindingNext}
            className="gap-1.5 font-semibold text-xs border-border/80 hover:bg-muted/60"
          >
            {isFindingNext ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Đang tìm...</span>
              </>
            ) : (
              <>
                <span>Bài tiếp theo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 2. Main 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cột trái: Văn bản đoạn văn & Phân tích chuyên sâu */}
        <div className="lg:col-span-7 space-y-6">
          <Part6PassageCard passage={passage} selectedAnswers={selectedAnswers} />
          <Part6PassageAnalysis
            passage={passage}
            expandedSections={expandedAnalysisSections}
            onToggleSection={onToggleAnalysisSection}
          />
        </div>

        {/* Cột phải: Danh sách các câu hỏi */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Câu hỏi trong đoạn ({passage.questions.length})
            </span>
            {phase === 'PRACTICE' && !isAllAnswered && (
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                Hãy trả lời đủ {totalQuestions} câu để nộp bài
              </span>
            )}
          </div>

          {passage.questions.map((q) => (
            <Part6QuestionCard
              key={q.id}
              question={q}
              phase={phase}
              selectedAnswerId={selectedAnswers[q.id]}
              isExplanationOpen={expandedExplanations[q.id]}
              onSelectAnswer={onSelectAnswer}
              onToggleExplanation={onToggleExplanation}
            />
          ))}

          {/* Bottom Banner Mobile Actions */}
          <div className="pt-3 flex flex-col gap-2 sm:hidden">
            {phase === 'PRACTICE' && (
              <Button
                size="lg"
                onClick={onSubmit}
                disabled={!isAllAnswered || isSubmitting}
                className="w-full font-bold text-sm gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Đang nộp...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Nộp bài ({answeredCount}/{totalQuestions})</span>
                  </>
                )}
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={onNextPassage}
              disabled={isFindingNext}
              className="w-full font-semibold text-sm gap-2"
            >
              <span>Bài tiếp theo</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
