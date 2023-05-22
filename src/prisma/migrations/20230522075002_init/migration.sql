/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Crossing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Crossing_id_key` ON `Crossing`(`id`);
