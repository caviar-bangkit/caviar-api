/*
  Warnings:

  - You are about to drop the `PedestrianCrossing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `PedestrianCrossing`;

-- CreateTable
CREATE TABLE `Crossing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `heading` DOUBLE NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
