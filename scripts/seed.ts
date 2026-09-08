import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import * as fs from 'fs';
import { prisma } from '../lib/prisma';
import { QuestionType, ReadingSkill, Prisma } from '@prisma/client';

interface RawOptionItem {
  text: string;
  explanation?: string;
}

interface RawOptionMap {
  [key: string]: string | RawOptionItem;
}

interface RawQuestionAnalysis {
  question_type: string;
  skill?: string | null;
  translation?: string | null;
  evidence?: {
    quote?: string;
    location?: string;
    clue?: string;
  } | null;
  solving_strategy: {
    step_by_step?: string[];
    grammar_points?: string[];
    key_takeaway?: string;
  };
}

interface RawQuestion {
  question_number: number;
  question_text?: string;
  options: RawOptionMap;
  correct_answer: string;
  question_analysis?: RawQuestionAnalysis;
}

interface RawPassageAnalysis {
  summary: string;
  main_idea: string;
  topic: string;
  structure: Prisma.InputJsonValue;
  paragraph_analysis: Prisma.InputJsonValue;
  reading_strategy: Prisma.InputJsonValue;
}

interface RawPassageGroup {
  group_id?: string;
  title?: string;
  document_type?: string;
  passage_text?: string;
  questions?: RawQuestion[];
  passage_analysis?: RawPassageAnalysis;
}

interface RawTestData {
  book: string;
  test_id: string;
  total_questions: number;
  parts: {
    part_5?: {
      part_number: number;
      description: string;
      questions_count: number;
      questions: RawQuestion[];
    };
    part_6?: {
      part_number: number;
      description: string;
      passage_groups_count: number;
      questions_count: number;
      passage_groups: RawPassageGroup[];
    };
    part_7?: {
      part_number: number;
      description: string;
      passage_groups_count: number;
      questions_count: number;
      passage_groups: RawPassageGroup[];
    };
  };
}

const OPTION_LETTER_TO_NUMBER: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

function parseAnswers(options: RawOptionMap, correctAnswer: string) {
  return Object.entries(options || {}).map(([optLetter, optVal]) => {
    const text = typeof optVal === 'string' ? optVal : optVal?.text || '';
    const explanation = typeof optVal === 'string' ? null : optVal?.explanation || null;
    const isCorrect = optLetter.toUpperCase() === (correctAnswer || '').toUpperCase();
    return {
      answer_number: OPTION_LETTER_TO_NUMBER[optLetter.toUpperCase()] || 0,
      answers_text: text,
      is_correct: isCorrect,
      explanation: explanation,
    };
  });
}

function parseQuestionType(val?: string): QuestionType {
  if (!val) return QuestionType.VOCABULARY;
  if (Object.values(QuestionType).includes(val as QuestionType)) {
    return val as QuestionType;
  }
  return QuestionType.VOCABULARY;
}

function parseReadingSkill(val?: string | null): ReadingSkill | null {
  if (!val) return null;
  if (Object.values(ReadingSkill).includes(val as ReadingSkill)) {
    return val as ReadingSkill;
  }
  return null;
}

async function seedTest01() {
  const jsonPath = path.resolve(__dirname, '../../data/output/test_01.json');
  console.log(`Reading test data from: ${jsonPath}`);

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`File not found: ${jsonPath}`);
  }

  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const testData: RawTestData = JSON.parse(fileContent);

  console.log(`Starting import for ${testData.test_id} (${testData.book})...`);

  let totalPassagesCreated = 0;
  let totalQuestionsCreated = 0;
  let totalAnswersCreated = 0;
  let totalPassageAnalysisCreated = 0;
  let totalQuestionAnalysisCreated = 0;

  // 1. Process Part 5
  const part5 = testData.parts.part_5;
  if (part5 && Array.isArray(part5.questions)) {
    console.log(`\n--- Importing Part 5 (${part5.questions.length} questions) ---`);
    for (const q of part5.questions) {
      // Create Passage for Part 5 with passage_text = null and NO passage_analysis
      const passage = await prisma.passage.create({
        data: {
          part: 5,
          passage_text: null,
          is_study: false,
          questions: {
            create: {
              question_number: q.question_number,
              question_text: q.question_text || null,
              answers: {
                create: parseAnswers(q.options, q.correct_answer),
              },
              ...(q.question_analysis
                ? {
                    question_analysis: {
                      create: {
                        question_type: parseQuestionType(q.question_analysis.question_type),
                        skill: parseReadingSkill(q.question_analysis.skill),
                        translation: q.question_analysis.translation || null,
                        evidence: (q.question_analysis.evidence || {}) as unknown as Prisma.InputJsonValue,
                        solving_strategy: q.question_analysis.solving_strategy as unknown as Prisma.InputJsonValue,
                      },
                    },
                  }
                : {}),
            },
          },
        },
        include: {
          questions: {
            include: {
              answers: true,
              question_analysis: true,
            },
          },
        },
      });

      totalPassagesCreated++;
      totalQuestionsCreated += passage.questions.length;
      for (const createdQ of passage.questions) {
        totalAnswersCreated += createdQ.answers.length;
        if (createdQ.question_analysis) totalQuestionAnalysisCreated++;
      }
    }
    console.log(`Part 5 completed.`);
  }

  // 2. Process Part 6
  const part6 = testData.parts.part_6;
  if (part6 && Array.isArray(part6.passage_groups)) {
    console.log(`\n--- Importing Part 6 (${part6.passage_groups.length} passage groups) ---`);
    for (const pg of part6.passage_groups) {
      const passage = await prisma.passage.create({
        data: {
          part: 6,
          passage_text: pg.passage_text || null,
          is_study: true,
          ...(pg.passage_analysis
            ? {
                passage_analysis: {
                  create: {
                    summary: pg.passage_analysis.summary,
                    main_idea: pg.passage_analysis.main_idea,
                    topic: pg.passage_analysis.topic,
                    structure: pg.passage_analysis.structure as unknown as Prisma.InputJsonValue,
                    paragraph_analysis: pg.passage_analysis.paragraph_analysis as unknown as Prisma.InputJsonValue,
                    reading_strategy: pg.passage_analysis.reading_strategy as unknown as Prisma.InputJsonValue,
                  },
                },
              }
            : {}),
          questions: {
            create: (pg.questions || []).map((q) => ({
              question_number: q.question_number,
              question_text: q.question_text || null,
              answers: {
                create: parseAnswers(q.options, q.correct_answer),
              },
              ...(q.question_analysis
                ? {
                    question_analysis: {
                      create: {
                        question_type: parseQuestionType(q.question_analysis.question_type),
                        skill: parseReadingSkill(q.question_analysis.skill),
                        translation: q.question_analysis.translation || null,
                        evidence: (q.question_analysis.evidence || {}) as unknown as Prisma.InputJsonValue,
                        solving_strategy: q.question_analysis.solving_strategy as unknown as Prisma.InputJsonValue,
                      },
                    },
                  }
                : {}),
            })),
          },
        },
        include: {
          passage_analysis: true,
          questions: {
            include: {
              answers: true,
              question_analysis: true,
            },
          },
        },
      });

      totalPassagesCreated++;
      if (passage.passage_analysis) totalPassageAnalysisCreated++;
      totalQuestionsCreated += passage.questions.length;
      for (const createdQ of passage.questions) {
        totalAnswersCreated += createdQ.answers.length;
        if (createdQ.question_analysis) totalQuestionAnalysisCreated++;
      }
    }
    console.log(`Part 6 completed.`);
  }

  // 3. Process Part 7
  const part7 = testData.parts.part_7;
  if (part7 && Array.isArray(part7.passage_groups)) {
    console.log(`\n--- Importing Part 7 (${part7.passage_groups.length} passage groups) ---`);
    for (const pg of part7.passage_groups) {
      const passage = await prisma.passage.create({
        data: {
          part: 7,
          passage_text: pg.passage_text || null,
          is_study: true,
          ...(pg.passage_analysis
            ? {
                passage_analysis: {
                  create: {
                    summary: pg.passage_analysis.summary,
                    main_idea: pg.passage_analysis.main_idea,
                    topic: pg.passage_analysis.topic,
                    structure: pg.passage_analysis.structure as unknown as Prisma.InputJsonValue,
                    paragraph_analysis: pg.passage_analysis.paragraph_analysis as unknown as Prisma.InputJsonValue,
                    reading_strategy: pg.passage_analysis.reading_strategy as unknown as Prisma.InputJsonValue,
                  },
                },
              }
            : {}),
          questions: {
            create: (pg.questions || []).map((q) => ({
              question_number: q.question_number,
              question_text: q.question_text || null,
              answers: {
                create: parseAnswers(q.options, q.correct_answer),
              },
              ...(q.question_analysis
                ? {
                    question_analysis: {
                      create: {
                        question_type: parseQuestionType(q.question_analysis.question_type),
                        skill: parseReadingSkill(q.question_analysis.skill),
                        translation: q.question_analysis.translation || null,
                        evidence: (q.question_analysis.evidence || {}) as unknown as Prisma.InputJsonValue,
                        solving_strategy: q.question_analysis.solving_strategy as unknown as Prisma.InputJsonValue,
                      },
                    },
                  }
                : {}),
            })),
          },
        },
        include: {
          passage_analysis: true,
          questions: {
            include: {
              answers: true,
              question_analysis: true,
            },
          },
        },
      });

      totalPassagesCreated++;
      if (passage.passage_analysis) totalPassageAnalysisCreated++;
      totalQuestionsCreated += passage.questions.length;
      for (const createdQ of passage.questions) {
        totalAnswersCreated += createdQ.answers.length;
        if (createdQ.question_analysis) totalQuestionAnalysisCreated++;
      }
    }
    console.log(`Part 7 completed.`);
  }

  console.log('\n================ IMPORT SUMMARY ================');
  console.log(`Total Passages created:           ${totalPassagesCreated}`);
  console.log(`Total PassageAnalysis created:    ${totalPassageAnalysisCreated}`);
  console.log(`Total Questions created:          ${totalQuestionsCreated}`);
  console.log(`Total QuestionAnalysis created:   ${totalQuestionAnalysisCreated}`);
  console.log(`Total Answers created:            ${totalAnswersCreated}`);
  console.log('================================================\n');
}

seedTest01()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
