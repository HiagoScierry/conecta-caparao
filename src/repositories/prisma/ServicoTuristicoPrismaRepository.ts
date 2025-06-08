import { connection } from "@/config/database/connection";
import { IServicoTuristicoRepository, ServicoTuristicoWithRelations } from "../interfaces/IServicoTuristicoRepository";
import { ServicoTuristico } from "@prisma/client";

export class ServicoTuristicoPrismaRepository implements IServicoTuristicoRepository {
  async findById(id: number): Promise<ServicoTuristico> {
    const servicoTuristico = await connection.servicoTuristico.findUnique({
      where: { id },
    });

    if (!servicoTuristico) {
      throw new Error(`ServicoTuristico with id ${id} not found`);
    }

    return servicoTuristico;
  }

  async findAll(): Promise<ServicoTuristico[]> {
    return connection.servicoTuristico.findMany();
  }

  async create(data: ServicoTuristicoWithRelations): Promise<ServicoTuristico> {
    return connection.servicoTuristico.create({ data });
  }

  async update(id: number, data: ServicoTuristicoWithRelations): Promise<ServicoTuristico> {
    return connection.servicoTuristico.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await connection.servicoTuristico.delete({ where: { id } });
  }

}