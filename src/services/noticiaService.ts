import { NoticiaDTO } from "@/dto/noticiaDTO";
import { INoticiaRepository } from "@/repositories/interfaces/INoticiaRepository";

export class NoticiaService {
  private noticiaRepository: INoticiaRepository;

  constructor(noticiaRepository: INoticiaRepository) {
    this.noticiaRepository = noticiaRepository;
  }

  async findAll() {
    return this.noticiaRepository.findAll();
  }

  async findById(id: number) {
    return this.noticiaRepository.findById(id);
  }

  async create(data: NoticiaDTO) {
    return this.noticiaRepository.create(data);
  }

  async update(id: number, data: NoticiaDTO) {
    return this.noticiaRepository.update(id, data);
  }

  async delete(id: number) {
    return this.noticiaRepository.delete(id);
  }

}