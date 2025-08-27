import { z } from "zod";

export const enderecoSchema = z.object({
  id: z.number().optional(),
  cep: z.string().min(8, "CEP deve ter 8 caracteres").max(8, "CEP deve ter 8 caracteres"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
})