/*
  Warnings:

  - Made the column `mapaUrl` on table `Municipio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Municipio` MODIFY `mapaUrl` VARCHAR(2048) NOT NULL;
