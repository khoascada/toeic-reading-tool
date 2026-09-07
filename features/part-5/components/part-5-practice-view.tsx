'use client';

import React, { useMemo } from 'react';
import { ReadingPassageItem } from '@/types';
import { usePart5Practice } from '../hooks/use-part-5-practice';
import { Part5PracticeCard } from './part-5-practice-card';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import {
  ArrowLeft,
  Send,
  RotateCcw,
  Trophy,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface Part5PracticeViewProps {
  passages: ReadingPassageItem[];
}

export const Part5PracticeView: React.FC<Part5PracticeViewProps> = ({ passages }) => {
  // Với Part 5, mỗi passage chứa 1 câu hỏi tương ứng
  const questions = useMemo(() => passages.flatMap((p) => p.questions), [passages]);
  const practiceState = usePart5Practice({ questions });

  const {
    phase,
    userAnswers,
    expandedExplanations,
    answeredCount,
    correctCount,
    scorePercentage,
    totalQuestions,
    isSubmitting,
    handleSelectAnswer,
    handleToggleExplanation,
    handleExpandAllExplanations,
    handleCollapseAllExplanations,
    handleSubmit,
    handleBack,
  } = practiceState;

  const isAnyExplanationOpen = Object.values(expandedExplanations).some(Boolean);
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:py-8 space-y-6">
      {/* Top Bar: Back button, Progress & Action */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border border-border/70 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          disabled={isSubmitting}
          className="text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <ArrowLeft className="h-4 w-4" />
          )}
          <span>Quay lại</span>
        </Button>

        {/* Progress Center */}
        <div className="flex items-center gap-3 flex-grow max-w-xs sm:max-w-sm">
          <div className="w-full space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
              <span>
                Tiến độ: <strong className="text-foreground">{answeredCount}</strong>/{totalQuestions} câu
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {phase === 'PRACTICE' ? (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={answeredCount === 0 || isSubmitting}
              className="text-xs font-bold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              <span>Nộp bài ({answeredCount}/{totalQuestions})</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="text-xs font-bold gap-1.5 border-primary text-primary hover:bg-primary/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Làm đề khác</span>
            </Button>
          )}
        </div>
      </div>

      {/* Phase 2: Result Score Card */}
      {phase === 'SUBMITTED' && (
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-muted/40 shadow-md animate-in fade-in-50 duration-300">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-inner">
                  <Trophy className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>KẾT QUẢ BÀI THI PART 5</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-foreground">
                    {correctCount} / {totalQuestions} câu đúng ({scorePercentage}%)
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {scorePercentage >= 80
                      ? 'Xuất sắc! Bạn đã nắm rất vững ngữ pháp và từ vựng của bài thi.'
                      : scorePercentage >= 50
                      ? 'Khá tốt! Hãy xem lại các câu sai và ghi nhớ chiến lược làm bài bên dưới.'
                      : 'Cố gắng lên! Hãy đọc kỹ phần giải thích chi tiết để cải thiện điểm số.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons inside result */}
              <div className="flex flex-wrap items-center gap-2">
                {isAnyExplanationOpen ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCollapseAllExplanations}
                    className="text-xs gap-1.5"
                  >
                    <EyeOff className="h-3.5 w-3.5" /> Ẩn toàn bộ lời giải
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExpandAllExplanations}
                    className="text-xs gap-1.5"
                  >
                    <Eye className="h-3.5 w-3.5" /> Mở toàn bộ lời giải
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Global Toggle Tool for Phase 1 */}
      {phase === 'PRACTICE' && (
        <div className="flex justify-end">
          {isAnyExplanationOpen ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapseAllExplanations}
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
            >
              <EyeOff className="h-3.5 w-3.5" /> Ẩn chiến lược giải tất cả câu
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExpandAllExplanations}
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" /> Hiện chiến lược giải tất cả câu
            </Button>
          )}
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question, idx) => (
          <Part5PracticeCard
            key={question.id}
            index={idx}
            question={question}
            phase={phase}
            selectedAnswerId={userAnswers[question.id]?.id_selected_ans}
            isExplanationOpen={!!expandedExplanations[question.id]}
            onSelectAnswer={handleSelectAnswer}
            onToggleExplanation={handleToggleExplanation}
          />
        ))}
      </div>

      {/* Bottom Submit Action for convenience */}
      {phase === 'PRACTICE' && (
        <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50">

          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={answeredCount === 0 || isSubmitting}
            className="w-full sm:w-auto font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>Nộp bài & Chấm điểm ({answeredCount}/{totalQuestions} câu)</span>
          </Button>
        </div>
      )}
    </div>
  );
};
