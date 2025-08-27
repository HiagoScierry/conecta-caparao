import { AtracaoTuristicaDTO } from "@/dto/atracaoTuristicaDTO";
import { AtracaoTuristica, Categoria, Contato, Endereco, Foto, HorarioDeFuncionamento, Municipio, PerfilCliente } from "@prisma/client";

export type AtracaoTuristicaWithRelations = AtracaoTuristicaDTO & {
  idCategoria: number;
  idMunicipio: number;
  idEndereco: number;
  idContato: number;
  perfis?: string[];
}

export type AtracaoTuristicaFull = AtracaoTuristica & {
  categoria: Categoria;
  municipio: Municipio;
  endereco: Endereco;
  contato: Contato;
  horarios: HorarioDeFuncionamento[];
  fotos: Foto[];
  perfis: PerfilCliente[];
}

export interface IAtracaoTuristicaRepository {
  findAll(): Promise<AtracaoTuristicaFull[]>;
  findById(id: number): Promise<AtracaoTuristicaFull | null>;
  create(data: AtracaoTuristicaWithRelations, fotos: string[]): Promise<AtracaoTuristica>;
  update(id: number, data: AtracaoTuristicaWithRelations, fotos: string[]): Promise<AtracaoTuristica>;
  delete(id: number): Promise<void>;
}