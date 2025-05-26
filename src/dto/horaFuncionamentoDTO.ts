import { horarioFuncionamentoSchema } from '@/schemas/horarioFuncionamentoSchema';
import { z } from 'zod';

export type HorarioDeFuncionamentoDTO = z.infer<typeof horarioFuncionamentoSchema>;