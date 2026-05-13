import { IAtracaoTuristicaRepository } from "@/repositories/interfaces/IAtracaoTuristicaRepository";
import { AtracaoForm } from "@/schemas/forms/atracaoForm";

export class AtracaoTuristicaService {
  private atracaoTuristicaRepository: IAtracaoTuristicaRepository;

  constructor(atracaoTuristicaRepository: IAtracaoTuristicaRepository) {
    this.atracaoTuristicaRepository = atracaoTuristicaRepository;
  }

  async findAll(onlyAtivo?: boolean) {
    return this.atracaoTuristicaRepository.findAll(onlyAtivo);
  }

  async toggleAtivo(id: number, ativo: boolean) {
    return this.atracaoTuristicaRepository.toggleAtivo(id, ativo);
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

  async findAllWithFilters(filters?: {
    municipioId?: number;
    categoriaId?: number;
    subcategoriaId?: number;
    perfilClienteId?: number;
    excludeIds?: number[];
  }, onlyAtivo?: boolean) {
    return this.atracaoTuristicaRepository.findAllWithFilters(filters, onlyAtivo);
  }

}