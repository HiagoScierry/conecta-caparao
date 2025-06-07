import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { z } from "zod";

export type AtracaoTuristicaDTO = z.infer<typeof atracaoTuristicaSchema>;