/*
  Warnings:

  - You are about to alter the column `price_in_cents` on the `quotes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "quotes" ALTER COLUMN "price_in_cents" SET DEFAULT 0,
ALTER COLUMN "price_in_cents" SET DATA TYPE INTEGER;
