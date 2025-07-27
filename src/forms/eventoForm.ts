import { eventoSchema } from "@/schemas/eventoSchema";
import { municipioSchema } from "@/schemas/municipioSchema";
import { z } from "zod";

export const eventoForm = z.object({
  evento: eventoSchema,
  municipio: municipioSchema,
});

export type EventoForm = z.infer<typeof eventoForm>;
