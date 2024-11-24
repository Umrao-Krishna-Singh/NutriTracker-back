-- CreateTable
CREATE TABLE `UserRole` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `UserRole_user_id_role_status_key`(`user_id`, `role`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
