/* eslint-disable @typescript-eslint/no-unused-vars */
import { contatoServiceFactory } from "@/factories/contatoServiceFactory";
import { enderecoServiceFactory } from "@/factories/enderecoServiceFactory";
import { horarioFuncionamentoServiceFactory } from "@/factories/horarioFuncionamentoServiceFactory";
import { municipioServiceFactory } from "@/factories/municipioServiceFactory";
import { servicoTuristicoServiceFactory } from "@/factories/servicoTuristicoServiceFactory";
import { ServicoForm } from "@/forms/servicoForm";

export async function getServicoById(id: number) {
  return servicoTuristicoServiceFactory().findById(id);
}

export async function getAll() {
  return servicoTuristicoServiceFactory().findAll();
}

export async function createServico(servicoData: ServicoForm & { fotoUrl?: string }) {
  const { servico, contato, endereco, municipio, fotoUrl, horarioFuncionamento } = servicoData;

  const municipioExists = await municipioServiceFactory().findById(String(municipio));

  if (!municipioExists) {
    throw new Error("Município não existe");
  }

  const contatoCreated = await contatoServiceFactory().create(contato);

  const enderecoCreated = await enderecoServiceFactory().create(endereco);

  const servicoCreated = await servicoTuristicoServiceFactory().create({
    ...servico,
    idMunicipio: municipioExists.id,
    idEndereco: enderecoCreated.id,
    idContato: Number(contatoCreated.id),
  }, fotoUrl);

  await horarioFuncionamentoServiceFactory().create({
    ...horarioFuncionamento,
    estabelecimentoId: String(servicoCreated.id),
    tipoTurismo: "SERVIÇO",
  });


}

export async function updateAtrativo(id: number, servicoData: ServicoForm, fotosURL: string[]) {
  const { servico, contato, endereco, municipio } = servicoData;

  const servicoExists = await servicoTuristicoServiceFactory().findById(id);

  if (!servicoExists) {
    throw new Error("Serviço não existe");
  }

  const municipioExists = await municipioServiceFactory().findById(String(municipio));

  if (!municipioExists) {
    throw new Error("Município não existe");
  }

  const contatoUpdated = await contatoServiceFactory().update(Number(servicoExists.idContato), contato);

  const enderecoUpdated = await enderecoServiceFactory().update(servicoExists.idEndereco, endereco);


  const servicoUpdated = await servicoTuristicoServiceFactory().update(id, {
    ...servico,
    idMunicipio: municipioExists.id,
    idEndereco: enderecoUpdated.id,
    idContato: Number(contatoUpdated.id),
  }, fotosURL);

  return servicoUpdated;
}

export async function deleteServico(id: number) {
  const servicoExists = await servicoTuristicoServiceFactory().findById(id);

  if (!servicoExists) {
    throw new Error("Serviço não existe");
  }

  await servicoTuristicoServiceFactory().delete(id);

  await enderecoServiceFactory().delete(servicoExists.idEndereco);

  await contatoServiceFactory().delete(Number(servicoExists.idContato));
}