import { NextRequest, NextResponse } from 'next/server';
import { getPracticePassages } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as 'ALL' | 'UNANSWERED') || 'ALL';
    const questionType = searchParams.get('questionType') || undefined;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const passages = await getPracticePassages({
      part: 5,
      status,
      questionType,
      limit,
    });

    return NextResponse.json(passages);
  } catch (error) {
    console.error('Error fetching Part 5 practice questions:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy câu hỏi luyện tập' }, { status: 500 });
  }
}
