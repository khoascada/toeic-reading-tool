import api from '@lib/api/api';
import type {
  Part6StatsDetail,
  Part6PassageItem,
  Part6StatusFilter,
  SubmitPart6Payload,
} from '@/types/part.type';

export interface SubmitPart6Response {
  success: boolean;
  count: number;
  passageAttemptId?: number;
}

export const part6Service = {
  async getStats(): Promise<Part6StatsDetail> {
    const response = await api.get<Part6StatsDetail>('/api/parts/6/stats');
    return response.data;
  },

  async getPassageIds(status: Part6StatusFilter = 'ALL'): Promise<{ ids: number[]; total: number }> {
    const response = await api.get<{ ids: number[]; total: number }>('/api/parts/6/passage-ids', {
      params: { status },
    });
    return response.data;
  },

  async getPassageById(id: number): Promise<Part6PassageItem> {
    const response = await api.get<Part6PassageItem>(`/api/parts/6/passages/${id}`);
    return response.data;
  },

  async submit(payload: SubmitPart6Payload): Promise<SubmitPart6Response> {
    const response = await api.post<SubmitPart6Response>('/api/parts/6/submit', payload);
    return response.data;
  },
};

export default part6Service;
