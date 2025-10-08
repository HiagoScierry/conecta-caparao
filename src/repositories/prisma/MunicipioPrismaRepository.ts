import { connection } from "@/config/database/connection";
import { IMunicipioRepository } from "../interfaces/IMunicipioRepository";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { Contato, Foto, Municipio } from "@prisma/client";

export class MunicipioPrimaRepository implements IMunicipioRepository {
  async findById(id: string) {
    const municipio = await connection.municipio.findUnique({
      where: { id: Number(id) },
      include: {
        contato: true,
        fotos: true,
      },
    });
    if (!municipio) {
      throw new Error(`Municipio with id ${id} not found`);
    }
    return municipio;
  }

  async findAll(): Promise<Array<Municipio & { contato: Contato; fotos: Foto[] }>> {
    const municipios = await connection.municipio.findMany({
      include: {
        contato: true,
        fotos: true,
      },
    });

    return municipios;
  }

  async create(
    data: MunicipioDTO,
    contatoId: number,
    fotosUrl: string[]
  ): Promise<Municipio & { contato: Contato; fotos: Foto[] }> {
    // Remove 'id' from data to avoid Prisma type error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...municipioDataWithoutId } = data;

    const newMunicipio = await connection.municipio.create({
      data: {
        ...municipioDataWithoutId,
        contato: {
          connect: { id: contatoId },
        },
        fotos: {
          create: fotosUrl.map(url => ({ url })),
        },
      },
      include: {
        contato: true,
        fotos: true,
      },
    });

    return newMunicipio;
  }

  async update(id: string, data: MunicipioDTO, fotosUrl?: string[]) {
    // Remove 'id' from data to avoid Prisma type error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...municipioDataWithoutId } = data;

    const updatedMunicipio = await connection.municipio.update({
      where: { id: Number(id) },
      data: {
        ...municipioDataWithoutId,
        ...(fotosUrl && fotosUrl.length > 0
          ? {
            fotos: {
              create: fotosUrl.map(url => ({ url })),
            },
          }
          : {}),
      },
      include: {
        contato: true,
        fotos: true,
      },
    });

    return updatedMunicipio;
  }

  async delete(id: string) {
    await connection.municipio.delete({
      where: { id: Number(id) },
    });
  }
}