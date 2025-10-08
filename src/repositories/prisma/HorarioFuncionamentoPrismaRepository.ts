import { HorarioDeFuncionamento } from "@prisma/client";
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

  async create(data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento[]> {
    const { horaAbertura, horaFechamento, diaDaSemana, estabelecimentoId, tipoTurismo } = data;

    const baseData = diaDaSemana.map(dia => ({
      horario: `${horaAbertura} - ${horaFechamento}`,
      dia,
    }));

    const relacionamentos =
      tipoTurismo === "ATRAÇÃO"
      ? { atracaoTuristica: { connect: { id: Number(estabelecimentoId) } } }
      : { servicoTuristico: { connect: { id: Number(estabelecimentoId) } } };

    const createdRecords = await Promise.all(
      baseData.map(item =>
        connection.horarioDeFuncionamento.create({
          data: {
            ...item,
            ...relacionamentos,
          },
        })
      )
    );
    // Return the first created record or adjust as needed
    return createdRecords;
  }


  async update(id: number, data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento> {
    const { horaAbertura, horaFechamento, diaDaSemana } = data;

    const dataToUpdate = {
      horario: `${horaAbertura} - ${horaFechamento}`,
      dia: diaDaSemana[0], // Use the first day or adjust logic as needed
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
