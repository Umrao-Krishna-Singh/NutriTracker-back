/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `useremailotp` table. All the data in the column will be lost.
  - You are about to drop the column `is_created` on the `useremailotp` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `useremailotp` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `useremailotp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_id]` on the table `UserEmailOtp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_id` to the `UserEmailOtp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `useremailotp` DROP FOREIGN KEY `UserEmailOtp_user_id_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- DropIndex
DROP INDEX `UserEmailOtp_email_key` ON `useremailotp`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`;

-- AlterTable
ALTER TABLE `useremailotp` DROP COLUMN `email`,
    DROP COLUMN `is_created`,
    DROP COLUMN `status`,
    DROP COLUMN `user_id`,
    ADD COLUMN `email_id` INTEGER UNSIGNED NOT NULL;

-- CreateTable
CREATE TABLE `UserEmail` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NULL,
    `is_created` BOOLEAN NOT NULL DEFAULT false,
    `email` VARCHAR(256) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `UserEmail_user_id_key`(`user_id`),
    UNIQUE INDEX `UserEmail_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserEmailOtp_email_id_key` ON `UserEmailOtp`(`email_id`);

-- AddForeignKey
ALTER TABLE `UserEmail` ADD CONSTRAINT `UserEmail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEmailOtp` ADD CONSTRAINT `UserEmailOtp_email_id_fkey` FOREIGN KEY (`email_id`) REFERENCES `UserEmail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
