import { Categoria } from '@prisma/client';
import { ICategoriaRepository } from '../interfaces/ICategoriaRepository';
import { connection } from '@/config/database/connection';

export class CategoriaPrismaRepository implements ICategoriaRepository {
  async create(nome: string): Promise<Categoria> {
    return connection.categoria.create({
      data: { nome },
    });
  }

  async findById(id: number): Promise<Categoria | null> {
    return connection.categoria.findUnique({
      where: { id },
      include: { atracoesTuristicas: true }, // caso queira incluir
    });
  }

  async findAll(): Promise<Categoria[]> {
    return connection.categoria.findMany();
  }

  async update(id: number, nome: string): Promise<Categoria> {
    return connection.categoria.update({
      where: { id },
      data: { nome, updatedAt: new Date() },
    });
  }

  async delete(id: number): Promise<Categoria> {
    return connection.categoria.delete({
      where: { id },
    });
  }
}
