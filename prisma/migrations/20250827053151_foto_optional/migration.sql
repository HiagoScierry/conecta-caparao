-- DropForeignKey
ALTER TABLE `ServicoTuristico` DROP FOREIGN KEY `ServicoTuristico_idFoto_fkey`;

-- AlterTable
ALTER TABLE `ServicoTuristico` MODIFY `idFoto` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ServicoTuristico` ADD CONSTRAINT `ServicoTuristico_idFoto_fkey` FOREIGN KEY (`idFoto`) REFERENCES `Foto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
