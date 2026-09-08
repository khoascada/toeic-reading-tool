'use client';

import React from 'react';
import { usePart6Practice } from '../hooks';
import { Part6PracticeView } from './part-6-practice-view';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@components/ui/button';
import Link from 'next/link';

interface Part6PracticeClientProps {
  id: number;
}

export const Part6PracticeClient: React.FC<Part6PracticeClientProps> = ({ id }) => {
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
  } = usePart6Practice(id);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 flex flex-col items-center justify-center min-h-[450px]">
        <Loader2 className="h-9 w-9 animate-spin text-primary mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Đang tải đoạn văn Part 6...</p>
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
          Không thể tìm thấy bài đọc Part 6 #{id} hoặc bài đọc không tồn tại.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/part-6">Về trang Part 6</Link>
          </Button>
          <Button size="sm" onClick={() => window.location.reload()}>
            Tải lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Part6PracticeView
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
