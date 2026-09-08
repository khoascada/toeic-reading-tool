import api from '@lib/api/api';
import type {
  Part7StatsDetail,
  Part7PassageItem,
  Part7StatusFilter,
  SubmitPart7Payload,
} from '@/types/part.type';

export interface SubmitPart7Response {
  success: boolean;
  count: number;
  passageAttemptId?: number;
}

export const part7Service = {
  async getStats(): Promise<Part7StatsDetail> {
    const response = await api.get<Part7StatsDetail>('/api/parts/7/stats');
    return response.data;
  },

  async getPassageIds(status: Part7StatusFilter = 'ALL'): Promise<{ ids: number[]; total: number }> {
    const response = await api.get<{ ids: number[]; total: number }>('/api/parts/7/passage-ids', {
      params: { status },
    });
    return response.data;
  },

  async getPassageById(id: number): Promise<Part7PassageItem> {
    const response = await api.get<Part7PassageItem>(`/api/parts/7/passages/${id}`);
    return response.data;
  },

  async submit(payload: SubmitPart7Payload): Promise<SubmitPart7Response> {
    const response = await api.post<SubmitPart7Response>('/api/parts/7/submit', payload);
    return response.data;
  },
};

export default part7Service;
