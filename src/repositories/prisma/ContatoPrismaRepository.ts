import { ContatoDTO } from "@/dto/contatoDTO";
import { IContatoRepository } from "../interfaces/IContatoRepository";
import { connection } from "@/config/database/connection";

export class ContatoPrismaRepository implements IContatoRepository {
  async create(data: ContatoDTO): Promise<ContatoDTO> {
    const newRegister = await connection.contato.create({
      data: {
        email: data.email,
        celular: data.celular,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        instagram: data.instagram
      }
    })

    return newRegister;
  }

  async update(data: ContatoDTO): Promise<ContatoDTO> {
    const updatedRegister = await connection.contato.update({
      where: {
        id: data.id
      },
      data: {
        email: data.email,
        celular: data.celular,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        instagram: data.instagram
      }
    })

    return updatedRegister;

  }

  async delete(id: number): Promise<void> {
    await connection.contato.delete({
      where: {
        id
      }
    })
  }

  async findAll(): Promise<ContatoDTO[]> {
    return connection.contato.findMany();
  }

  async findById(id: number): Promise<ContatoDTO | null> {
    return connection.contato.findUnique({
      where: {
        id
      }
    })
  }

}