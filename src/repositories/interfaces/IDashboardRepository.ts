import { 
  DashboardStats, 
  AtracoesPorMunicipio, 
  ProximoEvento, 
  UltimaNoticias
} from "@/services/dashboardService";

export interface IDashboardRepository {
  getStats(): Promise<DashboardStats>;
  getAtracoesPorMunicipio(): Promise<AtracoesPorMunicipio[]>;
  getProximosEventos(limit: number): Promise<ProximoEvento[]>;
  getUltimasNoticias(limit: number): Promise<UltimaNoticias[]>;
}
