import { ICategoriaRepository } from "@/repositories/interfaces/ICategoriaRepository";

export class CategoriaService {
  private categoriaRepository: ICategoriaRepository;

  constructor(categoriaRepository: ICategoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async create(nome: string) {
    return this.categoriaRepository.create(nome);
  }

  async findById(id: number) {
    return this.categoriaRepository.findById(id);
  }

  async findAll() {
    return this.categoriaRepository.findAll();
  }

  async update(id: number, nome: string) {
    return this.categoriaRepository.update(id, nome);
  }

  async delete(id: number) {
    return this.categoriaRepository.delete(id);
  }

}