import { IPrincipalAtrativoRepository } from "@/repositories/interfaces/IPrincipalAtrativoRepository";
import { connection } from "@/config/database/connection";

export class PrincipalAtrativoService {
  private principalAtrativoRepository: IPrincipalAtrativoRepository;
  private MAX_PRINCIPAIS = 5;

  constructor(principalAtrativoRepository: IPrincipalAtrativoRepository) {
    this.principalAtrativoRepository = principalAtrativoRepository;
  }

  async create(posicao: number, idAtracaoTuristica: number) {
    // Validar posição
    if (posicao < 1 || posicao > this.MAX_PRINCIPAIS) {
      throw new Error(`Posição deve estar entre 1 e ${this.MAX_PRINCIPAIS}`);
    }

    // Verificar se o atrativo existe
    const atracaoExists = await connection.atracaoTuristica.findUnique({
      where: { id: idAtracaoTuristica },
    });

    if (!atracaoExists) {
      throw new Error("Atrativo turístico não encontrado");
    }

    // Verificar se o atrativo já está marcado como principal
    const jaEhPrincipal = await this.principalAtrativoRepository.findByAtracaoId(idAtracaoTuristica);
    if (jaEhPrincipal) {
      throw new Error("Este atrativo já está marcado como principal");
    }

    // Verificar se já existe um atrativo nesta posição
    const jaTemNestaPosicao = await connection.principalAtrativo.findUnique({
      where: { posicao },
    });

    if (jaTemNestaPosicao) {
      // Se existir, remover o anterior
      await this.principalAtrativoRepository.delete(jaTemNestaPosicao.id);
    }

    return this.principalAtrativoRepository.create(posicao, idAtracaoTuristica);
  }

  async findById(id: number) {
    return this.principalAtrativoRepository.findById(id);
  }

  async findAll() {
    return this.principalAtrativoRepository.findAll();
  }

  async findByAtracaoId(idAtracaoTuristica: number) {
    return this.principalAtrativoRepository.findByAtracaoId(idAtracaoTuristica);
  }

  async update(id: number, posicao?: number, idAtracaoTuristica?: number) {
    const principalAtual = await this.findById(id);

    if (!principalAtual) {
      throw new Error("Principal atrativo não encontrado");
    }

    // Se a posição está sendo atualizada
    if (posicao !== undefined) {
      if (posicao < 1 || posicao > this.MAX_PRINCIPAIS) {
        throw new Error(`Posição deve estar entre 1 e ${this.MAX_PRINCIPAIS}`);
      }

      // Verificar se já existe um atrativo nesta posição
      const jaTemNestaPosicao = await connection.principalAtrativo.findUnique({
        where: { posicao },
      });

      if (jaTemNestaPosicao && jaTemNestaPosicao.id !== id) {
        // Se existir e não for o mesmo atrativo, remover o anterior
        await this.principalAtrativoRepository.delete(jaTemNestaPosicao.id);
      }
    }

    // Se o atrativo está sendo atualizado
    if (idAtracaoTuristica !== undefined) {
      const atracaoExists = await connection.atracaoTuristica.findUnique({
        where: { id: idAtracaoTuristica },
      });

      if (!atracaoExists) {
        throw new Error("Atrativo turístico não encontrado");
      }

      // Verificar se o novo atrativo já está marcado como principal
      const jaEhPrincipal = await this.principalAtrativoRepository.findByAtracaoId(idAtracaoTuristica);
      if (jaEhPrincipal && jaEhPrincipal.id !== id) {
        throw new Error("Este atrativo já está marcado como principal");
      }
    }

    return this.principalAtrativoRepository.update(id, posicao, idAtracaoTuristica);
  }

  async delete(id: number) {
    return this.principalAtrativoRepository.delete(id);
  }

  async getMaxPrincipais(): Promise<number> {
    return this.MAX_PRINCIPAIS;
  }

  async getTotalPrincipais(): Promise<number> {
    return this.principalAtrativoRepository.count();
  }
}
