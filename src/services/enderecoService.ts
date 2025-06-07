import { EnderecoDTO } from "@/dto/enderecoDTO";
import { IEnderecoRepository } from "@/repositories/interfaces/IEnderecoRepository";

export class EnderecoService {

  private enderecoRepository: IEnderecoRepository;

  constructor(enderecoRepository: IEnderecoRepository) {
    this.enderecoRepository = enderecoRepository;
  }

  async getById(id: number) {
    const endereco = await this.enderecoRepository.getById(id);
    if (!endereco) {
      throw new Error("Endereço não encontrado");
    }
    return endereco;
  }

  async getByCep(cep: string) {
    const endereco = await this.enderecoRepository.getByCep(cep);
    if (!endereco) {
      throw new Error("Endereço não encontrado");
    }
    return endereco;
  }

  async create(endereco: EnderecoDTO) {
    return this.enderecoRepository.create(endereco);
  }

  async update(id: number, endereco: EnderecoDTO) {
    const existingEndereco = await this.enderecoRepository.getById(id);
    if (!existingEndereco) {
      throw new Error("Endereço não encontrado");
    }
    return this.enderecoRepository.update(id, endereco);
  }

  async delete(id: number) {
    const existingEndereco = await this.enderecoRepository.getById(id);
    if (!existingEndereco) {
      throw new Error("Endereço não encontrado");
    }
    await this.enderecoRepository.delete(id);
  }

}