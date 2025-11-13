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
    
    try {
      await this.fotoRepository.deleteFoto(id);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
        throw new Error("Cannot delete foto: it is being referenced by other records");
      }
      throw error;
    }
  }

}