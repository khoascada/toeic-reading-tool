import { NextRequest, NextResponse } from 'next/server';
import { getPart7PassageIds } from '@/repositories';
import { Part7StatusFilter } from '@/types/part.type';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = (searchParams.get('status') || 'ALL').toUpperCase();
    const status: Part7StatusFilter = ['ALL', 'UNANSWERED', 'ANSWERED'].includes(statusParam)
      ? (statusParam as Part7StatusFilter)
      : 'ALL';

    const ids = await getPart7PassageIds(status);
    return NextResponse.json({ ids, total: ids.length });
  } catch (error) {
    console.error('Error fetching Part 7 passage IDs:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách ID đoạn văn Part 7' },
      { status: 500 }
    );
  }
}
