'use client';

import React from 'react';
import { Part5QuestionItem, SolvingStrategy, EvidenceInfo } from '../types';
import { Part5TypeBadge } from './part-5-type-badge';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Button } from '@components/ui/button';
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Languages,
} from 'lucide-react';

interface Part5PracticeCardProps {
  index: number;
  question: Part5QuestionItem;
  phase: 'PRACTICE' | 'SUBMITTED';
  selectedAnswerId?: number;
  isExplanationOpen?: boolean;
  onSelectAnswer: (questionId: number, answerId: number, isCorrect: boolean) => void;
  onToggleExplanation: (questionId: number) => void;
}

const ANSWER_LETTERS: Record<number, string> = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
};

export const Part5PracticeCard: React.FC<Part5PracticeCardProps> = ({
  index,
  question,
  phase,
  selectedAnswerId,
  isExplanationOpen = false,
  onSelectAnswer,
  onToggleExplanation,
}) => {
  const analysis = question.question_analysis;
  const isAnswered = selectedAnswerId !== undefined;

  const solvingStrategy = (analysis?.solving_strategy || {}) as SolvingStrategy;
  const evidence = (analysis?.evidence || {}) as EvidenceInfo;

  return (
    <Card className="border-border/70 overflow-hidden shadow-sm transition-all hover:shadow-md">
      {/* Header: Số thứ tự câu trong bài thi, Question Number & Type Badge */}
      <CardHeader className="bg-muted/30 border-b border-border/40 py-3.5 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 px-2 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              Câu {index + 1}
            </span>
            <Part5TypeBadge type={analysis?.question_type} />
          </div>

          <div className="flex items-center gap-2">
            {phase === 'PRACTICE' && isAnswered && (
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                Đã chọn
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-5">
        {/* Nội dung câu hỏi */}
        <div className="text-base text-foreground leading-relaxed">
          {question.question_text}
        </div>

        {/* 4 Lựa chọn A, B, C, D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {question.answers.map((ans) => {
            const letter = ANSWER_LETTERS[ans.answer_number] || String(ans.answer_number);
            const isSelected = selectedAnswerId === ans.id;
            const isCorrect = ans.is_correct;

            let optionStyle = 'border-border/60 hover:border-primary/50 hover:bg-muted/40 text-foreground';
            let badgeStyle = 'border-border bg-background text-foreground';

            if (phase === 'PRACTICE') {
              // Phase 1: Chưa submit -> Chọn phương án nào thì đổi sang màu xám/neutral active, KHÔNG lộ đúng sai
              if (isSelected) {
                optionStyle = 'border-foreground/60 bg-muted/80 text-foreground font-semibold ring-1 ring-foreground/40';
                badgeStyle = 'border-foreground/80 bg-foreground text-background';
              }
            } else {
              // Phase 2: Đã submit -> Hiển thị rõ ràng đáp án đúng (xanh) và đáp án đã chọn (xanh/đỏ)
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                badgeStyle = 'border-emerald-500 bg-emerald-500 text-white';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                badgeStyle = 'border-rose-500 bg-rose-500 text-white';
              } else {
                optionStyle = 'border-border/40 opacity-60 text-muted-foreground';
              }
            }

            return (

              <div className='flex flex-col'>
                <button
                  key={ans.id}
                  type="button"
                  onClick={() => {
                    if (phase === 'PRACTICE') {
                      onSelectAnswer(question.id, ans.id, ans.is_correct);
                    }
                  }}
                  disabled={phase === 'SUBMITTED'}
                  className={`relative flex flex-col items-stretch rounded-xl border p-3 text-left transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-colors ${badgeStyle}`}
                    >
                      {letter}
                    </div>
                    <span className="text-base font-medium flex-grow leading-snug">
                      {ans.answers_text}
                    </span>

                    {phase === 'SUBMITTED' && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {phase === 'SUBMITTED' && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                </button>
                {/* Explanation hiển thị ngay dưới câu trả lời khi đã SUBMITTED */}
                {phase === 'SUBMITTED' && ans.explanation && (
                  <div
                    className={` pt-4  pl-4 text-xs leading-relaxed ${isCorrect
                      ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                      : 'text-rose-600 dark:text-rose-400'
                      }`}
                  >
                    {ans.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Nút Toggle mở rộng Phân tích */}
        {analysis && (
          <div className="pt-2 border-t border-border/40">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleExplanation(question.id)}
              className="w-full sm:w-auto text-xs font-semibold gap-1.5 border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {phase === 'PRACTICE'
                ? isExplanationOpen
                  ? 'Ẩn chiến lược giải'
                  : 'Xem chiến lược giải & Điểm ngữ pháp'
                : isExplanationOpen
                  ? 'Ẩn giải thích chi tiết & Bản dịch'
                  : 'Xem giải thích chi tiết & Bản dịch'}
              {isExplanationOpen ? (
                <ChevronUp className="h-3.5 w-3.5 ml-0.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
              )}
            </Button>
          </div>
        )}

        {/* Khối phân tích chi tiết (Được mở rộng khi toggle) */}
        {analysis && isExplanationOpen && (
          <div className="mt-4 rounded-xl border border-primary/20 bg-muted/30 p-4 sm:p-5 space-y-4 text-sm animate-in fade-in-50 duration-200">
            {/* Phase 2: Hiển thị Bản dịch câu hỏi */}
            {phase === 'SUBMITTED' && analysis.translation && (
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-primary mb-1.5">
                  <Languages className="h-4 w-4" />
                  <span>Dịch câu hỏi</span>
                </div>
                <p className="text-foreground/90 leading-relaxed bg-background/80 p-3 rounded-lg border border-border/50 text-xs sm:text-sm">
                  {analysis.translation}
                </p>
              </div>
            )}

            {/* Cả Phase 1 & Phase 2: Hiển thị Solving Strategy (Chiến lược & Ngữ pháp) */}
            {(solvingStrategy.step_by_step?.length ||
              solvingStrategy.grammar_points?.length ||
              solvingStrategy.key_takeaway) && (
                <div className="space-y-2.5 pt-1">
                  <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs sm:text-sm">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <span>Chiến lược làm bài & Điểm ngữ pháp</span>
                  </div>

                  {solvingStrategy.step_by_step && solvingStrategy.step_by_step.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground">Các bước tiếp cận:</span>
                      <ul className="list-disc list-inside space-y-1 pl-1 text-xs text-foreground/90">
                        {solvingStrategy.step_by_step.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solvingStrategy.grammar_points && solvingStrategy.grammar_points.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground">Ngữ pháp trọng tâm:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {solvingStrategy.grammar_points.map((pt, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-xs"
                          >
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {solvingStrategy.key_takeaway && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 p-2.5 rounded-lg text-xs font-medium">
                      💡 <strong className="font-semibold">Ghi nhớ:</strong> {solvingStrategy.key_takeaway}
                    </div>
                  )}
                </div>
              )}

            {/* Evidence clue nếu có */}
            {phase === 'SUBMITTED' && evidence?.clue && (
              <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded border border-border/30">
                <span className="font-semibold text-foreground">Dấu hiệu nhận biết:</span> {evidence.clue}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
