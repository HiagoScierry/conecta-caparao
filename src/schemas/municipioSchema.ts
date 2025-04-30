import { z } from "zod";

export const municipioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  site: z.string().optional(),
  mapaUrl: z.string().optional(),
})