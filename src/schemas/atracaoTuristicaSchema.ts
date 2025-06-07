import { z } from "zod";

export const atracaoTuristicaSchema = z.object({
  id: z.number().int().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  mapaUrl: z.string().url().optional(),
  site: z.string().url().optional(),
})

