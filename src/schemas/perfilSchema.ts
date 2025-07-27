import { z } from "zod";

export const perfilSchema = z.object({
  tipo: z.array(
    z.enum([
      "individual",
      "casal",
      "familia",
      "grupo",
      "pet friendly"
    ])
  ).min(1, "Selecione pelo menos um perfil"),
});