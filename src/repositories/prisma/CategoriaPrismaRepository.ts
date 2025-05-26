import { PrismaClient, Categoria } from '@prisma/client';
import { ICategoriaRepository } from '../interfaces/ICategoriaRepository';

export class CategoriaPrismaRepository implements ICategoriaRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ?? new PrismaClient();
  }

  async create(nome: string): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: { nome },
    });
  }

  async findById(id: number): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: { atracoesTuristicas: true }, // caso queira incluir
    });
  }

  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async update(id: number, nome: string): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: { id },
      data: { nome, updatedAt: new Date() },
    });
  }

  async delete(id: number): Promise<Categoria> {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
