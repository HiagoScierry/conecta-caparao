import { Foto } from "@prisma/client";

export type TFoto = {
  url: string;
  isPrincipal?: boolean;
}

export interface IFotoRepository {
  getFotoById(id: string): Promise<Foto | null>;
  getAllFotos(): Promise<Foto[]>;
  createFoto(data: TFoto): Promise<Foto>;
  deleteFoto(id: string): Promise<void>;
}