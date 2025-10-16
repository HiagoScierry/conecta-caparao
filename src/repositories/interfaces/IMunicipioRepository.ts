import { MunicipioDTO } from "@/dto/municipioDTO";
import { Municipio, Contato, Foto } from "@prisma/client";

export type MunicipioFull = Municipio & {
  contato: Contato;
  fotos: Foto[];
};

export interface IMunicipioRepository {
  findById(id: string): Promise<Municipio & { contato: Contato; fotos: Foto[] }>;
  findAll(): Promise<MunicipioFull[]>;
  create(data: MunicipioDTO, contatoId:  number, fotosUrl: string[]): Promise<Municipio>;
  update(id: string, municipio: MunicipioDTO, fotosUrl: string[]): Promise<Municipio>;
  delete(id: string): Promise<void>;
}