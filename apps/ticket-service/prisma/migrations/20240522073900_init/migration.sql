/*
  Warnings:

  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ticket_userId_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "userId";
