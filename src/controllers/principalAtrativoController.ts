import { principalAtrativoServiceFactory } from "@/factories/principalAtrativoServiceFactory";
import { atracaoTuristicaServiceFactory } from "@/factories/atracaoTuristicaServiceFactory";

export async function createPrincipalAtrativo(posicao: number, idAtracaoTuristica: number) {
  return principalAtrativoServiceFactory().create(posicao, idAtracaoTuristica);
}

export async function getPrincipalAtrativoById(id: number) {
  return principalAtrativoServiceFactory().findById(id);
}

export async function getAllPrincipaisAtrativos() {
  return principalAtrativoServiceFactory().findAll();
}

export async function getPrincipalAtrativoByAtracaoId(idAtracaoTuristica: number) {
  return principalAtrativoServiceFactory().findByAtracaoId(idAtracaoTuristica);
}

export async function updatePrincipalAtrativo(id: number, posicao?: number, idAtracaoTuristica?: number) {
  return principalAtrativoServiceFactory().update(id, posicao, idAtracaoTuristica);
}

export async function deletePrincipalAtrativo(id: number) {
  return principalAtrativoServiceFactory().delete(id);
}

export async function getMaxPrincipaisAtrativos() {
  return principalAtrativoServiceFactory().getMaxPrincipais();
}

export async function getTotalPrincipaisAtrativos() {
  return principalAtrativoServiceFactory().getTotalPrincipais();
}

export async function getAtratosParaPrincipal(filters?: {
  municipioId?: number;
  categoriaId?: number;
  subcategoriaId?: number;
  perfilClienteId?: number;
}) {
  const principaisIds = (await getAllPrincipaisAtrativos()).map(p => p.idAtracaoTuristica);
  
  const todosAtrativos = await atracaoTuristicaServiceFactory().findAllWithFilters({
    ...filters,
    excludeIds: principaisIds,
  });
  
  return todosAtrativos;
}
