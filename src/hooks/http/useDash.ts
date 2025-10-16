import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./useQueryInvalidation";

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

export function useDash() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: async (): Promise<DashboardStats> => {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do dashboard');
      }
      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 1, // 1 minuto
  });
}

export function useDashboardAtracoesPorMunicipio() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_ATRACOES_POR_MUNICIPIO,
    queryFn: async (): Promise<AtracoesPorMunicipio[]> => {
      const response = await fetch('/api/dashboard/atracoes-por-municipio');
      if (!response.ok) {
        throw new Error('Erro ao buscar atrações por município');
      }
      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutos
  });
}

export function useDashboardProximosEventos(limit: number = 5) {
  return useQuery({
    queryKey: [...QUERY_KEYS.DASHBOARD_PROXIMOS_EVENTOS, limit],
    queryFn: async (): Promise<ProximoEvento[]> => {
      const response = await fetch(`/api/dashboard/proximos-eventos?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar próximos eventos');
      }
      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 2, // 2 minutos
  });
}

export function useDashboardUltimasNoticias(limit: number = 5) {
  return useQuery({
    queryKey: [...QUERY_KEYS.DASHBOARD_ULTIMAS_NOTICIAS, limit],
    queryFn: async (): Promise<UltimaNoticias[]> => {
      const response = await fetch(`/api/dashboard/ultimas-noticias?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar últimas notícias');
      }
      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutos
  });
}
