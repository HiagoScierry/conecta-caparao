import { ServicoTuristicoDTO } from "@/dto/servicoTuristicoDTO";
import { Contato, Endereco, Foto, GaleriaFoto, HorarioDeFuncionamento, Municipio, ServicoTuristico } from "@prisma/client";

export type ServicoTuristicoWithRelations = ServicoTuristicoDTO & {
  idEndereco: number;
  idContato: number;
  idMunicipio: number;
}

export type ServicoTuristicoFull = ServicoTuristico & {
  endereco: Endereco;
  contato: Contato;
  municipio: Municipio;
  foto?: Foto; // Mantendo para compatibilidade
  fotos: (GaleriaFoto & { foto: Foto })[];
  horarios: HorarioDeFuncionamento[];
}

export interface IServicoTuristicoRepository {
  findById(id: number): Promise<ServicoTuristico>;
  findAll(): Promise<ServicoTuristico[]>;
  create(data: ServicoTuristicoWithRelations, fotoURL?: string): Promise<ServicoTuristico>;
  update(id: number, data: ServicoTuristicoWithRelations, fotoURL?: string): Promise<ServicoTuristico>;
  delete(id: number): Promise<void>;
}