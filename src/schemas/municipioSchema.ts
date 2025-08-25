import { z } from "zod";

export const municipioSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  site: z.string().optional(),
  imagemUrl: z.string().optional(),
  mapaUrl: z.string().optional(),
})