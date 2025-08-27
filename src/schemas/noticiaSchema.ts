import { z } from "zod";

export const noticiaSchema = z.object({
  id: z.number().int().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  texto: z.string().min(1, "Texto é obrigatório"),
  data: z.string(),
});

