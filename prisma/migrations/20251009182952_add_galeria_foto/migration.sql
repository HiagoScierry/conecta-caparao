/*
  Warnings:

  - You are about to drop the column `idCategoria` on the `AtracaoTuristica` table. All the data in the column will be lost.
  - You are about to drop the column `idFoto` on the `ServicoTuristico` table. All the data in the column will be lost.
  - You are about to drop the `EventoFoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoticiaFoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AtracaoTuristicaToFoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FotoToMunicipio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AtracaoTuristica` DROP FOREIGN KEY `AtracaoTuristica_idCategoria_fkey`;

-- DropForeignKey
ALTER TABLE `EventoFoto` DROP FOREIGN KEY `EventoFoto_idEvento_fkey`;

-- DropForeignKey
ALTER TABLE `EventoFoto` DROP FOREIGN KEY `EventoFoto_idFoto_fkey`;

-- DropForeignKey
ALTER TABLE `NoticiaFoto` DROP FOREIGN KEY `NoticiaFoto_idFoto_fkey`;

-- DropForeignKey
ALTER TABLE `NoticiaFoto` DROP FOREIGN KEY `NoticiaFoto_idNoticia_fkey`;

-- DropForeignKey
ALTER TABLE `ServicoTuristico` DROP FOREIGN KEY `ServicoTuristico_idFoto_fkey`;

-- DropForeignKey
ALTER TABLE `_AtracaoTuristicaToFoto` DROP FOREIGN KEY `_AtracaoTuristicaToFoto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AtracaoTuristicaToFoto` DROP FOREIGN KEY `_AtracaoTuristicaToFoto_B_fkey`;

-- DropForeignKey
ALTER TABLE `_FotoToMunicipio` DROP FOREIGN KEY `_FotoToMunicipio_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FotoToMunicipio` DROP FOREIGN KEY `_FotoToMunicipio_B_fkey`;

-- AlterTable
ALTER TABLE `AtracaoTuristica` DROP COLUMN `idCategoria`;

-- AlterTable
ALTER TABLE `ServicoTuristico` DROP COLUMN `idFoto`;

-- DropTable
DROP TABLE `EventoFoto`;

-- DropTable
DROP TABLE `NoticiaFoto`;

-- DropTable
DROP TABLE `_AtracaoTuristicaToFoto`;

-- DropTable
DROP TABLE `_FotoToMunicipio`;

-- CreateTable
CREATE TABLE `GaleriaFoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idFoto` INTEGER NOT NULL,
    `capa` BOOLEAN NOT NULL DEFAULT false,
    `municipioId` INTEGER NULL,
    `atracaoTuristicaId` INTEGER NULL,
    `eventoId` INTEGER NULL,
    `noticiaId` INTEGER NULL,
    `servicoTuristicoId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AtracaoTuristicaToCategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AtracaoTuristicaToCategoria_AB_unique`(`A`, `B`),
    INDEX `_AtracaoTuristicaToCategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AtracaoTuristicaToSubcategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AtracaoTuristicaToSubcategoria_AB_unique`(`A`, `B`),
    INDEX `_AtracaoTuristicaToSubcategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GaleriaFoto` ADD CONSTRAINT `GaleriaFoto_idFoto_fkey` FOREIGN KEY (`idFoto`) REFERENCES `Foto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaleriaFoto` ADD CONSTRAINT `GaleriaFoto_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaleriaFoto` ADD CONSTRAINT `GaleriaFoto_atracaoTuristicaId_fkey` FOREIGN KEY (`atracaoTuristicaId`) REFERENCES `AtracaoTuristica`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaleriaFoto` ADD CONSTRAINT `GaleriaFoto_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaleriaFoto` ADD CONSTRAINT `GaleriaFoto_noticiaId_fkey` FOREIGN KEY (`noticiaId`) REFERENCES `Noticia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaleriaFoto` ADD CONSTRAINT `GaleriaFoto_servicoTuristicoId_fkey` FOREIGN KEY (`servicoTuristicoId`) REFERENCES `ServicoTuristico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AtracaoTuristicaToCategoria` ADD CONSTRAINT `_AtracaoTuristicaToCategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `AtracaoTuristica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AtracaoTuristicaToCategoria` ADD CONSTRAINT `_AtracaoTuristicaToCategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AtracaoTuristicaToSubcategoria` ADD CONSTRAINT `_AtracaoTuristicaToSubcategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `AtracaoTuristica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AtracaoTuristicaToSubcategoria` ADD CONSTRAINT `_AtracaoTuristicaToSubcategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subcategoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
