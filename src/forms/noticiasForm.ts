import { noticiaSchema } from "@/schemas/noticiaSchema";
import { z } from "zod";

export const noticiasForm = z.object({
  noticia: noticiaSchema,
});

export type NoticiasForm = z.infer<typeof noticiasForm>;