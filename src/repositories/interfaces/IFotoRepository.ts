import { Fotos } from "@prisma/client";

export interface IFotoRepository {
  getFotoById(id: string): Promise<Fotos | null>;
  getAllFotos(): Promise<Fotos[]>;
  createFoto(url: string): Promise<Fotos>;
  deleteFoto(id: string): Promise<void>;
}