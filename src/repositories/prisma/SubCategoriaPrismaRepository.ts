import { Subcategoria } from '@prisma/client';
import { connection } from '@/config/database/connection';
import { ISubCategoriaRepository } from '../interfaces/ISubCategoriaRepository';

export class SubCategoriaPrismaRepository implements ISubCategoriaRepository {
  async create(nome: string): Promise<Subcategoria> {
    return connection.subcategoria.create({
      data: { nome },
    });
  }

  async findById(id: number): Promise<Subcategoria | null> {
    return connection.subcategoria.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Subcategoria[]> {
    return connection.subcategoria.findMany();
  }

  async update(id: number, nome: string): Promise<Subcategoria> {
    return connection.subcategoria.update({
      where: { id },
      data: { nome },
    });
  }

  async delete(id: number): Promise<Subcategoria> {
    return connection.subcategoria.delete({
      where: { id },
    });
  }

}
