import { PrincipalAtrativo } from '@prisma/client';
import { IPrincipalAtrativoRepository } from '../interfaces/IPrincipalAtrativoRepository';
import { connection } from '@/config/database/connection';

export class PrincipalAtrativoPrismaRepository implements IPrincipalAtrativoRepository {
  async create(posicao: number, idAtracaoTuristica: number): Promise<PrincipalAtrativo> {
    return connection.principalAtrativo.create({
      data: {
        posicao,
        idAtracaoTuristica,
      },
    });
  }

  async findById(id: number): Promise<PrincipalAtrativo | null> {
    return connection.principalAtrativo.findUnique({
      where: { id },
      include: { 
        atracaoTuristica: {
          include: {
            municipio: true,
          },
        },
      },
    }) as Promise<PrincipalAtrativo | null>;
  }

  async findByPositions(posicoes: number[]): Promise<PrincipalAtrativo[]> {
    return connection.principalAtrativo.findMany({
      where: { posicao: { in: posicoes } },
      include: { 
        atracaoTuristica: {
          include: {
            municipio: true,
          },
        },
      },
      orderBy: { posicao: 'asc' },
    });
  }

  async findAll(): Promise<PrincipalAtrativo[]> {
    return connection.principalAtrativo.findMany({
      include: { 
        atracaoTuristica: {
          include: {
            municipio: true,
          },
        },
      },
      orderBy: { posicao: 'asc' },
    });
  }

  async findByAtracaoId(idAtracaoTuristica: number): Promise<PrincipalAtrativo | null> {
    return connection.principalAtrativo.findUnique({
      where: { idAtracaoTuristica },
      include: { atracaoTuristica: true },
    });
  }

  async update(id: number, posicao?: number, idAtracaoTuristica?: number): Promise<PrincipalAtrativo> {
    const data: { posicao?: number; idAtracaoTuristica?: number; updatedAt: Date } = {
      updatedAt: new Date(),
    };

    if (posicao !== undefined) data.posicao = posicao;
    if (idAtracaoTuristica !== undefined) data.idAtracaoTuristica = idAtracaoTuristica;

    return connection.principalAtrativo.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<PrincipalAtrativo> {
    return connection.principalAtrativo.delete({
      where: { id },
    });
  }

  async deleteByPositions(posicoes: number[]): Promise<number> {
    const result = await connection.principalAtrativo.deleteMany({
      where: { posicao: { in: posicoes } },
    });
    return result.count;
  }

  async count(): Promise<number> {
    return connection.principalAtrativo.count();
  }
}
