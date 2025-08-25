import { MunicipioDTO } from "@/dto/municipioDTO";
import {  Contato, Municipio, Foto } from "@prisma/client";

export interface IMunicipioRepository {
  findById(id: string): Promise<Municipio & { contato: Contato; fotos: Foto[] }>;
  findAll(): Promise<Municipio & { contato: Contato; fotos: Foto[] }[]>;
  create(data: MunicipioDTO, contatoId:  number, fotosUrl: string[]): Promise<Municipio>;
  update(id: string, municipio: MunicipioDTO, fotosUrl: string[]): Promise<Municipio>;
  delete(id: string): Promise<void>;
}