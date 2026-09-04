import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate, normalizeToUTCMidnight, getRelativeTime } from './date';

describe('normalizeToUTCMidnight', () => {
  it('should return a date at 00:00:00 UTC with the same year, month, and day', () => {
    // Tạo một ngày giờ địa phương cụ thể: 15/10/2023 14:30:00
    // Lưu ý: Tháng tính từ 0 (9 là tháng 10)
    const input = new Date(2023, 9, 15, 14, 30, 0);

    const result = normalizeToUTCMidnight(input);

    // Kiểm tra kết quả trả về phải là đối tượng Date
    expect(result).toBeInstanceOf(Date);

    // Kiểm tra ngày tháng năm theo UTC phải khớp với input
    expect(result.getUTCFullYear()).toBe(2023);
    expect(result.getUTCMonth()).toBe(9);
    expect(result.getUTCDate()).toBe(15);

    // Kiểm tra giờ phải là nửa đêm (00:00:00) theo UTC
    expect(result.getUTCHours()).toBe(0);
    expect(result.getUTCMinutes()).toBe(0);
    expect(result.getUTCSeconds()).toBe(0);
    expect(result.getUTCMilliseconds()).toBe(0);
  });

  it('should handle end of month/year correctly', () => {
    // Ngày 31/12/2023 lúc 23:59:59
    const input = new Date(2023, 11, 31, 23, 59, 59);

    const result = normalizeToUTCMidnight(input);

    // Kiểm tra xem hàm có giữ đúng ngày cuối năm không
    expect(result.getUTCFullYear()).toBe(2023);
    expect(result.getUTCMonth()).toBe(11); // Tháng 12
    expect(result.getUTCDate()).toBe(31);
    expect(result.getUTCHours()).toBe(0);
  });
});

// formatDate
describe('formatDate()', () => {
  // Sử dụng một mốc thời gian cố định để tránh sai lệch khi chạy test
  const mockDate = '2026-01-14T15:04:05.000Z';

  describe('Trường hợp locale: "vi" (Tiếng Việt)', () => {
    it('nên format dd/MM/yyyy khi showTime là false (mặc định)', () => {
      const result = formatDate(mockDate, { locale: 'vi', showTime: false });
      expect(result).toBe('14/01/2026');
    });

    it('nên format đầy đủ dd/MM/yyyy HH:mm:ss khi showTime là true', () => {
      const result = formatDate(mockDate, { locale: 'vi', showTime: true });
      // Lưu ý: Kết quả giờ (HH) có thể thay đổi tùy theo múi giờ của máy chạy test (Local Time)
      // Nếu máy bạn là GMT+7, kết quả sẽ là 22:04:05
      expect(result).toMatch(/^14\/01\/2026 \d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('Trường hợp locale: "en" (Tiếng Anh)', () => {
    it('nên format MM/dd/yyyy khi showTime là false', () => {
      const result = formatDate(mockDate, { locale: 'en', showTime: false });
      expect(result).toBe('01/14/2026');
    });

    it('nên format đầy đủ MM/dd/yyyy HH:mm:ss khi showTime là true', () => {
      const result = formatDate(mockDate, { locale: 'en', showTime: true });
      expect(result).toMatch(/^01\/14\/2026 \d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('Kiểm tra tham số mặc định và kiểu dữ liệu', () => {
    it('nên sử dụng giá trị mặc định (vi, no time) khi không truyền options', () => {
      const result = formatDate(mockDate);
      expect(result).toBe('14/01/2026');
    });

    it('nên hoạt động chính xác khi truyền vào một đối tượng Date', () => {
      const dateObj = new Date(2026, 0, 14); // 14/01/2026
      const result = formatDate(dateObj, { locale: 'vi' });
      expect(result).toBe('14/01/2026');
    });
  });
});

describe('getRelativeTime', () => {
  const now = new Date('2024-01-01T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Locale: vi (Tiếng Việt)', () => {
    it('nên trả về "vừa xong" nếu < 60 giây', () => {
      const date = new Date(now.getTime() - 50 * 1000); // 50s trước
      expect(getRelativeTime(date, 'vi')).toBe('vừa xong');
    });

    it('nên trả về "x phút trước"', () => {
      const date1 = new Date(now.getTime() - 60 * 1000); // 1 phút
      expect(getRelativeTime(date1, 'vi')).toBe('1 phút trước');

      const date2 = new Date(now.getTime() - 59 * 60 * 1000); // 59 phút
      expect(getRelativeTime(date2, 'vi')).toBe('59 phút trước');
    });

    it('nên trả về "x giờ trước"', () => {
      const date1 = new Date(now.getTime() - 60 * 60 * 1000); // 1 giờ
      expect(getRelativeTime(date1, 'vi')).toBe('1 giờ trước');

      const date2 = new Date(now.getTime() - 23 * 60 * 60 * 1000); // 23 giờ
      expect(getRelativeTime(date2, 'vi')).toBe('23 giờ trước');
    });

    it('nên trả về "x ngày trước"', () => {
      const date1 = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 ngày
      expect(getRelativeTime(date1, 'vi')).toBe('1 ngày trước');

      const date2 = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000); // 29 ngày
      expect(getRelativeTime(date2, 'vi')).toBe('29 ngày trước');
    });

    it('nên trả về "x tháng trước"', () => {
      // Giả sử 1 tháng là 30 ngày theo logic trong hàm
      const date1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 ngày (1 tháng)
      expect(getRelativeTime(date1, 'vi')).toBe('1 tháng trước');

      const date2 = new Date(now.getTime() - 11 * 30 * 24 * 60 * 60 * 1000); // ~11 tháng
      expect(getRelativeTime(date2, 'vi')).toBe('11 tháng trước');
    });

    it('nên trả về "x năm trước"', () => {
      // Giả sử 1 năm = 12 * 30 ngày = 360 ngày theo logic
      const date1 = new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000); // 1 năm
      expect(getRelativeTime(date1, 'vi')).toBe('1 năm trước');
    });
  });

  describe('Locale: en (Tiếng Anh)', () => {
    it('should return "just now" if < 60 seconds', () => {
      const date = new Date(now.getTime() - 30 * 1000); // 30s ago
      expect(getRelativeTime(date, 'en')).toBe('just now');
    });

    it('should handle singular/plural for minutes', () => {
      const date1 = new Date(now.getTime() - 60 * 1000); // 1 min
      expect(getRelativeTime(date1, 'en')).toBe('1 minute ago');

      const date2 = new Date(now.getTime() - 5 * 60 * 1000); // 5 mins
      expect(getRelativeTime(date2, 'en')).toBe('5 minutes ago');
    });

    it('should handle singular/plural for hours', () => {
      const date1 = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour
      expect(getRelativeTime(date1, 'en')).toBe('1 hour ago');

      const date2 = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours
      expect(getRelativeTime(date2, 'en')).toBe('2 hours ago');
    });

    it('should handle singular/plural for days', () => {
      const date1 = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day
      expect(getRelativeTime(date1, 'en')).toBe('1 day ago');

      const date2 = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days
      expect(getRelativeTime(date2, 'en')).toBe('5 days ago');
    });

    it('nên trả về "x month ago"', () => {
      // Giả sử 1 tháng là 30 ngày theo logic trong hàm
      const date1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 ngày (1 tháng)
      expect(getRelativeTime(date1, 'en')).toBe('1 month ago');

      const date2 = new Date(now.getTime() - 11 * 30 * 24 * 60 * 60 * 1000); // ~11 tháng
      expect(getRelativeTime(date2, 'en')).toBe('11 months ago');
    });

    it('nên trả về "x years ago"', () => {
      // Giả sử 1 năm = 12 * 30 ngày = 360 ngày theo logic
      const date1 = new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000); // 1 năm
      expect(getRelativeTime(date1, 'en')).toBe('1 year ago');

      const date2 = new Date(now.getTime() - 24 * 30 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(date2, 'en')).toBe('2 years ago');
    });
  });
});
