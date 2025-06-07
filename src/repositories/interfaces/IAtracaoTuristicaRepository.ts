import { AtracaoTuristicaDTO } from "@/dto/atracaoTuristicaDTO";
import { AtracaoTuristica } from "@prisma/client";

export type AtracaoTuristicaWithRelations = AtracaoTuristicaDTO & {
  idCategoria: number;
  idMunicipio: number;
  idEndereco: number;
  idContato: number;
}

export interface IAtracaoTuristicaRepository {
  findAll(): Promise<AtracaoTuristica[]>;
  findById(id: number): Promise<AtracaoTuristica | null>;
  create(data: AtracaoTuristicaWithRelations): Promise<AtracaoTuristica>;
  update(id: number, data: AtracaoTuristicaWithRelations): Promise<AtracaoTuristica>;
  delete(id: number): Promise<void>;
}