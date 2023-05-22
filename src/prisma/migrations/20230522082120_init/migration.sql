/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Crossing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Crossing_name_key` ON `Crossing`(`name`);
