/*
  Warnings:

  - Made the column `user_id` on table `people` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_user_id_fkey";

-- AlterTable
ALTER TABLE "people" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
