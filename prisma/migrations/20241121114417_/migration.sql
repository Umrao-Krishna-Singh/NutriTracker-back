/*
  Warnings:

  - You are about to drop the column `fullname` on the `user` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `fullname`,
    ADD COLUMN `first_name` VARCHAR(126) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(126) NOT NULL;
