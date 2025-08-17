import { MunicipioDTO } from "@/dto/municipioDTO";
import {  Municipio } from "@prisma/client";

export interface IMunicipioRepository {
  findById(id: string): Promise<Municipio>;
  findAll(): Promise<Municipio[]>;
  create(data: MunicipioDTO, contatoId:  number, fotos: string[]): Promise<Municipio>;
  update(id: string, data: MunicipioDTO): Promise<Municipio>;
  delete(id: string): Promise<void>;
}