import { contatoSchema } from "@/schemas/contatoSchema";
import { municipioSchema } from "@/schemas/municipioSchema";
import { z } from "zod";

export const municipioForm = z.object({
  municipio: municipioSchema,
  contato: contatoSchema
});

export type MunicipioForm = z.infer<typeof municipioForm>;
