/*
  Warnings:

  - You are about to drop the column `user_id` on the `useremailotp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserEmailOtp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `UserEmailOtp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `useremailotp` DROP FOREIGN KEY `UserEmailOtp_user_id_fkey`;

-- AlterTable
ALTER TABLE `useremailotp` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(256) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserEmailOtp_email_key` ON `UserEmailOtp`(`email`);
