import { AtracaoForm } from "@/forms/atracaoForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllAtrativos() {
  return useQuery({
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