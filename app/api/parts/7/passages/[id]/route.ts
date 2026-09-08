import { NextRequest, NextResponse } from 'next/server';
import { getPart7PassageById } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (!id || isNaN(id)) {
      return NextResponse.json({ message: 'ID đoạn văn không hợp lệ' }, { status: 400 });
    }

    const passage = await getPart7PassageById(id);
    if (!passage) {
      return NextResponse.json({ message: 'Không tìm thấy đoạn văn Part 7' }, { status: 404 });
    }

    return NextResponse.json(passage);
  } catch (error) {
    console.error('Error fetching Part 7 passage by id:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy đoạn văn Part 7' }, { status: 500 });
  }
}
