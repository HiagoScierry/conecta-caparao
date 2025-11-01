import { z } from "zod";

export const noticiaSchema = z.object({
  id: z.number().int().optional(),
  titulo: z.string().min(1, "Título é obrigatório").max(255, "Título deve ter no máximo 255 caracteres"),
  texto: z.string()
    .min(10, "Texto deve ter pelo menos 10 caracteres")
    .max(10000, "Texto deve ter no máximo 10000 caracteres"),
  data: z.string().min(1, "Data é obrigatória"),
});

