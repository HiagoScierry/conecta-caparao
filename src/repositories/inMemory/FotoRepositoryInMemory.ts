import { Fotos } from "@prisma/client";
import { IFotoRepository } from "../interfaces/IFotoRepository";

export class FotoRepositoryInMemory implements IFotoRepository {
  private fotos: Fotos[] = [];
  private idCounter = 1;

  async getFotoById(id: string): Promise<Fotos | null> {
    return this.fotos.find(foto => foto.id === +id) || null;
  }

  async getAllFotos(): Promise<Fotos[]> {
    return this.fotos;
  }

  async createFoto(url: string): Promise<Fotos> {
    const newFoto: Fotos = {
      id: this.idCounter++,
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.fotos.push(newFoto);
    return newFoto;
  }

  async deleteFoto(id: string): Promise<void> {
    this.fotos = this.fotos.filter(foto => foto.id !== +id);
  }

}