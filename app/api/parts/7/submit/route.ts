import { NextRequest, NextResponse } from 'next/server';
import { submitPart7Attempts, getPart7PassageById } from '@/repositories';
import { SubmitPart7Payload } from '@/types/part.type';

export async function POST(request: NextRequest) {
  try {
    const body: SubmitPart7Payload = await request.json();
    const { passageId, items } = body;

    if (!passageId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Dữ liệu nộp bài không hợp lệ' }, { status: 400 });
    }

    // Kiểm tra passage tồn tại và số lượng câu hỏi đã trả lời
    const passage = await getPart7PassageById(passageId);
    if (!passage) {
      return NextResponse.json({ message: 'Không tìm thấy đoạn văn tương ứng' }, { status: 404 });
    }

    // Tất cả câu hỏi phải được trả lời mới cho nộp bài
    if (items.length !== passage.questions.length) {
      return NextResponse.json(
        {
          message: `Vui lòng hoàn thành tất cả ${passage.questions.length} câu hỏi trước khi nộp bài.`,
        },
        { status: 400 }
      );
    }

    const result = await submitPart7Attempts(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting Part 7 attempts:', error);
    return NextResponse.json({ message: 'Lỗi khi lưu kết quả bài làm Part 7' }, { status: 500 });
  }
}
