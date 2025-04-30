import { MunicipioDTO } from "@/dto/municipioDTO";
import { IMunicipioRepository } from "@/repositories/interfaces/IMunicipioRepository";
import { Municipio } from "@prisma/client";

export class MunicipioService {

  private municipioRepository: IMunicipioRepository;

  constructor(municipioRepository: IMunicipioRepository) {
    this.municipioRepository = municipioRepository;
  }

  async create(municipio: MunicipioDTO, contactId: number): Promise<Municipio> {
    const newMunicipio = await this.municipioRepository.create(municipio, contactId);
    return newMunicipio;
  }

  async findById(id: string): Promise<Municipio> {
    return this.municipioRepository.findById(id);
  }
  async findAll(): Promise<Municipio[]> {
    return this.municipioRepository.findAll();
  }

  async update(id: string, municipio: MunicipioDTO): Promise<Municipio> {
    return this.municipioRepository.update(id, municipio);
  }

  async delete(id: string): Promise<void> {
    return this.municipioRepository.delete(id);
  }

}