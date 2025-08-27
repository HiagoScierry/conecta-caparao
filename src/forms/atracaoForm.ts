import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { categoriaSchema } from "@/schemas/categoriaSchema";
import { municipioSchema } from "@/schemas/municipioSchema";
import { perfilSchema } from "@/schemas/perfilSchema";
import { z } from "zod";


export const atracaoTuristicaForm = z.object({
    atracaoTuristica: atracaoTuristicaSchema,
    contato: contatoSchema,
    endereco: enderecoSchema,
    horarioFuncionamento: horarioFuncionamentoSchema,
    municipio: z.string(),
    categoria: z.number(),
    perfil: z.array(z.string())
})

export type AtracaoForm = z.infer<typeof atracaoTuristicaForm>;

