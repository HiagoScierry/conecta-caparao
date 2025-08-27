import { ServicoForm } from "@/forms/servicoForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllServicos() {
  return useQuery({
    queryKey: ['servicos'],
    queryFn: async () => {
      const response = await fetch('/api/servicos');
      if (!response.ok) {
        throw new Error('Erro ao buscar serviços');
      }
      return response.json();
    },
  });
}

export function useGetServicoById(id: number) {
  return useQuery({
    queryKey: ['servico', id],
    queryFn: async () => {
      const response = await fetch(`/api/servicos/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar serviço');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateServico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newServico: ServicoForm & { fotoUrl: string }) => {
      await fetch('/api/servicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...newServico}),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
    },
  })
}

export function useUpdateServico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedServico: ServicoForm & { fotoUrl: string }) => {
      const response = await fetch(`/api/servicos/${updatedServico.servico.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedServico),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar serviço');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
    },
  })
}

export function useDeleteServico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/servicos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar serviço');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
    },
  })
}
