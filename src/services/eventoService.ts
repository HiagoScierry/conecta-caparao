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

  async create(data: EventoWithRelations, fotosUrl: string[]) {
    return this.eventoRepository.create(data, fotosUrl);
  }

  async update(id: number, data: EventoWithRelations, fotosUrl?: string[]) {
    return this.eventoRepository.update(id, data, fotosUrl);
  }

  async delete(id: number) {
    return this.eventoRepository.delete(id);
  }

}