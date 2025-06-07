import { AtracaoTuristica } from "@prisma/client";
import { AtracaoTuristicaWithRelations, IAtracaoTuristicaRepository } from "../interfaces/IAtracaoTuristicaRepository";
import { connection } from "@/config/database/connection";

export class AtracaoTuristicaPrismaRepository implements IAtracaoTuristicaRepository {
  async findAll(): Promise<AtracaoTuristica[]> {
    return connection.atracaoTuristica.findMany();
  }

  async findById(id: number): Promise<AtracaoTuristica | null> {
    return connection.atracaoTuristica.findFirst({
      where: { id },
    });
  }

  async create(data: AtracaoTuristicaWithRelations): Promise<AtracaoTuristica> {
    return connection.atracaoTuristica.create({
      data: {
        nome: data.nome,
        descricao: data?.descricao || "",
        mapaUrl: data?.mapaUrl || "",
        site: data?.site || "",
        idCategoria: data.idCategoria,
        idMunicipio: data.idMunicipio,
        idEndereco: data.idEndereco,
        idContato: data.idContato,
      },
    });
  }
  async update(id: number, data: AtracaoTuristicaWithRelations): Promise<AtracaoTuristica> {
    return connection.atracaoTuristica.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data?.descricao || "",
        mapaUrl: data?.mapaUrl || "",
        site: data?.site || "",
        idCategoria: data.idCategoria,
        idMunicipio: data.idMunicipio,
        idEndereco: data.idEndereco,
        idContato: data.idContato,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.atracaoTuristica.delete({
      where: { id },
    });
  }
}