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

export function useCreateAtrativo(){
  const { invalidateAtrativos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (atracao: AtracaoForm & { fotosURL: string[] }) => {
      await fetch("/api/atrativos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...atracao }),
      })
    },
    onSuccess: () => {
      invalidateAtrativos();
      invalidateDashboard();
    }
  })
}

export function useUpdateAtrativo(){
  const { invalidateAtrativos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (atracao: AtracaoForm & { fotosURL: string[] }) => {
      await fetch(`/api/atrativos/${atracao.atracaoTuristica.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...atracao }),
      })
    },
    onSuccess: () => {
      invalidateAtrativos();
      invalidateDashboard();
    }
  })
}

export function useDeleteAtrativo(){
  const { invalidateAtrativos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/atrativos/${id}`, {
        method: "DELETE",
      })
    },
    onSuccess: () => {
      invalidateAtrativos();
      invalidateDashboard();
    }
  })
}