import { z } from "zod";

export const categoriaSchema = z.object({
  id: z.number(),
  nome: z.string().min(1, "Nome é obrigatório"),
});