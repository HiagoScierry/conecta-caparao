import { AtracaoTuristica } from "@prisma/client";
import { connection } from "@/config/database/connection";
import { IAtracaoTuristicaRepository } from "../interfaces/IAtracaoTuristicaRepository";
import { AtracaoForm } from "@/forms/atracaoForm";

export class AtracaoTuristicaPrismaRepository implements IAtracaoTuristicaRepository {
  async findAll(): Promise<AtracaoTuristica[]> {
    return connection.atracaoTuristica.findMany({
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        horarios: true,
        fotos: {
          include: {
            foto: true,
          },
        },
        perfis: true,
        categorias: true,
        subcategorias: true,
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
        fotos: {
          include: {
            foto: true,
          },
        },
        perfis: true,
        categorias: true,
      }
    });
  }

  async create(
    data: AtracaoForm,
    fotosUrl: string[]
  ): Promise<AtracaoTuristica> {

    console.log(data)

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
        nome: data.atracaoTuristica.nome,
        descricao: data.atracaoTuristica?.descricao || "",
        mapaUrl: data.atracaoTuristica?.mapaUrl || "",
        site: data.atracaoTuristica?.site || "",
        idMunicipio: Number(data.municipio),
        idEndereco: Number(data.endereco.id),
        idContato: Number(data.contato.id),
        categorias: {
          connect: data.categoria ? { id: Number(data.categoria) } : undefined,
        },
        subcategorias: {
          connect: data.subCategoria?.map(id => ({ id: Number(id) })) || [],
        },
        perfis: {
          connect: data.perfil?.map(id => ({ id: Number(id) })) || [],
        },
        fotos: {
          connect: galeriaIds.map(id => ({ id: Number(id) })) || [],
        },
      },
    });

  }
  async update(id: number, data: AtracaoForm, perfisParaRemover: string[], fotos: string[]): Promise<AtracaoTuristica> {
     const fotosExistentes = await connection.foto.findMany({
      where: {
        url: {
          in: fotos.map(url => String(url)),
        },
      },
      include: {
        galeria: true,
      }
    });

    const galerias = fotosExistentes.map(foto => foto?.galeria ? foto.galeria : null).filter(galeria => galeria);

    const galeriaIds = galerias.map(galeria => galeria?.id).filter(id => id) as number[];


    return connection.atracaoTuristica.update({
      where: { id },
      data: {
        nome: data.atracaoTuristica.nome,
        descricao: data.atracaoTuristica?.descricao || "",
        mapaUrl: data.atracaoTuristica?.mapaUrl || "",
        site: data.atracaoTuristica?.site || "",
        idMunicipio: Number(data.municipio),
        idEndereco: Number(data.endereco.id),
        idContato: Number(data.contato.id),
        categorias: {
          set: data.categoria ? { id: Number(data.categoria) } : undefined,
        },
        subcategorias: {
          set: data.subCategoria?.map(id => ({ id: Number(id) })) || [],
        },
        perfis: {
          connect: data.perfil?.map(id => ({ id: Number(id) })) || [],
          disconnect: perfisParaRemover?.map(id => ({ id: Number(id) })) || [],
        },
        fotos: {
          connect: galeriaIds.map(id => ({ id: Number(id) })) || [],
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await connection.atracaoTuristica.delete({
      where: { id },
    });
  }

  async findAllWithFilters(filters?: {
    municipioId?: number;
    categoriaId?: number;
    subcategoriaId?: number;
    perfilClienteId?: number;
    excludeIds?: number[];
  }): Promise<AtracaoTuristica[]> {
    const where: any = {};

    if (filters?.municipioId) {
      where.idMunicipio = filters.municipioId;
    }

    if (filters?.categoriaId) {
      where.categorias = {
        some: { id: filters.categoriaId },
      };
    }

    if (filters?.subcategoriaId) {
      where.subcategorias = {
        some: { id: filters.subcategoriaId },
      };
    }

    if (filters?.perfilClienteId) {
      where.perfis = {
        some: { id: filters.perfilClienteId },
      };
    }

    if (filters?.excludeIds && filters.excludeIds.length > 0) {
      where.id = {
        notIn: filters.excludeIds,
      };
    }

    return connection.atracaoTuristica.findMany({
      where,
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        horarios: true,
        fotos: {
          include: {
            foto: true,
          },
        },
        perfis: true,
        categorias: true,
        subcategorias: true,
      },
      orderBy: { nome: 'asc' },
    });
  }
}