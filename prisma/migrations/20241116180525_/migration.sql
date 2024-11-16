/*
  Warnings:

  - Added the required column `quantity` to the `FoodNutrient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `foodnutrient` ADD COLUMN `quantity` MEDIUMINT UNSIGNED NOT NULL;
