import { eventoSchema } from "@/schemas/eventoSchema";
import { z } from "zod";

export type EventoDTO = z.infer<typeof eventoSchema>;