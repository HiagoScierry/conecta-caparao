import { PrismaClient, PerfilCliente } from '@prisma/client';
import { IPerfilClienteRepository } from '../interfaces/IPerfilClienteRepository';

export class PerfilClienteRepository implements IPerfilClienteRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ?? new PrismaClient();
  }

  async create(nome: string): Promise<PerfilCliente> {
    return this.prisma.perfilCliente.create({
      data: { nome },
    });
  }

  async findById(id: number): Promise<PerfilCliente | null> {
    return this.prisma.perfilCliente.findUnique({
      where: { id },
      include: { atracoesTuristicas: true }, // inclui atrações relacionadas
    });
  }

  async findAll(): Promise<PerfilCliente[]> {
    return this.prisma.perfilCliente.findMany();
  }

  async update(id: number, nome: string): Promise<PerfilCliente> {
    return this.prisma.perfilCliente.update({
      where: { id },
      data: { nome, updatedAt: new Date() },
    });
  }

  async delete(id: number): Promise<PerfilCliente> {
    return this.prisma.perfilCliente.delete({
      where: { id },
    });
  }
}
