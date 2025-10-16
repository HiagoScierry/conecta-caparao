import { AtracaoTuristica, Categoria, Contato, Endereco, HorarioDeFuncionamento, PerfilCliente, Subcategoria } from "@prisma/client";
import { AtracaoForm } from "@/forms/atracaoForm";

export type AtracaoTuristicaFull = AtracaoTuristica & {
  horarioFuncionamento: HorarioDeFuncionamento[];
  endereco: Endereco;
  contato: Contato;
  municipio: { id: number; nome: string };
  categoria: Categoria;
  subcategorias: Subcategoria[];
  perfis: PerfilCliente[];
  fotos: { id: number; url: string }[];
};

export interface IAtracaoTuristicaRepository {
  findAll(): Promise<AtracaoTuristica[]>;
  findById(id: number): Promise<AtracaoTuristica | null>;
  create(data: AtracaoForm, fotosUrl: string[]): Promise<AtracaoTuristica>;
  update(id: number, data: AtracaoForm, perfisParaRemover: string[], fotos: string[]): Promise<AtracaoTuristica>;
  delete(id: number): Promise<void>;
}