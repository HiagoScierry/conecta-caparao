import { HorarioFuncionamentoPrismaRepository } from "@/repositories/prisma/HorarioFuncionamentoPrismaRepository";
import { HorarioFuncionamentoService } from "@/services/horarioFuncionamentoService";

export const horarioFuncionamentoServiceFactory = () => {
  const horarioFuncionamentoRepository = new HorarioFuncionamentoPrismaRepository();

  return new HorarioFuncionamentoService(
    horarioFuncionamentoRepository
  );
}