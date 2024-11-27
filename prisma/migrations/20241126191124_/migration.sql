/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserEmailOtp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `useremailotp` ADD COLUMN `user_id` INTEGER UNSIGNED NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserEmailOtp_user_id_key` ON `UserEmailOtp`(`user_id`);

-- AddForeignKey
ALTER TABLE `UserEmailOtp` ADD CONSTRAINT `UserEmailOtp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
