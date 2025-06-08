import { z } from "zod";

export const eventoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  data: z.date().refine(date => date > new Date(), {
    message: "A data deve ser no futuro",
  }),
  fotos: z.array(z.object({
    url: z.string().url("URL inválida"),
    capa: z.boolean().optional().default(false),
  })),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

})
