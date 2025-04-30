import { Foto } from "@prisma/client";
import { IFotoRepository } from "../interfaces/IFotoRepository";

export class FotoRepositoryInMemory implements IFotoRepository {
  private fotos: Foto[] = [];
  private idCounter = 1;

  async getFotoById(id: string): Promise<Foto | null> {
    return this.fotos.find(foto => foto.id === +id) || null;
  }

  async getAllFotos(): Promise<Foto[]> {
    return this.fotos;
  }

  async createFoto(url: string): Promise<Foto> {
    const newFoto: Foto = {
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