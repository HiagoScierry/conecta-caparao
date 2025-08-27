import { z } from "zod";

export const servicoTuristicoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  site: z.string().url("URL inválida").optional(),
});
