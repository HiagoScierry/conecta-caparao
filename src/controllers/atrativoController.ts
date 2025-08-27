import { atracaoTuristicaServiceFactory } from "@/factories/atracaoTuristicaServiceFactory";
import { categoriaServiceFactory } from "@/factories/categoriaServiceFactory";
import { contatoServiceFactory } from "@/factories/contatoServiceFactory";
import { enderecoServiceFactory } from "@/factories/enderecoServiceFactory";
import { horarioFuncionamentoServiceFactory } from "@/factories/horarioFuncionamentoServiceFactory";
import { municipioServiceFactory } from "@/factories/municipioServiceFactory";
import { perfilClienteServiceFactory } from "@/factories/perfilClienteServiceFactory";
import { AtracaoForm } from "@/forms/atracaoForm";
import { PerfilCliente } from "@prisma/client";

export async function getAtrativoById(id: number) {
  return atracaoTuristicaServiceFactory().findById(id);
}

export async function getAll() {
  return atracaoTuristicaServiceFactory().findAll();
}

export async function createAtrativo(atrativo: AtracaoForm & { fotosURL: string[] }) {
  const { atracaoTuristica, contato, endereco, horarioFuncionamento, municipio, categoria, perfil, fotosURL } = atrativo;

  const categoriaExists = await categoriaServiceFactory().findById(Number(categoria));

  if (!categoriaExists) {
    throw new Error("Categoria não existe");
  }

  const municipioExists = await municipioServiceFactory().findById(String(municipio));

  if (!municipioExists) {
    throw new Error("Município não existe");
  }

  if (perfil) {

    const perfilExists = await perfilClienteServiceFactory().findAll();

    const perfilIds = perfilExists.map((p: PerfilCliente) => String(p.id));
    const notFound = perfil.filter((id: string) => !perfilIds.includes(id));

    if (notFound.length > 0) {
      throw new Error(`Perfis não encontrados: ${notFound.join(", ")}`);
    }

  }

  const contatoCreated = await contatoServiceFactory().create(contato);

  const enderecoCreated = await enderecoServiceFactory().create(endereco);

  const atracaoCreated = await atracaoTuristicaServiceFactory().create({
    ...atracaoTuristica,
    idCategoria: categoriaExists.id,
    idMunicipio: municipioExists.id,
    idEndereco: enderecoCreated.id,
    idContato: Number(contatoCreated.id),
    perfis: perfil,
  }, fotosURL);

  await horarioFuncionamentoServiceFactory().create({
    ...horarioFuncionamento,
    estabelecimentoId: String(atracaoCreated.id),
    tipoTurismo: "ATRAÇÃO",
  });

}

export async function updateAtrativo(id: number, atrativo: AtracaoForm) {
  const { atracaoTuristica, contato, endereco, horarioFuncionamento, municipio, categoria, perfil } = atrativo;

  const atrativoExists = await atracaoTuristicaServiceFactory().findById(id);

  if (!atrativoExists) {
    throw new Error("Atrativo não existe");
  }

  const categoriaExists = await categoriaServiceFactory().findById(categoria.id);
  if (!categoriaExists) {
    throw new Error("Categoria não existe");
  }

  if (!municipio.id) {
    throw new Error("Município não possui ID");
  }

  const municipioExists = await municipioServiceFactory().findById(String(municipio.id));

  const contatoUpdated = await contatoServiceFactory().update(Number(atrativoExists.idContato), contato);
  const enderecoUpdated = await enderecoServiceFactory().update(atrativoExists.idEndereco, endereco);
  const atracaoUpdated = await atracaoTuristicaServiceFactory().update(id, {
    ...atracaoTuristica,
    idCategoria: categoriaExists.id,
    idMunicipio: municipioExists.id,
    idEndereco: enderecoUpdated.id,
    idContato: Number(contatoUpdated.id),
  });

  if (!horarioFuncionamento.id) {
    throw new Error("Horário de funcionamento não possui ID");
  }

  await horarioFuncionamentoServiceFactory().update(horarioFuncionamento?.id, {
    ...horarioFuncionamento,
    estabelecimentoId: String(atracaoUpdated.id),
    tipoTurismo: "ATRAÇÃO",
  });

  return atracaoUpdated;

}

export async function deleteAtrativo(id: number) {
  return atracaoTuristicaServiceFactory().delete(id);
}