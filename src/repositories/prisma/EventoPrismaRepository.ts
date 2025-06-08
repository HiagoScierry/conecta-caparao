import { Evento } from "@prisma/client";
import { EventoWithRelations, IEventoRepository } from "../interfaces/IEventoRepository";
import { connection } from "@/config/database/connection";

export class EventoPrismaRepository implements IEventoRepository {
  async findById(id: number): Promise<Evento> {
    const evento = await connection.evento.findUnique({
      where: {
        id: id,
      },
      include: {
        fotos: {
          include: {
            foto: true,
          },
        },
      },
    });

    if (!evento) {
      throw new Error(`Evento com ID ${id} não encontrado`);
    }

    return evento;
  }

  async findAll(): Promise<Evento[]> {
    return await connection.evento.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(evento: EventoWithRelations): Promise<Evento> {
    return await connection.evento.create({
      data: {
        nome: evento.nome,
        descricao: evento.descricao,
        data: evento.data,
        idMunicipio: evento.idMunicipio,
        idEndereco: evento.idEndereco,
        fotos: {
          create: evento.fotos?.map(foto => ({
            capa: foto.capa,
            foto: {
              create: {
                url: foto.url,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            }
          })) || [],
        }
      },
    });
  }

  async update(id: number, evento: EventoWithRelations): Promise<Evento> {
    return await connection.evento.update({
      where: {
        id: id,
      },
      data: {
        nome: evento.nome,
        descricao: evento.descricao,
        data: evento.data,
        idMunicipio: evento.idMunicipio,
        idEndereco: evento.idEndereco,
        fotos: {
          deleteMany: {},
          create: evento.fotos?.map(foto => ({
            capa: foto.capa,
            foto: {
              create: {
                url: foto.url,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            }
          })) || [],
        }
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.evento.delete({
      where: {
        id: id,
      },
    });
  }

}