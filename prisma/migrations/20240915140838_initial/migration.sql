-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(80) NOT NULL,
    `fullname` VARCHAR(126) NOT NULL,
    `email` VARCHAR(256) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(300) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Food_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tag_name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Tag_tag_name_key`(`tag_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodTags` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER UNSIGNED NOT NULL,
    `tag_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodNutrition` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `energy` INTEGER UNSIGNED NOT NULL,
    `protein` INTEGER UNSIGNED NULL,
    `carbohydrate` INTEGER UNSIGNED NULL,
    `sugars_total` INTEGER UNSIGNED NULL,
    `fiber_total_dietary` INTEGER UNSIGNED NULL,
    `total_fat` INTEGER UNSIGNED NULL,
    `fatty_acids_total_saturated` INTEGER UNSIGNED NULL,
    `fatty_acids_total_monounsaturated` INTEGER UNSIGNED NULL,
    `fatty_acids_total_polyunsaturated` INTEGER UNSIGNED NULL,
    `cholesterol` INTEGER UNSIGNED NULL,
    `retinol` INTEGER UNSIGNED NULL,
    `vitamin_A_RAE` INTEGER UNSIGNED NULL,
    `carotene_alpha` INTEGER UNSIGNED NULL,
    `carotene_beta` INTEGER UNSIGNED NULL,
    `cryptoxanthin_beta` INTEGER UNSIGNED NULL,
    `lycopene` INTEGER UNSIGNED NULL,
    `lutein_zeaxanthin` INTEGER UNSIGNED NULL,
    `thiamin` INTEGER UNSIGNED NULL,
    `riboflavin` INTEGER UNSIGNED NULL,
    `niacin` INTEGER UNSIGNED NULL,
    `vitamin_B_6` INTEGER UNSIGNED NULL,
    `folic_acid` INTEGER UNSIGNED NULL,
    `folate_food` INTEGER UNSIGNED NULL,
    `folate_DFE` INTEGER UNSIGNED NULL,
    `folate_total` INTEGER UNSIGNED NULL,
    `choline_total` INTEGER UNSIGNED NULL,
    `vitamin_B_12` INTEGER UNSIGNED NULL,
    `vitamin_B_12added` INTEGER UNSIGNED NULL,
    `vitamin_C` INTEGER UNSIGNED NULL,
    `vitamin_D_D2_D3` INTEGER UNSIGNED NULL,
    `vitamin_E_alpha_tocopherol` INTEGER UNSIGNED NULL,
    `vitamin_Eadded` INTEGER UNSIGNED NULL,
    `vitamin_K_phylloquinone` INTEGER UNSIGNED NULL,
    `calcium` INTEGER UNSIGNED NULL,
    `phosphorus` INTEGER UNSIGNED NULL,
    `magnesium` INTEGER UNSIGNED NULL,
    `iron` INTEGER UNSIGNED NULL,
    `zinc` INTEGER UNSIGNED NULL,
    `copper` INTEGER UNSIGNED NULL,
    `selenium` INTEGER UNSIGNED NULL,
    `potassium` INTEGER UNSIGNED NULL,
    `sodium` INTEGER UNSIGNED NULL,
    `caffeine` INTEGER UNSIGNED NULL,
    `theobromine` INTEGER UNSIGNED NULL,
    `alcohol` INTEGER UNSIGNED NULL,
    `fa_4_0` INTEGER UNSIGNED NULL,
    `fa_6_0` INTEGER UNSIGNED NULL,
    `fa_8_0` INTEGER UNSIGNED NULL,
    `fa_10_0` INTEGER UNSIGNED NULL,
    `fa_12_0` INTEGER UNSIGNED NULL,
    `fa_14_0` INTEGER UNSIGNED NULL,
    `fa_16_0` INTEGER UNSIGNED NULL,
    `fa_18_0` INTEGER UNSIGNED NULL,
    `fa_16_1` INTEGER UNSIGNED NULL,
    `fa_18_1` INTEGER UNSIGNED NULL,
    `fa_20_1` INTEGER UNSIGNED NULL,
    `fa_22_1` INTEGER UNSIGNED NULL,
    `fa_18_2` INTEGER UNSIGNED NULL,
    `fa_18_3` INTEGER UNSIGNED NULL,
    `fa_18_4` INTEGER UNSIGNED NULL,
    `fa_20_4` INTEGER UNSIGNED NULL,
    `fa_20_5_n_3` INTEGER UNSIGNED NULL,
    `fa_22_5_n_3` INTEGER UNSIGNED NULL,
    `fa_22_6_n_3` INTEGER UNSIGNED NULL,
    `water` INTEGER UNSIGNED NULL,

    UNIQUE INDEX `FoodNutrition_food_id_key`(`food_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FoodTags` ADD CONSTRAINT `FoodTags_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodTags` ADD CONSTRAINT `FoodTags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodNutrition` ADD CONSTRAINT `FoodNutrition_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
