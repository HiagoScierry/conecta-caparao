import { EventoDTO } from "@/dto/eventoDTO";
import { Evento } from "@prisma/client";

export type EventoWithRelations = EventoDTO & {
  idMunicipio: number;
  idEndereco: number;
};

export interface IEventoRepository {
  findById(id: number): Promise<Evento>;
  findAll(): Promise<Evento[]>;
  create(evento: EventoWithRelations): Promise<Evento>;
  update(id: number, evento: EventoWithRelations): Promise<Evento>;
  delete(id: number): Promise<void>;
}