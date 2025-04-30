import { MunicipioDTO } from "@/dto/municipioDTO";
import { IMunicipioRepository } from "../interfaces/IMunicipioRepository";
import { Municipio } from "@prisma/client";

export class MunicipioRepositoryInMemory implements IMunicipioRepository {
  private municipios: Municipio[] = [];
  private idCounter = 1;

  async create(municipio: MunicipioDTO): Promise<Municipio> {
    const newMunicipio = {
      id: this.idCounter++,
      ...municipio,
    } as Municipio;

    this.municipios.push(newMunicipio);
    return newMunicipio;
  }

  async findById(id: string): Promise<Municipio> {
    const municipio = this.municipios.find((m) => m.id === Number(id));

    if (!municipio) {
      throw new Error('Município não encontrado');
    }

    return municipio as Municipio;
  }

  async findAll(): Promise<Municipio[]> {
    return this.municipios as Municipio[];
  }

  async update(id: string, municipio: MunicipioDTO): Promise<Municipio> {
    const index = this.municipios.findIndex((m) => m.id === Number(id));
    if (index === -1) throw new Error('Município não encontrado');

    this.municipios[index] = { ...this.municipios[index], ...municipio };
    return this.municipios[index] as Municipio;
  }

  async delete(id: string): Promise<void> {
    const index = this.municipios.findIndex((m) => m.id === Number(id));
    if (index !== -1) {
      this.municipios.splice(index, 1);
    }
  }

}