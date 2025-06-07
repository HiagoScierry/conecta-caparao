import { enderecoSchema } from "@/schemas/enderecoSchema";
import { z } from "zod";

export type EnderecoDTO = z.infer<typeof enderecoSchema>;