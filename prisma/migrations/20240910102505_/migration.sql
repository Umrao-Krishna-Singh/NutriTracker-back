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
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Food_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tag_name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_tag_name_key`(`tag_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodTags` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER UNSIGNED NOT NULL,
    `tag_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodNutrition` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `energy` DECIMAL(5, 3) NOT NULL,
    `protein` DECIMAL(5, 3) NULL,
    `carbohydrate` DECIMAL(5, 3) NULL,
    `sugars_total` DECIMAL(5, 3) NULL,
    `fiber_total_dietary` DECIMAL(5, 3) NULL,
    `total_fat` DECIMAL(5, 3) NULL,
    `fatty_acids_total_saturated` DECIMAL(5, 3) NULL,
    `fatty_acids_total_monounsaturated` DECIMAL(5, 3) NULL,
    `fatty_acids_total_polyunsaturated` DECIMAL(5, 3) NULL,
    `cholesterol` DECIMAL(5, 3) NULL,
    `retinol` DECIMAL(5, 3) NULL,
    `vitamin_A_RAE` DECIMAL(5, 3) NOT NULL,
    `carotene_alpha` DECIMAL(5, 3) NULL,
    `carotene_beta` DECIMAL(5, 3) NULL,
    `cryptoxanthin_beta` DECIMAL(5, 3) NULL,
    `lycopene` DECIMAL(5, 3) NULL,
    `lutein_zeaxanthin` DECIMAL(5, 3) NULL,
    `thiamin` DECIMAL(5, 3) NULL,
    `riboflavin` DECIMAL(5, 3) NULL,
    `niacin` DECIMAL(5, 3) NULL,
    `vitamin_B_6` DECIMAL(5, 3) NULL,
    `folic_acid` DECIMAL(5, 3) NULL,
    `folate_food` DECIMAL(5, 3) NULL,
    `folate_DFE` DECIMAL(5, 3) NULL,
    `folate_total` DECIMAL(5, 3) NULL,
    `choline_total` DECIMAL(5, 3) NULL,
    `vitamin_B_12` DECIMAL(5, 3) NULL,
    `vitamin_B_12added` DECIMAL(5, 3) NULL,
    `vitamin_C` DECIMAL(5, 3) NULL,
    `vitamin_D_D2_D3` DECIMAL(5, 3) NULL,
    `vitamin_E_alpha_tocopherol` DECIMAL(5, 3) NULL,
    `vitamin_Eadded` DECIMAL(5, 3) NULL,
    `vitamin_K_phylloquinone` DECIMAL(5, 3) NULL,
    `calcium` DECIMAL(5, 3) NULL,
    `phosphorus` DECIMAL(5, 3) NULL,
    `magnesium` DECIMAL(5, 3) NULL,
    `iron` DECIMAL(5, 3) NULL,
    `zinc` DECIMAL(5, 3) NULL,
    `copper` DECIMAL(5, 3) NULL,
    `selenium` DECIMAL(5, 3) NULL,
    `potassium` DECIMAL(5, 3) NULL,
    `sodium` DECIMAL(5, 3) NULL,
    `caffeine` DECIMAL(5, 3) NULL,
    `theobromine` DECIMAL(5, 3) NULL,
    `alcohol` DECIMAL(5, 3) NULL,
    `fa_4_0` DECIMAL(5, 3) NULL,
    `fa_6_0` DECIMAL(5, 3) NULL,
    `fa_8_0` DECIMAL(5, 3) NULL,
    `fa_10_0` DECIMAL(5, 3) NULL,
    `fa_12_0` DECIMAL(5, 3) NULL,
    `fa_14_0` DECIMAL(5, 3) NULL,
    `fa_16_0` DECIMAL(5, 3) NULL,
    `fa_18_0` DECIMAL(5, 3) NULL,
    `fa_16_1` DECIMAL(5, 3) NULL,
    `fa_18_1` DECIMAL(5, 3) NULL,
    `fa_20_1` DECIMAL(5, 3) NULL,
    `fa_22_1` DECIMAL(5, 3) NULL,
    `fa_18_2` DECIMAL(5, 3) NULL,
    `fa_18_3` DECIMAL(5, 3) NULL,
    `fa_18_4` DECIMAL(5, 3) NULL,
    `fa_20_4` DECIMAL(5, 3) NULL,
    `fa_20_5_n_3` DECIMAL(5, 3) NULL,
    `fa_22_5_n_3` DECIMAL(5, 3) NULL,
    `fa_22_6_n_3` DECIMAL(5, 3) NULL,
    `water` DECIMAL(5, 3) NULL,

    UNIQUE INDEX `FoodNutrition_food_id_key`(`food_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FoodTags` ADD CONSTRAINT `FoodTags_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodTags` ADD CONSTRAINT `FoodTags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodNutrition` ADD CONSTRAINT `FoodNutrition_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
