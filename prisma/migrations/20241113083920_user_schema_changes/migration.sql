/*
  Warnings:

  - You are about to drop the column `hash_password` on the `user` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `hash_password`,
    ADD COLUMN `goal_weight` MEDIUMINT UNSIGNED NULL,
    ADD COLUMN `height` SMALLINT UNSIGNED NULL,
    ADD COLUMN `password_hash` VARCHAR(100) NOT NULL,
    ADD COLUMN `weight` MEDIUMINT UNSIGNED NULL;
