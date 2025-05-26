import { z } from "zod";

export const categoriaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
})