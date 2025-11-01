-- AlterTable
ALTER TABLE `AtracaoTuristica` MODIFY `descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `Municipio` MODIFY `descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `Noticia` MODIFY `texto` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `ServicoTuristico` MODIFY `descricao` TEXT NULL;
