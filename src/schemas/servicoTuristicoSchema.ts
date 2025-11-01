import { z } from "zod";

export const servicoTuristicoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  descricao: z.string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(5000, "Descrição deve ter no máximo 5000 caracteres")
    .optional(),
  site: z.string().url("URL inválida").optional().or(z.literal("")),
});
