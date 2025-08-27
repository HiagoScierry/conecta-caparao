import { NoticiaDTO } from "@/dto/noticiaDTO";
import { Noticia } from "@prisma/client";


export type NoticiaFull = Noticia & {
  fotos: {
    id: number;
    capa: boolean;
    noticiaId: number;
    fotoId: number;
    foto: {
      id: number;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

export interface INoticiaRepository {
  findAll(): Promise<NoticiaFull[]>;
  findById(id: number): Promise<NoticiaFull | null>;
  create(data: NoticiaDTO, fotos: string[]): Promise<NoticiaFull>;
  update(id: number, data: NoticiaDTO, fotos: string[]): Promise<Noticia | null>;
  delete(id: number): Promise<void>;
}