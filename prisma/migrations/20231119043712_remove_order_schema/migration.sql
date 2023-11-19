/*
  Warnings:

  - You are about to drop the column `orderID` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerID_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_orderID_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "orderID";

-- DropTable
DROP TABLE "Order";
