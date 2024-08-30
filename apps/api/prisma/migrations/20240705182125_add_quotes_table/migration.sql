-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('AWAITING', 'QUOTING', 'AWAITING_CLIENT', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'AWAITING',
    "sales_channel" TEXT,
    "total_value" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "author_id" TEXT NOT NULL,
    "agency_id" TEXT NOT NULL,
    "client_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuoteAssignees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteAssignees_AB_unique" ON "_QuoteAssignees"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteAssignees_B_index" ON "_QuoteAssignees"("B");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuoteAssignees" ADD CONSTRAINT "_QuoteAssignees_A_fkey" FOREIGN KEY ("A") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuoteAssignees" ADD CONSTRAINT "_QuoteAssignees_B_fkey" FOREIGN KEY ("B") REFERENCES "quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
