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
        idMunicipio: data.idMunicipio,
        idEndereco: data.idEndereco,
        idContato: data.idContato,
        perfis: {
          connect: data.perfis?.map(id => ({ id: Number(id) })) || [],
        },
        categorias: {
          connect: { id: data.idCategoria },
        },
        fotos: {
          connect: fotos.map(id => ({ id: Number(id) })),
        },
      },
    });
  }
  async update(id: number, data: AtracaoTuristicaWithRelations, perfisParaRemover: string[], fotos: string[]): Promise<AtracaoTuristica> {
    return connection.atracaoTuristica.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data?.descricao || "",
        mapaUrl: data?.mapaUrl || "",
        site: data?.site || "",
        categorias: {
          connect: { id: data.idCategoria },
        },
        idMunicipio: data.idMunicipio,
        idEndereco: data.idEndereco,
        idContato: data.idContato,
        perfis: {
          disconnect: perfisParaRemover.map(id => ({ id: Number(id) })) || [],
          connect: data.perfis?.map(id => ({ id: Number(id) })) || [],
        },
        fotos: {
          connect: fotos.map(id => ({ id: Number(id) })),

        }
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.atracaoTuristica.delete({
      where: { id },
    });
  }
}