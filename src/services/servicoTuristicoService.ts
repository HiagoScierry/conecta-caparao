import { IServicoTuristicoRepository, ServicoTuristicoWithRelations } from "@/repositories/interfaces/IServicoTuristicoRepository";

export class ServicoTuristicoService {
  private repository: IServicoTuristicoRepository;

  constructor(repository: IServicoTuristicoRepository) {
    this.repository = repository;
  }

  async findById(id: number) {
    return this.repository.findById(id);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async create(data: ServicoTuristicoWithRelations) {
    return this.repository.create(data);
  }

  async update(id: number, data: ServicoTuristicoWithRelations) {
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

}