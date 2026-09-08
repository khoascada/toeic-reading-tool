import { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetPart7Passage } from './use-get-part-7-passage';
import { useSubmitPart7 } from './use-submit-part-7';
import { useGetRandomPassageId } from './use-get-random-passage-id';
import type { Part7StatusFilter, SubmitAttemptItem } from '../types';

export const usePart7Practice = (passageId: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 0. URL Filter Status State
  const statusParam = (searchParams?.get('status') as Part7StatusFilter) || 'ALL';
  const currentStatus: Part7StatusFilter = ['ALL', 'UNANSWERED', 'ANSWERED'].includes(statusParam)
    ? statusParam
    : 'ALL';

  // 1. Data fetching
  const { data: passage, isLoading, isError, error } = useGetPart7Passage(passageId);
  const submitMutation = useSubmitPart7();
  const { getRandomId, isLoading: isFindingNext } = useGetRandomPassageId();

  // 2. Local State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<'PRACTICE' | 'SUBMITTED'>('PRACTICE');
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});
  const [expandedAnalysisSections, setExpandedAnalysisSections] = useState<Record<string, boolean>>({
    summary: true,
    structure: false,
    paragraphs: false,
    strategy: false,
  });

  // 3. Derived State
  const totalQuestions = passage?.questions?.length || 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  // Tính số câu đúng sau khi submit
  const score = useMemo(() => {
    if (phase !== 'SUBMITTED' || !passage) return null;
    let correctCount = 0;
    passage.questions.forEach((q) => {
      const selectedId = selectedAnswers[q.id];
      const ans = q.answers.find((a) => a.id === selectedId);
      if (ans?.is_correct) correctCount++;
    });
    return {
      correct: correctCount,
      total: totalQuestions,
      accuracy: Math.round((correctCount / totalQuestions) * 100),
    };
  }, [phase, passage, selectedAnswers, totalQuestions]);

  // 4. Handlers
  const handleSelectAnswer = useCallback(
    (questionId: number, answerId: number) => {
      if (phase === 'SUBMITTED') return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answerId,
      }));
    },
    [phase]
  );

  const handleToggleExplanation = useCallback((questionId: number) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  }, []);

  const handleToggleAnalysisSection = useCallback((sectionKey: string) => {
    setExpandedAnalysisSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!passage || !isAllAnswered || phase === 'SUBMITTED' || submitMutation.isPending) {
      return;
    }

    const items: SubmitAttemptItem[] = passage.questions.map((q) => {
      const selectedAnsId = selectedAnswers[q.id];
      const selectedAns = q.answers.find((a) => a.id === selectedAnsId);
      return {
        id_question: q.id,
        id_selected_ans: selectedAnsId,
        is_correct: selectedAns?.is_correct || false,
      };
    });

    try {
      await submitMutation.mutateAsync({
        passageId: passage.id,
        items,
      });
      setPhase('SUBMITTED');
    } catch (err) {
      console.error('Error submitting Part 7 practice:', err);
    }
  }, [passage, isAllAnswered, phase, submitMutation, selectedAnswers]);

  const handleNextPassage = useCallback(
    async (targetStatus?: Part7StatusFilter) => {
      // Ưu tiên targetStatus truyền vào, nếu không dùng currentStatus từ URL
      const statusToUse = targetStatus || currentStatus;
      const nextId = await getRandomId(statusToUse, passageId);
      if (nextId) {
        router.push(`/part-7/${nextId}?status=${statusToUse}`);
      } else {
        const statusLabels: Record<Part7StatusFilter, string> = {
          ALL: 'Tất cả bài',
          UNANSWERED: 'Bài chưa làm',
          ANSWERED: 'Bài đã làm',
        };
        alert(`Không tìm thấy đoạn văn nào khác trong danh mục "${statusLabels[statusToUse]}".`);
      }
    },
    [getRandomId, passageId, currentStatus, router]
  );

  return {
    passage,
    isLoading,
    isError,
    error,
    phase,
    currentStatus,
    selectedAnswers,
    expandedExplanations,
    expandedAnalysisSections,
    totalQuestions,
    answeredCount,
    isAllAnswered,
    score,
    isSubmitting: submitMutation.isPending,
    isFindingNext,
    handleSelectAnswer,
    handleToggleExplanation,
    handleToggleAnalysisSection,
    handleSubmit,
    handleNextPassage,
  };
};
