/*
  Warnings:

  - Added the required column `status` to the `UserEmailOtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useremailotp` ADD COLUMN `status` BOOLEAN NOT NULL;
