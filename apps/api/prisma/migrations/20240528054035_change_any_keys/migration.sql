/*
  Warnings:

  - You are about to drop the column `agency_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_agency_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "agency_id";

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
