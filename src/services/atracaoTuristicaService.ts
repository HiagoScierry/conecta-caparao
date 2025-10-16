import { IAtracaoTuristicaRepository } from "@/repositories/interfaces/IAtracaoTuristicaRepository";
import { AtracaoForm } from "@/forms/atracaoForm";

export class AtracaoTuristicaService {
  private atracaoTuristicaRepository: IAtracaoTuristicaRepository;

  constructor(atracaoTuristicaRepository: IAtracaoTuristicaRepository) {
    this.atracaoTuristicaRepository = atracaoTuristicaRepository;
  }

  async findAll() {
    return this.atracaoTuristicaRepository.findAll();
  }

  async findById(id: number) {
    return this.atracaoTuristicaRepository.findById(id);
  }

  async create(data: AtracaoForm, fotos: string[]) {
    return this.atracaoTuristicaRepository.create(data, fotos);
  }

  async update(id: number, data: AtracaoForm, perfisParaRemover: string[], fotos: string[]) {
    return this.atracaoTuristicaRepository.update(id, data, perfisParaRemover, fotos);
  }

  async delete(id: number) {
    return this.atracaoTuristicaRepository.delete(id);
  }

}