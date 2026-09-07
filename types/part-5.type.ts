import {
  Part5QuestionItem,
  Part5StatsDetail,
  SubmitPart5Payload,
  ReadingPassageItem,
  Part5PassageItem,
} from '@/types/part.type';

export interface GetPart5AvailableCountParams {
  status: 'ALL' | 'UNANSWERED';
  questionType?: string;
}

export interface GetPart5PracticeParams {
  status?: 'ALL' | 'UNANSWERED';
  questionType?: string;
  limit?: number;
}

export interface SubmitPart5Response {
  success: boolean;
  count: number;
}

export type {
  Part5QuestionItem,
  Part5StatsDetail,
  SubmitPart5Payload,
  ReadingPassageItem,
  Part5PassageItem,
};
