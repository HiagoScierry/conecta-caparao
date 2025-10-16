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
    await connection.foto.delete({
      where: {
        id: +id
      },
      include: {
        galeria: true
      }
    });
  }
}