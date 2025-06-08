import { z } from "zod";

export const noticiaSchema = z.object({
  id: z.number().int().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  texto: z.string().min(1, "Texto é obrigatório"),
  data: z.date(),
  fotos: z.array(z.object({
    id: z.number().int().optional(),
    url: z.string().url("URL inválida").optional(),
    descricao: z.string().optional(),
    capa: z.boolean().default(false),
  })),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

