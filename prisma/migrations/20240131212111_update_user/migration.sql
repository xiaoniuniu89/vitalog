/*
  Warnings:

  - You are about to drop the column `analysis` on the `MonthlySummary` table. All the data in the column will be lost.
  - You are about to drop the column `analysis` on the `WeeklySummary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthlySummary" DROP COLUMN "analysis";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT;

-- AlterTable
ALTER TABLE "WeeklySummary" DROP COLUMN "analysis";
