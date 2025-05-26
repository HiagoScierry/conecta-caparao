import { IPerfilClienteRepository } from "@/repositories/interfaces/IPerfilClienteRepository";
import { PerfilCliente } from "@prisma/client";

export class PerfilClienteService {
  private perfilClienteRepository: IPerfilClienteRepository;

  constructor(perfilClienteRepository: IPerfilClienteRepository) {
    this.perfilClienteRepository = perfilClienteRepository;
  }

  async create(nome: string): Promise<PerfilCliente> {
    return this.perfilClienteRepository.create(nome);
  }

  async findById(id: number): Promise<PerfilCliente | null> {
    return this.perfilClienteRepository.findById(id);
  }

  async findAll(): Promise<PerfilCliente[]> {
    return this.perfilClienteRepository.findAll();
  }

  async update(id: number, nome: string): Promise<PerfilCliente> {
    return this.perfilClienteRepository.update(id, nome);
  }

  async delete(id: number): Promise<PerfilCliente> {
    return this.perfilClienteRepository.delete(id);
  }
}