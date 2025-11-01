import { z } from "zod";

// Função para limpar caracteres não numéricos
const cleanPhone = (value: string) => value.replace(/\D/g, '');

// Validação para telefones brasileiros (com ou sem máscara)
const phoneValidation = z.string()
  .refine((value) => {
    const cleaned = cleanPhone(value);
    return cleaned.length >= 10 && cleaned.length <= 11;
  }, "Telefone deve ter 10 ou 11 dígitos")
  .transform(cleanPhone);

export const contatoSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  celular: phoneValidation,
  telefone: phoneValidation.optional().or(z.literal("")),
  whatsapp: phoneValidation.optional().or(z.literal("")),
  instagram: z.string()
    .min(1, "Instagram deve ter pelo menos 1 caractere")
    .max(30, "Instagram deve ter no máximo 30 caracteres")
    .optional()
    .or(z.literal("")),
});
