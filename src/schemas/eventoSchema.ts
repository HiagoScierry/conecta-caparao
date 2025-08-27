import { z } from "zod";

export const eventoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  data: z.string().transform((str) => new Date(str)),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

})
