import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { prisma } from '../lib/prisma';

async function cleanDatabase() {
  console.log('Starting to clean database...');

  try {
    // Delete all records in correct foreign key order
    const deleteChat = await prisma.explainChat.deleteMany();
    const deleteQuestionAttempts = await prisma.questionAttempt.deleteMany();
    const deletePassageAttempts = await prisma.passageAttempt.deleteMany();
    const deleteVocab = await prisma.vocabulary.deleteMany();
    const deleteQuestionAnalysis = await prisma.questionAnalysis.deleteMany();
    const deletePassageAnalysis = await prisma.passageAnalysis.deleteMany();
    const deleteAnswers = await prisma.answer.deleteMany();
    const deleteQuestions = await prisma.question.deleteMany();
    const deletePassages = await prisma.passage.deleteMany();

    // Optionally reset primary key auto-increment sequences in PostgreSQL
    try {
      await prisma.$executeRawUnsafe(`
        ALTER SEQUENCE IF EXISTS "Passage_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "Question_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "Answer_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "PassageAnalysis_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "QuestionAnalysis_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "Vocabulary_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "PassageAttempt_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "QuestionAttempt_id_seq" RESTART WITH 1;
        ALTER SEQUENCE IF EXISTS "ExplainChat_id_seq" RESTART WITH 1;
      `);
    } catch (seqError) {
      console.warn('Note: Could not reset sequences (table names/sequences may differ):', (seqError as Error).message);
    }

    console.log('\n================ DATABASE CLEANED ================');
    console.log(`Deleted ExplainChat:        ${deleteChat.count}`);
    console.log(`Deleted QuestionAttempt:    ${deleteQuestionAttempts.count}`);
    console.log(`Deleted PassageAttempt:     ${deletePassageAttempts.count}`);
    console.log(`Deleted Vocabulary:         ${deleteVocab.count}`);
    console.log(`Deleted QuestionAnalysis:   ${deleteQuestionAnalysis.count}`);
    console.log(`Deleted PassageAnalysis:    ${deletePassageAnalysis.count}`);
    console.log(`Deleted Answers:            ${deleteAnswers.count}`);
    console.log(`Deleted Questions:          ${deleteQuestions.count}`);
    console.log(`Deleted Passages:           ${deletePassages.count}`);
    console.log('==================================================\n');
    console.log('Database is now completely empty and sequences are reset.');
  } catch (error) {
    console.error('Error while cleaning database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase();
