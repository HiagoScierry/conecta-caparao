import { MunicipioDTO } from "@/dto/municipioDTO";
import { IMunicipioRepository } from "@/repositories/interfaces/IMunicipioRepository";
import { Contato, Foto, Municipio } from "@prisma/client";

export class MunicipioService {

  private municipioRepository: IMunicipioRepository;

  constructor(municipioRepository: IMunicipioRepository) {
    this.municipioRepository = municipioRepository;
  }

  async create(municipio: MunicipioDTO, contactId: number, fotosUrl: string[]): Promise<Municipio> {
    const newMunicipio = await this.municipioRepository.create(municipio, contactId, fotosUrl);
    return newMunicipio;
  }

  async findById(id: string): Promise<Municipio & { contato: Contato; fotos: Foto[] }> {
    return this.municipioRepository.findById(id);
  }
  async findAll(): Promise<Municipio & { contato: Contato; fotos: Foto[] }[]> {
    return this.municipioRepository.findAll();
  }

  async update(id: string, municipio: MunicipioDTO, fotosUrl: string[]): Promise<Municipio> {
    return this.municipioRepository.update(id, municipio, fotosUrl);
  }

  async delete(id: string): Promise<void> {
    return this.municipioRepository.delete(id);
  }

}