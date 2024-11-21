/*
  Warnings:

  - You are about to drop the column `password_hash` on the `user` table. All the data in the column will be lost.
  - Added the required column `pass_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password_hash`,
    ADD COLUMN `pass_hash` VARCHAR(100) NOT NULL;
