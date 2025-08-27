import { enderecoServiceFactory } from "@/factories/enderecoServiceFactory";
import { eventoServiceFactory } from "@/factories/eventoServiceFactory";
import { municipioServiceFactory } from "@/factories/municipioServiceFactory";
import { EventoForm } from "@/forms/eventoForm";

export async function getAllEventos() {
  return eventoServiceFactory().findAll();
}

export async function getByIdEvento(id: string) {
  return (await eventoServiceFactory()).findById(Number(id));
}

export async function createEvento(data: EventoForm, fotosUrl: string[]) {

  const municipioExists = await municipioServiceFactory().findById(data.municipio);

  if (!municipioExists) {
    throw new Error("Municipio not found");
  }

  const enderecoCreated = await enderecoServiceFactory().create(data.endereco);

  const evento = await eventoServiceFactory().create({
    ...data.evento,
    idEndereco: enderecoCreated.id,
    idMunicipio: municipioExists.id,
  }, fotosUrl);

  return evento;

}

export async function updateEvento(id: string, data: EventoForm, fotosUrl: string[]) {
  const evento = await eventoServiceFactory().findById(Number(id));

  if (!evento) {
    throw new Error("Evento not found");
  }

  const municipioExists = await municipioServiceFactory().findById(data.municipio);

if (!municipioExists) {
    throw new Error("Municipio not found");
  }

  await enderecoServiceFactory().update(evento.idEndereco, data.endereco);


  await eventoServiceFactory().update(Number(id), {
    ...data.evento,
    idEndereco: evento.idEndereco,
    idMunicipio: Number(data.municipio),
  }, fotosUrl );

}

export async function deleteEvento(id: string) {
  const evento = await eventoServiceFactory().findById(Number(id));

  if (!evento) {
    throw new Error("Evento not found");
  }

  await eventoServiceFactory().delete(Number(id));

  await enderecoServiceFactory().delete(evento.idEndereco);

}