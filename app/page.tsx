import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { BookOpen, Library, BookMarked, History, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const quickActions = [
    {
      title: 'Luyện đọc theo Passage',
      description: 'Luyện tập các đoạn văn Part 6 & Part 7 kèm phân tích câu hỏi chi tiết từ AI',
      icon: <BookOpen className="text-primary h-6 w-6" />,
      href: '/passages',
    },
    {
      title: 'Làm đề thi trọn vẹn',
      description: 'Thi thử các bộ đề ETS 2023 Reading với chấm điểm và giải thích',
      icon: <Library className="text-primary h-6 w-6" />,
      href: '/tests',
    },
    {
      title: 'Sổ từ vựng & Phân tích từ',
      description: 'Tra cứu từ vựng quan trọng, từ đồng nghĩa, collocations rút ra từ bài đọc',
      icon: <BookMarked className="text-primary h-6 w-6" />,
      href: '/vocabulary',
    },
    {
      title: 'Lịch sử & Phân tích điểm yếu',
      description: 'Xem lại các lần làm bài và câu hỏi làm sai để củng cố kỹ năng',
      icon: <History className="text-primary h-6 w-6" />,
      href: '/attempts',
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      {/* Welcome Banner */}
      <div className="bg-primary/10 border-primary/20 mb-8 rounded-2xl border p-6 md:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
          <Sparkles className="h-4 w-4" />
          <span>TOEIC Reading Mastery Platform</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Chào mừng bạn đến với TOEIC Reading Tool
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
          Hệ thống hỗ trợ luyện đọc TOEIC kết hợp AI phân tích chiến lược làm bài, giải thích đáp án sai và trích xuất từ vựng trọng tâm.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {quickActions.map((action, idx) => (
          <Link key={idx} href={action.href} className="group transition-transform hover:-translate-y-0.5">
            <Card className="h-full border-border/60 transition-colors group-hover:border-primary/50 group-hover:shadow-sm">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-primary/10 rounded-xl p-2.5">{action.icon}</div>
                <div>
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    {action.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {action.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
