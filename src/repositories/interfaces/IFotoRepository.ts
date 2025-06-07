import { Foto } from "@prisma/client";

export interface IFotoRepository {
  getFotoById(id: string): Promise<Foto | null>;
  getAllFotos(): Promise<Foto[]>;
  createFoto(url: string): Promise<Foto>;
  deleteFoto(id: string): Promise<void>;
}