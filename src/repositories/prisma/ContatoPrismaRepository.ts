import { ContatoDTO } from "@/dto/contatoDTO";
import { IContatoRepository } from "../interfaces/IContatoRepository";
import { connection } from "@/config/database/connection";

export class ContatoPrismaRepository implements IContatoRepository {
  async create(data: ContatoDTO): Promise<ContatoDTO> {
    const newRegister = await connection.contato.create({
      data: {
        email: data.email,
        celular: data.celular,
        telefone: data.telefone ?? "",
        whatsapp: data.whatsapp ?? "",
        instagram: data.instagram ?? ""
      }
    })

    return {
      ...newRegister,
      id: newRegister.id.toString()
    };
  }

  async update(data: ContatoDTO): Promise<ContatoDTO> {
    const updatedRegister = await connection.contato.update({
      where: {
        id: typeof data.id === "string" ? Number(data.id) : data.id
      },
      data: {
        email: data.email,
        celular: data.celular,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        instagram: data.instagram
      }
    })

    return {
      ...updatedRegister,
      id: updatedRegister.id.toString()
    };
  }

  async delete(id: number): Promise<void> {
    await connection.contato.delete({
      where: {
        id
      }
    })
  }

  async findAll(): Promise<ContatoDTO[]> {
    const contatos = await connection.contato.findMany();
    return contatos.map(contato => ({
      id: contato.id.toString(),
      email: contato.email,
      celular: contato.celular,
      telefone: contato.telefone,
      whatsapp: contato.whatsapp,
      instagram: contato.instagram
    }));
  }

  async findById(id: number): Promise<ContatoDTO | null> {
    const contato = await connection.contato.findUnique({
      where: {
        id
      }
    });

    if (!contato) return null;

    return {
      id: contato.id.toString(),
      email: contato.email,
      celular: contato.celular,
      telefone: contato.telefone,
      whatsapp: contato.whatsapp,
      instagram: contato.instagram
    };
  }

}