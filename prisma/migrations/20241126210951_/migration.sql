/*
  Warnings:

  - Added the required column `resend_expire_at` to the `UserEmailOtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useremailotp` ADD COLUMN `resend_expire_at` DATETIME(3) NOT NULL;
