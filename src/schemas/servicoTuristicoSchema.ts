import { z } from "zod";

export const servicoTuristicoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  site: z.string().url("URL inválida").optional(),
  horarios: z.array(z.object({
    diaSemana: z.string().min(1, "Dia da semana é obrigatório"),
    horarioAbertura: z.string().min(1, "Horário de abertura é obrigatório"),
    horarioFechamento: z.string().min(1, "Horário de fechamento é obrigatório")
  })).optional(),
});
