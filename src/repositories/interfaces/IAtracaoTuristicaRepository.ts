import { AtracaoTuristica} from "@prisma/client";
import { AtracaoForm } from "@/forms/atracaoForm";


export interface IAtracaoTuristicaRepository {
  findAll(): Promise<AtracaoTuristica[]>;
  findById(id: number): Promise<AtracaoTuristica | null>;
  create(data: AtracaoForm, fotosUrl: string[]): Promise<AtracaoTuristica>;
  update(id: number, data: AtracaoForm, perfisParaRemover: string[], fotos: string[]): Promise<AtracaoTuristica>;
  delete(id: number): Promise<void>;
}