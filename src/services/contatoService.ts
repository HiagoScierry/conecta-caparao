import { ContatoDTO } from "@/dto/contatoDTO";
import { IContatoRepository } from "@/repositories/interfaces/IContatoRepository";

export class ContatoService {
  private contatoRepository: IContatoRepository;

  constructor(contatoRepository: IContatoRepository) {
    this.contatoRepository = contatoRepository;
  }

  async create(data: ContatoDTO): Promise<ContatoDTO> {
    return this.contatoRepository.create(data);
  }

  async update(p0: number, data: ContatoDTO): Promise<ContatoDTO> {
    try {
      const contato = await this.findById(data.id as number);

      if (!contato) {
        throw new Error("Contato não encontrado");
      }

      return this.contatoRepository.update(data);

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const contato =  await this.findById(id);

      if (!contato) {
        throw new Error("Contato não encontrado");
      }

      this.contatoRepository.delete(id);

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async findAll(): Promise<ContatoDTO[]> {
    return this.contatoRepository.findAll();
  }

  async findById(id: number): Promise<ContatoDTO | null> {
    return this.contatoRepository.findById(id);
  }

}