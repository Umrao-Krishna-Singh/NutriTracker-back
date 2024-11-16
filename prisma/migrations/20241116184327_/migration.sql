/*
  Warnings:

  - You are about to drop the column `nutrition_id` on the `foodnutrient` table. All the data in the column will be lost.
  - Added the required column `nutrient_id` to the `FoodNutrient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `foodnutrient` DROP FOREIGN KEY `FoodNutrient_nutrition_id_fkey`;

-- AlterTable
ALTER TABLE `foodnutrient` DROP COLUMN `nutrition_id`,
    ADD COLUMN `nutrient_id` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `FoodNutrient` ADD CONSTRAINT `FoodNutrient_nutrient_id_fkey` FOREIGN KEY (`nutrient_id`) REFERENCES `Nutrient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
