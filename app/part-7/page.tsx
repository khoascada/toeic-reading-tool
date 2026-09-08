import { Part7DashboardView } from '@features/part-7/components/part-7-dashboard-view';

export const metadata = {
  title: 'Part 7: Đọc hiểu đoạn văn (Reading Comprehension) | TOEIC Tool',
  description: 'Luyện tập kỹ năng đọc hiểu đoạn văn Part 7 đề thi TOEIC Reading.',
};

export default function Part7Page() {
  return (
    <main className="min-h-screen">
      <Part7DashboardView />
    </main>
  );
}
