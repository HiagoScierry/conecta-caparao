import { PrincipalAtrativo } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, useQueryInvalidation } from "./useQueryInvalidation";

export interface PrincipalAtrativoWithRelations extends PrincipalAtrativo {
  posicao: number;
  idAtracaoTuristica: number;
  atracaoTuristica: {
    id: number;
    nome: string;
    municipio?: { id: number; nome: string };
  };
}

export interface PrincipalAtrativoResponse {
  principais: PrincipalAtrativoWithRelations[];
  max: number;
  total: number;
}

export interface AtrativoDisponivel {
  id: number;
  nome: string;
  municipio?: { id: number; nome: string };
}

export function useGetAllPrincipaisAtrativos() {
  return useQuery<PrincipalAtrativoResponse, Error>({
    queryKey: QUERY_KEYS.PRINCIPAIS_ATRATIVOS,
    queryFn: async () => {
      const response = await fetch("/api/principais-atrativos");

      if (!response.ok) {
        throw new Error("Erro ao buscar principais atrativos");
      }

      return response.json();
    },
  });
}

export function useGetPrincipalAtrativoById(id: number) {
  return useQuery<PrincipalAtrativo, Error>({
    queryKey: [`principal-atrativo-${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/principais-atrativos/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar principal atrativo");
      }

      return response.json();
    },
    enabled: !!id,
  });
}

export function useGetAtratosDiponiveis(filters?: {
  municipioId?: number;
  categoriaId?: number;
  subcategoriaId?: number;
  perfilClienteId?: number;
}) {
  const queryParams = new URLSearchParams("type=disponiveis");
  if (filters?.municipioId) queryParams.append("municipioId", String(filters.municipioId));
  if (filters?.categoriaId) queryParams.append("categoriaId", String(filters.categoriaId));
  if (filters?.subcategoriaId) queryParams.append("subcategoriaId", String(filters.subcategoriaId));
  if (filters?.perfilClienteId) queryParams.append("perfilClienteId", String(filters.perfilClienteId));

  return useQuery<AtrativoDisponivel[], Error>({
    queryKey: ["atrativos-disponiveis", filters],
    queryFn: async () => {
      const response = await fetch(`/api/principais-atrativos?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar atrativos disponíveis");
      }

      return response.json();
    },
  });
}

export function useCreatePrincipalAtrativo() {
  const { invalidatePrincipaisAtrativos } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (data: { posicao: number; idAtracaoTuristica: number }) => {
      const response = await fetch("/api/principais-atrativos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Erro ao criar principal atrativo");
      }

      return response.json();
    },
    onSuccess: () => {
      invalidatePrincipaisAtrativos();
    },
    onError: (error) => {
      console.error("Error creating principal atrativo:", error);
    },
  });
}

export function useUpdatePrincipalAtrativo() {
  const { invalidatePrincipaisAtrativos } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (data: { id: number; posicao?: number; idAtracaoTuristica?: number }) => {
      const { id, ...updateData } = data;
      const response = await fetch(`/api/principais-atrativos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Erro ao atualizar principal atrativo");
      }

      return response.json();
    },
    onSuccess: () => {
      invalidatePrincipaisAtrativos();
    },
    onError: (error) => {
      console.error("Error updating principal atrativo:", error);
    },
  });
}

export function useDeletePrincipalAtrativo() {
  const { invalidatePrincipaisAtrativos } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/principais-atrativos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Erro ao deletar principal atrativo");
      }

      return response.json();
    },
    onSuccess: () => {
      invalidatePrincipaisAtrativos();
    },
    onError: (error) => {
      console.error("Error deleting principal atrativo:", error);
    },
  });
}
