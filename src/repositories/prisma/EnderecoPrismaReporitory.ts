import { EnderecoDTO } from "@/dto/enderecoDTO";
import { Endereco } from "@prisma/client";
import { IEnderecoRepository } from "../interfaces/IEnderecoRepository";
import { connection } from "@/config/database/connection";

export class EnderecoPrismaRepository implements IEnderecoRepository {
  async getById(id: number): Promise<Endereco | null> {
    return connection.endereco.findFirst({
      where: { id },
    })
  }

  getByCep(cep: string): Promise<Endereco | null> {
    return connection.endereco.findFirst({
      where: { cep },
    });
  }

  async create(endereco: EnderecoDTO): Promise<Endereco> {
    return connection.endereco.create({
      data: {
        cep: endereco.cep,
        rua: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro
      },
    });
  }

  async update(id: number, endereco: EnderecoDTO): Promise<Endereco> {
    return connection.endereco.update({
      where: { id },
      data: {
        cep: endereco.cep,
        rua: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.endereco.delete({
      where: { id },
    });
  }

}