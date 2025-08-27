import { HorarioDeFuncionamentoDTO } from "@/dto/horaFuncionamentoDTO";
import { HorarioDeFuncionamento } from "@prisma/client";

export interface IHorarioDeFuncionamentoRepository {
  findAll(): Promise<HorarioDeFuncionamento[]>;
  findById(id: number): Promise<HorarioDeFuncionamento | null>;
  create(data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento[]>;
  update(id: number, data: HorarioDeFuncionamentoDTO): Promise<HorarioDeFuncionamento>;
  delete(id: number): Promise<void>;
  findByServicoTuristicoId(id: number): Promise<HorarioDeFuncionamento[]>;
  findByAtracaoTuristicaId(id: number): Promise<HorarioDeFuncionamento[]>;
}
