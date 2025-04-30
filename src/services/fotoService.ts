import { IFotoRepository } from "@/repositories/interfaces/IFotoRepository";

export class FotoService {

  private fotoRepository: IFotoRepository;

  constructor(fotoRepository: IFotoRepository) {
    this.fotoRepository = fotoRepository;
  }

  async getFotoById(id: string) {
    const foto = await this.fotoRepository.getFotoById(id);
    if (!foto) {
      throw new Error("Foto not found");
    }
    return foto;
  }

  async getAllFotos() {
    return await this.fotoRepository.getAllFotos();
  }

  async createFoto(url: string) {
    return await this.fotoRepository.createFoto(url);
  }

  async deleteFoto(id: string) {
    const foto = await this.fotoRepository.getFotoById(id);
    if (!foto) {
      throw new Error("Foto not found");
    }
    await this.fotoRepository.deleteFoto(id);
  }

}