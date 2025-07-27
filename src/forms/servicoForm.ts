import { servicoTuristicoSchema } from "@/schemas/servicoTuristicoSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { z } from "zod";

export const servicoFormSchema = z.object({
  servico: servicoTuristicoSchema,
  contato: contatoSchema,
  endereco: enderecoSchema,
});

export type ServicoForm = z.infer<typeof servicoFormSchema>;