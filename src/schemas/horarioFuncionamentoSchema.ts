// src/schemas/createHorarioSchema.ts
import { z } from "zod";

export const horarioFuncionamentoSchema = z.object({
  diaDaSemana: z.enum(["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO", "DOMINGO"]),
  horaAbertura: z.string(),
  horaFechamento: z.string(),
  estabelecimentoId: z.string(),
  tipoTurismo: z.enum(["ATRAÇÃO", "SERVIÇO"]),
});

