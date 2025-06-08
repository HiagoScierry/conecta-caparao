import { servicoTuristicoSchema } from "@/schemas/servicoTuristicoSchema";
import { z } from "zod";

export type ServicoTuristicoDTO = z.infer<typeof servicoTuristicoSchema>;
