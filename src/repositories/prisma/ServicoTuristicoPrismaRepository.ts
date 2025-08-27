import { connection } from "@/config/database/connection";
import { IServicoTuristicoRepository, ServicoTuristicoWithRelations } from "../interfaces/IServicoTuristicoRepository";
import { ServicoTuristico } from "@prisma/client";

export class ServicoTuristicoPrismaRepository implements IServicoTuristicoRepository {
  async findById(id: number): Promise<ServicoTuristico> {
    const servicoTuristico = await connection.servicoTuristico.findUnique({
      where: { id },
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        foto: true,
        horarios: true,
      }
    });

    if (!servicoTuristico) {
      throw new Error(`ServicoTuristico with id ${id} not found`);
    }

    return servicoTuristico;
  }

  async findAll(): Promise<ServicoTuristico[]> {
    return connection.servicoTuristico.findMany({
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        foto: true,
        horarios: true,
      }
    });
  }

  async create(data: ServicoTuristicoWithRelations, fotosURL?: string): Promise<ServicoTuristico> {
    let idFoto: number | null = null;

    console.log("Fotos URL recebidas:", fotosURL);

    if (fotosURL) {
      const foto = await connection.foto.create({
        data: {
          url: fotosURL,
        }
      });
      idFoto = foto.id;
    }

    console.log("Foto ID criada:", idFoto);

    const servicoTuristico = await connection.servicoTuristico.create({
      data: {
        nome: data.nome,
        descricao: data?.descricao || "",
        site: data?.site || "",
        idContato: data.idContato,
        idEndereco: data.idEndereco,
        idMunicipio: data.idMunicipio,
        idFoto: idFoto,
        }
    });

    return servicoTuristico;
  }

  async update(id: number, data: ServicoTuristicoWithRelations, fotosURL?: string): Promise<ServicoTuristico> {
    // Remove 'id' if present to avoid Prisma type error
    const { id: _id, ...dataWithoutId } = data;
    return connection.servicoTuristico.update({
      where: { id },
      data: {
        ...dataWithoutId,
        foto: {
          create: {
            url: fotosURL ?? "",
          }
        },
      }
    });
  }

  async delete(id: number): Promise<void> {
    await connection.servicoTuristico.delete({ where: { id } });
  }

}