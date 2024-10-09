/*
  Warnings:

  - You are about to drop the `dupfooddescriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `dupfooddescriptions`;

-- CreateTable
CREATE TABLE `DuplicateFood` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(300) NOT NULL,
    `fdc_id` INTEGER UNSIGNED NOT NULL,
    `type` SMALLINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
