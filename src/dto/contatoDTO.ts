import { z } from "zod";
import { contatoSchema } from "@/schemas/contatoSchema";

export type ContatoDTO = z.infer<typeof contatoSchema>;
