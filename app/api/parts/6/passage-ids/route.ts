import { NextRequest, NextResponse } from 'next/server';
import { getPart6PassageIds } from '@/repositories';
import { Part6StatusFilter } from '@/types/part.type';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = (searchParams.get('status') || 'ALL').toUpperCase();
    const status: Part6StatusFilter = ['ALL', 'UNANSWERED', 'ANSWERED'].includes(statusParam)
      ? (statusParam as Part6StatusFilter)
      : 'ALL';

    const ids = await getPart6PassageIds(status);
    return NextResponse.json({ ids, total: ids.length });
  } catch (error) {
    console.error('Error fetching Part 6 passage IDs:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách ID đoạn văn Part 6' },
      { status: 500 }
    );
  }
}
