import { MunicipioDTO } from "@/dto/municipioDTO";
import {   Municipio } from "@prisma/client";


export interface IMunicipioRepository {
  findById(id: string): Promise<Municipio>;
  findAll(): Promise<Municipio[]>;
  create(data: MunicipioDTO, contatoId:  number, fotosUrl: string[]): Promise<Municipio>;
  update(id: string, municipio: MunicipioDTO, fotosUrl: string[]): Promise<Municipio>;
  delete(id: string): Promise<void>;
}