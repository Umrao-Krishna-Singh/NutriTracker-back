/*
  Warnings:

  - You are about to drop the `foodnutrition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nutrition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `foodnutrition` DROP FOREIGN KEY `FoodNutrition_food_id_fkey`;

-- DropForeignKey
ALTER TABLE `foodnutrition` DROP FOREIGN KEY `FoodNutrition_nutrition_id_fkey`;

-- DropTable
DROP TABLE `foodnutrition`;

-- DropTable
DROP TABLE `nutrition`;

-- CreateTable
CREATE TABLE `Nutrient` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `fdc_nutrient_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `unit_name` ENUM('G', 'IU', 'KCAL', 'MCG_RE', 'MG', 'MG_ATE', 'MG_GAE', 'PH', 'SP_GR', 'UG', 'UMOL_TE', 'kJ') NULL,
    `nutrient_nbr` MEDIUMINT UNSIGNED NULL,
    `rank` MEDIUMINT UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Nutrient_fdc_nutrient_id_key`(`fdc_nutrient_id`),
    UNIQUE INDEX `Nutrient_name_key`(`name`),
    UNIQUE INDEX `Nutrient_nutrient_nbr_key`(`nutrient_nbr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodNutrient` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER UNSIGNED NOT NULL,
    `nutrition_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FoodNutrient` ADD CONSTRAINT `FoodNutrient_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodNutrient` ADD CONSTRAINT `FoodNutrient_nutrition_id_fkey` FOREIGN KEY (`nutrition_id`) REFERENCES `Nutrient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
