import { EnderecoDTO } from "@/dto/enderecoDTO";
import { Endereco } from "@prisma/client";

export interface IEnderecoRepository {
  getById(id: number): Promise<Endereco | null>;
  getByCep(cep: string): Promise<Endereco | null>;
  create(endereco: EnderecoDTO): Promise<Endereco>;
  update(id: number, endereco: EnderecoDTO): Promise<Endereco>;
  delete(id: number): Promise<void>;
}