import { MunicipioDTO } from "@/dto/municipioDTO";
import {  Municipios } from "@prisma/client";

export interface IMunicipioRepository {
  findById(id: string): Promise<Municipios>;
  findAll(): Promise<Municipios[]>;
  create(data: MunicipioDTO, contatoId:  number): Promise<Municipios>;
  update(id: string, data: MunicipioDTO): Promise<Municipios>;
  delete(id: string): Promise<void>;
}