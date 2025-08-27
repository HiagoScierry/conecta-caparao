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

  async create(data: NoticiaDTO, fotosUrl: string[]) {
    return this.noticiaRepository.create(data, fotosUrl);
  }

  async update(id: number, data: NoticiaDTO, fotosUrl: string[]) {
    return this.noticiaRepository.update(id, data, fotosUrl);
  }

  async delete(id: number) {
    return this.noticiaRepository.delete(id);
  }

}