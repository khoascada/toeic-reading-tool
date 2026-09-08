import { QuestionType } from '@prisma/client';
import {
  Part6PassageItem,
  Part6StatsDetail,
  Part6PassageStatItem,
  Part6StatusFilter,
  SubmitPart6Payload,
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
  type Part6PassageItem,
  type Part6StatsDetail,
  type Part6PassageStatItem,
  type Part6StatusFilter,
  type SubmitPart6Payload,
  type ReadingPassageItem,
  type SubmitAttemptItem,
  type QuestionType,
};
