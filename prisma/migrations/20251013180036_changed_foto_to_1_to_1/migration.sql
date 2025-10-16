/*
  Warnings:

  - A unique constraint covering the columns `[idFoto]` on the table `GaleriaFoto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GaleriaFoto_idFoto_key` ON `GaleriaFoto`(`idFoto`);
