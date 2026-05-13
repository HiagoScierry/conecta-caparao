-- CreateTable
CREATE TABLE `PrincipalAtrativo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `posicao` INTEGER NOT NULL,
    `idAtracaoTuristica` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PrincipalAtrativo_posicao_key`(`posicao`),
    UNIQUE INDEX `PrincipalAtrativo_idAtracaoTuristica_key`(`idAtracaoTuristica`),
    CONSTRAINT `PrincipalAtrativo_idAtracaoTuristica_fkey` FOREIGN KEY (`idAtracaoTuristica`) REFERENCES `AtracaoTuristica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
