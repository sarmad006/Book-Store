/*
  Warnings:

  - You are about to drop the column `address` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `landMark` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Book` table. All the data in the column will be lost.
  - Added the required column `borrowRate` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donation` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "address",
DROP COLUMN "country",
DROP COLUMN "landMark",
DROP COLUMN "phoneNumber",
ADD COLUMN     "borrowRate" TEXT NOT NULL,
ADD COLUMN     "donation" BOOLEAN NOT NULL;
