import { PerfilCliente } from '@prisma/client';
import { IPerfilClienteRepository } from '../interfaces/IPerfilClienteRepository';
import { connection } from '@/config/database/connection';

export class PerfilClienteRepository implements IPerfilClienteRepository {
  async create(nome: string): Promise<PerfilCliente> {
    return connection.perfilCliente.create({
      data: { nome },
    });
  }

  async findById(id: number): Promise<PerfilCliente | null> {
    return connection.perfilCliente.findUnique({
      where: { id },
      include: { atracoesTuristicas: true }, // inclui atrações relacionadas
    });
  }

  async findAll(): Promise<PerfilCliente[]> {
    return connection.perfilCliente.findMany();
  }

  async update(id: number, nome: string): Promise<PerfilCliente> {
    return connection.perfilCliente.update({
      where: { id },
      data: { nome, updatedAt: new Date() },
    });
  }

  async delete(id: number): Promise<PerfilCliente> {
    return connection.perfilCliente.delete({
      where: { id },
    });
  }
}
