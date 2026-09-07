'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Part5QuestionItem } from '@/types/part.type';
import { useSubmitPart5 } from './use-submit-part-5';
import { toast } from 'sonner';

interface UserAnswerState {
  id_selected_ans: number;
  is_correct: boolean;
}

interface UsePart5PracticeProps {
  questions: Part5QuestionItem[];
}

export function usePart5Practice({ questions }: UsePart5PracticeProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<'PRACTICE' | 'SUBMITTED'>('PRACTICE');
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswerState>>({});
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  const submitMutation = useSubmitPart5();

  // Handler chọn đáp án (Phase 1)
  const handleSelectAnswer = useCallback((questionId: number, answerId: number, isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        id_selected_ans: answerId,
        is_correct: isCorrect,
      },
    }));
  }, []);

  // Handler toggle mở/đóng giải thích
  const handleToggleExplanation = useCallback((questionId: number) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  }, []);

  // Mở tất cả giải thích
  const handleExpandAllExplanations = useCallback(() => {
    const allExpanded: Record<number, boolean> = {};
    questions.forEach((q) => {
      allExpanded[q.id] = true;
    });
    setExpandedExplanations(allExpanded);
  }, [questions]);

  // Đóng tất cả giải thích
  const handleCollapseAllExplanations = useCallback(() => {
    setExpandedExplanations({});
  }, []);

  // Handler Submit bài làm
  const handleSubmit = useCallback(async () => {
    const items = Object.entries(userAnswers).map(([qId, ans]) => ({
      id_question: Number(qId),
      id_selected_ans: ans.id_selected_ans,
      is_correct: ans.is_correct,
    }));

    setPhase('SUBMITTED');

    // Lưu vào DB nếu có ít nhất 1 câu đã làm
    if (items.length > 0) {
      try {
        await submitMutation.mutateAsync({ items });
      } catch (error) {
        console.error('Error auto saving attempts:', error);
      }
    } else {
      toast.info('Bạn chưa làm câu nào!')
    }

    // Scroll lên đầu trang
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [userAnswers, submitMutation]);

  // Handler nút Back: Quay về trang /part-5
  const handleBack = useCallback(() => {
    router.push('/part-5');
  }, [router]);

  // Derived metrics
  const answeredCount = useMemo(() => {
    return Object.keys(userAnswers).length;
  }, [userAnswers]);

  const correctCount = useMemo(() => {
    return Object.values(userAnswers).filter((ans) => ans.is_correct).length;
  }, [userAnswers]);

  const scorePercentage = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round((correctCount / questions.length) * 100);
  }, [correctCount, questions.length]);

  return {
    phase,
    userAnswers,
    expandedExplanations,
    answeredCount,
    correctCount,
    scorePercentage,
    totalQuestions: questions.length,
    isSubmitting: submitMutation.isPending,
    handleSelectAnswer,
    handleToggleExplanation,
    handleExpandAllExplanations,
    handleCollapseAllExplanations,
    handleSubmit,
    handleBack,
  };
}
