import { QuestionType, Prisma } from '@prisma/client';

export type Part5QuestionItem = Prisma.QuestionGetPayload<{
  include: {
    answers: true;
    question_analysis: true;
    question_attempts: true;
  };
}>;

export type ReadingPassageItem = Prisma.PassageGetPayload<{
  include: {
    passage_analysis: true;
    vocabulary: true;
    questions: {
      include: {
        answers: true;
        question_analysis: true;
        question_attempts: true;
      };
    };
  };
}>;

export type Part5PassageItem = ReadingPassageItem;
export type Part6PassageItem = ReadingPassageItem;
export type Part7PassageItem = ReadingPassageItem;

export interface GetPracticePassagesParams {
  part: number; // 5 | 6 | 7
  status?: 'ALL' | 'UNANSWERED';
  questionType?: string;
  limit?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface GetPart5Params extends PaginationParams {
  questionType?: QuestionType;
}

export interface Part5Stats {
  total: number;
  byType: Record<string, number>;
}

export interface TypeStatDetail {
  total: number;
  answered: number;
  correct: number;
}

export interface Part5StatsDetail {
  totalQuestions: number;
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
  byType: Record<string, TypeStatDetail>;
}

export interface Part5PracticeParams {
  status?: 'ALL' | 'UNANSWERED';
  questionType?: string; // 'ALL' or QuestionType
  limit?: number;
}

export interface SubmitAttemptItem {
  id_question: number;
  id_selected_ans: number;
  is_correct: boolean;
}

export interface SubmitPart5Payload {
  items: SubmitAttemptItem[];
}

export type Part6StatusFilter = 'ALL' | 'UNANSWERED' | 'ANSWERED';

export interface Part6PassageStatItem {
  id: number;
  topic?: string | null;
  mainIdea?: string | null;
  questionNumbers: number[];
  isAnswered: boolean;
  totalQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
}

export interface Part6StatsDetail {
  totalPassages: number;
  answeredPassages: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
  accuracy: number;
  passages: Part6PassageStatItem[];
  byType: Record<string, TypeStatDetail>;
}

export interface SubmitPart6Payload {
  passageId: number;
  items: SubmitAttemptItem[];
}

export type Part7StatusFilter = 'ALL' | 'UNANSWERED' | 'ANSWERED';

export interface Part7PassageStatItem {
  id: number;
  topic?: string | null;
  mainIdea?: string | null;
  questionNumbers: number[];
  isAnswered: boolean;
  totalQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
}

export interface Part7StatsDetail {
  totalPassages: number;
  answeredPassages: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
  accuracy: number;
  passages: Part7PassageStatItem[];
  byType: Record<string, TypeStatDetail>;
}

export interface SubmitPart7Payload {
  passageId: number;
  items: SubmitAttemptItem[];
}
