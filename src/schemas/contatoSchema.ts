import { z } from "zod";

export const contatoSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  celular: z.string().min(10).max(11),
  telefone: z.string().min(10).max(11),
  whatsapp: z.string().min(10).max(11),
  instagram: z.string().min(3).max(30),
});
