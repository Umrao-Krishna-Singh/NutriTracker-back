/*
  Warnings:

  - You are about to alter the column `nutrient_nbr` on the `Nutrient` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `rank` on the `Nutrient` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Nutrient" ALTER COLUMN "nutrient_nbr" SET DATA TYPE INTEGER,
ALTER COLUMN "rank" SET DATA TYPE INTEGER;
