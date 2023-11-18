/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "checkedOut" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "totalPrice" SET DATA TYPE DOUBLE PRECISION;
