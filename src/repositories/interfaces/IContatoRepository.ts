import { ContatoDTO } from "@/dto/contatoDTO";

export interface IContatoRepository {
  create(data: ContatoDTO): Promise<ContatoDTO>;
  update(id: number, data: Omit<ContatoDTO, "id">): Promise<ContatoDTO>
  delete(id: number): Promise<void>;
  findAll(): Promise<ContatoDTO[]>;
  findById(id: number): Promise<ContatoDTO | null>;
}