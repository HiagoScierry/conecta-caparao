import { HorarioDeFuncionamento } from "@prisma/client";
import { HorarioDeFuncionamentoDTO } from "@/dto/horaFuncionamentoDTO";
import { IHorarioDeFuncionamentoRepository } from "@/repositories/interfaces/IHoraDeFuncionamentoRepository";

export class HorarioFuncionamentoService {

  private horarioFuncionamentoRepository: IHorarioDeFuncionamentoRepository;

  constructor(
    horarioFuncionamentoRepository: IHorarioDeFuncionamentoRepository
  ) {
    this.horarioFuncionamentoRepository = horarioFuncionamentoRepository;
  }

  async getAll(): Promise<HorarioDeFuncionamento[]> {
    return this.horarioFuncionamentoRepository.findAll();
  }

  async getById(id: number): Promise<HorarioDeFuncionamento | null> {
    return this.horarioFuncionamentoRepository.findById(id);
  }

  async create(data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento[]> {
    return this.horarioFuncionamentoRepository.create(data);
  }

  async update(id: number, data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento> {
    const existente = await this.horarioFuncionamentoRepository.findById(id);
    if (!existente) {
      throw new Error(`Horário de funcionamento com id ${id} não encontrado`);
    }
    return this.horarioFuncionamentoRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const existente = await this.horarioFuncionamentoRepository.findById(id);
    if (!existente) {
      throw new Error(`Horário de funcionamento com id ${id} não encontrado`);
    }
    await this.horarioFuncionamentoRepository.delete(id);
  }

  async getByServicoTuristicoID(id: number): Promise<HorarioDeFuncionamento[]> {
    return this.horarioFuncionamentoRepository.findByServicoTuristicoId(id);
  }

  async getByAtracaoTuristicaId(id: number): Promise<HorarioDeFuncionamento[]> {
    return this.horarioFuncionamentoRepository.findByAtracaoTuristicaId(id);
  }
}
