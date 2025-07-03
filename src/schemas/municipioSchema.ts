import { z } from "zod";

export const municipioSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  site: z.string().url("URL do site é obrigatória").optional(),
  mapaUrl: z.string().url("URL do mapa é obrigatória").optional(),
})