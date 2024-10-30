/*
  Warnings:

  - You are about to drop the `foodtags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hash_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `foodtags` DROP FOREIGN KEY `FoodTags_food_id_fkey`;

-- DropForeignKey
ALTER TABLE `foodtags` DROP FOREIGN KEY `FoodTags_tag_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `hash_password` VARCHAR(100) NOT NULL,
    ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `email` VARCHAR(256) NOT NULL;

-- DropTable
DROP TABLE `foodtags`;

-- CreateTable
CREATE TABLE `UserAuthToken` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `issued_at` DATETIME(3) NOT NULL,
    `expire_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserAuthToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRefreshToken` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `issued_at` DATETIME(3) NOT NULL,
    `expire_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserRefreshToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodTag` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER UNSIGNED NOT NULL,
    `tag_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAuthToken` ADD CONSTRAINT `UserAuthToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRefreshToken` ADD CONSTRAINT `UserRefreshToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodTag` ADD CONSTRAINT `FoodTag_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodTag` ADD CONSTRAINT `FoodTag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
