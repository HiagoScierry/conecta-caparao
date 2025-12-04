import { AtracaoForm } from "@/forms/atracaoForm";
import { AtracaoTuristica, Categoria, Contato, Endereco, Foto, GaleriaFoto, HorarioDeFuncionamento, Municipio, PerfilCliente, Subcategoria } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, useQueryInvalidation } from "./useQueryInvalidation";

export type AtracaoTuristicaLoadedData = AtracaoTuristica & {
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  contato: Contato;
  endereco: Endereco;
  fotos: (GaleriaFoto & { foto: Foto; })[];
  horarios: HorarioDeFuncionamento[];
  municipio: Municipio;
  perfis: PerfilCliente[];
}

export function useGetAllAtrativos() {
  return useQuery<AtracaoTuristicaLoadedData[], Error>({
    queryKey: QUERY_KEYS.ATRATIVOS,
    queryFn: async () => {
      const response = await fetch('/api/atrativos');

      if (!response.ok) {
        throw new Error('Erro ao buscar atrações');
      }

      return response.json();
    }
  });
}

export function useGetAtrativoById(id: number) {
  return useQuery<AtracaoTuristicaLoadedData, Error>({
    queryKey: QUERY_KEYS.ATRATIVO(id),
    queryFn: async () => {
      const response = await fetch(`/api/atrativos/${id}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar atração');
      }

      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateAtrativo(){
  const { invalidateAtrativos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (atracao: AtracaoForm & { fotosURL: string[] }) => {
      const response = await fetch("/api/atrativos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...atracao }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400 && errorData?.errors) {
          // Erro de validação - reformatar para mensagem legível
          const validationErrors = errorData.errors
            .map((error: { path: string[]; message: string }) => `${error.path.join('.')}: ${error.message}`)
            .join(', ');
          throw new Error(`Dados inválidos: ${validationErrors}`);
        }
        throw new Error('Erro ao criar atração turística');
      }

      return response.json();
    },
    onSuccess: () => {
      invalidateAtrativos();
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Error creating atrativo:', error);
    },
  });
}

export function useUpdateAtrativo(){
  const { invalidateAtrativos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (atracao: AtracaoForm & { fotosURL: string[] }) => {
      const response = await fetch(`/api/atrativos/${atracao.atracaoTuristica.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...atracao }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400 && errorData?.errors) {
          // Erro de validação - reformatar para mensagem legível
          const validationErrors = errorData.errors
            .map((error: { path: string[]; message: string }) => `${error.path.join('.')}: ${error.message}`)
            .join(', ');
          throw new Error(`Dados inválidos: ${validationErrors}`);
        }
        throw new Error('Erro ao atualizar atração turística');
      }

      return response.json();
    },
    onSuccess: () => {
      invalidateAtrativos();
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Error updating atrativo:', error);
    },
  });
}

export function useDeleteAtrativo(){
  const { invalidateAtrativos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/atrativos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar atração turística');
      }

      return response.text();
    },
    onSuccess: () => {
      invalidateAtrativos();
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Error deleting atrativo:', error);
    },
  });
}