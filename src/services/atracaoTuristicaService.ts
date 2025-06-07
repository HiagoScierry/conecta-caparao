import { AtracaoTuristicaWithRelations, IAtracaoTuristicaRepository } from "@/repositories/interfaces/IAtracaoTuristicaRepository";

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

  async create(data: AtracaoTuristicaWithRelations) {
    return this.atracaoTuristicaRepository.create(data);
  }

  async update(id: number, data: AtracaoTuristicaWithRelations) {
    return this.atracaoTuristicaRepository.update(id, data);
  }

  async delete(id: number) {
    return this.atracaoTuristicaRepository.delete(id);
  }

}