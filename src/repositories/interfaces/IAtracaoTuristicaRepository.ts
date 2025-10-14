import { AtracaoTuristicaDTO } from "@/dto/atracaoTuristicaDTO";
import { AtracaoTuristica} from "@prisma/client";


export interface IAtracaoTuristicaRepository {
  findAll(): Promise<AtracaoTuristica[]>;
  findById(id: number): Promise<AtracaoTuristica | null>;
  create(data: AtracaoTuristicaDTO, fotosUrl: string[]): Promise<AtracaoTuristica>;
  update(id: number, data: AtracaoTuristicaDTO, perfisParaRemover: string[], fotos: string[]): Promise<AtracaoTuristica>;
  delete(id: number): Promise<void>;
}