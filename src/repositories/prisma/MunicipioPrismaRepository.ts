import { connection } from "@/config/database/connection";
import { IMunicipioRepository } from "../interfaces/IMunicipioRepository";
import { MunicipioDTO } from "@/dto/municipioDTO";

export class MunicipioPrimaRepository implements IMunicipioRepository {
  async findById(id: string) {
    const municipio = await connection.municipio.findUnique({
      where: { id: Number(id) },
      include: {
        contato: true, // Include the contato relation
      },
    });

    if (!municipio) {
      throw new Error(`Municipio with id ${id} not found`);
    }
    return municipio;
  }

  async findAll() {
    const municipios = await connection.municipio.findMany();
    return municipios;
  }

  async create(municipioData: MunicipioDTO, contatoId: number, fotos: string[] = []) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...data } = municipioData;

  const municipio = await connection.municipio.create({
    data: {
      ...data,
      contato: {
        connect: { id: contatoId },
      },
      fotos: {
        connect: fotos.map(foto => ({ id: Number(foto) })), // Map each foto ID to the correct shape
      }
    },
  });

  return municipio;
}


  async update(id: string, data: MunicipioDTO) {
    const municipio = await connection.municipio.update({
      where: { id: Number(id) },
      data,
    });


    return municipio;
  }

  async delete(id: string) {
    await connection.municipio.delete({
      where: { id: Number(id) },
    });
  }
}