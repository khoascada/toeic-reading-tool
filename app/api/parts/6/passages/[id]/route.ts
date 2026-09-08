import { NextRequest, NextResponse } from 'next/server';
import { getPart6PassageById } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (!id || isNaN(id)) {
      return NextResponse.json({ message: 'ID đoạn văn không hợp lệ' }, { status: 400 });
    }

    const passage = await getPart6PassageById(id);
    if (!passage) {
      return NextResponse.json({ message: 'Không tìm thấy đoạn văn Part 6' }, { status: 404 });
    }

    return NextResponse.json(passage);
  } catch (error) {
    console.error('Error fetching Part 6 passage by id:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy đoạn văn Part 6' }, { status: 500 });
  }
}
