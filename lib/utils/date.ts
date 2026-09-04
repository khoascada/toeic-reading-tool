import { format } from 'date-fns';

export function normalizeToUTCMidnight(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(Date.UTC(year, month, day));
}

export function isToday(date: Date): boolean {
  return normalizeToUTCMidnight(date).getTime() === normalizeToUTCMidnight(new Date()).getTime();
}

interface FormatDateOptions {
  locale?: string;
  showTime?: boolean;
}

export function formatDate(
  date: string | Date,
  options: FormatDateOptions = { locale: 'vi', showTime: false }
): string {
  const { locale, showTime } = options;
  if (showTime) {
    if (locale === 'vi') return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    return format(new Date(date), 'MM/dd/yyyy HH:mm:ss');
  }
  if (locale === 'vi') return format(new Date(date), 'dd/MM/yyyy');
  return format(new Date(date), 'MM/dd/yyyy');
}

export function getRelativeTime(date: string | number | Date, locale: string = 'vi'): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // Just now (< 60 seconds)
  if (diffInSeconds < 60) {
    return locale === 'vi' ? 'vừa xong' : 'just now';
  }

  // Minutes
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return locale === 'vi'
      ? `${diffInMinutes} phút trước`
      : `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  // Hours
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return locale === 'vi'
      ? `${diffInHours} giờ trước`
      : `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  // Days
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return locale === 'vi'
      ? `${diffInDays} ngày trước`
      : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  // Months
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return locale === 'vi'
      ? `${diffInMonths} tháng trước`
      : `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  // Years
  const diffInYears = Math.floor(diffInMonths / 12);
  return locale === 'vi'
    ? `${diffInYears} năm trước`
    : `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}
