import { PrincipalAtrativo } from '@prisma/client';

export interface IPrincipalAtrativoRepository {
  create(posicao: number, idAtracaoTuristica: number): Promise<PrincipalAtrativo>;
  findById(id: number): Promise<PrincipalAtrativo | null>;
  findByPositions(posicoes: number[]): Promise<PrincipalAtrativo[]>;
  findAll(): Promise<PrincipalAtrativo[]>;
  findByAtracaoId(idAtracaoTuristica: number): Promise<PrincipalAtrativo | null>;
  update(id: number, posicao?: number, idAtracaoTuristica?: number): Promise<PrincipalAtrativo>;
  delete(id: number): Promise<PrincipalAtrativo>;
  deleteByPositions(posicoes: number[]): Promise<number>;
  count(): Promise<number>;
}
