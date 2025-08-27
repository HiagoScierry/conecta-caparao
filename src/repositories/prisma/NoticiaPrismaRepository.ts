import { NoticiaDTO } from "@/dto/noticiaDTO";
import { Noticia } from "@prisma/client";
import { INoticiaRepository, NoticiaFull } from "../interfaces/INoticiaRepository";
import { connection } from "@/config/database/connection";

export class NoticiaPrismaRepository implements INoticiaRepository {
  async findAll(): Promise<NoticiaFull[]> {
    const noticias = await connection.noticia.findMany({
      include: {
        fotos: {
          include: {
            foto: true,
          },
        }
      },
    });

    return noticias.map((noticia: any) => ({
      ...noticia,
      fotos: noticia.fotos.map((f: any) => ({
        id: f.id,
        capa: f.capa,
        noticiaId: f.idNoticia ?? f.noticiaId,
        fotoId: f.idFoto ?? f.fotoId,
        foto: f.foto,
      })),
    }));
  }
  async findById(id: number): Promise<NoticiaFull | null> {
    const noticia = await connection.noticia.findUnique({
      where: { id },
      include: {
        fotos: {
          include: {
            foto: true,
          },
        },
      },
    });

    if (!noticia) return null;

    return {
      ...noticia,
      fotos: noticia.fotos.map((f: any) => ({
        id: f.id,
        capa: f.capa,
        noticiaId: f.idNoticia ?? f.noticiaId,
        fotoId: f.idFoto ?? f.fotoId,
        foto: f.foto,
      })),
    };
  }

  async create(data: NoticiaDTO, fotos: string[]): Promise<NoticiaFull> {
    console.log("Creating noticia with data:", data, "and fotos:", fotos);

    const noticia = await connection.noticia.create({
      data: {
        titulo: data.titulo,
        texto: data.texto,
        data: data.data,
        fotos: {
          create: fotos.map((url, index) => ({
            capa: index === 0,
            foto: {
              create: {
                url,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          })),
        },
      },
      include: {
        fotos: {
          include: {
            foto: true,
          },
        },
      },
    });

    return {
      ...noticia,
      fotos: noticia.fotos.map((f: any) => ({
        id: f.id,
        capa: f.capa,
        noticiaId: f.idNoticia ?? f.noticiaId,
        fotoId: f.idFoto ?? f.fotoId,
        foto: f.foto,
      })),
    };
  }

  async update(id: number, data: NoticiaDTO, fotosUrl: string[]): Promise<Noticia | null> {
    console.log("Updating noticia with ID:", id, "data:", data, "and fotosUrl:", fotosUrl);

    const noticia = await connection.noticia.update({
      where: { id },
      data: {
        titulo: data.titulo,
        texto: data.texto,
        data: data.data,
        updatedAt: new Date(),
        fotos: {
          deleteMany: {},
          create: fotosUrl.map((url, index) => ({
            capa: index === 0,
            foto: {
              create: {
                url,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          })),
        }
      },
      include: {
        fotos: true,
      },
    });

    return noticia;
  }


  async delete(id: number): Promise<void> {
    await connection.noticiaFoto.deleteMany({
      where: { idNoticia: id },
    });

    await connection.noticia.delete({
      where: { id },
    });
  }
}