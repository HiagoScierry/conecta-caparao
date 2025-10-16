import { dashboardServiceFactory } from "@/factories/dashboardServiceFactory";

export async function getDashboardStats() {
  return dashboardServiceFactory().getStats();
}

export async function getAtracoesPorMunicipio() {
  return dashboardServiceFactory().getAtracoesPorMunicipio();
}

export async function getProximosEventos(limit: number = 5) {
  return dashboardServiceFactory().getProximosEventos(limit);
}

export async function getUltimasNoticias(limit: number = 5) {
  return dashboardServiceFactory().getUltimasNoticias(limit);
}