import { NextRequest, NextResponse } from 'next/server';
import { submitPart5Attempts } from '@/repositories';
import { SubmitPart5Payload } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitPart5Payload;
    if (!body || !Array.isArray(body.items)) {
      return NextResponse.json({ message: 'Payload không hợp lệ' }, { status: 400 });
    }

    const result = await submitPart5Attempts(body.items);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting Part 5 attempts:', error);
    return NextResponse.json({ message: 'Lỗi khi lưu kết quả làm bài' }, { status: 500 });
  }
}
