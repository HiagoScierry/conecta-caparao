import { z } from "zod";

export const contatoSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  celular: z.string().min(10, "Celular é obrigatório").max(11, "Celular inválido"),
  telefone: z.string().min(10).max(11).optional(),
  whatsapp: z.string().min(10).max(11).optional(),
  instagram: z.string().min(3).max(30).optional(),
});
