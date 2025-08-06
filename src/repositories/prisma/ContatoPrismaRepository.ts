import { ContatoDTO } from "@/dto/contatoDTO";
import { IContatoRepository } from "../interfaces/IContatoRepository";
import { connection } from "@/config/database/connection";

export class ContatoPrismaRepository implements IContatoRepository {
  async create(data: Omit<ContatoDTO, "id">): Promise<ContatoDTO> {
    const newRegister = await connection.contato.create({
      data: {
        email: data.email,
        celular: data.celular,
        telefone: data.telefone ?? "",
        whatsapp: data.whatsapp ?? "",
        instagram: data.instagram ?? ""
      }
    });

    return {
      ...newRegister,
      id: String(newRegister.id)
    };
  }

  async update(id: number, data: Omit<ContatoDTO, "id">): Promise<ContatoDTO> {
    const updatedRegister = await connection.contato.update({
      where: { id },
      data: {
        email: data.email,
        celular: data.celular ?? "",
        telefone: data.telefone ?? "",
        whatsapp: data.whatsapp ?? "",
        instagram: data.instagram ?? ""
      }
    });

    return {
      ...updatedRegister,
      id: String(updatedRegister.id)
    };
  }

  async delete(id: number): Promise<void> {
    await connection.contato.delete({
      where: { id }
    });
  }

  async findAll(): Promise<ContatoDTO[]> {
    const contatos = await connection.contato.findMany();
    return contatos.map(contato => ({
      id: String(contato.id),
      email: contato.email,
      celular: contato.celular,
      telefone: contato.telefone,
      whatsapp: contato.whatsapp,
      instagram: contato.instagram
    }));
  }

  async findById(id: number): Promise<ContatoDTO | null> {
    const contato = await connection.contato.findUnique({
      where: { id }
    });

    if (!contato) return null;

    return {
      id: String(contato.id),
      email: contato.email,
      celular: contato.celular,
      telefone: contato.telefone,
      whatsapp: contato.whatsapp,
      instagram: contato.instagram
    };
  }
}
