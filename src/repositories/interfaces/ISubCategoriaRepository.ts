import { Subcategoria } from '@prisma/client';

export interface ISubCategoriaRepository {
  create(nome: string): Promise<Subcategoria>;
  findById(id: number): Promise<Subcategoria | null>;
  findAll(): Promise<Subcategoria[]>;
  update(id: number, nome: string): Promise<Subcategoria>;
  delete(id: number): Promise<Subcategoria>;
}
