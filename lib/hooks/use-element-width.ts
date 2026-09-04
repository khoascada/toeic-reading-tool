'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Đo width hiện tại của một element bằng ResizeObserver.
 * Trả về [callbackRef, width]; width cập nhật mỗi khi element đổi kích thước.
 *
 * Dùng callback ref (thay vì useEffect) để observer gắn đúng thời điểm element
 * vào/ra DOM — kể cả khi element render trễ (vd sau khi data fetch xong).
 */
export const useElementWidth = <T extends HTMLElement>(): [(node: T | null) => void, number] => {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect();

    if (!node) {
      observerRef.current = null;
      return;
    }

    setWidth(node.getBoundingClientRect().width);
    observerRef.current = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observerRef.current.observe(node);
  }, []);

  return [ref, width];
};
