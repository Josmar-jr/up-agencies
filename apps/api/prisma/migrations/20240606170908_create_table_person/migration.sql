/*
  Warnings:

  - You are about to drop the `agencies_address` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "agencies" DROP CONSTRAINT "agencies_address_id_fkey";

-- DropTable
DROP TABLE "agencies_address";

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "address_id" TEXT,
    "agency_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "gender" "Gender",
    "ticket_quote_count" INTEGER NOT NULL DEFAULT 0,
    "ticket_quote_approved" INTEGER NOT NULL DEFAULT 0,
    "document" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "general_registration" TEXT,
    "general_registration_issuing_body" TEXT,
    "passport" TEXT,
    "passport_issued_at" TIMESTAMP(3),
    "passport_expires_in" TIMESTAMP(3),
    "visa" TEXT,
    "visa_expires_in" TIMESTAMP(3),
    "observation" TEXT,
    "rate" INTEGER,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_agency_id_key" ON "people"("email", "agency_id");

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
