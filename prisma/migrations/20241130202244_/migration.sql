/*
  Warnings:

  - You are about to drop the `UserAuthToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `UserRefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserAuthToken" DROP CONSTRAINT "UserAuthToken_user_id_fkey";

-- DropTable
DROP TABLE "UserAuthToken";

-- CreateIndex
CREATE UNIQUE INDEX "UserRefreshToken_user_id_key" ON "UserRefreshToken"("user_id");
