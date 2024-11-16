/*
  Warnings:

  - A unique constraint covering the columns `[food_id,nutrient_id]` on the table `FoodNutrient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[food_id,tag_id]` on the table `FoodTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FoodNutrient_food_id_nutrient_id_key` ON `FoodNutrient`(`food_id`, `nutrient_id`);

-- CreateIndex
CREATE UNIQUE INDEX `FoodTag_food_id_tag_id_key` ON `FoodTag`(`food_id`, `tag_id`);
