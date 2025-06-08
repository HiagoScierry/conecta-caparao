import { NoticiaDTO } from "@/dto/noticiaDTO";
import { Noticia } from "@prisma/client";
import { INoticiaRepository } from "../interfaces/INoticiaRepository";
import { connection } from "@/config/database/connection";

export class NoticiaPrismaRepository implements INoticiaRepository {
  async findAll(): Promise<Noticia[]> {
    return connection.noticia.findMany({
      include: {
        fotos: true,
      },
    });
  }
  async findById(id: number): Promise<Noticia | null> {
    return connection.noticia.findUnique({
      where: { id },
      include: {
        fotos: true,
      },
    });
  }
  async create(data: NoticiaDTO): Promise<Noticia> {

    return connection.noticia.create({
      data: {
        titulo: data.titulo,
        texto: data.texto,
        data: data.data,
        createdAt: new Date(),
        updatedAt: new Date(),
        fotos: {
          create: data.fotos
            ?.filter(f => f.url)
            .map(foto => ({
              capa: foto.capa,
              foto: {
                create: {
                  url: foto.url!,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            })) || [],
        }
      },
      include: {
        fotos: true,
      },
    });
  }
  async update(id: number, data: NoticiaDTO): Promise<Noticia | null> {
    const noticia = await connection.noticia.update({
      where: { id },
      data: {
        titulo: data.titulo,
        texto: data.texto,
        data: data.data,
        updatedAt: new Date(),
        fotos: {
          deleteMany: {},
          create: data.fotos
            ?.filter(f => f.url)
            .map(foto => ({
              capa: foto.capa,
              foto: {
                create: {
                  url: foto.url!,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            })) || [],
        }
      },
      include: {
        fotos: true,
      },
    });

    return noticia;
  }
  async delete(id: number): Promise<void> {
    await connection.noticia.delete({
      where: { id },
    });
  }
}