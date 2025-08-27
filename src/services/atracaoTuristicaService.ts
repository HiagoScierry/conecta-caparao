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

  async create(data: AtracaoTuristicaWithRelations, fotos: string[]) {
    return this.atracaoTuristicaRepository.create(data, fotos);
  }

  async update(id: number, data: AtracaoTuristicaWithRelations, fotos: string[]) {
    return this.atracaoTuristicaRepository.update(id, data, fotos);
  }

  async delete(id: number) {
    return this.atracaoTuristicaRepository.delete(id);
  }

}