import { MunicipioDTO } from "@/dto/municipioDTO";
import { MunicipioForm } from "@/forms/municipioForm";
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

  async findById(id: string): Promise<MunicipioForm> {
    const municipio = await this.municipioRepository.findById(id);

    if (!municipio) {
      throw new Error(`Municipio with id ${id} not found`);
    }

    return {
      municipio: {
        id: municipio.id.toString(),
        nome: municipio.nome,
        descricao: municipio.descricao ?? "",
        site: municipio.site ?? "",
        mapaUrl: municipio.mapaUrl ?? "",
      },
      contato: {
        id: municipio?.idContato?.toString(),
        email: municipio?.contato?.email,
        celular: municipio?.contato?.celular,
        telefone: municipio?.contato?.telefone ?? "",
        whatsapp: municipio?.contato?.whatsapp ?? "",
        instagram: municipio?.contato?.instagram ?? "",
      }
    };
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