-- CreateTable
CREATE TABLE `DupFoodDescriptions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(300) NOT NULL,
    `fdc_id` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `DupFoodDescriptions_description_key`(`description`),
    UNIQUE INDEX `DupFoodDescriptions_fdc_id_key`(`fdc_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
