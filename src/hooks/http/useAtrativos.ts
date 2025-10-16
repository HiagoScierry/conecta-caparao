import { AtracaoForm } from "@/forms/atracaoForm";
import { AtracaoTuristica, Categoria, Contato, Endereco, Foto, GaleriaFoto, HorarioDeFuncionamento, Municipio, PerfilCliente, Subcategoria } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    queryKey: ['atrativos'],
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
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({
        queryKey:['atrativos']
      })
    }
  })
}

export function useUpdateAtrativo(){
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({
        queryKey:['atrativos']
      })
    }
  })
}

export function useDeleteAtrativo(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/atrativos/${id}`, {
        method: "DELETE",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:['atrativos']
      })
    }
  })
}