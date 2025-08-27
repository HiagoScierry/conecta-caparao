import { EventoDTO } from "@/dto/eventoDTO";
import { Endereco, Evento, Municipio } from "@prisma/client";

export type EventoWithRelations = EventoDTO & {
  idMunicipio: number;
  idEndereco: number;
};

export type EventoFull = Evento & {
  municipio: Municipio;
  endereco: Endereco;
  fotos: { capa: boolean; foto: { url: string } }[];
}

export interface IEventoRepository {
  findById(id: number): Promise<Evento>;
  findAll(): Promise<Evento[]>;
  create(evento: EventoWithRelations, fotosUrl: string[]): Promise<Evento>;
  update(id: number, evento: EventoWithRelations, fotosUrl?: string[]): Promise<Evento>;
  delete(id: number): Promise<void>;
}