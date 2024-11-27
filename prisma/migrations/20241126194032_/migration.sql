/*
  Warnings:

  - A unique constraint covering the columns `[email,status]` on the table `UserEmailOtp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `UserEmailOtp_email_key` ON `useremailotp`;

-- CreateIndex
CREATE UNIQUE INDEX `UserEmailOtp_email_status_key` ON `UserEmailOtp`(`email`, `status`);
