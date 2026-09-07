import { prisma } from '@lib/prisma';
import { Prisma, QuestionType } from '@prisma/client';
import {
  Part5QuestionItem,
  Part6PassageItem,
  Part7PassageItem,
  ReadingPassageItem,
  GetPracticePassagesParams,
  PaginationParams,
  PaginatedResult,
  GetPart5Params,
  Part5StatsDetail,
  Part5PracticeParams,
  SubmitAttemptItem,
} from '@/types/part.type';

export * from '@/types/part.type';

/**
 * Lấy danh sách câu hỏi Part 5 có hỗ trợ phân trang
 */
export async function getPart5(params?: GetPart5Params): Promise<PaginatedResult<Part5QuestionItem>> {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 20);
  const skip = (page - 1) * limit;

  const where: Prisma.QuestionWhereInput = {
    passage: {
      part: 5,
    },
    ...(params?.questionType
      ? {
          question_analysis: {
            question_type: params.questionType,
          },
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.question.count({ where }),
    prisma.question.findMany({
      where,
      include: {
        answers: {
          orderBy: {
            answer_number: 'asc',
          },
        },
        question_analysis: true,
        question_attempts: {
          orderBy: {
            started_at: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        question_number: 'asc',
      },
      skip,
      take: limit,
    }),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Lấy thống kê chi tiết của Part 5 (tổng câu, đã làm, số câu đúng theo từng QuestionType)
 */
export async function getPart5StatsDetail(): Promise<Part5StatsDetail> {
  const questions = await prisma.question.findMany({
    where: {
      passage: {
        part: 5,
      },
    },
    select: {
      id: true,
      question_analysis: {
        select: {
          question_type: true,
        },
      },
      question_attempts: {
        select: {
          is_correct: true,
        },
        orderBy: {
          started_at: 'desc',
        },
      },
    },
  });

  const byType: Record<string, { total: number; answered: number; correct: number }> = {};
  let totalAnswered = 0;
  let totalCorrect = 0;

  for (const q of questions) {
    const qType = q.question_analysis?.question_type || 'UNKNOWN';
    if (!byType[qType]) {
      byType[qType] = { total: 0, answered: 0, correct: 0 };
    }
    byType[qType].total += 1;

    const attempts = q.question_attempts;
    if (attempts.length > 0) {
      byType[qType].answered += 1;
      totalAnswered += 1;

      const isEverCorrect = attempts.some((att) => att.is_correct);
      if (isEverCorrect) {
        byType[qType].correct += 1;
        totalCorrect += 1;
      }
    }
  }

  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return {
    totalQuestions: questions.length,
    totalAnswered,
    totalCorrect,
    accuracy,
    byType,
  };
}

/**
 * Lấy số lượng câu hỏi Part 5 khả dụng theo điều kiện lọc
 */
export async function getPart5AvailableCount(status: 'ALL' | 'UNANSWERED' = 'ALL', questionType?: string): Promise<number> {
  const where: Prisma.QuestionWhereInput = {
    passage: {
      part: 5,
    },
    ...(status === 'UNANSWERED'
      ? {
          question_attempts: {
            none: {},
          },
        }
      : {}),
    ...(questionType && questionType !== 'ALL'
      ? {
          question_analysis: {
            question_type: questionType as QuestionType,
          },
        }
      : {}),
  };

  return await prisma.question.count({ where });
}

/**
 * Lấy ngẫu nhiên đoạn văn / câu hỏi luyện tập cho Part 5, 6, 7
 */
export async function getPracticePassages(params: GetPracticePassagesParams): Promise<ReadingPassageItem[]> {
  const part = params.part;
  const status = params.status || 'ALL';
  const questionType = params.questionType;
  const limit = Math.max(1, params.limit || 10);

  const where: Prisma.PassageWhereInput = {
    part,
    ...(status === 'UNANSWERED'
      ? {
          questions: {
            every: {
              question_attempts: {
                none: {},
              },
            },
          },
        }
      : {}),
    ...(questionType && questionType !== 'ALL'
      ? {
          questions: {
            some: {
              question_analysis: {
                question_type: questionType as QuestionType,
              },
            },
          },
        }
      : {}),
  };

  // 1. Chỉ fetch IDs của các passage thỏa điều kiện lọc (nhẹ, nhanh)
  const matchingPassages = await prisma.passage.findMany({
    where,
    select: { id: true },
  });

  if (matchingPassages.length === 0) {
    return [];
  }

  // 2. Fisher-Yates random shuffle mảng IDs và lấy đúng limit IDs
  const shuffledIds = matchingPassages.map((p) => p.id);
  for (let i = shuffledIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
  }
  const selectedIds = shuffledIds.slice(0, limit);

  // 3. Fetch chi tiết đúng các passages đã chọn kèm quan hệ
  const passages = await prisma.passage.findMany({
    where: {
      id: { in: selectedIds },
    },
    include: {
      passage_analysis: true,
      vocabulary: true,
      questions: {
        include: {
          answers: {
            orderBy: {
              answer_number: 'asc',
            },
          },
          question_analysis: true,
          question_attempts: {
            orderBy: {
              started_at: 'desc',
            },
            take: 1,
          },
        },
        orderBy: {
          question_number: 'asc',
        },
      },
    },
  });

  // Đảm bảo giữ đúng thứ tự ngẫu nhiên của selectedIds
  const passageMap = new Map(passages.map((p) => [p.id, p]));
  return selectedIds
    .map((id) => passageMap.get(id))
    .filter((p): p is ReadingPassageItem => Boolean(p));
}

/**
 * Lấy ngẫu nhiên câu hỏi Part 5 theo điều kiện làm bài (wrapper tương thích ngược)
 */
export async function getPart5PracticeQuestions(params: Part5PracticeParams): Promise<Part5QuestionItem[]> {
  const passages = await getPracticePassages({
    part: 5,
    status: params.status,
    questionType: params.questionType,
    limit: params.limit,
  });

  return passages.flatMap((p) => p.questions);
}

/**
 * Lưu lịch sử làm bài Part 5 vào Database
 */
export async function submitPart5Attempts(items: SubmitAttemptItem[]) {
  if (!items || items.length === 0) {
    return { success: true, count: 0 };
  }

  const now = new Date();

  // Gom theo question ID để tìm passage ID tương ứng
  const questionIds = items.map((i) => i.id_question);
  const questions = await prisma.question.findMany({
    where: {
      id: { in: questionIds },
    },
    select: {
      id: true,
      id_passage: true,
    },
  });

  const passageMap = new Map<number, number>();
  questions.forEach((q) => passageMap.set(q.id, q.id_passage));

  let savedCount = 0;

  for (const item of items) {
    const passageId = passageMap.get(item.id_question);
    if (!passageId) continue;

    // Tạo PassageAttempt
    const passageAttempt = await prisma.passageAttempt.create({
      data: {
        id_passage: passageId,
        started_at: now,
        completed_at: now,
      },
    });

    // Tạo QuestionAttempt
    await prisma.questionAttempt.create({
      data: {
        id_passage_attempt: passageAttempt.id,
        id_question: item.id_question,
        id_selected_answer: item.id_selected_ans,
        is_correct: item.is_correct,
        started_at: now,
        completed_at: now,
      },
    });

    savedCount++;
  }

  return { success: true, count: savedCount };
}
