'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Languages,
} from 'lucide-react';
import type {
  Part6PassageItem,
  QuestionSolvingStrategy,
  QuestionEvidenceInfo,
} from '../types';

type QuestionItem = Part6PassageItem['questions'][number];

interface Part6QuestionCardProps {
  question: QuestionItem;
  phase: 'PRACTICE' | 'SUBMITTED';
  selectedAnswerId?: number;
  isExplanationOpen?: boolean;
  onSelectAnswer: (questionId: number, answerId: number) => void;
  onToggleExplanation: (questionId: number) => void;
}

const ANSWER_LETTERS: Record<number, string> = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
};

export const Part6QuestionCard: React.FC<Part6QuestionCardProps> = ({
  question,
  phase,
  selectedAnswerId,
  isExplanationOpen = false,
  onSelectAnswer,
  onToggleExplanation,
}) => {
  const analysis = question.question_analysis;
  const isAnswered = selectedAnswerId !== undefined;

  const solvingStrategy = (analysis?.solving_strategy || {}) as QuestionSolvingStrategy;
  const evidence = (analysis?.evidence || {}) as QuestionEvidenceInfo;

  return (
    <Card className="border-border/70 overflow-hidden shadow-sm transition-all hover:shadow-md">
      {/* Header: Số thứ tự câu hỏi & Type Badge */}
      <CardHeader className="bg-muted/30 border-b border-border/40 py-3 px-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              Câu {question.question_number}
            </span>
            {analysis?.question_type && (
              <Badge variant="outline" className="text-[11px] font-medium border-primary/20 bg-background text-primary">
                {analysis.question_type}
              </Badge>
            )}
          </div>

          <div>
            {phase === 'PRACTICE' && isAnswered && (
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                Đã chọn
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Câu hỏi hoặc hướng dẫn */}
        {question.question_text && question.question_text !== `[${question.question_number}]` && (
          <div className="text-sm font-medium text-foreground leading-relaxed">
            {question.question_text}
          </div>
        )}

        {/* 4 Lựa chọn A, B, C, D */}
        <div className="grid grid-cols-1 gap-2.5">
          {question.answers.map((ans) => {
            const letter = ANSWER_LETTERS[ans.answer_number] || String(ans.answer_number);
            const isSelected = selectedAnswerId === ans.id;
            const isCorrect = ans.is_correct;

            let optionStyle = 'border-border/60 hover:border-primary/50 hover:bg-muted/40 text-foreground';
            let badgeStyle = 'border-border bg-background text-foreground';

            if (phase === 'PRACTICE') {
              if (isSelected) {
                optionStyle = 'border-foreground/60 bg-muted/80 text-foreground font-semibold ring-1 ring-foreground/40';
                badgeStyle = 'border-foreground/80 bg-foreground text-background';
              }
            } else {
              // Phase SUBMITTED: Hiển thị đúng (xanh) và đã chọn sai (đỏ)
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
              <div key={ans.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    if (phase === 'PRACTICE') {
                      onSelectAnswer(question.id, ans.id);
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
                    <span className="text-sm sm:text-base font-medium flex-grow leading-snug">
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
                    className={`pt-2.5 pl-4 text-xs leading-relaxed ${
                      isCorrect
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

        {/* Nút Toggle mở rộng Phân tích & Bản dịch */}
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
          <div className="mt-3 rounded-xl border border-primary/20 bg-muted/30 p-3.5 sm:p-4 space-y-3.5 text-xs sm:text-sm animate-in fade-in-50 duration-200">
            {/* Phase SUBMITTED: Hiển thị Bản dịch câu hỏi */}
            {phase === 'SUBMITTED' && analysis.translation && (
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-primary mb-1">
                  <Languages className="h-4 w-4" />
                  <span>Dịch ngữ cảnh câu hỏi</span>
                </div>
                <p className="text-foreground/90 leading-relaxed bg-background/80 p-2.5 rounded-lg border border-border/50 text-xs">
                  {analysis.translation}
                </p>
              </div>
            )}

            {/* Chiến lược làm bài & Điểm ngữ pháp */}
            {(solvingStrategy.step_by_step?.length ||
              solvingStrategy.grammar_points?.length ||
              solvingStrategy.key_takeaway) && (
              <div className="space-y-2 pt-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs sm:text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>Chiến lược làm bài & Điểm ngữ pháp</span>
                </div>

                {solvingStrategy.step_by_step && solvingStrategy.step_by_step.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground">Các bước tiếp cận:</span>
                    <ul className="list-disc list-inside space-y-0.5 pl-1 text-xs text-foreground/90">
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
                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 p-2 rounded-lg text-xs font-medium">
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
