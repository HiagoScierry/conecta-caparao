import { ServicoTuristicoDTO } from "@/dto/servicoTuristicoDTO";
import { ServicoTuristico } from "@prisma/client";

export type ServicoTuristicoWithRelations = ServicoTuristicoDTO & {
  idEndereco: number;
  idContato: number;
  idMunicipio: number;
}


export interface IServicoTuristicoRepository {
  findById(id: number): Promise<ServicoTuristico>;
  findAll(): Promise<ServicoTuristico[]>;
  create(data: ServicoTuristicoWithRelations, fotoURL?: string): Promise<ServicoTuristico>;
  update(id: number, data: ServicoTuristicoWithRelations, fotoURL?: string): Promise<ServicoTuristico>;
  delete(id: number): Promise<void>;
}