import { ContatoDTO } from "@/dto/contatoDTO";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { contatoServiceFactory } from "@/factories/contatoServiceFactory";
import { fotoServiceFactory } from "@/factories/fotoServiceFactory";
import { municipioServiceFactory } from "@/factories/municipioServiceFactory";
import { MunicipioForm } from "@/forms/municipioForm";

export const getAllMunicipios = async () => {
  try {
    return municipioServiceFactory().findAll();
  } catch (error) {
    return {
      status: 'error',
      message: (error instanceof Error ? error.message : 'Failed to fetch municipios'),
    };
  }
}

export const getMunicipioById = async (id: string) => {
  try {
    return municipioServiceFactory().findById(id);
  } catch (error) {
    return {
      status: 'error',
      message: (error instanceof Error ? error.message : 'Failed to fetch municipio'),
    };
  }
}

export const createMunicipio = async (municipio: MunicipioDTO, contato: ContatoDTO, fotos: string[]) => {
  try {

    const contatoCreated = await contatoServiceFactory().create({
      ...contato,
    });

    const fotosCreated = [];

    for (const foto of fotos) {
      const fotoCreated = await fotoServiceFactory().createFoto(foto);

      fotosCreated.push(fotoCreated);
    }

    await municipioServiceFactory().create(
      municipio as MunicipioDTO,
      Number(contatoCreated.id),
      fotosCreated.map(f => f.id.toString()) // Assuming fotoServiceFactory returns an object with an 'id' property for each created photo
    );

    return {
      status: 'success',
      data: {
        ...municipio,
        id: Number(contatoCreated.id),
      },
    };


  } catch (error) {
    return {
      status: 'error',
      message: (error instanceof Error ? error.message : 'Failed to create municipio'),
    };
  }
}

export const updateMunicipio = async (municipio: MunicipioForm) => {
  try {

    console.log("Updating municipio:", municipio);

    await contatoServiceFactory().update(
      {
        ...municipio.contato,
      } as ContatoDTO
    )

    await municipioServiceFactory().update(
      municipio.municipio.id!,
      {
        ...municipio.municipio,
      } as MunicipioDTO
    );


  } catch (error) {
    return {
      status: 'error',
      message: (error instanceof Error ? error.message : 'Failed to update municipio'),
    };
  }
}

export const deleteMunicipio = async (id: string) => {
  try {
    const municipio = await municipioServiceFactory().findById(id);

    const contato = await contatoServiceFactory().findById(Number(municipio.contato.id));

    if (!municipio || !contato) {
      throw new Error("Municipio or Contato not found");
    }

    await contatoServiceFactory().delete(Number(contato.id));
    await municipioServiceFactory().delete(id);
  } catch (error) {
    console.error('Error deleting municipio:', error);
    return {
      status: 'error',
      message: (error instanceof Error ? error.message : 'Failed to delete municipio'),
    };
  }
}