import { z } from "zod";

export const contatoSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  celular: z.string()
    .min(10, "Celular deve ter pelo menos 10 dígitos")
    .max(11, "Celular deve ter no máximo 11 dígitos")
    .regex(/^\d+$/, "Celular deve conter apenas números"),
  telefone: z.string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(11, "Telefone deve ter no máximo 11 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números")
    .optional(),
  whatsapp: z.string()
    .min(10, "WhatsApp deve ter pelo menos 10 dígitos")
    .max(11, "WhatsApp deve ter no máximo 11 dígitos")
    .regex(/^\d+$/, "WhatsApp deve conter apenas números")
    .optional(),
  instagram: z.string().min(3).max(30).optional(),
});
