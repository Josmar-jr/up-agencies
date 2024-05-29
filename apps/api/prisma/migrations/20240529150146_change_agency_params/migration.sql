/*
  Warnings:

  - You are about to drop the column `user_id` on the `agencies` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `agencies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "agencies" DROP CONSTRAINT "agencies_user_id_fkey";

-- AlterTable
ALTER TABLE "agencies" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
