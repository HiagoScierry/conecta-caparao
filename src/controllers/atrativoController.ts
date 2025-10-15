/* eslint-disable @typescript-eslint/no-unused-vars */
import { atracaoTuristicaServiceFactory } from "@/factories/atracaoTuristicaServiceFactory";
import { categoriaServiceFactory } from "@/factories/categoriaServiceFactory";
import { contatoServiceFactory } from "@/factories/contatoServiceFactory";
import { enderecoServiceFactory } from "@/factories/enderecoServiceFactory";
import { horarioFuncionamentoServiceFactory } from "@/factories/horarioFuncionamentoServiceFactory";
import { municipioServiceFactory } from "@/factories/municipioServiceFactory";
import { perfilClienteServiceFactory } from "@/factories/perfilClienteServiceFactory";
import { SubCategoriaServiceFactory } from "@/factories/subCategoriaServiceFactory";
import { AtracaoForm } from "@/forms/atracaoForm";
import { PerfilCliente } from "@prisma/client";
import { sub } from "date-fns";

export async function getAtrativoById(id: number) {
  return atracaoTuristicaServiceFactory().findById(id);
}

export async function getAll() {
  return atracaoTuristicaServiceFactory().findAll();
}

export async function createAtrativo(atrativo: AtracaoForm & { fotosURL: string[] }) {
  const { atracaoTuristica, contato, endereco, horarioFuncionamento, municipio, categoria, perfil, fotosURL, subCategoria } = atrativo;

  const categoriaExists = await categoriaServiceFactory().findById(Number(categoria));

  if (!categoriaExists) {
    throw new Error("Categoria não existe");
  }

  const subCategoriaExists = await SubCategoriaServiceFactory().findByIds(subCategoria.map(id => String(id)));

  if (subCategoriaExists?.length !== subCategoria.length && subCategoriaExists) {
    const subCategoriaIds = subCategoriaExists.map(sc => String(sc.id));
    const notFound = subCategoria.filter(id => !subCategoriaIds.includes(String(id)));
    throw new Error(`Subcategorias não encontradas: ${notFound.join(", ")}`);
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

  endereco.id = enderecoCreated.id;

  const atracaoCreated = await atracaoTuristicaServiceFactory().create({
    atracaoTuristica,
    municipio: municipioExists.id,
    endereco: {
      ...endereco,
      id: enderecoCreated.id
    },
    contato: {
      ...contato,
      id: Number(contatoCreated.id)
    },
    categoria: categoriaExists.id,
    perfil,
    subCategoria
  }, fotosURL);

  await horarioFuncionamentoServiceFactory().create({
    ...horarioFuncionamento,
    estabelecimentoId: String(atracaoCreated.id),
    tipoTurismo: "ATRAÇÃO",
  });

}

export async function updateAtrativo(id: number, atrativo: AtracaoForm, fotosURL: string[]) {
  const { atracaoTuristica, contato, endereco, horarioFuncionamento, municipio, categoria, perfil } = atrativo;

  const atrativoExists = await atracaoTuristicaServiceFactory().findById(id);

  if (!atrativoExists) {
    throw new Error("Atrativo não existe");
  }

  const categoriaExists = await categoriaServiceFactory().findById(categoria);
  if (!categoriaExists) {
    throw new Error("Categoria não existe");
  }

  const municipioExists = await municipioServiceFactory().findById(String(municipio));

  if (!municipioExists) {
    throw new Error("Município não existe");
  }

  const contatoUpdated = await contatoServiceFactory().update(Number(atrativoExists.idContato), contato);

  const enderecoUpdated = await enderecoServiceFactory().update(atrativoExists.idEndereco, endereco);

  let perfisParaAdicionar: string[] = [];
  let perfisParaRemover: string[] = [];

  if (perfil) {
    const perfilExists = await perfilClienteServiceFactory().findAll();

    const perfilIds = perfilExists.map((p: PerfilCliente) => String(p.id));
    const notFound = perfil.filter((id: string) => !perfilIds.includes(id));

    if (notFound.length > 0) {
      throw new Error(`Perfis não encontrados: ${notFound.join(", ")}`);
    }

    // Compare perfils enviados com os que ja estão associados
    const perfisAtuais = atrativoExists.perfis.map((p) => String(p.id));
    perfisParaAdicionar = perfil.filter((id: string) => !perfisAtuais.includes(id));
    perfisParaRemover = perfisAtuais.filter((id: string) => !perfil.includes(id));

  }

  const atracaoUpdated = await atracaoTuristicaServiceFactory().update(id, {
    ...atracaoTuristica,
    idCategoria: categoriaExists.id,
    idMunicipio: municipioExists.id,
    idEndereco: enderecoUpdated.id,
    idContato: Number(contatoUpdated.id),
    perfis: perfisParaAdicionar,
  }, perfisParaRemover, fotosURL);


  const horariosAtuais = await horarioFuncionamentoServiceFactory().getByAtracaoTuristicaId(id);

  const diasAtuais = horariosAtuais.map(h => h.dia);
  const diasNovos = horarioFuncionamento.diaDaSemana.filter(dia => !diasAtuais.includes(dia));
  const horarioExists = horariosAtuais.filter(h => horarioFuncionamento.diaDaSemana.includes(h.dia));
  const horarioNotExists = horariosAtuais.filter(h => !horarioFuncionamento.diaDaSemana.includes(h.dia));

  const horaPadraoAtual = horariosAtuais[0]?.horario;

  if (
    horaPadraoAtual &&
    !(horaPadraoAtual === `${horarioFuncionamento.horaAbertura} - ${horarioFuncionamento.horaFechamento}`)
  ) {
    // Atualiza todos os horários que estão com o horário padrão
    for (const horario of horarioExists) {
      await horarioFuncionamentoServiceFactory().update(horario.id, {
        diaDaSemana: [horario.dia],
        horaAbertura: horarioFuncionamento.horaAbertura,
        horaFechamento: horarioFuncionamento.horaFechamento,
      });
    }
  }

  if (horarioNotExists.length > 0) {
    // Deleta os horários que foram removidos
    for (const horario of horarioNotExists) {
      await horarioFuncionamentoServiceFactory().delete(horario.id);
    }
  }

  if (diasNovos.length > 0) {
    // Adiciona novos horários para dias que não existiam antes
    for (const dia of diasNovos) {
      await horarioFuncionamentoServiceFactory().create({
        estabelecimentoId: String(id),
        tipoTurismo: "ATRAÇÃO",
        diaDaSemana: [dia],
        horaAbertura: horarioFuncionamento.horaAbertura,
        horaFechamento: horarioFuncionamento.horaFechamento,
      });
    }
  }


  return atracaoUpdated;
}

export async function deleteAtrativo(id: number) {
  const atrativoExists = await atracaoTuristicaServiceFactory().findById(id);

  if (!atrativoExists) {
    throw new Error("Atrativo não existe");
  }

  await atracaoTuristicaServiceFactory().delete(id);

  await enderecoServiceFactory().delete(atrativoExists.idEndereco);

  await contatoServiceFactory().delete(Number(atrativoExists.idContato));
}