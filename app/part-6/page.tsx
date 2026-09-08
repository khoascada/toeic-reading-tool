import { Part6DashboardView } from '@features/part-6/components/part-6-dashboard-view';

export const metadata = {
  title: 'Part 6: Hoàn thành đoạn văn (Text Completion) | TOEIC Tool',
  description: 'Luyện tập kỹ năng hoàn thành đoạn văn Part 6 đề thi TOEIC Reading.',
};

export default function Part6Page() {
  return (
    <main className="min-h-screen">
      <Part6DashboardView />
    </main>
  );
}
