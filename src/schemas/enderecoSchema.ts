import { z } from "zod";

// Função para limpar caracteres não numéricos do CEP
const cleanCEP = (value: string) => value.replace(/\D/g, '');

export const enderecoSchema = z.object({
  id: z.number().optional(),
  cep: z.string()
    .min(1, "CEP é obrigatório")
    .refine((value) => {
      const cleaned = cleanCEP(value);
      return cleaned.length === 8;
    }, "CEP deve ter 8 dígitos")
    .transform(cleanCEP),
  logradouro: z.string().min(1, "Logradouro é obrigatório").max(255, "Logradouro deve ter no máximo 255 caracteres"),
  numero: z.string().min(1, "Número é obrigatório").max(10, "Número deve ter no máximo 10 caracteres"),
  bairro: z.string().min(1, "Bairro é obrigatório").max(100, "Bairro deve ter no máximo 100 caracteres"),
})