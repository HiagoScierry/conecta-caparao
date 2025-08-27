/*
  Warnings:

  - You are about to drop the column `cidade` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `idMunicipio` to the `ServicoTuristico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Endereco` DROP COLUMN `cidade`,
    DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `ServicoTuristico` ADD COLUMN `idMunicipio` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ServicoTuristico` ADD CONSTRAINT `ServicoTuristico_idMunicipio_fkey` FOREIGN KEY (`idMunicipio`) REFERENCES `Municipio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
