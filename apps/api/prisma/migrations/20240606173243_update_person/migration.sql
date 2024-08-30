-- CreateEnum
CREATE TYPE "PERSON" AS ENUM ('CLIENT', 'PASSENGER', 'SUPPLIER', 'REPRESENTATIVE');

-- AlterTable
ALTER TABLE "people" ADD COLUMN     "personType" "PERSON",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
