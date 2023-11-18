/*
  Warnings:

  - You are about to alter the column `ticketPrice` on the `Concert` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Concert" ALTER COLUMN "ticketPrice" SET DATA TYPE DOUBLE PRECISION;
