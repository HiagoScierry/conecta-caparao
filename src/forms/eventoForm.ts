import { enderecoSchema } from "@/schemas/enderecoSchema";
import { eventoSchema } from "@/schemas/eventoSchema";
import { z } from "zod";

export const eventoForm = z.object({
  evento: eventoSchema,
  endereco: enderecoSchema,
  municipio: z.string()
});

export type EventoForm = z.infer<typeof eventoForm>;
