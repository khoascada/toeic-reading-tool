import { QuestionType } from '@prisma/client';
import { Part5QuestionItem, Part5Stats, PaginationMeta, PaginatedResult } from '@/types/part.type';

export type Part5QuestionFilterType = 'ALL' | QuestionType;

export interface QuestionTypeMeta {
  key: QuestionType;
  label: string;
  description: string;
  colorClass: string;
}

export const PART_5_QUESTION_TYPES: QuestionTypeMeta[] = [
  {
    key: 'WORD_FORM',
    label: 'Dạng từ',
    description: 'Noun, Verb, Adjective, Adverb',
    colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
  },
  {
    key: 'VERB_TENSE',
    label: 'Thì động từ',
    description: 'Hiện tại, Quá khứ, Tương lai, Hoàn thành',
    colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
  },
  {
    key: 'VERB_FORM',
    label: 'Dạng động từ',
    description: 'Gerund (-ing), Infinitive (to V), Bare V, Participle',
    colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900',
  },
  {
    key: 'CONJUNCTION',
    label: 'Liên từ',
    description: 'Although, However, Therefore, Because,...',
    colorClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
  },
  {
    key: 'PREPOSITION',
    label: 'Giới từ',
    description: 'In, on, at, by, for, with, about,...',
    colorClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900',
  },
  {
    key: 'PRONOUN',
    label: 'Đại từ',
    description: 'He, his, him, himself, whose,...',
    colorClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900',
  },
  {
    key: 'VOCABULARY',
    label: 'Từ vựng',
    description: 'Chọn từ đúng nghĩa theo ngữ cảnh',
    colorClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900',
  },
];

export interface DistractorItem {
  reason?: string;
}

export interface SolvingStrategy {
  step_by_step?: string[];
  grammar_points?: string[];
  key_takeaway?: string;
}

export interface EvidenceInfo {
  quote?: string;
  location?: string;
  clue?: string;
}

export { type Part5QuestionItem, type Part5Stats, type PaginationMeta, type PaginatedResult };
