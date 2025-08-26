import { z } from "zod";

export const categoriaSchema = z.object({
  id: z.number(),
  tipo: z.array(
    z.enum([
      "Cultural",
      "Natural",
      "Histórica"
    ])
  ).min(1, "Selecione pelo menos uma categoria"),
});