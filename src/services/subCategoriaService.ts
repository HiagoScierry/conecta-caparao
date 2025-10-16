import { ISubCategoriaRepository } from "@/repositories/interfaces/ISubCategoriaRepository";

export class SubcategoriaService {
  private subCategoriaRepository: ISubCategoriaRepository;

  constructor(subCategoriaRepository: ISubCategoriaRepository) {
    this.subCategoriaRepository = subCategoriaRepository;
  }

  async create(nome: string) {
    return this.subCategoriaRepository.create(nome);
  }

  async findById(id: number) {
    return this.subCategoriaRepository.findById(id);
  }

  async findAll() {
    return this.subCategoriaRepository.findAll();
  }

  async findByIds(ids: string[]) {
    return this.subCategoriaRepository.findByIds(ids);
  }

  async update(id: number, nome: string) {
    return this.subCategoriaRepository.update(id, nome);
  }

  async delete(id: number) {
    return this.subCategoriaRepository.delete(id);
  }

}