import api from '@lib/api/api';
import type {
  Part5StatsDetail,
  ReadingPassageItem,
  SubmitPart5Payload,
  GetPart5AvailableCountParams,
  GetPart5PracticeParams,
  SubmitPart5Response,
} from '@/types/part-5.type';

export const part5Service = {
  async getStats(): Promise<Part5StatsDetail> {
    const response = await api.get<Part5StatsDetail>('/api/parts/5/stats');
    return response.data;
  },

  async getAvailableCount(params: GetPart5AvailableCountParams): Promise<{ count: number }> {
    const response = await api.get<{ count: number }>('/api/parts/5/available-count', {
      params: {
        status: params.status,
        questionType: params.questionType === 'ALL' ? undefined : params.questionType,
      },
    });
    return response.data;
  },

  async getPractice(params: GetPart5PracticeParams): Promise<ReadingPassageItem[]> {
    const response = await api.get<ReadingPassageItem[]>('/api/parts/5/practice', {
      params: {
        status: params.status || 'ALL',
        questionType: params.questionType === 'ALL' ? undefined : params.questionType,
        limit: params.limit || 10,
      },
    });
    return response.data;
  },

  async submit(payload: SubmitPart5Payload): Promise<SubmitPart5Response> {
    const response = await api.post<SubmitPart5Response>('/api/parts/5/submit', payload);
    return response.data;
  },
};

export default part5Service;