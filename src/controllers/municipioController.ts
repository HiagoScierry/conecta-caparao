import { ContatoDTO } from "@/dto/contatoDTO";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { contatoServiceFactory } from "@/factories/contatoServiceFactory";
import { fotoServiceFactory } from "@/factories/fotoServiceFactory";
import { municipioServiceFactory } from "@/factories/municipioServiceFactory";
import { Contato, Foto, Municipio } from "@prisma/client";

export function getMunicipioById(id: string): Promise<Municipio & {
  contato: Contato;
  fotos: Foto[]
}> {
  return municipioServiceFactory().findById(id);
}

export function getAllMunicipios() {
  return municipioServiceFactory().findAll();
}

export async function createMunicipio(municipio: MunicipioDTO, contato: ContatoDTO, fotosUrl: string[]) {

  const contatoCreated = await contatoServiceFactory().create(contato);

  return municipioServiceFactory().create(municipio, Number(contatoCreated.id), fotosUrl);

}

export async function updateMunicipio(id: string, municipio: MunicipioDTO, contato: ContatoDTO, fotosUrl: string[]) {
  const existingMunicipio = await municipioServiceFactory().findById(id);

  if (!existingMunicipio) {
    throw new Error("Municipio not found");
  }

  if (existingMunicipio.idContato) {
    await contatoServiceFactory().update(Number(existingMunicipio.idContato), contato);
  }

  return municipioServiceFactory().update(id, municipio, fotosUrl);
}

export async function deleteMunicipio(id: string) {
  const municipio = await municipioServiceFactory().findById(id);

  if (!municipio) {
    throw new Error("Municipio not found");
  }

  if (municipio?.fotos && municipio.fotos.length > 0) {
    for (const foto of municipio.fotos) {
      await fotoServiceFactory().deleteFoto(String(foto.id));
    }
  }
  await municipioServiceFactory().delete(id);

  if (municipio.contato.id) {
    await contatoServiceFactory().delete(Number(municipio.contato.id));
  }
}