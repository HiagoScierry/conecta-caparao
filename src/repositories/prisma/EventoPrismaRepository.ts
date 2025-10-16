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
        municipio: true,
        endereco: true,
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
      include: {
        municipio: true,
        endereco: true,
        fotos: {
          include: {
            foto: true,
          },
        },

      }
    });
  }

  async create(evento: EventoWithRelations, fotosUrl: string[]): Promise<Evento> {
    return await connection.evento.create({
      data: {
        nome: evento.nome,
        descricao: evento.descricao,
        data: new Date(evento.data), // Converte string para Date
        idMunicipio: evento.idMunicipio,
        idEndereco: evento.idEndereco,
        fotos: {
          create: fotosUrl?.map((foto, index) => ({
            capa: index === 0,
            foto: {
              create: {
                url: foto,
              }
            }
          })) || [],
        }
      },
    });
  }

  async update(id: number, evento: EventoWithRelations, fotosUrl: string[]): Promise<Evento> {
    return await connection.evento.update({
      where: {
        id: id,
      },
      data: {
        nome: evento.nome,
        descricao: evento.descricao,
        data: new Date(evento.data), // Converte string para Date
        idMunicipio: evento.idMunicipio,
        idEndereco: evento.idEndereco,
        fotos: {
          deleteMany: {},
          create: fotosUrl?.map((foto, index) => ({
            capa: index === 0,
            foto: {
              create: {
                url: foto,
              }
            }
          })) || [],
        }
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.galeriaFoto.deleteMany({
      where: {
        eventoId: id,
      },
    });

    await connection.evento.delete({
      where: {
        id: id,
      },
    });

  }

}