/*
  Warnings:

  - You are about to drop the `DiaryEntryAnalysis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiaryEntryAnalysis" DROP CONSTRAINT "DiaryEntryAnalysis_diaryEntryId_fkey";

-- AlterTable
ALTER TABLE "DiaryEntry" ADD COLUMN     "analysis" TEXT;

-- DropTable
DROP TABLE "DiaryEntryAnalysis";
