import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { z } from "zod";

export const atracaoTuristicaForm = z.object({
    atracaoTuristica: atracaoTuristicaSchema,
    contato: contatoSchema,
    endereco: enderecoSchema,
    horarioFuncionamento: horarioFuncionamentoSchema,
    municipio: z.string(),
    categoria: z.coerce.number({
      required_error: "Selecione uma categoria.",
    }).min(1, "Selecione uma categoria."),
    subCategoria: z.array(z.coerce.number()).min(1, "Selecione ao menos uma subcategoria."),
    perfil: z.array(z.string())
});

export type AtracaoForm = z.infer<typeof atracaoTuristicaForm>;