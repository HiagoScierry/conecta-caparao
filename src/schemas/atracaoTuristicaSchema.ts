import { z } from "zod";

export const atracaoTuristicaSchema = z.object({
  id: z.number().int().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  mapaUrl: z.string().url("URL do mapa é obrigatória"),
  site: z.string().url().optional(),
})

