/*
  Warnings:

  - Added the required column `availableTickets` to the `Concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concert" ADD COLUMN     "availableTickets" INTEGER NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL;
