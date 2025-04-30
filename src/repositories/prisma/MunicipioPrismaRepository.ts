import { connection } from "@/config/database/connection";
import { IMunicipioRepository } from "../interfaces/IMunicipioRepository";
import { MunicipioDTO } from "@/dto/municipioDTO";

export class MunicipioPrimaRepository implements IMunicipioRepository {

  async findById(id: string) {
    const municipio = await connection.municipios.findUnique({
      where: { id: Number(id) },
    });
    if (!municipio) {
      throw new Error(`Municipio with id ${id} not found`);
    }
    return municipio;
  }

  async findAll() {
    const municipios = await connection.municipios.findMany();
    return municipios;
  }

  async create(municipioData: MunicipioDTO, contatoId: number) {
    const municipio = await connection.municipios.create({
      data: {
        ...municipioData,
        contato: {
          connect: { id: contatoId },
        },
      },
    });
    return municipio;

  }

  async update(id: string, data: MunicipioDTO) {
    const municipio = await connection.municipios.update({
      where: { id: Number(id) },
      data,
    });


    return municipio;
  }

  async delete(id: string) {
    await connection.municipios.delete({
      where: { id: Number(id) },
    });
  }
}