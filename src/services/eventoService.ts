import { EventoWithRelations, IEventoRepository } from "@/repositories/interfaces/IEventoRepository";

export class EventoService {

  private eventoRepository: IEventoRepository;

  constructor(eventoRepository: IEventoRepository) {
    this.eventoRepository = eventoRepository;
  }

  async findAll() {
    return this.eventoRepository.findAll();
  }

  async findById(id: number) {
    return this.eventoRepository.findById(id);
  }

  async create(data: EventoWithRelations) {
    return this.eventoRepository.create(data);
  }

  async update(id: number, data: EventoWithRelations) {
    return this.eventoRepository.update(id, data);
  }

  async delete(id: number) {
    return this.eventoRepository.delete(id);
  }

}