import { MunicipioDTO } from "@/dto/municipioDTO";
import {  Contato, Municipio, Foto } from "@prisma/client";

export type MunicipioFull = Municipio & { contato: Contato; fotos: Foto[] };

export interface IMunicipioRepository {
  findById(id: string): Promise<MunicipioFull>;
  findAll(): Promise<MunicipioFull[]>;
  create(data: MunicipioDTO, contatoId:  number, fotosUrl: string[]): Promise<MunicipioFull>;
  update(id: string, municipio: MunicipioDTO, fotosUrl: string[]): Promise<MunicipioFull>;
  delete(id: string): Promise<void>;
}