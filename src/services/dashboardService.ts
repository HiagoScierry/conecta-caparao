import { IDashboardRepository } from "@/repositories/interfaces/IDashboardRepository";

export interface DashboardStats {
  municipios: number;
  atracoes: number;
  eventos: number;
  noticias: number;
  servicos: number;
}

export interface AtracoesPorMunicipio {
  municipio: string;
  quantidade: number;
}

export interface ProximoEvento {
  id: number;
  nome: string;
  data: string;
  municipio: string;
}

export interface UltimaNoticias {
  id: number;
  titulo: string;
  resumo: string;
  dataPublicacao: string;
}

export class DashboardService {
  private dashboardRepository: IDashboardRepository;

  constructor(dashboardRepository: IDashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async getStats(): Promise<DashboardStats> {
    return this.dashboardRepository.getStats();
  }

  async getAtracoesPorMunicipio(): Promise<AtracoesPorMunicipio[]> {
    return this.dashboardRepository.getAtracoesPorMunicipio();
  }

  async getProximosEventos(limit: number = 5): Promise<ProximoEvento[]> {
    return this.dashboardRepository.getProximosEventos(limit);
  }

  async getUltimasNoticias(limit: number = 5): Promise<UltimaNoticias[]> {
    return this.dashboardRepository.getUltimasNoticias(limit);
  }
}
