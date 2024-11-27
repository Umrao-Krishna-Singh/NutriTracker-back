/*
  Warnings:

  - You are about to drop the column `status` on the `useremailotp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `useremailotp` DROP COLUMN `status`,
    ADD COLUMN `is_created` BOOLEAN NOT NULL DEFAULT false;
