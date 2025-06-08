import { noticiaSchema } from "@/schemas/noticiaSchema";
import { z } from "zod";

export type NoticiaDTO = z.infer<typeof noticiaSchema>;