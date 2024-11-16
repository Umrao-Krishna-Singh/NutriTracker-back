/*
  Warnings:

  - You are about to alter the column `quantity` on the `foodnutrient` table. The data in that column could be lost. The data in that column will be cast from `UnsignedMediumInt` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `foodnutrient` MODIFY `quantity` INTEGER UNSIGNED NOT NULL;
