import { Categoria } from '@prisma/client';

export interface ICategoriaRepository {
  create(nome: string): Promise<Categoria>;
  findById(id: number): Promise<Categoria | null>;
  findAll(): Promise<Categoria[]>;
  update(id: number, nome: string): Promise<Categoria>;
  delete(id: number): Promise<Categoria>;
}
