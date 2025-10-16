import { z } from "zod";
import { usuarioSchema } from "@/schemas/usuarioSchema";

export type UsuarioDTO = z.infer<typeof usuarioSchema>;

export type UsuarioCreateDTO = Omit<UsuarioDTO, 'id' | 'createdAt' | 'updatedAt'>;

export type UsuarioUpdateDTO = Partial<Omit<UsuarioDTO, 'id' | 'createdAt' | 'updatedAt'>>;

export type UsuarioLoginDTO = {
  email: string;
  senha: string;
};

export type UsuarioResponseDTO = Omit<UsuarioDTO, 'senha'>;
