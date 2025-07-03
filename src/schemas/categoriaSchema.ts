import { z } from "zod";

export const categoriaSchema = z.object({
  tipo: z.array(
    z.enum([
      "Cultural",
      "Natural",
      "Histórica"
    ])
  ).min(1, "Selecione pelo menos uma categoria"),
});