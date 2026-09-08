'use client';

import React from 'react';
import { usePart7Practice } from '../hooks';
import { Part7PracticeView } from './part-7-practice-view';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@components/ui/button';
import Link from 'next/link';

interface Part7PracticeClientProps {
  id: number;
}

export const Part7PracticeClient: React.FC<Part7PracticeClientProps> = ({ id }) => {
  const {
    passage,
    isLoading,
    isError,
    phase,
    currentStatus,
    selectedAnswers,
    expandedExplanations,
    expandedAnalysisSections,
    totalQuestions,
    answeredCount,
    isAllAnswered,
    score,
    isSubmitting,
    isFindingNext,
    handleSelectAnswer,
    handleToggleExplanation,
    handleToggleAnalysisSection,
    handleSubmit,
    handleNextPassage,
  } = usePart7Practice(id);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 flex flex-col items-center justify-center min-h-[450px]">
        <Loader2 className="h-9 w-9 animate-spin text-primary mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Đang tải đoạn văn Part 7...</p>
      </div>
    );
  }

  if (isError || !passage) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center space-y-4">
        <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Không tìm thấy đoạn văn</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Không thể tìm thấy bài đọc Part 7 #{id} hoặc bài đọc không tồn tại.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/part-7">Về trang Part 7</Link>
          </Button>
          <Button size="sm" onClick={() => window.location.reload()}>
            Tải lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Part7PracticeView
      passage={passage}
      phase={phase}
      currentStatus={currentStatus}
      selectedAnswers={selectedAnswers}
      expandedExplanations={expandedExplanations}
      expandedAnalysisSections={expandedAnalysisSections}
      totalQuestions={totalQuestions}
      answeredCount={answeredCount}
      isAllAnswered={isAllAnswered}
      score={score}
      isSubmitting={isSubmitting}
      isFindingNext={isFindingNext}
      onSelectAnswer={handleSelectAnswer}
      onToggleExplanation={handleToggleExplanation}
      onToggleAnalysisSection={handleToggleAnalysisSection}
      onSubmit={handleSubmit}
      onNextPassage={() => handleNextPassage()}
    />
  );
};
