import { HorarioDeFuncionamento, Prisma } from "@prisma/client";
import { connection } from "@/config/database/connection";
import { IHorarioDeFuncionamentoRepository } from "../interfaces/IHoraDeFuncionamentoRepository";
import { HorarioDeFuncionamentoDTO } from "@/dto/horaFuncionamentoDTO";

export class HorarioFuncionamentoPrismaRepository implements IHorarioDeFuncionamentoRepository {
  async findAll(): Promise<HorarioDeFuncionamento[]> {
    return connection.horarioDeFuncionamento.findMany();
  }

  async findById(id: number): Promise<HorarioDeFuncionamento | null> {
    return connection.horarioDeFuncionamento.findUnique({
      where: { id }
    });
  }

  async create(data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento> {
    const { horaAbertura, horaFechamento, diaDaSemana, estabelecimentoId, tipoTurismo } = data;

    const baseData: Omit<Prisma.HorarioDeFuncionamentoCreateInput, 'atracaoTuristica' | 'servicoTuristico'> = {
      horario: `${horaAbertura} - ${horaFechamento}`,
      dia: diaDaSemana,
    };

    const relacionamentos: Partial<Pick<Prisma.HorarioDeFuncionamentoCreateInput, 'atracaoTuristica' | 'servicoTuristico'>> =
      tipoTurismo === "ATRAÇÃO"
        ? { atracaoTuristica: { connect: { id: Number(estabelecimentoId) } } }
        : { servicoTuristico: { connect: { id: Number(estabelecimentoId) } } };

    return connection.horarioDeFuncionamento.create({
      data: {
        ...baseData,
        ...relacionamentos,
      },
    });
  }


  async update(id: number, data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento> {
    const { horaAbertura, horaFechamento, diaDaSemana } = data;

    const dataToUpdate = {
      horario: `${horaAbertura} - ${horaFechamento}`,
      dia: diaDaSemana,
    };

    return connection.horarioDeFuncionamento.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async delete(id: number): Promise<void> {
    await connection.horarioDeFuncionamento.delete({
      where: { id },
    });
  }

  async findByServicoTuristicoId(id: number): Promise<HorarioDeFuncionamento[]> {
    return connection.horarioDeFuncionamento.findMany({
      where: { servicoTuristicoId: id },
    });
  }

  async findByAtracaoTuristicaId(id: number): Promise<HorarioDeFuncionamento[]> {
    return connection.horarioDeFuncionamento.findMany({
      where: { atracaoTuristicaId: id },
    });
  }
}
