import { z } from "zod";

export const principalAtrativoSchema = z.object({
  id: z.number().optional(),
  posicao: z.number().int().min(1).max(5),
  idAtracaoTuristica: z.number().int(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const principalAtrativoInputSchema = z.object({
  posicao: z.number().int().min(1).max(5),
  idAtracaoTuristica: z.number().int(),
});

export type PrincipalAtrativoDTO = z.infer<typeof principalAtrativoSchema>;
export type PrincipalAtrativoInputDTO = z.infer<typeof principalAtrativoInputSchema>;
