/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connection } from "@/config/database/connection";
import { IMunicipioRepository, MunicipioFull } from "../interfaces/IMunicipioRepository";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { Municipio } from "@prisma/client";

export class MunicipioPrimaRepository implements IMunicipioRepository {
  async findById(id: string) {
    const municipio = await connection.municipio.findUnique({
      where: { id: Number(id) },
      include: {
        contato: true,
        fotos: {
          include: {
            foto: true,
          },
        },
      },
    });

    if (!municipio) {
      throw new Error("Municipio not found");
    }

    // Mapear a estrutura para compatibilidade
    return {
      ...municipio,
      fotos: municipio.fotos.map(galeria => galeria.foto)
    };
  }

  async findAll(): Promise<MunicipioFull[]> {
    const municipios = await connection.municipio.findMany({
      include: {
        contato: true,
        fotos: {
          include: {
            foto: true,
          },
        },
      },
    });

    // Mapear a estrutura para compatibilidade
    return municipios.map(municipio => ({
      ...municipio,
      fotos: municipio.fotos.map(galeria => galeria.foto)
    }));
  }

  async create(
    data: MunicipioDTO,
    contatoId: number,
    fotosUrl: string[]
  ): Promise<Municipio> {

    const fetchedFotos = await connection.foto.findMany({
      where: {
        url: {
          in: fotosUrl,
        },
      },

      select: {
        id: true,
        galeria: true,
      },
    });

    const galerias = fetchedFotos.map(foto => foto.galeria);

    // Only keep galerias with valid id and map to { id }
    const galeriasIds = galerias
      .filter(galeria => galeria && galeria.id)
      .map(galeria => (galeria?.id ? galeria.id : null))
      .filter((id): id is number => id !== null);

    if (fetchedFotos.length !== fotosUrl.length) {
      throw new Error("One or more photos not found");
    }

    const { id, ...dataWithoutId } = data;

    const newMunicipio = await connection.municipio.create({
      // @ts-ignore
      data: {
        ...dataWithoutId,
        idContato: contatoId,
        fotos: {
          connect: galeriasIds.map(id => ({ id }))
        }
      },
      include: {
        contato: true,
        fotos: {
          include: {
            foto: true,
          },
        }

      },
    });

    return newMunicipio;
  }

  async update(id: string, data: MunicipioDTO, fotosUrl?: string[]) {
    const existingMunicipio = await connection.municipio.findUnique({
      where: { id: Number(id) },
      include: {
        fotos: true,
      },
    });

    if (!existingMunicipio) {
      throw new Error("Municipio not found");
    }

    let fotosId = existingMunicipio.fotos.map(foto => ({ id: foto.id }));

    if (fotosUrl) {
      const fetchedFotos = await connection.foto.findMany({
        where: {
          url: {
            in: fotosUrl,
          },
        },
        select: {
          id: true,
        },
      });

      if (fetchedFotos.length !== fotosUrl.length) {
        throw new Error("One or more photos not found");
      }

      fotosId = fetchedFotos.map(foto => ({ id: foto.id }));
    }

    const updatedMunicipio = await connection.municipio.update({
      where: { id: Number(id) },
      data: {
        ...data,
        id: data.id ? Number(data.id) : undefined,
        mapaUrl: data.mapaUrl ?? existingMunicipio.mapaUrl,
        site: data.site ?? existingMunicipio.site,
        fotos: {
          set: fotosId,
        },
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
      include: {
        contato: true,
        fotos: true,
      },
    });
  }
}