import { municipioSchema } from "@/schemas/municipioSchema";
import { z } from "zod";

export type MunicipioDTO = z.infer<typeof municipioSchema>;