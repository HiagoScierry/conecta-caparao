import { ContatoDTO } from "@/dto/contatoDTO";
import { IContatoRepository } from "../interfaces/IContatoRepository";
import { randomBytes } from "crypto";

export class ContatoRepositoryInMemory implements IContatoRepository {
  private contatos: ContatoDTO[] = [];

  async create(data: ContatoDTO): Promise<ContatoDTO> {
    if(!data.id) {
      // Generate a random id number
      data.id = randomBytes(4).readUInt32BE(0);
    }

    this.contatos.push(data);

    return data;
  }

  async update(data: ContatoDTO): Promise<ContatoDTO> {
    const index = this.contatos.findIndex(contato => contato.id === data.id);

    this.contatos[index] = data;

    return data;
  }

  async delete(id: number): Promise<void> {
    const index = this.contatos.findIndex(contato => contato.id === id);

    this.contatos.splice(index, 1);
  }

  async findAll(): Promise<ContatoDTO[]> {
    return this.contatos;
  }

  async findById(id: number): Promise<ContatoDTO | null> {
    return this.contatos.find(contato => contato.id === id) || null;
  }

}