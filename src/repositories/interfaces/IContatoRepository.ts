import { ContatoDTO } from "@/dto/contatoDTO";

export interface IContatoRepository {
  create(data: ContatoDTO): Promise<ContatoDTO>;
  update(data: ContatoDTO): Promise<ContatoDTO>;
  delete(id: number): Promise<void>;
  findAll(): Promise<ContatoDTO[]>;
  findById(id: number): Promise<ContatoDTO | null>;
}