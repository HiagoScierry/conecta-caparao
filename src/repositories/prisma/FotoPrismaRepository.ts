import { connection } from "@/config/database/connection";
import { IFotoRepository } from "../interfaces/IFotoRepository";
import { Foto } from "@prisma/client";

export class FotoPrismaRepository implements IFotoRepository {
  async getFotoById(id: string): Promise<Foto | null> {
    return connection.foto.findUnique({
      where: {
        id: +id
      }
    });
  }

  async getAllFotos(): Promise<Foto[]> {
    return connection.foto.findMany();
  }

  async createFoto(url: string): Promise<Foto> {
    const newRegister = await connection.foto.create({
      data: {
        url,
        galeria: {
          create: {
            capa: false,
          }
        }
      },
      include: {
        galeria: true,
      }
    });

    return newRegister;
  }

  async deleteFoto(id: string): Promise<void> {
    await connection.$transaction(async (tx) => {
      // Primeiro deleta as referências na galeria de fotos
      await tx.galeriaFoto.deleteMany({
        where: {
          idFoto: +id
        }
      });

      // Depois deleta a foto
      await tx.foto.delete({
        where: {
          id: +id
        }
      });
    });
  }
}