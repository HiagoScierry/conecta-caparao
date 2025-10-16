import { connection } from "@/config/database/connection";
import { IDashboardRepository } from "../interfaces/IDashboardRepository";
import {
  DashboardStats,
  AtracoesPorMunicipio,
  ProximoEvento,
  UltimaNoticias
} from "@/services/dashboardService";

export class DashboardPrismaRepository implements IDashboardRepository {
  async getStats(): Promise<DashboardStats> {
    const [municipios, atracoes, eventos, noticias, servicos] = await Promise.all([
      connection.municipio.count(),
      connection.atracaoTuristica.count(),
      connection.evento.count(),
      connection.noticia.count(),
      connection.servicoTuristico.count()
    ]);

    return {
      municipios,
      atracoes,
      eventos,
      noticias,
      servicos
    };
  }

  async getAtracoesPorMunicipio(): Promise<AtracoesPorMunicipio[]> {
    const result = await connection.municipio.findMany({
      select: {
        nome: true,
        _count: {
          select: {
            atracoesTuristicas: true
          }
        }
      },
      orderBy: {
        atracoesTuristicas: {
          _count: 'desc'
        }
      }
    });

    return result.map(item => ({
      municipio: item.nome,
      quantidade: item._count.atracoesTuristicas
    }));
  }

  async getProximosEventos(limit: number): Promise<ProximoEvento[]> {
    const eventos = await connection.evento.findMany({
      where: {
        data: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        nome: true,
        data: true,
        municipio: {
          select: {
            nome: true
          }
        }
      },
      orderBy: {
        data: 'asc'
      },
      take: limit
    });

    return eventos.map(evento => ({
      id: evento.id,
      nome: evento.nome,
      data: evento.data.toISOString(),
      municipio: evento.municipio.nome
    }));
  }

  async getUltimasNoticias(limit: number): Promise<UltimaNoticias[]> {
    const noticias = await connection.noticia.findMany({
      select: {
        id: true,
        titulo: true,
        texto: true,
        data: true
      },
      orderBy: {
        data: 'desc'
      },
      take: limit
    });

    return noticias.map(noticia => ({
      id: noticia.id,
      titulo: noticia.titulo,
      resumo: noticia.texto.substring(0, 150) + '...',
      dataPublicacao: noticia.data.toISOString()
    }));
  }
}
