import { QuestionType } from '@prisma/client';
import {
  Part7PassageItem,
  Part7StatsDetail,
  Part7PassageStatItem,
  Part7StatusFilter,
  SubmitPart7Payload,
  ReadingPassageItem,
  SubmitAttemptItem,
} from '@/types/part.type';

export interface PassageStructure {
  type?: string;
  headline?: string;
  lead?: string;
  body?: string;
  [key: string]: unknown;
}

export interface ParagraphVocabularyItem {
  word: string;
  part_of_speech?: string;
  meaning?: string;
}

export interface ParagraphAnalysisItem {
  paragraph_number: number;
  summary: string;
  key_points?: string[];
  key_vocabulary?: ParagraphVocabularyItem[];
}

export interface ReadingStrategy {
  recommended_time_seconds?: number;
  approach?: string;
  tips?: string[];
}

export interface QuestionSolvingStrategy {
  step_by_step?: string[];
  grammar_points?: string[];
  key_takeaway?: string;
}

export interface QuestionEvidenceInfo {
  quote?: string;
  location?: string;
  clue?: string;
}

export {
  type Part7PassageItem,
  type Part7StatsDetail,
  type Part7PassageStatItem,
  type Part7StatusFilter,
  type SubmitPart7Payload,
  type ReadingPassageItem,
  type SubmitAttemptItem,
  type QuestionType,
};
