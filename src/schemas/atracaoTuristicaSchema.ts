import { z } from "zod";

export const atracaoTuristicaSchema = z.object({
  id: z.number().int().optional(),
  nome: z.string().min(1, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  descricao: z.string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(5000, "Descrição deve ter no máximo 5000 caracteres")
    .optional(),
  mapaUrl: z.string().url("URL do mapa deve ser válida").optional().or(z.literal("")),
  site: z.string().url("URL do site deve ser válida").optional().or(z.literal("")),
})

