import { NoticiaDTO } from "@/dto/noticiaDTO";
import { Noticia } from "@prisma/client";

export interface INoticiaRepository {
  findAll(): Promise<Noticia[]>;
  findById(id: number): Promise<Noticia | null>;
  create(data: NoticiaDTO): Promise<Noticia>;
  update(id: number, data: NoticiaDTO): Promise<Noticia | null>;
  delete(id: number): Promise<void>;
}