import { AtracaoTuristica } from "@prisma/client";
import { AtracaoTuristicaFull, AtracaoTuristicaWithRelations, IAtracaoTuristicaRepository } from "../interfaces/IAtracaoTuristicaRepository";
import { connection } from "@/config/database/connection";

export class AtracaoTuristicaPrismaRepository implements IAtracaoTuristicaRepository {
  async findAll(): Promise<AtracaoTuristicaFull[]> {
    return connection.atracaoTuristica.findMany({
      include: {
        categoria: true,
        contato: true,
        endereco: true,
        municipio: true,
        horarios: true,
        fotos: true,
        perfis: true,
      }
    });
  }

  async findById(id: number): Promise<AtracaoTuristicaFull | null> {
    return connection.atracaoTuristica.findFirst({
      where: { id },
      include: {
        categoria: true,
        contato: true,
        endereco: true,
        municipio: true,
        horarios: true,
        fotos: true,
        perfis: true,
      }
    });
  }

  async create(data: AtracaoTuristicaWithRelations, fotos: string[]): Promise<AtracaoTuristica> {
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
        perfis: {
          connect: data.perfis?.map(id => ({ id: Number(id) })) || [],
        },
        fotos: {
          create: fotos.map(url => ({ url })),
        },
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