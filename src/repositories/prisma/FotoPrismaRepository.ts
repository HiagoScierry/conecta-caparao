import { connection } from "@/config/database/connection";
import { IFotoRepository } from "../interfaces/IFotoRepository";
import { Fotos } from "@prisma/client";

export class FotoPrismaRepository implements IFotoRepository {
  async getFotoById(id: string): Promise<Fotos | null> {
    return connection.fotos.findUnique({
      where: {
        id: +id
      }
    });
  }

  async getAllFotos(): Promise<Fotos[]> {
    return connection.fotos.findMany();
  }

  async createFoto(url: string): Promise<Fotos> {
    const newRegister = await connection.fotos.create({
      data: {
        url
      }
    });

    return newRegister;
  }

  async deleteFoto(id: string): Promise<void> {
    await connection.fotos.delete({
      where: {
        id: +id
      }
    });
  }
}