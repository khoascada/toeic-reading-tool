import { useState, useCallback } from 'react';
import { part6Service } from '@/services';
import type { Part6StatusFilter } from '../types';

export const useGetRandomPassageId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Lấy danh sách ID từ server theo status, sau đó random 1 ID (tránh excludeId nếu có)
   */
  const getRandomId = useCallback(
    async (status: Part6StatusFilter = 'ALL', excludeId?: number): Promise<number | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const { ids } = await part6Service.getPassageIds(status);
        if (!ids || ids.length === 0) {
          return null;
        }

        // Lọc bỏ ID hiện tại nếu còn những ID khác
        let candidateIds = ids;
        if (excludeId !== undefined && ids.length > 1) {
          candidateIds = ids.filter((id) => id !== excludeId);
        }

        // Chọn ngẫu nhiên 1 ID trong danh sách ứng viên
        const randomIndex = Math.floor(Math.random() * candidateIds.length);
        return candidateIds[randomIndex];
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi khi lấy ID bài đọc ngẫu nhiên';
        setError(msg);
        console.error('Failed to get random passage id:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    getRandomId,
    isLoading,
    error,
  };
};
