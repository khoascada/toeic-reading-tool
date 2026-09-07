import { NextRequest, NextResponse } from 'next/server';
import { getPart5AvailableCount } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as 'ALL' | 'UNANSWERED') || 'ALL';
    const questionType = searchParams.get('questionType') || undefined;

    const count = await getPart5AvailableCount(status, questionType);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching Part 5 available count:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy số câu khả dụng' }, { status: 500 });
  }
}
