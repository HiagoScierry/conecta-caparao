import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.number().int().positive(),
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("Email deve ser um endereço válido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  admin: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const usuarioCreateSchema = usuarioSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const usuarioUpdateSchema = usuarioSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const usuarioLoginSchema = z.object({
  email: z.string().email("Email deve ser um endereço válido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});
