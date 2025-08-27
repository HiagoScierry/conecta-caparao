import { servicoTuristicoSchema } from "@/schemas/servicoTuristicoSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { z } from "zod";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";

export const servicoFormSchema = z.object({
  servico: servicoTuristicoSchema,
  contato: contatoSchema,
  endereco: enderecoSchema,
  horarioFuncionamento: horarioFuncionamentoSchema,
  municipio: z.string().min(1, "Município é obrigatório"),
});

export type ServicoForm = z.infer<typeof servicoFormSchema>;