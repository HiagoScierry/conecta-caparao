// src/schemas/createHorarioSchema.ts
import { z } from "zod";

export const horarioFuncionamentoSchema = z.object({
  diaDaSemana: z.array(
    z.enum([
      "DOMINGO",
      "SEGUNDA",
      "TERCA",
      "QUARTA",
      "QUINTA",
      "SEXTA",
      "SABADO",
    ])
  ).min(1, "Selecione pelo menos um dia"),
  horaAbertura: z.string(),
  horaFechamento: z.string(),
  estabelecimentoId: z.string(),
  tipoTurismo: z.enum(["ATRAÇÃO", "SERVIÇO"]),
});

