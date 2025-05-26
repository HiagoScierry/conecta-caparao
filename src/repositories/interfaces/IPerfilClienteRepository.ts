import { PerfilCliente } from '@prisma/client';

export interface IPerfilClienteRepository {
  create(nome: string): Promise<PerfilCliente>;
  findById(id: number): Promise<PerfilCliente | null>;
  findAll(): Promise<PerfilCliente[]>;
  update(id: number, nome: string): Promise<PerfilCliente>;
  delete(id: number): Promise<PerfilCliente>;
}
