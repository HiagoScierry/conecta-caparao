import { AtracaoTuristica } from "@prisma/client";
import { connection } from "@/config/database/connection";
import { AtracaoTuristicaDTO } from "@/dto/atracaoTuristicaDTO";
import { IAtracaoTuristicaRepository } from "../interfaces/IAtracaoTuristicaRepository";

export class AtracaoTuristicaPrismaRepository implements IAtracaoTuristicaRepository {
  async findAll(): Promise<AtracaoTuristica[]> {
    return connection.atracaoTuristica.findMany({
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        horarios: true,
        fotos: true,
        perfis: true,
      }
    });
  }

  async findById(id: number): Promise<AtracaoTuristica | null> {
    return connection.atracaoTuristica.findFirst({
      where: { id },
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        horarios: true,
        fotos: true,
        perfis: true,
      }
    });
  }

  async create(
    data: AtracaoTuristicaDTO & { idContato: number; idEndereco: number; idMunicipio: number },
    fotosUrl: string[]
  ): Promise<AtracaoTuristica> {
    const fotosExistentes = await connection.foto.findMany({
      where: {
        url: {
          in: fotosUrl.map(url => String(url)),
        },
      },
      include: {
        galeria: true,
      }
    });

    const galerias = fotosExistentes.map(foto => foto?.galeria ? foto.galeria : null).filter(galeria => galeria);

    const galeriaIds = galerias.map(galeria => galeria?.id).filter(id => id) as number[];

    return connection.atracaoTuristica.create({
      data: {
        nome: data.nome,
        descricao: data?.descricao || "",
        mapaUrl: data?.mapaUrl || "",
        site: data?.site || "",
        contato: { connect: { id: data.idContato } },
        endereco: { connect: { id: data.idEndereco } },
        municipio: { connect: { id: data.idMunicipio } },
        fotos: {
          connect: galeriaIds.map(id => ({ id: Number(id) })) || [],
        },
      },
    });
  }
  async update(
    id: number, data: AtracaoTuristicaDTO & {
      idContato: number;
      idEndereco: number;
      idMunicipio: number;
      categorias?: (string | number)[];
      subcategorias?: (string | number)[];
      perfis?: (string | number)[];
    }, perfisParaRemover: string[], fotos: string[]): Promise<AtracaoTuristica> {
    return connection.atracaoTuristica.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data?.descricao || "",
        mapaUrl: data?.mapaUrl || "",
        site: data?.site || "",
        idMunicipio: data.idMunicipio,
        idEndereco: data.idEndereco,
        idContato: data.idContato,
        categorias: {
          connect: data.categorias?.map((id: string | number) => ({ id: Number(id) })) || [],
        },
        subcategorias: {
          connect: data.subcategorias?.map((id: string | number) => ({ id: Number(id) })) || [],
        },
        perfis: {
          disconnect: perfisParaRemover.map(id => ({ id: Number(id) })) || [],
          connect: data.perfis?.map(id => ({ id: Number(id) })) || [],
        },
        fotos: {
          connect: fotos.map(id => ({ id: Number(id) })),
        }
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.atracaoTuristica.delete({
      where: { id },
    });
  }
}