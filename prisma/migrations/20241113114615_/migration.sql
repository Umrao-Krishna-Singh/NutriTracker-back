/*
  Warnings:

  - A unique constraint covering the columns `[nutrient_nbr]` on the table `Nutrition` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `nutrition` ADD COLUMN `nutrient_nbr` MEDIUMINT UNSIGNED NULL,
    ADD COLUMN `rank` MEDIUMINT UNSIGNED NULL,
    ADD COLUMN `unit_name` ENUM('G', 'IU', 'KCAL', 'MCG_RE', 'MG', 'MG_ATE', 'MG_GAE', 'PH', 'SP_GR', 'UG', 'UMOL_TE', 'kJ') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Nutrition_nutrient_nbr_key` ON `Nutrition`(`nutrient_nbr`);
