/*
  Warnings:

  - You are about to drop the column `personType` on the `people` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "people" DROP COLUMN "personType";

-- DropEnum
DROP TYPE "PERSON";
