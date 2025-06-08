import { ServicoTuristico } from "@prisma/client";

export type ServicoTuristicoWithRelations = ServicoTuristico & {
  idEndereco: number;
  idContato: number;
  idFoto: number;
}


export interface IServicoTuristicoRepository {
  findById(id: number): Promise<ServicoTuristico>;
  findAll(): Promise<ServicoTuristico[]>;
  create(data: ServicoTuristicoWithRelations): Promise<ServicoTuristico>;
  update(id: number, data: ServicoTuristicoWithRelations): Promise<ServicoTuristico>;
  delete(id: number): Promise<void>;
}